---
slug: Discoveries-36-Web-Components
title: "Discoveries #36 - Web Components"
subtitle:
date: 2025-07-19 14:29:26
photograph:
  file: 24-12-Suedafrika-0660-D50.jpg
  name: Heli Gauges
  socialmedia: /static/images/social-media/Discoveries-36-Web-Components.jpg
series: Discoveries
categories:
  - Collection
tags:
  - WebComponents
  - HTML
related:
  - Discoveries-35-Visual-Studio-Code-Plugins
  - Discoveries-34-JS-Libraries
  - Discoveries-33-Image-Presentation
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/114880457757072374
---

I definitely don't know enough about **Web Components**, their possibilities, pitfalls, etc., but I want to learn more about them because I no longer do any programming in my day job, only tinkering around with this blog or small web apps in my spare time.

Over time, I've collected a few links on the topic that I think could be a good starting point for deepening my knowledge and putting it into practice.

Now all I need is the time...

{% anchorlist 
  "Plain Vanilla - Components|plain-vanilla-components"
  "A simple theme (dark-light) toggle custom web component|a-simple-theme-dark-light-toggle-custom-web-component"
  "I Made a Squircle Button (and of Course It's a Web Component)|i-made-a-squircle-button-and-of-course-its-a-web-component"
  "Scrolling Rails and Button Controls|scrolling-rails-and-button-controls"
  "Clean client-side routing (with custom element)|clean-client-side-routing-with-custom-element"
  "Rewriting my site in vanilla web|rewriting-my-site-in-vanilla-web"
  "A custom element base class|a-custom-element-base-class"
  "ap-components|ap-components"
  "Bluesky Likes Web Components|bluesky-likes-web-components"
  "Syntax Highlighting using the CSS Custom Highlight API|syntax-highlighting-using-the-css-custom-highlight-api"
%}

<!-- more -->

{% discovery "Plain Vanilla - Components" "Joeri Sebrechts" "https://plainvanillaweb.com/pages/components.html" Discoveries-36-Web-Components key:plain-vanilla-components %}
The best start you can have into the world of Web Components is the work of Joeri. He explains very much of the techniques step by step and it is easy to follow. Chapeau!

@@@cardlink
url: https://plainvanillaweb.com/pages/components.html
title: "Plain Vanilla - Components"
description: "An explainer for doing web development with vanilla web components."
host: plainvanillaweb.com
favicon: https://plainvanillaweb.com/favicon.ico
image: https://plainvanillaweb.com/apple-touch-icon.png
@@@

![](/post/Discoveries-36-Web-Components/plain-vanilla-components.png)
{% enddiscovery %}

{% discovery "A simple theme (dark-light) toggle custom web component" "Charaf Marghin" "https://github.com/CH4R4F/theme-toggle" Discoveries-36-Web-Components key:a-simple-theme-dark-light-toggle-custom-web-component %}
Charaf's component for switching the theme on a website is actually useful enough and can be used right away. However, studying the code provides a good insight into the general structure of web components.

@@@cardlink
url: https://github.com/CH4R4F/theme-toggle
title: "GitHub - CH4R4F/theme-toggle: A simple theme (dark/light) toggle custom web component"
description: "A simple theme (dark/light) toggle custom web component - CH4R4F/theme-toggle"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/bda072590e48778a097debb6975af6bd799716bde1a2a1dd240a355e2f5f4518/CH4R4F/theme-toggle
@@@
{% enddiscovery %}

{% discovery "I Made a Squircle Button (and of Course It's a Web Component)" "Jared White" "https://www.spicyweb.dev/i-built-a-squricle-button/" Discoveries-36-Web-Components key:i-made-a-squircle-button-and-of-course-its-a-web-component %}
I guess Jared had a lot of fun implementing his fancy button as a Web Component using SVG and clipPath. A nice example of what's possible...

@@@cardlink
url: https://www.spicyweb.dev/i-built-a-squricle-button/
title: "I Made a Squircle Button (and of Course It's a Web Component)"
description: "We've got some pretty funny names in the software industry, and a few are simply hilarious to say out loud. Try it. Squircle. I made a squircle. Ha ha! Now let's get into the reason for it."
host: www.spicyweb.dev
favicon: https://www.spicyweb.dev/favicon-32x32.png
image: https://www.spicyweb.dev/images/spicy-web-avatar-light.png
@@@

![](/post/Discoveries-36-Web-Components/i-made-a-squircle-button-and-of-course-its-a-web-component.jpeg)
{% enddiscovery %}

{% discovery "Scrolling Rails and Button Controls" "Ryan Mulligan" "https://ryanmulligan.dev/blog/scrolly-rail/" Discoveries-36-Web-Components key:scrolling-rails-and-button-controls %}
With his Scrolling Rails Control, Ryan also provides a very good insight into how Web Components work. I can hardly resist just using this control somewhere, because it is so good.

