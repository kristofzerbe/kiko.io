const S = require('string');

hexo.extend.helper.register('slugify', function(value){
    return S(value).slugify().s;
});