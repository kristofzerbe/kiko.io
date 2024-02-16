function initImageZoom() {
  $(".article-entry").each(function (i) {
    $(this)
      .find("img")
      .each(function () {
        if ($(this).parent().is("a")) return;
        if ($(this).parent().is("figure")) return;
  
        if (!$(this).hasClass("no-zoom")) {
          $(this).addClass("zoom");
        }
  
        if (!$(this).hasClass("no-caption")) {
          var alt = this.alt;
          if (alt) $(this).after('<span class="caption">' + alt + "</span>");  
        }
      });
  });  
}
initImageZoom();

/** ============================================================ */

function initAnchorListItems() {
  $("body.article-view ul.anchorlist li").each(function (i, el) {
    var anchor = $(this).data("anchor");
    var text = $(this).text();
    el.innerHTML = '<a href="' + anchor + '">' + text + "</a>";
  });  
}
initAnchorListItems();

/** ============================================================ */

function initPermalink(postId) {
  let wrapper = document.querySelector("#article-permalink-" + postId);
  let input = wrapper.querySelector("input.article-permalink-value");
  let copy = wrapper.querySelector("a.action-copy");
  let share = wrapper.querySelector("a.action-share");

  input.disabled = true;

  copy.addEventListener("click", (event) => {
    input.disabled = false;
    input.select();
    document.execCommand("copy");
    input.blur();
    input.disabled = true;

    var permalink = input.value;
    input.classList.add("fade-out-500");
    setTimeout(function () {
      input.value = "copied to clipboard";
      input.classList.remove("fade-out-500");
      input.classList.add("fade-in-1000");
      setTimeout(function () {
        input.classList.add("fade-out-500");
        setTimeout(function () {
          input.value = permalink;
          input.classList.remove("fade-out-500");
          setTimeout(function () {
            input.classList.remove("fade-in-1000");
          }, 500);
        }, 500);
      }, 2000);
    }, 500);
  });

  if (navigator.share === undefined) {
    share.style.display = "none";
  } else {
    share.addEventListener("click", (event) => {
      navigator.share({
        title: input.dataset.title,
        url: input.value,
      });
    });
  }
}

/** ============================================================ */

function initScrollAnchorLink() {
  /* Smooth scroll to anchor link
   * Automatically detects the hash and scroll smoothly to anchor link with URL hashchange
   * Author: Franco Moya - @iamravenous
   */
  // If you need more autonomy,
  // You can replace hash detection with a data-attribute
  // e.g. $("[data-scroll='smooth']")
  $("a[href^='#']:not([href='#'])").click(function (e) {
    e.preventDefault();
    var hash = this.hash;
    var section = $(hash);

    if (hash) {
      $("html, body").animate(
        {
          scrollTop: section.offset().top - 40,
        },
        1000,
        "swing",
        function () {
          history.replaceState({}, "", hash);
        }
      );
    }
  });
}
initScrollAnchorLink();

/** ============================================================ */

function isVisibleInViewPort(e) {
  var viewTop = $(window).scrollTop();
  var viewBottom = viewTop + $(window).height();

  var eTop = $(e).offset().top;
  var eBottom = eTop + $(e).height();

  return ((eBottom <= viewBottom) && (eTop >= viewTop));
}
function initImageViewportVisibility() {
  $(".article-photo, .archive-article-photo, .img-link").each(function() { //.card-img, 
    if (isVisibleInViewPort($(this))) {
      $(this).addClass("in-view");
    } else {
      $(this).removeClass("in-view");
    }
  });
}

/** ============================================================ */

function initScrollProgress() {

  // Create ScrollTimeline
  const myScrollTimeline = new ScrollTimeline({
    source: document.scrollingElement,
    scrollSource: document.scrollingElement, // For legacy implementations
    orientation: 'block',
      scrollOffsets: [
          new CSSUnitValue(0, 'percent'),
          new CSSUnitValue(100, 'percent'),
      ],
  });

  // Animate Progress Bar on Scroll
  document.querySelector("#progress").animate(
    {
      transform: ["scaleX(0)", "scaleX(1)"]
    },
    { 
      duration: 1, 
      fill: "forwards", 
      timeline: myScrollTimeline 
    }
  );
}

/** ============================================================ */

function initNavMenuScroll() {
  const nav = document.querySelector('#header-nav');
  const menu = nav.querySelector('.menu');
  const firstMenuItem = menu.querySelector('.menu-item:first-child');
  const lastMenuItem = menu.querySelector('.menu-item:last-child');

  firstMenuItem.setAttribute("data-scim", "start");
  lastMenuItem.setAttribute("data-scim", "end");
  
  let observer = new IntersectionObserver((entries, observer) => { 
    entries.forEach(entry => {

      let scimElement = document.querySelector("#header-nav-" + entry.target.getAttribute("data-scim"));
      if (entry.intersectionRatio != 1) { 
        scimElement.classList.add("show");
      } else {
        scimElement.classList.remove("show");
      }
    });
  }, {threshold: 1});
  
  observer.observe(firstMenuItem);
  observer.observe(lastMenuItem);
}

/** ============================================================ */

const toggleTheme = document.querySelector('input#theme-switch[type="checkbox"]');
toggleTheme.addEventListener("change", function (e) {
  if (e.target.checked) { setTheme("dark"); }
  else { setTheme("light"); }
}, false);

var toggleOS = window.matchMedia("(prefers-color-scheme: dark)");
toggleOS.addEventListener("change", function (e) {
  if (e.matches) { setTheme("dark"); }
  else { setTheme("light"); }
});

function setTheme(theme) {
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
  toggleTheme.checked = (theme === "dark");
  setVibrantColor(theme);
  setCodepenTheme(theme);
}

function setCodepenTheme(theme) {
  //https://codepen.io/kristofzerbe/embed/xxxxx?height=400&default-tab=js,result&theme-id=dark
  var pens = document.getElementsByClassName("codepen");
  for (var i = 0; i < pens.length; i++) {
    var src = pens[i].src;
    const arr = src.split("?");
    const params = arr[1].split("&").slice(0, -1);
    src = arr[0] + "?" + params.join("&") + "&theme-id=" + theme;
    pens[i].src = src;
  }
}

function setVibrantColor(theme) {
  if(!$("#header").hasClass("no-vibrant")) {
    try {
      let img = $("#photo-preload").attr("href");
      Vibrant.from(img).getPalette().then(palette => {
        
        let swatch = palette.DarkVibrant; //[|Dark|Light]Muted, [|Dark|Light]Vibrant

        let color = swatch.getHex();
        let colorDark = tinycolor(color).darken(10).toHexString();

        if (theme === "dark") { color = colorDark; }
        
        $("#header, #footer, #back-to-top").css("background-color", color);
        $(":root").css("--color-link", color);
        $(":root").css("--dark-color-link", tinycolor(color).brighten(50).toHexString())
        
      });
    } catch (error) {
    }
  }
}

/** ============================================================ */
