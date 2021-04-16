// from https://github.com/Jamling/hexo-generator-github/blob/master/index.js

//??? Executes Generator, but no output is produced

const log = require('hexo-log')({ debug: false, silent: false });

hexo.extend.console.register("trello-collections", "Generate Trello collections", {
    options: [
        { name: '-r, --replace', desc: 'Replace existing files' }
    ]
}, function (args) {
    var _self = this;

    var opt = {};
    if (args.r || args.replace) {
        opt.replace = true;
    }
    
    return this.load();
    
    //??? why is this not necessary? Generator runs without it !?
    // .then(function () {
    //   var generator = _self.extend.generator.list()["collections"];
  
    //   var locals = _self.locals.toObject();
    //   hexo.log.info("Call Generator");
    //   generator.call(_self, locals, opt);
  
    // });

  });