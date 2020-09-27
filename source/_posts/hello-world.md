---
title: Hello World
date: 2019-09-17 12:00:00
hidden: true
categories: 
    - Test
---
Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

![TEST](kiko.io-icon.png)

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Tag Plugin: AlertBox (/Scripts)

```
{% alertbox [type=exclamation|question|warning|info|success] %}
    content
{% endalertbox %}
```

{% alertbox exclamation %}
Alert Box: **Exclamation**
{% endalertbox %}

{% alertbox warning %}
Alert Box: **Warning**
{% endalertbox %}

{% alertbox info %}
Alert Box: **Info**
{% endalertbox %}

{% alertbox success %}
Alert Box: **Success**
{% endalertbox %}

{% alertbox question %}
Alert Box: **Question**
{% endalertbox %}

### Tag Plugin: Blockqoute

```
{% blockquote [author[, source]] [link] [source_link_title] %}
```
<br/>
{% blockquote AUTHOR, REFERENCE %}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit lacus ut purus iaculis feugiat. Sed nec tempor elit, quis aliquam neque. Curabitur sed diam eget dolor fermentum semper at eu lorem.
{% endblockquote %}

### Tag Plugin: Include Posts

```
{% post_path filename %}
{% post_link filename [title] [escape] %}
```
<br/>
{% post_path hello-world %}
<br>
{% post_link hello-world %}

### Tag Plugin: Codeblock

```
{% codeblock [title] [lang:language] [url] [link text] [additional options] %}
` ` ` [language] [title] [url] [link text] code snippet ` ` `
```
<br/>
{% codeblock lang:js _.compact http://underscorejs.org/#compact Underscore.js %}
_.compact([0, 1, false, 2, '', 3]);
=> [1, 2, 3]
{% endcodeblock %}

### Tag Plugin: Include Code

Default path: source/downloads/code

```
{% include_code [title] [lang:language] [from:line] [to:line] path/to/file %}
```
<br/>
{% include_code lang:javascript test.js %}

### Tag Plugin: JSFiddle

```
{% jsfiddle shorttag [tabs] [skin] [width] [height] %}
```
<br/>
{% jsfiddle tvxTg html,css,result dark 100% 300 %}

### Tag Plugin: IFrame

```
{% iframe url [width] [height] %}
```
<br/>
{% iframe https://kiko.io/about 100% 300 %}