---
layout: minutes
---

# Meeting Minutes

{% for post in site.categories.minutes %}
  <a href="{{ post.url | absolute_url }}">
    {{ post.date | date: "%B %d, %Y" }}
  </a>
{% endfor %}
