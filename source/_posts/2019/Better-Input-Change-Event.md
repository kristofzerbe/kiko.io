---
slug: Better-Input-Change-Event
title: Better Input Change Event
subtitle: null
date: 2019-11-26T16:51:17.000Z
photograph:
  file: 19-05-Israel-0624.jpg
  name: Jerusalem Seat
  socialmedia: /static/images/social-media/Better-Input-Change-Event.png
categories:
  - Coding
tags:
  - JavaScript
  - jQuery
related:
  - Device-Class-Detection-in-JavaScript
  - Change-CSS-class-when-element-scrolls-into-viewport
---

Often it is important to trigger an event, after the user of your website/web app has filled out an text input. You have to do something with the given value in JavaScript.

The intended event for this is ``change``, which will be triggered, when the user has ended changing by leaving the input with his cursor, mostly by using the TAB key. This works at some degree, if there is a physical keyboard, but not really on mobile devices ... and for me is leaving the field often too late to start the upcoming event.

<!-- more -->

A better way to show the user the result of his entered value, could be the event ``input`` which fires on every key stroke, but could be way to often, if the triggered event is for example an AJAX call.

Best solution is, to observe the users key strokes and trigger the event, when he stops typing. Then there is no extra action needed by the user and the event isn't triggered multiple times. 

Here's an implementation with jQuery:

```javascript
$("#my-text-input").keyup(function () {
    var $this = $(this);
    clearTimeout($.data(this, 'timer'));
    var wait = setTimeout(function () {

        //do something with the value...

    }, 1000);
    $(this).data('timer', wait);
});
```

Important is to wipe and set the timer on every key up, to achive that the event will be executed after 1 second after the last key stroke only.