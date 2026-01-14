---
title: "#TIL | Display horizontal container initially scrolled to the right"
date: 2026-01-13
type: til
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/115892268584356693
---
On my [/stats](/stats) page, I used the wonderful web component [activity-graph](https://mariohamann.github.io/activity-graph/) to implement an Activity Graph that displays my posts over the entire lifetime of my blog. Now, as is common in Western cultures, the graph starts on the left side and is displayed horizontally. This means that the most recent and interesting entries are on the very right, and you have to scroll to the end to see them. The question was how to make the graph display directly scrolled to the far right at the start, and the solution is quite simple and uses the component's various HTML levels:

```html
<div class="activity-graph-wrapper">
  <activity-graph>
    <figure>
      <table>
       ...
      </table>
    </figure>
  </activity-graph>
</div>
```

Using the CSS `direction` property, I first rotate the graph in the reading direction to RTL (right to left) at the top level, then rotate it back again at the next lower level. This means that the browser displays the graph starting on the right, but everything below has the usual western-style reading direction.

```css
.activity-graph-wrapper figure {
  direction: rtl;
}
.activity-graph-wrapper figure table {
  direction: ltr;
}
```

#CSS #TIL 
