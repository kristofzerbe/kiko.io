hexo.on('ready', function() {

  this.custom = {};

  // Merge POSTS with NOTES
  this.custom.getAllPosts = () => {

    const posts = this.locals.get('posts').map(e => {
      delete e.prev;
      delete e.next;    
      return shallowClone(e);
    })
  
    const notes = this.locals.get('notes');
  
    const items = [...posts, ... notes];
    return items;
  }

  //https://stackoverflow.com/questions/39875871/how-to-remove-all-getters-and-setters-from-an-object-in-javascript-and-keep-pure
  const shallowClone = (obj) => {
    return Object.keys(obj).reduce((clone, key) => {
      clone[key] = obj[key];
      return clone;
    }, {});
  }

});