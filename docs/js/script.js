//(function($){ -> makes it impossible to call a function from below

  // var resources = window.performance.getEntriesByType("resource");
  // resources.forEach(function (resource) {
  //   if (!resource.name.startsWith(document.location.href))
  //     console.log(resource.name + " : " + (resource.domainLookupEnd - resource.domainLookupStart));
  // });

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
    $(this).find('img:not(.image-compare)').each(function(){
      if ($(this).parent().is('a')) return;

      $(this).addClass("zoom");

      var alt = this.alt;
      if (alt) $(this).after('<span class="caption">' + alt + '</span>');
    });
  });

  // Init Anchor List Items  
  $('body.article-view ul.anchorlist li').each(function(i, el) {
    var anchor = $(this).data("anchor");
    var text = $(this).text();
    el.innerHTML = '<a href="' + anchor + '">' + text + '</a>';
  });

  initScrollAnchorLink();

//})(jQuery);

function initPermalink(postId) {
  let wrapper = document.querySelector("#article-permalink-" + postId);
  let input = wrapper.querySelector("input.article-permalink-value");
  let copy = wrapper.querySelector("a.action-copy");
  let share = wrapper.querySelector("a.action-share");

  input.disabled = true;

  copy.addEventListener("click", event => {
    input.disabled = false;
    input.select();
    document.execCommand("copy");
    input.blur();
    input.disabled = true;

    var permalink = input.value;
    input.classList.add("fade-out-500");
    setTimeout(function(){
        input.value = "copied to clipboard";
        input.classList.remove("fade-out-500");
        input.classList.add("fade-in-1000");
        setTimeout(function() {
            input.classList.add("fade-out-500");
            setTimeout(function() {
                input.value = permalink;
                input.classList.remove("fade-out-500");
                setTimeout(function() {
                    input.classList.remove("fade-in-1000");
                }, 500);
            }, 500);
        }, 2000);
    }, 500);
  });

  if (navigator.share === undefined) {
    share.style.display = "none";
  } else {
    share.addEventListener("click", event => {
      navigator.share({
        title: input.dataset.title,
        url: input.value,
      })
    });
  }

}

function initScrollAnchorLink() {
  /* Smooth scroll to anchor link
  * Automatically detects the hash and scroll smoothly to anchor link with URL hashchange
  * Author: Franco Moya - @iamravenous
  */
  // If you need more autonomy, 
  // You can replace hash detection with a data-attribute
  // e.g. $("[data-scroll='smooth']")
  $("a[href*='#']:not([href='#'])").click(function(e) {
    e.preventDefault();
    var hash = this.hash;
    var section = $(hash);

    if (hash) { 
      $('html, body').animate({
        scrollTop: section.offset().top - 40
      }, 1000, 'swing', function(){
        history.replaceState({}, "", hash);
      });
    }
  });
}

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

function showFullScreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  }
  else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
  else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  }
  else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else {
    console.log("Fullscreen API is not supported");
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