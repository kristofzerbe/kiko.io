---
title: Safely remove multiple classes using a prefix
subtitle: Avoiding pitfalls when iterating over classList
date: 2021-01-18 11:17:46
hitcountId: FmQt3HVl7
photograph:
  file: DSC_1690.jpg
  name: Metal Rose
  link: 'https://500px.com/photo/83252609/Metal-Rose-by-Kristof-Zerbe/'
categories:
  - JavaScript
tags:
  - DOM
related:
  - How-to-prevent-duplicate-events
  - Device-Class-Detection-in-JavaScript
  - Utilize-a-repository-of-reusable-ES6-template-literals
---
Writing a Web App with HTML and JavaScript means you deal with several classes on your DOM elements in order to visualize state changes. And there are some pitfalls to be aware of with regard to removal.

Assuming you want to open some kind of sidebar above a container. In this sidebar you have several buttons to show different content via JavaScript and a close button, which closes the sidebar again. You HTML code maybe looks like this:

```html
<html>
  <body>
    <div id="container">... Main Content ...</div>

    <nav>
      <button id="open-sidebar">
    </nav>

    <aside id="sidebar">
      <div class="content">... Sidebar Content ...</div>
      <button id="close">Close Sidebar</button>
      <button id="content-1">Show Content 1</button>
      <button id="content-2">Show Content 2</button>
      <button id="content-3">Show Content 3</button>
    </aside>

  </body>
</html>
```

By clicking on the ``open-sidebar`` button, the sidebar is opened and the action, respectively the new state, is vizualized by adding an appropriate class to the parent sidebar element. In order to make it easy for the user, the default content (Content 1) will be loaded also and its state will be marked with another class.

```html
<aside class="sidebar open open-content-1">
```

A click on of the other content buttons (let's say Content 2), will replace the current content and the ``aside`` classes will change into:

```html
<aside class="sidebar open open-content-2">
```

Now we want to close the sidebar again, assuming that we don't have stored the currently opened content in the JavaScript code...

<!-- more -->

What we have to do, is to iterate over all classes of ``aside`` and remove those which starts with ``open``:

```js
let sidebar = document.getElementById("sidebar");
for (let i = 0; i < sidebar.classList.length; i++) {
  let value = sidebar.classList[i];
  if (value.startsWith("open")) {
    sidebar.classList.remove(value);
  }
}

//or

let sidebar = document.getElementById("sidebar");
sidebar.classList.forEach(function(value){
  if(value.includes("open")) {
    sidebar.classList.remove(value);
  };
}); 
```

Both approaches have a pitfall: when the first class, starting with ``open``, is removed from the list, the length of the ``classList`` array changes immediatly and we won't reach the last class in the list ... !

The solution is to find and remove all appropriate classes at once, for example by using ``RegEx`` and a reusable helper function:

```js
function removeClassByPrefix(el, prefix) {
    var regEx = new RegExp('\\b' + prefix + '.*?\\b', 'g');;
    el.className = el.className.replace(regEx, '');
    return el;
}

//...

let sidebar = document.getElementById("sidebar");
removeClassByPrefix(sidebar, "open");
```
