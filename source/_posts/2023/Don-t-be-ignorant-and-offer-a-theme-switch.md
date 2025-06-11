---
slug: Don-t-be-ignorant-and-offer-a-theme-switch
title: Don't be ignorant and offer a theme switch
subtitle: There is more to consider than the binary choice between dark or light mode
date: 2023-12-22 12:54:51
photograph:
  file: D50_6165_2312_Enhanced.jpg
  name: Carpet Rocker
  socialmedia: /static/images/social-media/Don-t-be-ignorant-and-offer-a-theme-switch.jpg
categories:
  - UI/UX
tags:
  - Usability
  - UI
  - Theming
related:
  - CONTINUE-READING-Link-Auto-Scrolling-on-the-called-page
  - Experimenting-with-the-font-LEXEND
  - Get-and-use-a-dominant-color-that-matches-the-header-image
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/111624290725749988
---

Coming from a [IndieNews post from Simone](https://minutestomidnight.co.uk/blog/giving-context-to-a-blogroll/), I stumbled over Garrit's post <a href="https://garrit.xyz/posts/2023-12-12-roast-my-site" class="u-in-reply-to">**Roast my Site!**</a>, to which Simone had referred. I was also just in roast mode again and if someone asks me so kindly, then go for it...

A little background ...

I have often talked about a topic on Mastodon or other channels that keeps bothering me for very personal reasons: **Dark and Light mode on websites**. I am glad that both exist, but the way they are usually implemented sometimes drives me crazy.

My eyes (and I think many other people can relate to this) start to flicker slightly after a few seconds of reading white text on a dark background, or at least it feels that way. The stronger the contrast, e.g. pure white on pure black, the faster it goes and the worse it is. I then have to stop reading. If I then look away, white lines continue to dance in front of my eyes for about a minute until the effect disappears. [Mandy reported on Mastodon](https://indieweb.social/@aworkinglibrary@mstdn.social/110979375072106482) about this halation effect, which in her case is due to astigmatism. I don't know of any such corneal curvature in my case, but the result seems to be similar.

<!-- more -->

The problem is, that **the effect only occurs with text** and I have activated dark mode on all my devices because I generally find it more pleasant. Icons, images and the like look better and it perhaps also saves a bit of power. Just not when I read text longer than a headline!

---

Back to Garrit and roasting him ;)

What really got me going was that he wrote something about "*Proud Member of [darktheme.club](https://darktheme.club)*" on his blog, which he also founded himself. In the FAQ it says, among other things:

{% blockquote_alt "darktheme.club FAQ" "https://darktheme.club/faq" %}
What's the point of all this?
...
People with certain visual imparements have a hard time navigating a web without a dark theme. There are plugins that try to emulate a dark theme for some sites, but those are not always accurate.
...
{% endblockquote_alt %}

Yes, Garrit. You're right. But you're falling a little short here. It's perfectly fine and almost a must-have nowadays to automatically display a web page to the user in the mode they have set using the CSS media feature [``prefers-color-theme``](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme), but unfortunately that's not enough. Being a member of a dark theme club and referring to the visually impaired in this way excludes others, like me for example.

---

## Simple Solution

Yet it is so easy to SIGNIFICANTLY increase acceptance by simply adding a **customizable theme button** to your own site! People like me almost automatically look in the top right-hand corner of a page (do it now ;) to see whether the almost standardized moon or sun symbol can be found there. Every website operator, who has implemented ``prefers-color-theme`` has already written the necessary CSS code. **The ONLY thing left to do is to add a f&#42;&#42;&#42; switch for it!** You don't even need JavaScript for that. It also works with pure CSS, as shown [here](https://alexandersandberg.com/articles/creating-a-website-theme-switcher-with-css-only/) and [here](https://codepen.io/michellebarker/pen/GzzrGJ/). Many of the JavaScript solutions also offer the option of saving the selection in the browser's local storage for the next visit. Your choice...

{% image_link "theme-switcher.png" "https://codepen.io/michellebarker/pen/GzzrGJ/" "Theme Switcher Pen from Michelle Barker" %}

In the list of darktheme.club members, however, there are only a handful of websites with the tag **JavaScript** which indicates such an individual theme switcher and I wonder whether this is due to ignorance or lack of knowledge!?  
Even design experts and proven CSS specialists who constantly write about UI/UX and accessibility (I won't mention any names) have the audacity to use ``background-color:#222; color:#fff`` on their own blogs and sometimes even do without the CSS media feature! NO ... THIS IS NOT A COOL DESIGN! I immediately unfollow such people, because there must be more pretense than reality.

---

## Be kind to your readers ... let them choose

I approached a few bloggers and asked if they could add a theme switch and only got the lapidary answer that I could use the OS theme switch. Yes, I can, but do I want to keep fiddling with my settings just because I generally like the dark theme and only need the light theme for reading? No, since such a switch is so easy to implement, I'd rather do without the textual outpourings of these lazy morons ... :|

As is so often the case, think of your users and they will be thankful. Maybe you didn't had this "problem" on your radar and that's perfectly ok (my site is also far from perfect) ... but if my contribution here has given you the impetus to add a switch on your site, then I (and many others too, I'm sure) will be VERY happy about it.

Ok Garrit ... now its time to roast me :D
