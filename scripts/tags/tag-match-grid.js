/*
  Match Grid

  Prerequisites
  - SVG files from Wikipedia with with/height:200, stored in statuc/images/logos

  Syntax
  {% match_grid "SV-Wehen-Wiesbaden" "1:1" "Hamburger-SV" %}

*/
hexo.extend.tag.register('match_grid', function (args) {
    
  const [
    hometeam, 
    result,
    guestteam
  ] = args;
  
  var element = `
    <div class="float-matchgrid">
      <img src="/images/logos/${hometeam}.svg" />
      <span>${result}</span>
      <img src="/images/logos/${guestteam}.svg" />
    </div>
  `;
    
  return element;
});