@@@cardlink
url: https://ryanmulligan.dev/blog/scrolly-rail/
title: "Scrolling Rails and Button Controls"
description: "A horizontal snap scroll custom element enhanced with button controls that pull the previous or next set of items into view."
host: ryanmulligan.dev
favicon: https://ryanmulligan.dev/favicon/favicon.ico
image: https://ryanmulligan.dev/social/scrolling-rails-and-button-controls.png
@@@
{% enddiscovery %}

{% discovery "Clean client-side routing (with custom element)" "Joeri Sebrechts" "https://plainvanillaweb.com/blog/articles/2025-06-25-routing/" Discoveries-36-Web-Components key:clean-client-side-routing-with-custom-element %}
Joeri again. In this article, he shows us how to create a SPA and use a web component for delimiting and routing between the various views. A great boilerplate for small Web Apps.

@@@cardlink
url: https://plainvanillaweb.com/blog/articles/2025-06-25-routing/
title: "Clean client-side routing"
description: "Finding a nice way of doing single-page app routing without a library."
host: plainvanillaweb.com
image: https://plainvanillaweb.com/blog/articles/2025-06-25-routing/image.webp
@@@
{% enddiscovery %}

{% discovery "Rewriting my site in vanilla web" "Lean Rada" "https://leanrada.com/notes/vanilla-web-rewrite/" Discoveries-36-Web-Components key:rewriting-my-site-in-vanilla-web %}
Lean has rewritten his website completely in vanilla HTML/CSS/JS and made heavy use of Web Components with light DOM. His approach is impressive and worth reading and considering for my.../yourself.

@@@cardlink
url: https://leanrada.com/notes/vanilla-web-rewrite/
title: "Rewriting my site in vanilla web"
host: leanrada.com
image: https://leanrada.com/notes/vanilla-web-rewrite/hero.png
@@@
{% enddiscovery %}

{% discovery "A custom element base class" "Mayank" "https://mayank.co/blog/custom-element-base/" Discoveries-36-Web-Components key:a-custom-element-base-class %}
Mayank has created an abstraction layer for his Web Components in the form of a base class, which imho simplifies a few things. I found that thing on [David's post about his new RSS Web App Croissant](https://dbushell.com/2025/07/11/croissant-no-framework-web-app/). Impressing...

@@@cardlink
url: https://mayank.co/blog/custom-element-base/
title: "A custom element base class"
description: "Put all the boilerplatey junk in a base class."
host: mayank.co
favicon: https://mayank.co/favicon.ico
@@@
{% enddiscovery %}

{% discovery "ap-components" "Evan Prodromou" "https://github.com/social-web-foundation/ap-components" Discoveries-36-Web-Components key:ap-components %}
Following [Evan](https://evanp.me/), the co-author of the ActivityPub protocol which is running the Fediverse, is always a win. Lately he posted about a complete suite of Web Components to render simple [ActivityPub](https://activitypub.rocks/) objects, which were published under the patronage if the [Social Web Foundation](https://socialwebfoundation.org/2025/05/28/ap-components/), where he has the role of the Research Director.

@@@cardlink
url: https://github.com/social-web-foundation/ap-components
title: "GitHub - social-web-foundation/ap-components: Web components for ActivityPub"
description: "Web components for ActivityPub. Contribute to social-web-foundation/ap-components development by creating an account on GitHub."
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/6d490c52f31bc5848e4ca04a7ebff0d9eb410b86a7a26674a698d8afbe2f9d91/social-web-foundation/ap-components
@@@
{% enddiscovery %}

{% discovery "Bluesky Likes Web Components" "Lea Verou" "https://lea.verou.me/blog/2025/bluesky-likes/" Discoveries-36-Web-Components key:bluesky-likes-web-components %}
Anyone who uses Bluesky will definitely find this component from Lea useful. It contains everything you need to collect and display the likes a post has received. The design of the component is particularly interesting. There's a lot to learn from it...

@@@cardlink
url: https://lea.verou.me/blog/2025/bluesky-likes/
title: "Bluesky Likes Web Components • Lea Verou"
description: "I set out to announce two components I wrote for displaying Bluesky likes and ended up ranting about the pain of building accessible, localizable web components in 2025. The components are still here, though — lucky you?"
host: lea.verou.me
image: https://lea.verou.me/blog/2025/bluesky-likes/images/demo.png
@@@
{% enddiscovery %}

{% discovery "Syntax Highlighting using the CSS Custom Highlight API" "André Ruffert" "https://github.com/andreruffert/syntax-highlight-element" Discoveries-36-Web-Components key:syntax-highlighting-using-the-css-custom-highlight-api %}
The best for last. Anyone who runs a technical blog and displays code needs a syntax highlighter. André has packed all the functionality of such a tool into a web component! No more hundreds of SPAN tags in the source code.

@@@cardlink
url: https://github.com/andreruffert/syntax-highlight-element
title: "GitHub - andreruffert/syntax-highlight-element: 👓 Syntax Highlighting using the CSS Custom Highlight API"
description: "👓 Syntax Highlighting using the CSS Custom Highlight API - andreruffert/syntax-highlight-element"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://repository-images.githubusercontent.com/931295844/5db86502-b221-4e23-b9cb-6a29e7afe71f
@@@
{% enddiscovery %}
