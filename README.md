# The all-new Seattle Area Haskell Users' Group web site

[Check it out][seahug]

## Preview locally

```
gem install bundler
bundle install
bundle exec rake preview
```

Run tests:

```
bundle exec rake test
```

## Creating content

### Meeting minutes

* Use the [minutes template][minutes-template] (see [live version][minutes-live])
* Make a copy of the template in the [`_posts`][posts] directory
* Replace `yyyy-mm-dd` in the file name with the year, month and date of the post
* Put content into the file

### Articles

* Use the [article template][article-template] (see [live version][article-live])
* Make a copy of the template in the [`_posts`][posts] directory
* Replace `yyyy-mm-dd` in the file name with the year, month and date of the post
* Replace `article-template` with the permalink name of the article
* Put content into the file
* Update the front matter with the appropriate title, author etc.

## Licence

Released under the [MIT License][licence]

[article-live]: http://seattlehaskell.org/yyyy-mm-dd-article-template
[article-template]: yyyy-mm-dd-article-template.md
[licence]: LICENSE
[minutes-live]: http://seattlehaskell.org/yyyy-mm-dd-minutes
[minutes-template]: yyyy-mm-dd-minutes.md
[posts]: /posts
[seahug]: http://seattlehaskell.org/
