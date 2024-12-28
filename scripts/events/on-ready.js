const log = require("hexo-log")({ debug: false, silent: false });
const { red } = require("chalk");
const { isInternetAvailable } = require('is-internet-available');

hexo.on('ready', async function(){
  log.info(red(">>> ready ------------------------------------------------------"));

  hexo.status = {
    online: await isInternetAvailable()
  };

  // console.log(hexo);
  console.log(this.env);
  console.log(this.status);

});
