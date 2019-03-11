---
type: Post
title: Performance of recursive functions (and when not to use them)
date: 2018-01-15
tags:
  - Functional Programming
---
As powerful and appealing a tool is, it's always better to know a little bit about the cost of using it before doing so.
Recursion is no exception. Depending on the programming language you're using and the problem you're trying to solve, recursion
might not be most efficient way to go. I'll try to explain why in this article.

This post is a follow-up to a previous blog post I wrote called [Understanding Recursion](/blog/what-is-recursion). If you're not
confortable with the concept of recursion, make sure you read this one first :) 

With that out of the way, let's dig in!

## Avoiding Stack Overflow errors using tail-recursive functions

In traditional recursion, each call of the function to itself adds a new element to the call stack, a data structure that
programs use to save data about active function calls. To simplify, the call stack represents what your program, or thread in
the case of parallel programming, is currently doing. When you enter a function, an element is added on top of the stack. When
this function exits, the element is removed from the top.

The call stack is limited in size. That's why when you forget the base case for your recursive function, you get a `Stack Overflow` error,
meaning that you cannot longer add calls to the stack.

In traditional iteration, with `for` or `while`, we don't have to bother with space efficiency that much, beacause all the iterations
will happen on the same stack frame, instead of creating a new one from the previous. Indeed, when an iteration ends, your program
merely _jumps back_ to the instruction it started at, kind of like a `goto` operation.

**As it turns out, some langauges support the ability to convert nested calls to _jumps_, which avoids consuming frames on the
call stack**.

How so ? Thanks to a special kind of recursive function called _tail-recursive function_. A tail-recursive function is a function
whose very last intruction is to call itself. Many functin languages like Clojure or Scala have the ability to optimize such functions
so that they use constant stack space.



Remember our good friend the factorial function from [last time](/blog/what-is-recursion) ? Here's what it would look like in Scala,
in both _naive_ style and _tail-recursive_ style.

```scala
// This is the non tail-recursive one
def factorial(n: Int): Int = {
  if (n <= 1) {
    n
  } else {
    factorial(n - 1) * n
  }
}
```

The first one is very similar to what we had in Javascript. It's very easy to read implementation, but not that efficient.

### Wait, how is that not tail-recursive ?

You might think by looking at this function that it is tail-recursive. Indeed the recursive call is on the last line of the
function. But that doesn't mean that it is the last instruction executed by your program. It becomes more obvious if we replace
the final multiplication by a set of several instructions :

```scala
def factorial(n: Int): Int = {
  if (n <= 1) {
    n
  } else {
    val previousFactorial = factorial(n - 1)
    previousFactorial * n
  }
}
```

You can see clearly here that the nested call the to `factorial` function is not in tail position. You need to know the result 
of the recursive call before you can make the multiplication. You can see the multiplication itself a function call, where `n` and
`factorial(n - 1)` are the arguments. Perhaps is it less confusing in languages like LISPs that do not support the _infix_
operator, and where the multiplication is indeed a function like any other one.

```clojure
(* (factorial (- n 1)) 
    n)
```

### How do I write a tail-recursive function then ?

Here's the tail-recursive version of the factorial function in Scala. Notice how the last instruction
of the function is indeed the call to itself.

```scala
def factorial(n: Int, accumulator: Int = 1): Int = {
  if (n <= 1) {
    accumulator
  } else {
    factorial(n - 1, n * accumulator)
  }
}
```

The trick here is to add another parameter to our function called the `acumulator`. This `accumulator` will hold
the current result of the factorial. `n` will act as the compared value for our base case condition, just like before.

And just like that, our function is made more efficient. The idea behind the optimization of tail-recursive functions,
often referred to as _tail call elimination_ is that if the nested call is the last instruction, meaning there isn't anything 
left to do in the function, the program can just _exit_ the function and call it again with new parameters, just like regular
iteration.

### Why should I care ?

You might think that since your function doesn't deal with very deep levels of recursion, you will never encounter
a `Stack Overflow` error anyway. And you would be correct. So why bother with tail call elimination ?

Well the point of this optimization is not only to avoid `Stack overflow` errors. Keeping unnecessary items on the call stack
is expensive, both in space (a.k.a memory) and computation (a.k.a CPU power). Depending on your project and the type of device
you are targeting, you may or may not care about this. But you're doing low-level programming with high performance standards, or
if you're targeting small and slow devices, for instance if you're doing _IoT_, I would strongly recommend that you keep that in
mind.

When the _recursive part_ of a function is in the middle of it, your program needs to execute the nested call fully before it can go
on with the rest of the instructions. Your program is thereby fsorced to add a new element to the call stack.
