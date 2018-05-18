---
title: Haskell Learners' Group (Session 2)
author: Walker Malling and Richard Cook
layout: learners
categories: learners
date: 2018-05-02
---
A recap of what we talked about during the second meeting of the Haskell Learners' Group in Seattle

<!--more-->

### Introductions

We had about three additional attendees which was pretty nice. Most of last month's attendees returned which was also very encouraging! We talked about the Slack channel and how there is been much lively and fun discussion. Walker set the tone for the meeting: functions, functions, functions!

### Review

Richard briefly reviewed our last session, touching on the essentials of the haskell development environment and the anatomy of a Stack project.  Refer to last month's minutes!

In discussion regarding Stack, Richard also mentioned other build tools popular in the Haskell community, namely [nix][nix], and a new experimental tool called [pier][pier].

### Functions

Richard worked from some of his [Beginning Practical Haskell][bph-functions] material on the subject of functions. Talking points included:

#### What is functional programming?

One possible answer: Programming that emphasizes functions over everything else

#### How do values and functions relate in Haskell?

One possible answer: Functions are values in Haskell; the converse is not necessarily true: not all values are also functions, though they certainly look (syntactically, at least) like nullary functions (functions in one argument)

Richard discussed visual elements of Haskell programs
  * Module declarations
  * Import statements
  * Top-level function declarations
  * Equations
  * Function type signatures
  * Have not yet covered type declarations

#### Declarations

```
a = 5   -- is a declaration

a = 6   -- not a mutation, an instance of name shadowing (creating a new nested scope)
```

_Richard Rodseth_ correctly mentioned that we should emphasize that declarations in Haskell are equations

_Richard (Cook)_ valiantly tries to say "is" instead of "equals" and to avoid using the word "assign" altogether

#### Brief (but necessary!) Tangent on Types & Type Signatures

We considered the difference between `a + 1` and `a + 1.1`.

`a + 1.1` has type `:: Fractional a => a`

`a + 1` has type `:: Num a => a`

We used the `ghci` `:info` command to inspect the `Num` and `Fractional` type classes.

`:info Num` and `:info Fractional`

(We duscussed the difference between a Type and a Typeclass...)

You can implement your own Num typeclass if you want, as long as you adhere to the requirements of the typeclass properties, e.g. you implement all its methods

Introduction to concrete vs. polymorphic types

Note on the difference between Haskell and other languages: Haskell's typeclasses are unlike Java interfaces and abstract classes (which are dynamic dispatches at runtime; typeclasses are resolved at compile time)

### Fucntions, take 2 (return from tangent on types!)

#### Function Arguments

Function declarations declare one or more arguments identified by name on the left-hand side of the equation

All Haskell functions are actually functions in one argument and multiple arguments in declarations are syntactic sugar

We breifly discussed currying (all Haskell functions are automatically curried)

We Talked about parentheses and how Haskell can simulate "parentheses" languages using tuples

Richard also mentioned [CodeWorld][codeworld]'s "parentheses" variant of Haskell

#### Simple functions

`add` or `addIntegers` for adding numbers

`add x y = x + y` is the same as `add = \x y = x + y`

You can (and we did) prove that by getting the type signature of each in `ghci`.

"Applying f to x" looks like this is Haskell: `f x y`

> **Pedagogical notes**: At this point we got sidetracked by a discussion on `Num` and related type classes. It might make sense in the future to introduce fully _monomorphic_ functions at first to avoid being sidetracked by type variables and type classes. The problem there is teh lack of sensible monomorphic functions. All common arithmetic operations and functions are defined in terms of `Num`, `Fractional`, `Floating` etc. Perhaps use a custom simplified prelude? Even strings are problematic, as we then have to deal with lists and explain that `String` and `[Char]` are equivalent

We talked about name shadowing particularly in GHCi

> **Pedagogical notes**: This is confusing especially given the immutability of Haskell variables. Of course, immutability is one of Haskell's primary selling points, so some thought needs to go into how to teach this

