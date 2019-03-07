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
