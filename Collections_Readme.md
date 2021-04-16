# Readme for the Trello-Collections Feature

## config.yml

```yml
trelloCollections:
  boards: 
  - name: Collections
    url: https://trello.com/b/D6zIhLus/collections.json
    items: 
    - name: tiny-tools
      list: TinyTools
```

## Template

```yml
---
title: Tiny Tools
date: {{ date }}
hitcountId: #HITCOUNT.IO
photograph: 
  file: tiny-tools.jpg
---

Text...

```

### Source

```txt
> Source
  > _collections
    > tiny-tools.md
```

## Trello JSON

(see ./_trello-board-excerpt.json)

## collection.ejs

(Template for page to produce; see ./themes/landscape/layout/collection.ejs)

## Generator

(see ./themes/landscape/scripts/generator-trello-collections.js)

## Console

(see ./themes/landscape/scripts/console-trello-collections.js)

## Result

```txt
> docs
  > collections
    > tiny-tools.html
```

## theme/landscape/config.yml

```yml
nav_menu:
+ tiny-tools: /tiny-tools
```
