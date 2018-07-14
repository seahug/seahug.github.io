---
title: Haskell Learners' Group (Session 4)
author: Walker Malling and Richard Cook
layout: learners
categories: learners
date: 2018-07-03
---

Minutes from our 4th meeting.  We're at the half-way point in this series!

<!--more-->

Recapituation
=============

Richard reviewed where we are planning to go building an budgeting
application, with test data generated from YNAB.

Last months we covered data constructors, and looked at various
constructors, including recursive constructors such as `Either` and
`Maybe`.

Terms
-----

Accessor Function

Type Constructor

Type Variable

Sum Types

Product Types

Record Types

Cardinality (of a type)

Tuple

Cartesian Product


Sum and Product Types
=====================

`:i Maybe` gives the following info

`data Maybe a = Nothing | Just a    -- Defined in ‘GHC.Base’`

It is both a Sum and a Product type.

It is a Sum type in that is used the pipe, `|` to separate the data
constructors that is uses.

However, the later constructor, `Just a` is itself a product type,
though a product of one type variable.

`:t Just` gives the following type:

`Just :: a -> Maybe a`

Sum Types
---------

Named because of their \"cardinality\", which informally is the *size*
of the type. In mathematics types are approximates of sets, and the
cardinality of a set is the countability of the set; the number of
values it can contain.

In type lingo, the number of \"inhabitants\" of a type.

You can look at the data constructor of a type and see the cardinality
of it.

For example

`data Maybe a = Nothing | Just a` ... you can see the first constructor,
`Nothing` has no argument and there is only one possibility for
`Nothing`, and its cardinality is 1, one. Whereas `Just a` has a
cardinality equal to all the possible values of `a`.

---

Supplement:

Consider a `Bool` constructor: `data Bool = True | False`. In this case,
because a `bool` has only two possible values, it has a cardinality of
just 2.

By contrast `data Integer a = a` has a cardinality equal to all possible
integers.

---

A sum type has a cardinality which is the sum of the cardinality of its
types.

Tuples are sometimes called \"Cartesian Products\", it has cardinality
equal to every combination of its variables, so in `(a, b)`, you can
think of `a` and `b` as the axis of a graph, and any point on the graph
is defines is one possible type, and the total of all possibilities is
its cardinality.

(Aside on (the proliferation of) terminology; \"union\" types, e.g. in
Typescript, are essentially sum types).

(Aside comparing other languages to Haskell; The nearest equivalent of
the product type in OO languages would be a record or a struct.)

Product Types
-------------

Come in three forms, tuples, `data`, and record types.

Example exercise: a point.

`data Point = MkPoint Int Int`

`:info Point`

```haskell
Prelude> data Point = MkPoint Int Int

Prelude> :info Point
data Point = MkPoint Int Int    -- Defined at <interactive>:5:1

Prelude> :info MkPoint
data Point = MkPoint Int Int    -- Defined at <interactive>:5:14

Prelude> :t Point
<interactive>:1:1: error: Data constructor not in scope: Point

Prelude> :t MkPoint
MkPoint :: Int -> Int -> Point
```

Contrast a Record:

```haskell
Prelude> data NewPoint = NewMkPoint { x :: Int, y :: Int }

Prelude> :i NewPoint
data NewPoint = NewMkPoint {x :: Int, y :: Int}
    -- Defined at <interactive>:10:1

Prelude> :t NewMkPoint
NewMkPoint :: Int -> Int -> NewPoint

Prelude> :t x
x :: NewPoint -> Int
Prelude> :t y
y :: NewPoint -> Int
Prelude> 

Prelude> p2 = NewMkPoint 1 2
Prelude> x p2
1
Prelude> y p2
2
```

In the declaration of `NewMkPoint` we provide names `x` and `y` for the
two `Int` types, and ghc then generates accessor function by those
names. Note the type signatures of `x` and `y`.

We can write a function which will do the same thing, by means of
pattern matching.

```haskell
pointX :: Point -> Int
pointX p = case p of MkPoint x y -> x
pointY p = case p of MkPoint x y -> y
```

Oleg asked: Why do you need to name your data constructors in these case
statements? Doesn\'t the compiler understand, by virtue of the type
variables passed to the constructor, which constructor to use?

Discussion of the (1) consistency of this syntax, and (2) a recap of the
expressivity problem: What if you have
`data Foo = A Int | B String | C Float`, but later on you add
`data Foo = A Int | B String | C Float | D Int`. You would have to go
back and change every line of code that mached on the `Int` type
argument. -- Discussion also touched on how powerful pattern matching
is, namely you can match on specific values, not just on types: for
example in the function `blah :: Foo -> Int` if
`blah f = case f of A 0 -> 1337`. Finally, discussion of different
compiler warnings that you can enable that will, for example, warn when
you have inexhaustible pattern matching for a given function.

Extended example of pattern matching in a new project, where the data
constructor for Point has two alternative constructors, one representing
a point in cartesian coordinates, and one as a radial (and angle and a
radius).

```haskell

{-# LANGUAGE GeneralizedNewtypeDeriving #-}

module Main where

newtype Ordinate = Ordinate Float deriving (Num, Show)

data Point = XY Ordinate Ordinate | Radial Float Float

pointX :: Point -> Ordinate
pointX p = case p of
    XY x y -> x
    Radial ang r -> Ordinate (r * cos ang)

pointX :: Point -> Ordinate
pointX (XY a _) = a
pointX (Radial ang r) = Ordinate (r * cos ang)


pointY :: Point -> Ordinate
pointY p = case p of
    XY x y -> y
    Radial ang r -> Ordinate( r * sin ang)

data A = B Int Int


main :: IO ()
main = do
    let p = XY 100 200
    let XY x _ = p
    let f =  \(B x y) -> x

    print (pointX p)
    print (pointY p)

    let p2 = Radial  pi 10
    print (pointX p2)
    print (pointY p2)
    putStrLn "Done"

```

Akshay asked about type aliasing, to make the code more readable (rather
than arguments that read like \"Float Float\").

There are three options: type, newtype, and data.

Example of `newtype`

```haskell
{-# LANGUAGE GeneralizedNewtypeDeriving #-}

newtype Ordinate = Ordinate Int deriving Num
```

Akshay asked whether there are named arguments to functions, like you
can have in Python -- Richard answered that those are just dictionaries.

You *can* get named constructors, in a way:

If you have a record type, like
`data NewPoint = NewMkPoint { y :: Int, x :: Int }` then you can
instantiate it:

`let p0 = NewMkPoint { x = 100, y = 200 }` as opposed to
`let p1 = NewMkPoint 100 200`.

Pattern Matching Argument Lists
-------------------------------

Instead of *case* declarations (as seen in the above example), you can
use top-level pattern matches on the argument list.

```haskell
point X :: Point -> Ordinate
pointX (XY x y) = x
pointX (Radial ang r) = Ordinate (r * cos ang)
```
