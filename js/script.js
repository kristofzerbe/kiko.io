function initImageZoom() {
  $(".article-entry").each(function (i) {
    $(this)
      .find("img")
      .each(function () {
        if ($(this).parent().is("a")) return;
  
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

function initAnchorListItems() {
  $("body.article-view ul.anchorlist li").each(function (i, el) {
    var anchor = $(this).data("anchor");
    var text = $(this).text();
    el.innerHTML = '<a href="' + anchor + '">' + text + "</a>";
  });  
}
initAnchorListItems();

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