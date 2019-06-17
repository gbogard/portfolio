---
type: Post
title: Discover Ramda, a functional library for JavaScript
date: 2018-06-02
published: true
tags:
  - Functional Programming
  - Javascript
---
Today, I would like to introduce you to a JavaScript library that has been very helpful to me in many
projects. Ramda is a utility library, similar in purpose to Lodash or Underscore, built with functional programming
in mind. Compared to the aforementioned libraries, Ramda enables a radically different style of
programming, based on function composition.

In this post, I'd like to cover concrete examples of everyday Ramda usage. I hope that reading this
introduction will give you a convincing glimpse at the library's potential, and inspire you to use
it in your projects.

Let's get started!

## Utility libraries : they're all about data

As mentioned before, Ramda is not the first utility library for JavaScript. You have probably
already heard of libraries like Lodash before. But just in case you haven't, here are some example
of what Lodash can provide.

### Filtering values out of objects

Filtering values out of arrays is easy, just use `Array.prototype.filter`, but what about filtering
keys in an object ? Lodash has you covered.

```javascript
import { omit, omitBy } from 'ramda'

const champions = {
  top: 'Garen',
  middle: 'Teemo',
  bottom: 'Lucian',
  support: 'Blitzcrank',
  jungle: 'Udyr',
}
```
You can omit certain keys by name 

```javascript
omit(champions, ['bottom', 'support', 'jungle'])
// => { top: 'Garen', middle: 'Teemo' } 
```

Or using a predicate

```javascript
omitBy(champions, value => value.includes('a'))
// => { middle: 'Teemo', jungle: 'Udyr' }
```

Lodash also has `pick` and `pickBy` that work the other way around, keeping only the
values that match instead of filtering them out.

### Transforming keys and values of an object

// TODO

These are just a fraction of what utility libraries like Lodash provide. This kind of library is all about
data : filtering, transforming, reducing, composing ... Sounds familiar ? These are the things we love to do in 
functional programming too ! Transforming data using simple, dedicated and composable components, namely, functions.
So why is it that functional programmers have felt the need for another library ?

Well, Lodash functions work well, but they turn out not be so easy to compose, and functional programming relies
a lot on composition, as it makes the code easier to write, read, and test.

## Ramda is different

Ramda could be described as Lodash, with all the data manipulation utilities you would expect (e.g `map`,
`filter`, `groupBy`, `pick` etc.) except all its functions are pure, curried by default, and their arguments
are arranged in a way that makes partial application easier.


## Let the data flow

## It's just the beginning