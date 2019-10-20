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

After 6 years of dedicated leadership, Richard has stepped down as organizer.
This group is now in a state of anarchy, but Brian Bascoy has reserved a meeting
room in the Montlake library for our November meeting. If you'd like to present,
feel free to post your topic to the google group.

{% include google-group.html %}

{% if site.categories.articles.size > 0 %}
## Recent articles
{% include recent-articles.html limit="2" %}
{% endif %}

{% if false and site.categories.minutes.size > 0 %}
## Recent meetings
{% include recent-minutes.html limit="2" %}
{% endif %}

{% if false and site.categories.learners.size > 0 %}
## Haskell Learners' Group
{% include recent-learners.html limit="2" %}
{% endif %}
