const utils   = require('hexo-util');

hexo.extend.helper.register('slugify', function(value){
    return utils.slugize(value);
});