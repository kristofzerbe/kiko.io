const log = require("hexo-log")({ debug: false, silent: false });
const { green, red } = require("chalk");
const { isInternetAvailable } = require('is-internet-available');

hexo.on('ready', async function(){

  const isOnline = await isInternetAvailable();
  hexo.status = isOnline ? "online" : "offline";

  let statusColor = isOnline ? green : red;
  log.info("Hexo is " + statusColor(hexo.status.toUpperCase()));

});
