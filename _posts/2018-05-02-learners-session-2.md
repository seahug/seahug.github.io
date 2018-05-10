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

### Functions

Richard worked from some of his [Beginning Practical Haskell][bph-functions] material on the subject of functions. Talking points included:

* What is functional programming?<br/>
  * One possible answer: Programming that emphasizes functions over everything else
* How do values and functions relate in Haskell?
  * One possible answer: Functions are values in Haskell; the converse is not necessarily true: not all values are also functions, though they certainly look (syntactically, at least) like nullary functions (functions in one argument)
* Discussed visual elements of Haskell programs
  * Module declarations
  * Import statements
  * Top-level function declarations
  * Equations
  * Function type signatures
  * Have not yet covered type declarations
* Richard Rodseth correctly mentioned that we should emphasize that declarations in Haskell are equations
  * Richard (Cook) valiantly tries to say "is" instead of "equals" and to avoid using the word "assign" altogether
* Introduced some type signatures
* Function arguments
  * Function declarations declare one or more arguments identified by name on the left-hand side of the equation
  * All Haskell functions are actually functions in one argument and multiple arguments in declarations are syntactic sugar
  * Some discussion of currying
  * Talked about parentheses and how Haskell can simulate "parentheses" languages using tuples
  * Also mentioned [CodeWorld][codeworld]'s "parentheses" variant of Haskell
* Introduced some simple functions
  * `add` or `addIntegers` for adding numbers
  * Got sidetracked by discussion of `Num` and related type classes
  * **Pedagogical notes**
    * It might make sense in the future to introduce fully _monomorphic_ functions at first to avoid being sidetracked by type variables and type classes
    * Problem is lack of sensible monomorphic functions
    * All common arithmetic operations and functions are defined in terms of `Num`, `Fractional`, `Floating` etc.
    * Perhaps use a custom simplified prelude?
    * Even strings are problematic, as we then have to deal with lists and explain that `String` and `[Char]` are equivalent
* Talked about name shadowing particularly in GHCi
  * **Pedagogical notes**
    * This is confusing especially given the immutability of Haskell variables
    * Of course, immutability is one of Haskell's primary selling points, so some thought needs to go into how to teach this
    * Richard stated that accessing shadowed names is possible but couldn't remember how; Jake reported back how to do it ([see][accessing-shadowed-definitions])
* Introduced following function concepts
  * Function application and how whitespace is effectively the function application operator with highest precedence of any function
  * Composition and the `.` operator
  * Use of parentheses for explicit precedence
  * Higher-order functions
    * i.e. Functions that take other functions
    * Partial application, which some claim is an illusion!

### Lists

* We also touched on lists
* And ranges
* Mentioned that any type with an `Enum` instance can be used to define a range
* Determined that `[False..True]` doesn't parse but `[False .. True]` does (conflicts with qualified name syntax)
* Started talking about generating lists of days of the month

### Other stuff

* Mentioned that `main` function typically has type signature `IO ()`
* Can be `IO` of anything, but any value is ignored and does not affect how program returns to the shell
* Programs typically use `exitFailure` and `exitSuccess` actions to report status codes to the shell
* Emphasized that we talk about `IO` actions
* `IO` actions represent an imperative program that is executed by the Haskell runtime
* `IO` is a mysterious, magical type class

### "Haskell lifehacks"

#### Building in loop with file watcher

```
stack build --file-watch --exec hello-seattle
```

#### Finding symbols

* Style of `import` statements can affect discoverability of symbols
* Explicit imports (e.g. `import Data.List (intercalate)`) make it very clear where a given symbol comes from
* But they're kinda noisy and verbose
* IDE tooling could help with keeping these lists under control and the compiler can warn about unused imports
* Can use GHCi's `:info` command to find where symbols is defined
* Can search using [Haskell.org Hoogle][hoogle-haskell] and [Stackage Hoogle][hoogle-stackage]
* Can also install Hoogle locally (ask Richard about his GHCi `:hoogle` command if you want more information)
* Hoogle supports search by symbol as well as search by type signature

### Projects

There was some brief discussion of appropriate projects or outcomes from these meetings. Walker and Richard hope to present something appealing to all attendees shortly!

[accessing-shadowed-definitions]: https://ghc.haskell.org/trac/ghc/ticket/11547
[bph-functions]: http://blog.rcook.org/beginning-practical-haskell/part02.html
[codeworld]: https://code.world/
[hoogle-haskell]: https://www.haskell.org/hoogle/
[hoogle-stackage]: https://www.stackage.org/lts/hoogle