(function($){

  // var resources = window.performance.getEntriesByType("resource");
  // resources.forEach(function (resource) {
  //   if (!resource.name.startsWith(document.location.href))
  //     console.log(resource.name + " : " + (resource.domainLookupEnd - resource.domainLookupStart));
  // });

  //Scroll Header
  var header = {
    height: 0,
    top: 0,
    offset: 60,
    photoLinkOpacity: 0,
    titleFontSize: 0
  };

  function initHeader() {
    $("#header").css("height", ""); //reset inline css
    $("#header-title").css("top", "");
    $("#header-photo-link").css("opacity", "");
    $("#title-wrap").css("font-size", "");
    header.height = $("#header").height(); //set from given css
    header.top = parseFloat($("#header-title").css("top"));
    header.photoLinkOpacity = parseFloat($("#header-photo-link").css("opacity"));
    header.titleFontSize = parseFloat($("#title-wrap").css("font-size"));
    scrollHeader();
  }

  function scrollHeader() {
    var h = header.height - header.offset,
        st = $(document).scrollTop(),  
        d = (h - st),
        p = (d / h),
        hfs = header.titleFontSize / 5 * 3,
        jSide = $("aside");
    if (d > 0) {
      $("#header").css("height", d + header.offset + "px");
      $("#header-photo-link, #header-photo-expand").css("opacity", header.photoLinkOpacity * p);
      $("#banner").css("opacity", p);
      $("#title-wrap").css("font-size", header.titleFontSize - ( header.titleFontSize / 3) * (1 - p) );
      $("#header-title").css("top", header.top - (hfs * (1 - p)) + "px");
      $("#subtitle").css("opacity", p);
      jSide.css("max-width", "").css("position", "").css("top", "");
    } else {
      $("#header").css("height", header.offset + "px");
      $("#header-photo-link, #header-photo-expand").css("opacity", 0);
      $("#banner").css("opacity", 0);
      $("#title-wrap").css("font-size", header.titleFontSize - ( header.titleFontSize / 3) * (1) );      
      $("#header-title").css("top", header.top - (hfs * (1)) + "px");      
      $("#subtitle").css("opacity", 0);
      if (window.matchMedia("screen and (min-width: 768px)").matches & window.innerHeight > (jSide.height() + 60)) {
        jSide.css("max-width", $("aside").width()).css("position", "fixed").css("top", "60px");
      }
    }    
  }
  // Scroll-In Header Image
  function isVisibleInViewPort(e) {
    var viewTop = $(window).scrollTop();
    var viewBottom = viewTop + $(window).height();
  
    var eTop = $(e).offset().top;
    var eBottom = eTop + $(e).height();
  
    return ((eBottom <= viewBottom) && (eTop >= viewTop));
  }

  function initViewportArticleImage() {
    $(".article-photo, .archive-article-photo").each(function() {
      if (isVisibleInViewPort($(this))) {
        $(this).addClass("in-view");
      } else {
        $(this).removeClass("in-view");
      }
    });
  }
  
  $(window).on('scroll', function() {
    scrollHeader();
    initViewportArticleImage();
  });

  $(window).on('resize', function() {
    initHeader();
    initViewportArticleImage();
  });

  initHeader();
  initViewportArticleImage();

  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#sub-nav-search').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  // Caption & Image Links
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().is('a')) return;
      if ($(this).parent().hasClass('luminous')) return;

      var alt = this.alt;
      var src = this.src;
      var newSrc = src + "?w=768";
      var newHref = src + "?w=1200";

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).attr("src", newSrc);
      $(this).wrap('<a href="' + newHref + '" title="' + alt + '" class="luminous"></a>');
    });

    $(this).find('.luminous').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  $('a.luminous').each(function(i, el) {
    new Luminous(el);
  });

})(jQuery);

function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}
function setCookie(name, value, days) {
  var d = new Date;
  d.setTime(d.getTime() + 24*60*60*1000*days);
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}
function deleteCookie(name) { setCookie(name, '', -1); }

/* DARK MODE TOGGLE 
 * https://stackoverflow.com/questions/56300132/how-to-over-ride-css-prefers-color-scheme-setting
 */

function detectColorScheme() {
  var theme = "light"; //default

  // get last used theme from local cache
  if(localStorage.getItem("theme")){
      if(localStorage.getItem("theme") === "dark"){
          theme = "dark";
      }
  } else if(!window.matchMedia) { 
      // matchMedia not supported  
      return false;
  } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // OS has set Dark Mode
      theme = "dark";
  }

  // set detected theme
  if (theme === "dark") {
      setThemeDark();
  } else {
      setThemeLight();
  }
}

const toggleTheme = document.querySelector('input#theme-switch[type="checkbox"]');

function setThemeDark() {
  localStorage.setItem('theme', 'dark');
  document.documentElement.setAttribute('data-theme', 'dark');    
  toggleTheme.checked = true;
  setCodepenTheme();
}
function setThemeLight() {
  localStorage.setItem('theme', 'light');
  document.documentElement.setAttribute('data-theme', 'light');  
  toggleTheme.checked = false;
  setCodepenTheme();
}

function setCodepenTheme() {
  //https://codepen.io/kristofzerbe/embed/xxxxx?height=400&default-tab=js,result&theme-id=dark
  var pens = document.getElementsByClassName("codepen");
  for (var i = 0; i < pens.length; i++) {
    var src = pens[i].src;
    const arr = src.split("?");
    const params = arr[1].split("&").slice(0,-1);
    src = arr[0] + "?" + params.join("&") + "&theme-id=" + localStorage.getItem("theme");
    pens[i].src = src;
  }
}

// Listener for theme change by toggle
toggleTheme.addEventListener('change', function(e) {
  if (e.target.checked) {
      setThemeDark();
  } else {
      setThemeLight();
  }
}, false);

// Listener for theme change by OS
var toggleOS = window.matchMedia('(prefers-color-scheme: dark)');
toggleOS.addEventListener('change', function (e) {
  if (e.matches) {
      setThemeDark();
  } else {
      setThemeLight();
  }
});

// call theme detection
detectColorScheme();