---
title: Haskell Learners' Group (Session 3)
author: Walker Malling and Richard Cook
layout: learners
categories: learners
date: 2018-06-06
---

Minutes of discussion for our third learner's group session.

<!--more-->


Richard opened the meeting with our usual topic: tips for practical development

`ghcid` is an IDE for Haskell developed by Neil Mitchell

`stack install ghcid`

- delegate to ghci
- takes over terminal
  - doesn't clutter terminal history
- don't need to use file watch
- lacks colorization

Ricahrd_R asked about code completion: Richard demo'd VSCode's code completion

Richard said Haskero is an ide to investigate (maybe for next time)

Walker outlined the roadmap for next few sessions: setting a goal to write a budget application, learning the necessary components of Haskell on the way

Walker invited people to share what they've worked on

Akshay said that he tried working with an http request library in conjunction with an api, but said that it is difficult to read library documentation and get started quickly

Richard_R mentioned that in the JVM/Scala world http requests libraries typically yield a future and asked what abstraction haskell typically uses?

Richard said that he had used both `req` and `wreq` libraries (both are commonly used).  He gave exmaples with httpbin and raised a question regarding whether req/wreq are async or or synchronous. Richard said that, in principle, the use of monadic binding `<-` could be async. Also: Richard likes monomorphic libraries.

Akshay can't see the examples section in the documentation.

Richard showed that the examples sections are hidden by defualt, and said he will buy lolypops for anyone who builds an auto-expander script for the examples section.

Danielle asked a question about deriving functions

Richard talked about language pragmas, for example: how to silence warnings for a particular source file (you can do pragmas per line; one of the most common is `LANGUAGE OverloadedStrings` for use of string literals, e.g. of type `bytestring` or `text`).

There are many deriving libraries `derive generic`

New in ghc `derive via`: derive instances of a typeclass where it is a subclass

Question: regarding property based testing with quickCheck, you need to first define something in order to use quickCheck.

Richard said we'd try to investigate this for next time.

Question: so what to you use to write tests?

Richard said he uses `hspec` for unit testing.

... and therein endeth the preamble.

---

Richard opened the pedagogical topic for the day: types and algebraic data types:

Last time we looked at functions: single argument functions, curried functions (functions that return functions), as well as function signatures.  But functions operate on values.

Use `:info` to investigate types

`:info Int`

```haskell
data Int = GHC.Types.I# GHC.Prim.Int# 	-- Defined in ‘GHC.Types’
instance Eq Int -- Defined in ‘GHC.Classes’
instance Ord Int -- Defined in ‘GHC.Classes’
instance Show Int -- Defined in ‘GHC.Show’
instance Read Int -- Defined in ‘GHC.Read’
instance Enum Int -- Defined in ‘GHC.Enum’
instance Num Int -- Defined in ‘GHC.Num’
instance Real Int -- Defined in ‘GHC.Real’
instance Bounded Int -- Defined in ‘GHC.Enum’
instance Integral Int -- Defined in ‘GHC.Real’
```

--- 

Looking at the readout of `:info` on `Int`, Richard embarked on a tangent on Typographical conventions: why do types start with uppercase letter?

Functions and values must start with lowercase letter. Functions and values follow the same naming conventions and same syntactic rules.

Special characters like `_` are often used to mark the monadic variant of a function, like `for_`, however you see other conventions like `mapM` or with "prime" (though this is also used to denote a strictly evaluated function).

Another typographic peculiarity: infix & prefix functions, for example, define an infix function `&&&&&` where

```haskell
> x &&&&& y = x + y
> 10 &&&&& 20
> 30
```

With an infix function like this, you can use `()` to use it as a prefix function:

```haskell
> (&&&&&) 10 20
> 30
```

Conversely, you can use backticks `` to turn an prefix function into an infix function:

```haskell
> &&&&& x y = x + y
> 10 `&&&&&` 20
> 30
```

Why would you do either? It may be useful to think about the grammar of the operation: consider if the function fits a subject - verb - object format; then an infix syntax makes sense.

```haskell
x = map (+) [1, 2, 3]

:t x

x :: Num a => [a -> a]

map (\f -> f 10) x

[11, 12, 13]

```

Continuing typographical discussion regarding the capitalization of type names: maybe one reason, by contrast, is c++ parser must build up knowledge of whether something is a value or a type, and will take a different parsing path depending on what it encounters; this is also one reason why you have to declare functions and types before you can use them in c++.  Haskell makes a typographical difference between types and values.

In ghc 2020: they plan to turn on language extensions by default (like OverloadedStrings)

---

Returning to the topic of types:

`Int` versus `Integer`

`Int` is a 64 bit integer and `Integer` is supposed to model a mathematical integer, its implementation is hidded, but it probably used the `gmp` library

You can use an alias for a type:

`type Foo = Int`

just so, a `String` is an alias for `[Char]`

`ghc` will tell you this:

`:i String`
`type String = [Char]`

Note the difference between `data` and `type` keywords.

Richard gave several examples of the `data` keyword and mention of data constructors, including recursive data constructors: `:i []` and `:i Maybe`, and `:i Either`

We investigated the type of `Either`

`let x = Left "hello"`
`:t x`
`x :: Either [Char] b`

Note that it is still polymorphic; `b` is not cocrete, it still represents a type variable.

`data A = B Int`
`:t B`
`B :: Int -> A`

Note: we'll cover pattern matching next session.

Richard introduced the term "cardinality" of types (roughly, the "size" of the type).

Danielle asked: What is a sum type?

Richard addressed sum vs product types. 

A type can be a product, or a sum of other types. (Examples in more detail next time).

At closing, Richard also mentioned Benjamin Pierce.
