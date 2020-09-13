(function($){

  //Swipe Events
  // delete Hammer.defaults.cssProps.userSelect;

  //MOBILE MENU SWIPE
  // https://stackoverflow.com/questions/24163202/javascript-touch-movement-track-when-user-swipes-from-edges
  // https://github.com/hammerjs/hammer.js/issues/1065
  // $("#container").hammer({ inputClass: Hammer.TouchInput }).on('swiperight', function (e) {
  //   var endPoint = e.gesture.pointers[0].pageX;
  //   var distance = e.gesture.distance;
  //   var origin = endPoint - distance;
  //   // console.log(origin);
  //   if (origin <= 15) {
  //     // They swiped, starting from no more than 15px away from the edge. 
  //     if ($('#main-nav-toggle').is(':visible')) {
  //       if (isMobileNavAnim) return;
  //       startMobileNavAnim();
  //       $container.toggleClass('mobile-nav-on');
  //       stopMobileNavAnim();  
  //     }
  //   } else {
  //     var ePrev = $("#article-nav-older");
  //     if (ePrev.length) {
  //       console.log(ePrev.attr('href'));
  //       //window.location.href = ePrev.attr('href');
  //       Barba.Pjax.goTo(ePrev.attr('href'));
  //     }
  //   }
  // }); 

  //SWIPE NEXT (Doesn't work...!?)
  // $("#container").hammer({ inputClass: Hammer.TouchInput }).on('swipeleft', function (e) {
  //   var eNext = $("#article-nav-newer");
  //   if (eNext.length) {
  //     console.log(eNext.attr('href'));
  //     //window.location.href = eNext.attr('href');
  //     Barba.Pjax.goTo(eNext.attr('href'));
  //   }
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
      $("#header-photo-link").css("opacity", header.photoLinkOpacity * p);
      $("#banner").css("opacity", p);
      $("#title-wrap").css("font-size", header.titleFontSize - ( header.titleFontSize / 3) * (1 - p) );
      $("#header-title").css("top", header.top - (hfs * (1 - p)) + "px");
      $("#subtitle").css("opacity", p);
      jSide.css("max-width", "").css("position", "").css("top", "");
    } else {
      $("#header").css("height", header.offset + "px");
      $("#header-photo-link").css("opacity", 0);
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