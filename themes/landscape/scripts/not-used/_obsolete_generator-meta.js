// See: https://github.com/zhuochun/md-writer/wiki/Settings-for-Front-Matters
// Path: scripts/meta.js
// Author: Masayuki Higashino
// License: MIT

// Obsolete?

// hexo.extend.generator.register('meta', function(locals) {
//     var meta = {
//       tags: [],
//       categories: [],
//       posts: [],
//       pages: []
//     };
//     locals.tags.sort('name').each(function(tag) {
//       meta.tags.push(tag.name);
//     });
//     locals.categories.sort('name').each(function(category) {
//       meta.categories.push(category.name);
//     });
//     locals.posts.sort('name').each(function(post) {
//       meta.posts.push({
//         title: post.title,
//         url: encodeURI(post.permalink),
//         date: post.updated.toDate().toISOString() || post.date.toDate().toISOString()
//       });
//     });
//     locals.pages.sort('name').each(function(page) {
//         meta.pages.push({
//           title: page.title,
//           url: encodeURI(page.permalink),
//           date: page.updated.toDate().toISOString() || page.date.toDate().toISOString()
//         });
//       });
//       return {path: 'meta.json', data: JSON.stringify(meta)};
//   });