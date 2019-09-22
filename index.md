---
title: SeaHUG
layout: default
page_scripts:
- /static/js/util.js
- /static/js/home.js
---
# <span class="haskell-logo">&#57344;</span> SeaHUG
Seattle's Haskell User Group since 2012
{: .sub-heading }

{% include upcoming-meetup.html %}

{% if site.categories.articles.size > 0 %}
## Recent articles
{% include recent-articles.html limit="2" %}
{% endif %}

{% if false && site.categories.minutes.size > 0 %}
## Recent meetings
{% include recent-minutes.html limit="2" %}
{% endif %}

{% if false && site.categories.learners.size > 0 %}
## Haskell Learners' Group
{% include recent-learners.html limit="2" %}
{% endif %}
