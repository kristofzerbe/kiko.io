const { humanizeNumber, humanizeNumber_de } = require("../../lib/tools.cjs");

hexo.extend.helper.register('convert_periodshort', function(value) {

  let ret = {
    num: parseInt(value.slice(0, -1)),
    unit: value.slice(-1)
  }

  ret.numString = humanizeNumber(ret.num);

  switch (ret.unit) {
    case "y": 
      ret.unitString = "year" + ((ret.num > 1) ? "s" : "");
      ret.days = ret.num * 365; 
      break;
    case "m": 
      ret.unitString = "month" + ((ret.num > 1) ? "s" : "");
      ret.days = ret.num * 30; 
      break;
    case "d": 
      ret.unitString = "day" + ((ret.num > 1) ? "s" : "");
      ret.days = ret.num; 
      break;
    default: break;
  }

  return ret;
});

hexo.extend.helper.register('convert_periodshort_de', function(value) {

  let ret = {
    num: parseInt(value.slice(0, -1)),
    unit: value.slice(-1)
  }

  ret.numString = humanizeNumber_de(ret.num);

  switch (ret.unit) {
    case "y": 
      ret.unitString = "Jahr" + ((ret.num > 1) ? "e" : "");
      ret.days = ret.num * 365; 
      break;
    case "m": 
      ret.unitString = "Monat" + ((ret.num > 1) ? "e" : "");
      ret.days = ret.num * 30; 
      break;
    case "d": 
      ret.unitString = "Tag" + ((ret.num > 1) ? "e" : "");
      ret.days = ret.num; 
      break;
    default: break;
  }

  return ret;
});
