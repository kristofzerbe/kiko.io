---
slug: REP-Embedding-Bandcamp-Tracks
title: 'REP: Embedding Bandcamp Tracks'
subtitle: Inspiration and Implementation
date: 2025-11-16 16:59:50
updated: 2025-11-20 20:00:00
photograph:
  file: 25-07-Schweden-453-D50.jpg
  name: Curious Goat
  socialmedia: /static/images/social-media/REP-Embedding-Bandcamp-Tracks.jpg
series: A New Blog
categories:
  - Coding
tags:
  - Hexo
  - CSS
  - HTML
  - SVG
related:
  - Stoned-Jesus-Bandcamp-and-the-Necessity-of-Music
  - Dopamine-How-Software-should-be
  - Radio-Garden
bandcamp:
  artist: Lowdrive
  album: Rise|2549803014
  track: Blood Sacrifice|897654312
syndication:
  - host: GitHub
    url: https://github.com/kristofzerbe/kiko.io/issues/20
  - host: Mastodon
    url: https://indieweb.social/@kiko/115560923679747902
---

Recently, I was greatly inspired by [Roma Komarov](https://front-end.social/@kizu) to add another, audible layer to my blog posts...

At the beginning of the month, I complained to myself in my post [Stoned Jesus, Bandcamp and the Necessity of Music](/post/Stoned-Jesus-Bandcamp-and-the-Necessity-of-Music) that I hardly listen to music anymore, even though it seems to help me in stressful times. Just as I (re)discovered Bandcamp and my credit card was hit hard for various great albums, Roma came up with the following post:

{% cardlink %}
url: https://blog.kizu.dev/embedding-bandcamp-tracks/
title: "Embedding Bandcamp Tracks"
description: "A long time ago, back in LiveJournal, sometimes people embedded various music players in their posts. It was fun! I already had a 'Current music' field added to most of my posts, but now I also added a way to enrich this field by adding an optional Bandcamp track reference, and spent my evening updating existing posts in the blog to have it."
host: blog.kizu.dev
favicon: https://blog.kizu.dev/favicon.svg
{% endcardlink %}

Well, if that isn't fate...

<!-- more -->

---

I especially like his approach with the ``detail`` element, which only pulls the source of the ``iframe`` from the network when you open it. Nothing complicated, just pretty straightforward.

From the beginning, I had a small icon of a musical note at the top of the post in mind, accompanied by the artist and track name, so that you know what's coming. Unfortunately, it's still a bit difficult to replace the ``marker`` of the ``detail`` element with an icon in SVG form, but at least you can make it disappear.

Here is the HTML of my EJS partial responsible for the visualization:

```html
 <details class="bandcamp">
  <summary>
    <em><%= artist %> - <%= track.name; %></em>
    <svg class="icon-music-note-accent">
      <use xlink:href="/images/icons/music-note-accent.svg#note"></use>
    </svg>
  </summary>
  <iframe src="https://bandcamp.com/EmbeddedPlayer/album=<%= album.id %>/size=small/bgcol=ffffff/linkcol=333333/track=<%= track.id %>/transparent=true/" 
          width="100%" height="42px" 
          load="lazy" seamless>
  </iframe>
</details>
```

This is controlled when the page is created via Frontmatter entries of the respective article ... for example this one:

```yaml
bandcamp:
  artist: Lowdrive
  album: Rise|2549803014
  track: Blood Sacrifice|897654312
```

<small>*(Yes, I know... Pipe-separated strings in Frontmatter are ugly, but easier to keep track of)*</small>

I don't know how Roma gets the necessary values for his songs, but the only way to extract the album and track IDs from the Bandcamp UI at the moment is via the link "Share/Embed", the opening dialogs, the "Embed Code" field, and an external editor, since the field is only an ``input`` and not a ``textarea`` that could be enlarged :|  
A little annoying, but bearable, because at least I don't write my posts on the fly and therefore take the time to pick out the data.

What's left now is the CSS (here in Stylus format), which I'm still tinkering with because I'm not entirely satisfied with it yet. The ``details`` element is really quite special...

``` styl
details.bandcamp
  --bc-margin: 0.5rem
  --bc-padding: 1.5rem
  width: calc(100% - calc(var(--bc-margin) * 2))
  margin-block: var(--bc-margin) 0
  margin-inline: var(--bc-margin)
  display: grid
  justify-items: end
  &::marker
    display:none
    content: ""
  summary
    list-style: none
    padding: 0
    em
      display: inline-block
      margin-right: calc(var(--bc-padding) / 2)
      font-variant: all-small-caps
      color: var(--color-accent-text)
      transition: all ease-out 0.2s
    svg
      width: var(--bc-padding)
      height: var(--bc-padding)
      float: right
      transition: all ease-out 0.2s
  &[open]
    summary
      em
        opacity: 0.333
    svg
      transform: rotate(-20deg)
```

---

## Update: Theme Switching

~~What I still need to do is make the theme change look good, because the colors of the Bandcamp player are coded in the iframe URL...~~

The URL parameters for the embedded Bandcamp player contain information about the background and link colors, and the values appear to be HEX colors, but they are not; rather, they are keys to the predefined colors in Bandcamp's Customize dialog. It's a shame, because this means I can't use the page-specific accent colors for my pages. The only thing left is Light and Dark, along with the selected theme, and some JavaScript to set the player URL when the page is first opened and when the theme is switched.

![Bandcamp's Embed Customize Dialog](REP-Embedding-Bandcamp-Tracks/bandcamp-embed-customize.png)

Resetting the ``iframe`` URL via the ``src`` attribute is not a good idea, because (for whatever reason) this affects the browser history of the entire page and means that the user has to press the BACK button as many times as the player has been reset in order to return to the previous page in the blog. Annoying.

One option is to replace the entire ``iframe`` element each time, but another, simpler option is to use ``contentWindow.location`` of the ``iframe`` element, which does not exhibit the history behavior.

All wrapped up in a small JavaScript function and garnished with a ``MutationObserver`` that responds to the theme change at this point, the following addition to the EJS code results:

```js
<script>
  function setThemeBandcampPlayer() {
    let bgColor = "ffffff";
    let lnkColor = "333333";
    let theme = document.documentElement.getAttribute("data-theme");
    if (theme === "dark") { bgColor = "333333"; lnkColor = "ffffff"; } 

    let bcPlayerUri = `\
  https://bandcamp.com/EmbeddedPlayer/\
  album=<%= album.id %>/\
  size=small/\
  bgcol=${bgColor}/\
  linkcol=${lnkColor}/\
  track=<%= track.id %>/\
  transparent=true/\
  `;

    document.getElementById("bandcamp-player").contentWindow.location.replace(bcPlayerUri)
  }

  // Startup
  setThemeBandcampPlayer(); 

  // Theme Switch
  new MutationObserver(m => { 
      setThemeBandcampPlayer(); 
    }).observe(document.documentElement, {
      attributes: true, attributeFilter: ["data-theme"], attributeOldValue: true
    });
</script>    
```

---

## Conclusion

Thanks Roma for the impetus for this fun little feature for my readers... at least if they like rock music ;)

<small>*... he writes as the guitar riff kicks in massively and he raises the devil's horn towards the sky*</small>
