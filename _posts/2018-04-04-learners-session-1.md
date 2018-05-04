---
title: Haskell Learners' Group (Session 1)
author: Walker Malling and Richard Cook
layout: learners
categories: learners
date: 2018-04-04
---
A recap of what we talked about during the first meeting of the all-new
Haskell Learners' Group meetings in Seattle

<!--more-->

### Introductions

We went round the room to introduce ourselves and gauge the level of experience
of each attendee.

### What is Stack?

* In the world of Haskell compilers, we only really care about GHC, the Glasgow
Haskell Compiler. And once you choose a compiler, your concern narrows to which
*version* of the compiler.
* Haskell has undergone a lot of changes in the past 6 years, so this is not a
trivial matter.
* Libraries and packages are dependent on certain versions of GHC.
* [Cabal][cabal] is Haskell's common architecture for packaging libraries and
programs.
* [Hackage][hackage] is Haskell's most well-known repository for open-source
packages.
* [Stackage][stackage] is "stable" Hackage. The idea is to take LTS (*long-term support*)
snapshots of all stable packages on Hackage that build on certain versions of
GHC.
* [Stack][stack] is a build tool/manager, which lets you manage (sandbox)
versions of GHC for your projects, and resolve packages that work with that
version of GHC.
* Currently, [LTS 11.3][stackage-lts-11.3] is the latest snapshot, and we can
configure our project (or our global environment) to use that LTS snapshot to
resolve a version of GHC and packages that build on it.
* For our purposes, any reasonably recent version of Stack will be sufficient:
most people in attendance had at 1.6.x.
* You can check the version of Stack on your system with `stack --version`.

### Modify your global Stack configuration

* Edit `~/.stack/config.yaml` to add `resolver: lts-11.3`

**UPDATE**: It turns out that this is not true (see
[this issue in GitHub][resolver-issue]). It is not currently possible to
specify a default resolver globally. Instead, you'll need to explicitly pass
`--resolver=lts-11.3` on the command line or edit your project-level
`stack.yaml` files.

### Create a new project

```
stack new hello-seattle simple
```

**UPDATE**: Again, you'll need to explicitly specifier a resolver if the
default is not appropriate. Since LTS 11.3 is the current default, this is OK
for the time being. To lock to this version in the future:

```
stack new hello-seattle simple --resolver=lts-11.3
```

### Build the project

```
stack build
```

This builds your project and creates the resulting binary in a subdirectory
under the `.stack-work` directory in your project's root. Typically, you'll
want to add `.stack-work` to your `.gitignore` file if you're using Git version
control for your project since you won't want to check binaries in.

### AWS Lambda and native binaries
<small>Rambling aside by Richard</small>

Note that, while [AWS Lambda][aws-lambda] doesn't directly advertise runtime
support for Haskell programs, you can distribute native binaries. By default,
Stack generates statically-linked binaries which can easily be bundled up and
deployed to Lambda.

I (Richard) have written a series of [blog posts][rcook-blog] on using Haskell
to interact with AWS services (built on the really cool [Amazonka][amazonka]
family of Haskell packages. Note that Amazonka makes pretty heavy use of
[lenses][lens] which we'll learn about later.

### Clean

```
stack clean
```

### Execute program

```
stack exec hello-seattle
```

### Install

To install a copy of your executable to a location on your system search path,
i.e. somewhere on the `PATH` environment variable, for example at
`~/.local/bin/hello-seattle` in this case:

```
stack install hello-seattle
```

### Build and run in one step

```
stack build --exec hello-seattle
```

### View Stack paths

List all of Stack's special paths:

```
stack path
```

### Launch GHCi REPL

```
stack ghci
```

| Command   | Description                                                                                        |
| --------- | -------------------------------------------------------------------------------------------------- |
| `:type`   | Returns the type signature of the given expression                                                 |
| `:kind`   | Shows the *kind* of a given *type*                                                                 |
| `:info`   | Returns general info about a given name                                                            |
| `:!<cmd>` | Shell out to execute a command                                                                   |
| `:edit`   | If you have a source file loaded, this will open your system default editor to the referenced line |

This command will determine the appropriate version of GHC/GHCi to use based on
your project's `stack.yaml` or the global configuration file in effect. When
run as part of a project, all the packages referenced in your `.cabal` file
will also be available to import functions from.

### Other Stack commands mentioned but not demonstrated

* `stack --help`
* `stack test`: to run test targets
* `stack bench`: to run benchmark targets
* `stack haddock`: to generate documentation
* `stack templates`: to list available project templates
* `stack upgrade`: to upgrade to latest version of Stack tool
* `stack uninstall` is a no-op

### A brief look at our `hello-seattle` project

```{.haskell}
module Main where

main :: IO ()
main = do
  putStrLn "hello world"
```

* `IO` is a generic type and unit `()` is its argument
* Unit is (roughly) analogous to `void` in languages such as Java/C/C++/C#
* `do` is syntactic sugar for `>>=` ("bind") and `>>` ("then"), and is used to
sequence actions

### Discussion of course materials and formats

We rounded out the evening by talking about what form future meetings of the
learners' group should take.

[amazonka]: https://github.com/brendanhay/amazonka
[aws-lambda]: https://aws.amazon.com/lambda/
[cabal]: https://www.haskell.org/cabal/
[hackage]: https://hackage.haskell.org/
[lens]: https://hackage.haskell.org/package/lens
[rcook-blog]: http://blog.rcook.org/
[resolver-issue]: https://github.com/commercialhaskell/stack/issues/904
[stack]: https://docs.haskellstack.org/en/stable/README/
[stackage]: https://www.stackage.org/
[stackage-lts-11.3]: https://www.stackage.org/lts-11.3
