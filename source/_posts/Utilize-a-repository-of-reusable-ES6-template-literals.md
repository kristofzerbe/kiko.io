---
title: Utilize a repository of reusable ES6 template literals
subtitle:
date: 2021-01-03 13:29:01
hitcountId: Xf5KYiovJ
photograph:
  file: DSC_7897.jpg
  name: Rusted Bike
  link: 'https://500px.com/photo/86258961/Rusted-Bike-by-Kristof-Zerbe/'
categories:
  - JavaScript
tags:
  - ES6
  - Templating
related:
  - Implement-source-switch-for-SPA
  - Device-Class-Detection-in-JavaScript
  - Localization-with-resource-files-in-JavaScript-web-apps
---

The [**Template Literals**](http://es6-features.org/#StringInterpolation) introduced with ES6 are very useful to deal with multiline strings, because they support [embedded expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Expression_interpolation). Gone are the days of endless string concatination or replacing variables in a string by using RegEx.

Instead of... 

```js
var url = ...
var file = ...

var template = 
  '<div class="photo">' + 
     '<a href="' + url + "' + 
        'style="background-image: url(' + file + ')"</a>' + 
  '</div>'
```

... you can write:

```js
var url = ...
var file = ...

var template = `
  <div class="photo">
    <a href="${url}/"
    style="background-image: url(${file});"></a>
  </div>
`,
```

It's much cleaner and easier to handle, as you can copy your needed HTML right into your code and surround it by **backtick** (!) characters. Insert your variable placeholders (expressions), indicated by a dollar sign and curly braces, and you are done.

But there is one "restriction", you have to be aware of: the interpolation (substitution of the expressions) is done at declaration time and not at runtime. You can't define your literals seperatly, take one and make your substitution as you need it, like you would do with [Handlebars](https://handlebarsjs.com/) or other templating engines. Therefore the name *template* literals is a bit misleading. But ... there is a way to achieve this anyway...

<!-- more -->

### Tagged Templates

Beside Template Literals, ES6 introduced **Tagged Templates** (exact: Tagged Template Literals). These tags are functions, which allows you to parse a Template Literal. Definition is like this:

```js
function myTag(literals, ...expressions) {
  //do the substitution and return a string
}
```

You can use these tags by prefixing you literal:
```js
myTag`Hello ${firstName} ${lastName}!`
```

Using Tagged Templates to build a template repository would mean, you have to write one tag function for every template ... doable, but time consuming.

### Dynamic Tag Function

To avoid this, we can write a universal tag function, which utilizes the [Function constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function), to create the tag function dynamically:

```js
function fillTemplate(templateString, templateVars) {

  var func = new Function(
    ...Object.keys(templateVars),  
    "return `" + templateString + "`;")

  return func(...Object.values(templateVars));
}
```

{% alertbox warning %}
    Don't use this approach on user inputs as expressions, to avoid XSS!
{% endalertbox %}

### Let's see an example...

Given is a tiny web app with the following structure:

**index.html**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Reusable ES6 template literals</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="/src/style.css">
  </head>
  <body>
    <main id="main"></main>
    <script src="src/index.js"></script>
  </body>
</html>
```

**index.js**
```js index.js
import { App } from "./app.js";

const app = new App();

app.init();
```

**app.js**
```js
class App {
  init() {
    //do something
  }
}
export { App };
```

What we want to do now, is to load some images into the `main` element, by using a more or less complex element structure:

```html
<div class="photo">
  <a href="<!-- Url to view the photo -->"
     style="background-image: url(<!-- Url of the photo file -->);"></a>
</div>
```

To separate our templates from the main code, we create a template module, which contains the dynamic tag function from above and a `photo` template we want to use in our app

**template.js**
```js
class Templates {

  //Template
  photo(data) {
    return this.fillTemplate(
      `
      <div class="photo">
        <a href="${data.url}/"
        style="background-image: url(${data.file});"></a>
      </div>
      `,
      data
    );
  }

  //Dynamic Tag Function
  fillTemplate(templateString, templateVars) {
    var func = new Function(...Object.keys(templateVars),
                           "return `" + templateString + "`;"
    );
    return func(...Object.values(templateVars));
  }
  
}
export { Templates };
```

The template retrieves a `data` object, with the values of the defined expressions, and calls the dynamic tag function on the literal template.

This we can use now in our app code:

**app.js**
```js
//Import Template module
import { Templates } from "./templates.js";

class App {
  init() {

    //Initialize Templates
    this._templates = new Templates();

    //Insert photo into MAIN element
    let main = document.getElementById("main");
    main.insertAdjacentHTML(
      "beforeend",
      this._templates.photo({
        file: "my-photo.jpg",
        url: "https://link-to-my.photo.com"
      })
    );

  }
}
export { App };
```

See it live at [codesandbox.io - Reusable ES6 template literals](https://codesandbox.io/s/reusable-es6-template-literals-4iyor?file=/src/templates.js).