Richard stated that accessing shadowed names is possible but couldn't remember how; Jake reported back how to do it ([see][accessing-shadowed-definitions])

Richard Introduced following function concepts
  * **Function application** and how whitespace is effectively the function application operator with highest precedence of any function
  * **Composition** and the `.` operator
  * Use of parentheses for explicit precedence
  * **Higher-order functions** (i.e. Functions that take other functions)
  * **Partial application**, which some claim is an illusion!

### Lists

Richard demonstrated the basics of `list`s, included the `range` opeartor `..`

* Lists are declared with `[]`
* Lists can contain any type, but all members of a list must be of the same type
* brackets are usually Arrays or Vectors in other languages, but there are important differences between those data types and Haskell lists.
* Lists of different lenghts still have the same type

Mentioned also that any type with an `Enum` instance can be used to define a range.

We determined that `[False..True]` doesn't parse but `[False .. True]` does (conflicts with qualified name syntax)

Started talking about generating lists of days of the month

### More Notes on a Haskell program:
* All programs need a Main module, look at the module header
* The `main` function typically has type signature `IO ()`
* You can export more than 1 function from a module
* You can specify which functions to export; by default all top level declarations are exported
* Discussion of `IO ()`, or `Unit`: returns no value
* Can be `IO` of anything, but any value is ignored and does not affect how program returns to the shell
* Programs typically use `exitFailure` and `exitSuccess` actions to report status codes to the shell
* Richard Emphasized that we talk about `IO` actions
* `IO` actions represent an imperative program that is executed by the Haskell runtime
* `IO` is a mysterious, magical type class

### "Haskell lifehacks" vol 1

#### Building in loop with file watcher

```
stack build --file-watch --exec hello-seattle
```

Where `hello-seattle` is the binary (the name of the stack project).


#### Finding symbols

_Danielle_ asked: how do you identify which imported module is failing when writing a program

You can use `:info` to see all the places the module is referenced, and where the symbol is defined

More questions about IDE integration (i.e., for automatically importing libraries) and import lists

The style of `import` statements can affect discoverability of symbols

Explicit imports (e.g. `import Data.List (intercalate)`) make it very clear where a given symbol comes from... but they're kinda noisy and verbose

IDE tooling could help with keeping these lists under control and the compiler can warn about unused imports

Can search using [Haskell.org Hoogle][hoogle-haskell] and [Stackage Hoogle][hoogle-stackage]

Can also install Hoogle locally (ask Richard about his GHCi `:hoogle` command if you want more information)

Hoogle supports search by symbol as well as search by type signature

### "Haskell Lifehacks" vol 2

You can set a custom search engine in Chrome and bind it to a key of your choosing, such that when the address bar is in focus, hitting `h` (for example) will activate hackage.haskell.org, and anything you enter into the address bar thereafter will by piped into the hackage search engine.

You can (reputedly) do this with Firefox as well, but this was not demostrated.

### Month Exercise

_Jake_ suggested we try an exercise:

> Implement a function `datesInMonth :: String -> Int -> [String]` which takes the name of a month ("May") and the number of days in that month (31), and returns a list of all the dates in that month `(["May 1", ..., "May 31"])`.

Richard did some live coding, until we hit 8pm and had to take the show on the road.

### Projects

There was some brief discussion as we were leaving of appropriate projects or outcomes from these meetings. Walker and Richard hope to present something appealing to all attendees shortly!

[accessing-shadowed-definitions]: https://ghc.haskell.org/trac/ghc/ticket/11547
[bph-functions]: http://blog.rcook.org/beginning-practical-haskell/part02.html
[codeworld]: https://code.world/
[hoogle-haskell]: https://www.haskell.org/hoogle/
[hoogle-stackage]: https://www.stackage.org/lts/hoogle
[nix]: https://nixos.org/nix/
[pier]: https://github.com/judah/pier#readme
