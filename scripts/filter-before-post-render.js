hexo.extend.filter.register('before_post_render', function(data) {
  
  if (data.layout === "post" && data.source.startsWith("_posts/")) { // posts only
    console.log(data.slug + ": " + data.photograph.file);

    //TODO: if data.photograph.file is empty: new photoSelector() -> pick(), like on-new-get-photo-for-post
  }
  return data;
});