---
alias: /categories/Discoveries/Discoveries-7/index.html
slug: Discoveries-7
title: 'Discoveries #7'
subtitle: null
date: 2021-02-25T14:36:10.000Z
photograph:
  file: DSC_8892.jpg
  name: Industrial Chrome
  link: 'https://500px.com/photo/86990893/Industrial-Chrome-by-Kristof-Zerbe/'
  socialmedia: /static/images/social-media/Discoveries-7.png
series: Discoveries
categories:
  - Misc
tags:
  - Collection
related:
  - Discoveries-8
  - Discoveries-6
  - Discoveries-5
---

February and the first sunny days in 2021. What a delight! Have fun, sitting in the sun, discovering my newest finds on the web. This time, all regarding JavaScript...

{% anchorlist 
  "github1s: One second to read GitHub code with VS Code|github1s"
  "How to enhance fetch() with the Decorator Pattern|enhance-fetch-decorator-pattern"
  "Ky - Delightful HTTP Requests|ky"
  "VS Code’s REST Client Plugin is All You Need to Make API Calls|vscode-rest-client"
  "json-view|jsonview"
  "You might not need jQuery|you-might-not-need-jquery"
  "JavaScript Algorithms and Data Structures|js-algorithms-data-structures"
  "date-fns - Modern JavaScript date utility library|date-fns"
  "Parsing Markdown into an Automated Table of Contents|parsing-markdown-into-toc"
  "FakeScroll - lightweight custom-looking scrollbars|fake-scroll"
%}

<!-- more -->

{% discovery "github1s: One second to read GitHub code with VS Code" "netcon (conwnet)" https://github.com/conwnet/github1s Discoveries-7 github1s.png %}
How do you peak in the code of a Github repository? Navigate back and forth on github.com? The chinese developer *netcon* from Shenzhen has better idea: just add the 2 characters **1s** to the github url and the repository opens up in the new version of VSCode, which now can be built for  browsers. Pretty handy...
{% enddiscovery %}

{% discovery "How to enhance fetch() with the Decorator Pattern" "Dmitri Pavlutin" https://dmitripavlutin.com/enhance-fetch-with-decorator-pattern/ Discoveries-7 enhance-fetch-decorator-pattern.png %}
Fetching JSON files with JavaScript means to call fetch() asynchronously and pick the response manually. Two AWAITS and a lot of stuff can go wrong. Dmitri shows how to construct a class which enables you to do this in one step.
{% enddiscovery %}

{% discovery "Ky - Delightful HTTP Requests" "Sindre Sorhus" https://github.com/sindresorhus/ky Discoveries-7 ky.png %}
Fetch is nice, but if you want it nice and easy, you have to rely on a 3rd-party library, like **Ky*. Sindre Sorhus did a great job to bring fetching in one line, within around 13KB.
{% enddiscovery %}

{% discovery "VS Code’s REST Client Plugin is All You Need to Make API Calls" "Paige Niedringhaus" https://blog.bitsrc.io/vs-codes-rest-client-plugin-is-all-you-need-to-make-api-calls-e9e95fcfd85a Discoveries-7 vscode-rest-client.png %}
Using [Postman](https://www.postman.com/product/rest-client/) or [Nightingale](https://nightingale.rest/) for testing your microservices? Not absolutely necessary, as there are possibilities to do it right in VSCode, as Paige show us in her post here. No need to leave your editor.
{% enddiscovery %}

{% discovery "json-view" "Pavel" https://github.com/pgrabovets/json-view Discoveries-7 jsonview.png %}
It's not often that a developer has to display raw JSON data on a website or app. Pavel from the Ukraine has a solution to do this with style.
{% enddiscovery %}

{% discovery "You might not need jQuery" "Zack Bloom and Adam Schwartz" http://youmightnotneedjquery.com/ Discoveries-7 you-might-not-need-jquery.png %}
Many of us relied on [jQuery](https://jquery.com/) in the past. So did Zack Bloom and Adam Schwartz as I suppose. They have published a website, that contrasts the native JavaScript methods for the most common jQuery methods. Go Vanilla, go!
{% enddiscovery %}

{% discovery "JavaScript Algorithms and Data Structures" "Oleksii Trekhleb" https://github.com/trekhleb/javascript-algorithms Discoveries-7 js-algorithms-data-structures.png %}
Oleksii has collected a huge bunch of useful JS methods in his Github repository and has translated the docs for every method into 14 (!) languages. Whoop ... what a job! Ever wanted to know how to calculate the Euclidean Distance? Oleksii has the answer and the code.
{% enddiscovery %}

{% discovery "date-fns - Modern JavaScript date utility library" "{Many}" https://date-fns.org/ Discoveries-7 date-fns.png %}
[moment.js](https://momentjs.com/), maybe the most used JS library for calculating dates, is now in maintenance mode, because it is getting on in years. A good alternative is **date-fns**, which supports tree-shaking and other modern approaches. In addition to that, you will find [here](https://github.com/you-dont-need/You-Dont-Need-Momentjs) and [here](https://blog.logrocket.com/4-alternatives-to-moment-js-for-internationalizing-dates/) good comparisons between several date libraries or even native JS.
{% enddiscovery %}

{% discovery "Parsing Markdown into an Automated Table of Contents" "Lisi Linhart" https://css-tricks.com/parsing-markdown-into-an-automated-table-of-contents/ Discoveries-7 parsing-markdown-into-toc.png %}
A well-structured text has headings, subheadings and paragraphs. For the web we often write our stuff in [Markdown](https://en.wikipedia.org/wiki/Markdown). Lisi shows us how to process such a Markdown file to get a TOC automatically.
{% enddiscovery %}

{% discovery "FakeScroll - lightweight custom-looking scrollbars" "Yair Even Or" https://github.com/yairEO/fakescroll Discoveries-7 fake-scroll.png %}
The scrollbar belongs to the website or app a developer is creating, in my opinion. Therefore it is a mess what browser manufacturers offer developers in terms of possibilities. Yair has constructed a JS library which replaces the build-in scrollbars completely with standard HTML elements. Nice...
{% enddiscovery %}