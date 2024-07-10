---
title: "#TIL | Debugging Hexo with VSCode"
date: 2021-09-26 12:00:00
type: til
syndication: 
---

If you want to debug your own [Hexo generators](https://hexo.io/api/generator.html) within VSCode, you have to create an entry in your ``./.vscode/launch.json``, which points to Hexo CLI with the argument ``generate``:

```json
"version": "0.2.0",
"configurations": [
  {
    "type": "node",
    "request": "launch",
    "name": "hexo generate",
    "program": "${workspaceFolder}/node_modules/hexo-cli/bin/hexo",
    "args": [
      "generate"
    ]
  }
]
```
