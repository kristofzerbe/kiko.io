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
    el.innerHTML = '<a href="' + anchor + '">' + htmlencode(text) + "</a>";
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

function initScrollAnchorLink(selector, offset) {
  /* Smooth scroll to anchor link
   * Automatically detects the hash and scroll smoothly to anchor link with URL hashchange
   * Author: Franco Moya - @iamravenous
   */
  // If you need more autonomy,
  // You can replace hash detection with a data-attribute
  // e.g. $("[data-scroll='smooth']")
  if (!selector) { selector = "a[href^='#']:not([href='#'])"; }
  $(selector).click(function (e) {
    e.preventDefault();
    var hash = this.hash;
    var section = $(hash);

    if (hash) {
      $("html, body").animate(
        {
          scrollTop: section.offset().top - (offset ?? 40),
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
  $(".article-photo, .panel-photo, .img-link, .card-img").each(function() { //.card-img, 
    if (isVisibleInViewPort($(this))) {
      $(this).addClass("in-view");
    } else {
      $(this).removeClass("in-view");
    }
  });
}

/** ============================================================ */

function ensureIconLinkText() {
  let linksWithoutText = document.querySelectorAll("a[href^='http']:empty");
  linksWithoutText.forEach(e => {
    if (window.getComputedStyle(e).display !== "none") {
      if (e.title) {
        let eText = document.createElement("span");
        eText.innerText = e.title;
        eText.classList.add("visually-hidden");
        e.append(eText);
      } else {
        console.error("Link without Text and Title: " + e.outerHTML);
      }
    }
  });
} 

/** ============================================================ */

//HEADER
var header = {
  height: 0,
  top: 0,
  offset: 55,
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
    if (window.matchMedia("screen and (min-width: 768px)").matches & window.innerHeight > (jSide.height() + 50)) {
      jSide.css("max-width", $("aside").width()).css("position", "fixed").css("top", "50px");
    }
  }
}

/** ------------------------------------------------------------ */

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

async function setVibrantColor(theme) {
  if(!$("#header").hasClass("no-vibrant")) {
    try {
      let img = $("#photo-preload").attr("href");
      let file = img.substr(img.lastIndexOf('/') + 1);
      let color;

      //get color from substiution list by file
      const response = await fetch('/photo-color-substitutions.json');
      const subst = await response.json();
      color = subst.find(obj => { return obj.file === file; })?.hex;

      if (!color) {
        await Vibrant.from(img).getPalette().then(palette => {
          let swatch = palette.DarkVibrant; //[|Dark|Light]Muted, [|Dark|Light]Vibrant
          color = swatch.getHex();
        });
      }

      if (theme === "dark") { 
        color = tinycolor(color).darken(10).toHexString();; 
      }

      let color1Factor = 0;
      let color2Factor = 25;
      if (theme === "dark") { 
          color1Factor = 50;
          color2Factor = 15;
      }

      $(":root").css("--color-accent", color);
      $(":root").css("--color-accent1", tinycolor(color).brighten(color1Factor).toHexString())
      $(":root").css("--color-accent2", tinycolor(color).brighten(color2Factor).toHexString())
      document.querySelector('meta[name="theme-color"]').setAttribute("content", color);

    } catch (error) { }
  }
}

/** ============================================================ */

function bindWebmentionSending(formName) {

  function submitWebmention(e) {
    e.preventDefault();
   
    var wmForm = document.getElementsByName(formName)[0];
    var wmData = new FormData(wmForm);

    //DEBUG
    // let dataElement = document.createElement("pre");
    // var wmObject = {};
    // wmData.forEach(function(value, key) { wmObject[key] = value; });
    // dataElement.innerHTML = JSON.stringify(wmObject, null, 2);
    // wmForm.replaceWith(dataElement);
    // return;

    let resElement = document.createElement("div");
    resElement.classList.add("alertbox");
    resElement.classList.add("no-block");
  
    fetch(wmForm.action, {
      method: wmForm.method,
      body: wmData,
    })
    .then(response => {
      if (!response.ok) {
        resElement.classList.add("alertbox-warning");
        resElement.innerHTML = `<p>Network returns an error</p>`;
        wmForm.replaceWith(resElement);
      }
      return response.json();
    })
    .then((resJson) => {
      resElement.classList.add("alertbox-success");
      //DEBUG: resElement.innerHTML = `<pre>${JSON.stringify(resJson, null, 2)}</pre>`;
      // console.log(JSON.stringify(resJson, null, 2));
      if (resJson && resJson.summary) {
        resElement.innerHTML = `
          <p><strong>Thank you!</strong> ${resJson.summary}</p>
          <p><a href="${resJson.location}" target="blank">See result data...</a></p>
        `;
      } else {
        resElement.innerHTML = `<p><strong>Thank you!</strong>`;
      }
      wmForm.replaceWith(resElement);
    })
    .catch((error) => {
      resElement.classList.remove("alertbox-success");
      resElement.classList.add("alertbox-warning");
      resElement.innerHTML = `<p>${error}</p>`;
      wmForm.replaceWith(resElement);
    });
  }

  var myform = document.getElementsByName(formName)[0];
  myform.addEventListener("submit", submitWebmention);
}

/** ============================================================ */
