/*
  Small Link

  Syntax
  {% small_link [pre_text] [link_text] [url] [post_text] %}
*/

hexo.extend.tag.register("small_link", function(args, content){

  let [
    preText,
    linkText,
    url,
    postText
  ] = args;

  preText ??= "";
  postText ??= "";

  var element = `
    <small class="link">${preText} <a href="${url}">${linkText}</a> ${postText}</small>
  `;

  return element;
});