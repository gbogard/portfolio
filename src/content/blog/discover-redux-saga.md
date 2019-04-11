---
type: Post
title: Managing side effects and building scalable React apps with Redux Saga
date: 2018-04-11
tags:
  - Javascript
  - React
---

Let me get this out of the way : side effects are evil. Our job as developers is to build abstractions that solve
problems. We build independent, confined little worlds of abstractions that we can contol, understand and predict.
But at the end of the day, for most jobs, we need some connection to the chaos of the outside world. That's where
the trouble comes in. Side effects, being this necessary connection to the outside world, are unreliable,
hard to test and sometimes hacky. Any external API call, any storage interaction, any DOM event handler is adding
instability and incertitude to the perfect world you're striving to build.

Some of us have known this for long time now, and this is why clever people have come up with ways to deal with side
effects in applications : IO monads, Actors, isolated threads ... Redux Saga is one of these. Redux Saga is a side-effects
model for Redux applications, that make side effects transactions easier to write, reason about and test. 

This article is the transcript to a talk I gave in Lille, France entitled _Redux Saga : side effects and scalability_.
Illustrations are slides form the presentation.

## Why does Redux Saga exist ?

If you're developing React applications, you may be used to performing your API calls directly in your components,
most likely in the `componentDidMount` hook. And perhaps this has worked fine so far. But today, I will try to demonstrate
how this approach keeps your application from scaling up, and why we need something like Redux Saga to build enterprise-class
applications.

### The importance of declarative programming

In order to explain the philosophy behind something like Redux Saga, I'd like to take a step back and look at the philosophy of
React and Redux and the impact they had on front-end development. If you started front-end development recently, you might not
realize this, but when React came out about 5 years ago, it changed the way we build front-end applications forever. Before it came
out, the de facto way of building JavaScript apps was to manipulate the DOM in a prodecural way meaning every change of content, style,
color, every update of your UI had to be explicitly described. One had to think about everything, the code was verbose and hard to maintain.

React is, to my knowledge, the first library, to introduce **declarative programming** to the front-end world. Declarative programming can be
seen as the opposite of procedural programming : it is a programming pradigm in which programs are written with expressions that represent what
your program must accomplish in the end, instead of focusing on the succession of specific steps to get there. In other words, declarative
programming allows us to think about the *what* of our programs, instead of the *how*. 

Here's an example of how it would tranlate to JavaScript applications. 

#### The procedural approach

```javascript
const button = document.createElement('button');
button.textContent = 'Push me'
button.style = 'color:red;';
button.addEventListener('click', () => alert('Stop it'))
document.body.append(button);
```

Expresses the *how* : every UI change is explicit. The risk of desynchronization between the UI layer and the state of the
application is high. Unexpected components can easily occur if this code is run several times : if we are not cautious enough, the click
event listener could be registered multiple times,  resulting in multiple `alert` being fired.

#### The declarative approach (with JSX)

```jsx
<button style={{color: 'red'}} onClick={() => alert('Stop it')}>
  Push me
</button>
```

Exresses the *what* : we simply declare what our program should look like at any given point in time, and React makes it happen. The view
layer and the state of our components are always in sync, and event listeners are handled so that there cannot be two of them on the same
component, for the same event at the same time. 

This approach is possible because React abtracts way the verbosity and complexity of the DOM for us, so we can focus on the looks and business
value of our applications.

In React applications, state flows to the view layer. This is what some functional programmers call *the React formula* :

| v = f(s)                                                                                      |
|:---------------------------------------------------------------------------------------------:|
| The view is a function of the state. Whenever the state evolves, the view evolves accordingly |

React is the first library to treat view components as functions. You can compose them the way you compose functions, 
you can make higher-order components, use currying ... Whenever the state changes, the view changes. Imagine you state
flowing from the top down through every component of your page. This makes the application far easier to reason about.

However, managing state is hard : if you're doing vanilla React, you've most likekly encountered this _components hell_ situation,
where sibling components are communicating through dozens of props and callbacks passed to their parent. You easily lose the sense
of what's going on.

### Redux brings declarative programming at scale

Redux was made to tackle these state mangement issues, but not in any way. There is a consistency between React's philosophy of
declarative programming, and the way Redux manages the state of your application. State flows only in one way, allowing you to
reason about your program more with ease.

Redux stores have three core properties : 
 - They are *predicatable* : it is always possible to know what your store will look like
 - They are *functionnal* : you can only update your store through the use of purely functional transforms. This makes
 Redux easier to test, since reducers are only pure functions
 - They are *inspectable* : Redux devtools allows you to inspect your store, see the actions that have been dispatched, and travel
 in time to understand what's going on
 
 As a reminder, here is how state flows in Redux applications :
 
![](../../assets/images/redux-saga-1.png)
 
### Redux Saga is the missing piece
