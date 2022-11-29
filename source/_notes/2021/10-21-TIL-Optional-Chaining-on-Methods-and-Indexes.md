---
title: "#TIL | Optional Chaining on Methods and Indexes"
date: 2021-10-21 12:00:00
syndication: 
---

In ECMAScript 2020 the optional chaining operator was introduced into JavaScript. The question mark right behind the property name helps to prevent null reference exceptions:

```js
const foo = { bar: null };

foo.bar.prop // TypeError: Cannot read properties of undefined = NullReferenceException

foo?.bar?.prop // undefined
```

This works also on methods calls and index access:

```js
foo.doSomething.?()
foo.aList.?[0]
```

Important: The parentheses for the parameter listing or the index expression must be preceded by a period!
