(function($){

  //Scroll Header
  var headerHeight = $("#header").height(),
      headerOffset = 60,
      headerPhotoLinkOpacity = parseFloat($("#header-photo-link").css("opacity")),
      headerTitleFontSize = parseFloat($("#title-wrap").css("font-size")),
      headerTop = parseFloat($("#header-title").position().top / ($("#header-title").parent().height()) * 100); //to get top percentage
  function scrollHeader() {
    var h = headerHeight - headerOffset;
    var st = $(document).scrollTop();    
    var d = (h - st);
    if (d > 0) {
      var p = (d / h);
      $("#header").css("height", d + headerOffset + "px");
      $("#header-photo-link").css("opacity", headerPhotoLinkOpacity * p);
      $("#banner").css("opacity", p);
      $("#title-wrap").css("font-size", headerTitleFontSize - ( headerTitleFontSize / 3) * (1 - p) );
      $("#header-title").css("top", headerTop - (20 * (1 -p)) + "%"); //TODO: mobile top...
      $("#subtitle-wrap").css("opacity", p);
    } else {
      $("#header").css("height", headerOffset + "px");
      $("#header-photo-link").css("opacity", 0);
      $("#banner").css("opacity", 0);
      $("#subtitle-wrap").css("opacity", 0);
    }    
  }
  scrollHeader();
  $(window).scroll(function() {
    scrollHeader();
  });

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

  $('#nav-search-btn').on('click', function(){
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

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  };

  // https://stackoverflow.com/questions/24163202/javascript-touch-movement-track-when-user-swipes-from-edges
  // https://github.com/hammerjs/hammer.js/issues/1065
  $("#container").hammer().on('swiperight', function (e) {
    var endPoint = e.gesture.pointers[0].pageX;
    var distance = e.gesture.distance;
    var origin = endPoint - distance;
console.log(origin);
    if (origin <= 15) {
        // They swiped, starting from no more than 15px away from the edge. 
        if ($('#main-nav-toggle').is(':visible')) {
          if (isMobileNavAnim) return;
          startMobileNavAnim();
          $container.toggleClass('mobile-nav-on');
          stopMobileNavAnim();  
        }
      }
  });  

  $('#main-nav-toggle').on('click', function(){
    if (isMobileNavAnim) return;
    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });
})(jQuery);