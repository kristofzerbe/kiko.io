---
title: "#TIL | Improved Node.js object console logging"
date: 2025-07-02
type: til
syndication: 
- host: Mastodon
  url: https://indieweb.social/@kiko/114785340899268057
---
The output of a nested object from Node.js in the console is limited. Above a certain level, only ``object`` or ``[array]`` is displayed. However, there are three ways to get around this:

### Alternative 1

You can simply omit the native console features and output plain text:

```js
console.log(JSON.stringify(obj, null, 2));
```

### Alternative 2

You can change the default behavior using Note.js Utils (which is rarely a good idea):

```js
require('util').inspect.defaultOptions.depth = null;
console.log(obj);
```

### Alternative 3

You only change the default behavior when calling and wrap it into a small tool:

```js tools.js
const util = require('util');

module.exports = {
  log: (obj) => {
    console.log(util.inspect(obj, { showHidden: false, depth: null, colors: true }));
  }
}
```


#NodeJS #Console #VSCode 
