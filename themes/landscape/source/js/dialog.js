/* downupPopup Dialog */
var dpDialog = {
  'base': {
    'element': null,
    'content': null,
    'options': {
      animation: "ease",
      duration: 400,
      background: true,
      radiusLeft: "4px",
      radiusRight: "4px",
      distance: 20, // overruled by 'minContentHeight'
      minContentHeight: null, // overrules 'distance'
      width: "100%",
      contentScroll: false,
      urlHash: null,
      contentTransparency: 1 // dialog-only
    },
    'init': function(options) {
      let opt = {...dpDialog.base.options, ...options};

      if ($("#dpElement").length === 0) { 
        // create new
        dpDialog.base.element = $(`
          <div id="dpElement">
            <div class="downupPopup-content"></div>
          </div>`);
          dpDialog.base.element.appendTo("body");
          dpDialog.base.content = dpDialog.base.element.find(".downupPopup-content");      
      } else { 
        // reset existing
        dpDialog.base.element.downupPopup("close");
        dpDialog.base.content.empty();
        dpDialog.base.content.attr("style", "");
      }

      // set background color from options
      dpDialog.base.content.css("background-color", function (index, current) {
        let rgb = current.replace(/[^\d.,%]/g, '').split(',');
        let data = { 
          red: parseInt(rgb[0]), 
          green: parseInt(rgb[1]), 
          blue: parseInt(rgb[2]), 
          alpha: (rgb[3]) ? parseFloat(rgb[3]) : dpDialog.base.options.contentTransparency 
        };
        if (options.contentTransparency) {
          data.alpha = options.contentTransparency;
        }
        let color = `rgba(${data.red}, ${data.green}, ${data.blue}, ${data.alpha})`;
        dpDialog.base.content.css("background-color", color);
      });

      dpDialog.base.element.downupPopup(opt);
    },
    'show': function(callback) {
      setTimeout(() => {
        dpDialog.base.element.downupPopup("open");
        if (typeof callback === "function") callback();
      }, 100);  
    }
  },
  'pageMeta': function() {
    dpDialog.base.init({
      headerText: "Page Meta",
      urlHash: "meta",
      contentScroll: true,
      distance: 6,
      width: "min(960px, 100%)"
    });

    // CONTENT

    //>> Meta
    let excerptElm = document.querySelector("meta[name='excerpt']");
    if (excerptElm) {
      let secMeta = $('<section></section>').appendTo(dpDialog.base.content);
      secMeta.append(`<label>Excerpt:</label><p style="white-space: pre-line;">${excerptElm.getAttribute("content")}</p>`);
      $('<hr class="divider" style="margin:8px 0">').appendTo(dpDialog.base.content);
    }

    //>> JSONLD
    let json = JSON.parse($('script[type="application/ld+json"]').text());

    let secJSONLD = $('<section></section>').appendTo(dpDialog.base.content);
    let tIntroduction = `
      <p style="margin-bottom: 20px; font-style: italic;">
        Following data are a visual representation of the metadata for this page, included as JSON-LD. 
        For more information on this topic, see my post 
        <a href="https://kiko.io/post/Provide-Blog-Metadata-via-JSON-LD/">Provide Blog Metadata via JSON-LD</a> and the raw metadata below.
      </p>
    `;
    secJSONLD.append(tIntroduction);
    
    let state = "open";
    //---
    let jArticle = json["@graph"].filter(x => x["@type"] === "Article");
    if (jArticle.length > 0) {
      let jImage = json["@graph"].filter(x => x["@id"] === jArticle[0].image["@id"]);
      let jAuthor = json["@graph"].filter(x => x["@id"] === jArticle[0].author["@id"]);
      let jPublisher = json["@graph"].filter(x => x["@id"] === jArticle[0].publisher["@id"]);
      let tArticle = getArticle(state, jArticle[0], jAuthor[0], jPublisher[0], jImage[0]);
      state = "";
      secJSONLD.append($(tArticle));
    }
    //--
    let jBlogPosting = json["@graph"].filter(x => x["@type"] === "BlogPosting");
    if (jBlogPosting.length > 0) {
      let jImage = json["@graph"].filter(x => x["@id"] === jBlogPosting[0].image["@id"]);
      let jAuthor = json["@graph"].filter(x => x["@id"] === jBlogPosting[0].author["@id"]);
      let jPublisher = json["@graph"].filter(x => x["@id"] === jBlogPosting[0].publisher["@id"]);
      let tBlogPosting = getBlogPosting(state, jBlogPosting[0], jAuthor[0], jPublisher[0], jImage[0]);
      state = "";
      secJSONLD.append($(tBlogPosting));
    }
    //--
    let jWebPage = json["@graph"].filter(x => x["@type"] === "WebPage");
    let jPhoto = json["@graph"].filter(x => x["@id"] === jWebPage[0].image["@id"]);
    let tWebPage = getWebPage(state, jWebPage[0], jPhoto[0]);
    secJSONLD.append($(tWebPage));
    //--
    let jWebSite = json["@graph"].filter(x => x["@type"] === "WebSite");
    let jPublisher = json["@graph"].filter(x => x["@id"] === jWebSite[0].publisher["@id"]);
    let tWebSite = getWebSite(jWebSite[0], jPublisher[0]);
    secJSONLD.append($(tWebSite));
    //--
    let jOrganization = json["@graph"].filter(x => x["@type"] === "Organization");
    let tOrganization = getOrganization(jOrganization[0]);
    secJSONLD.append($(tOrganization));
    //--
    let jPerson = json["@graph"].filter(x => x["@type"] === "Person");
    let tPerson = getPerson(jPerson[0]);
    secJSONLD.append($(tPerson));

    let secCode = $('<section></section>').appendTo(dpDialog.base.content);
    secCode.append('<h1>JSON-LD</h1>');
    secCode.append('<pre class="json">' + syntaxHighlight(JSON.stringify(json, undefined, 2))) + '</pre>';

    dpDialog.base.show();

    // HELPER
    function getArticle(state, article, person, organization, image) {
      let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      let datePublished = new Date(article.datePublished).toLocaleDateString("en-US", dateOptions);
      let dateModified = new Date(article.dateModified).toLocaleDateString("en-US", dateOptions);

      return `
        <details ${state}>
          <summary>&nbsp;Article</summary>
          <div>
            <label>Headline</label>
            <h3>${article.headline}</h3>
            <label>Description</label>
            <p>${article.description}</p>
            <label>Published</label>
            <p>${datePublished}</p>
            <label>Modified</label>
            <p>${dateModified}</p>
            <label>Author</label>
            <p>${person.name}</p>
            <label>Publisher</label>
            <p>${organization.name}</p>
            <label>Image</label>
            <figure>
              <img src="${image.contentUrl}" />
              <figcaption>${image.contentUrl}</figcaption>
            </figure>
          </div>
        </details>
      `;
    }
    function getBlogPosting(state, post, person, organization, image) {
      let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      let datePublished = new Date(post.datePublished).toLocaleDateString("en-US", dateOptions);
      let dateModified = new Date(post.dateModified).toLocaleDateString("en-US", dateOptions);

      return `
        <details ${state}>
          <summary>&nbsp;Blog Posting (Note)</summary>
          <div>
            <label>Headline</label>
            <h3>${post.headline}</h3>
            <label>Published</label>
            <p>${datePublished}</p>
            <label>Modified</label>
            <p>${dateModified}</p>
            <label>Author</label>
            <p>${person.name}</p>
            <label>Publisher</label>
            <p>${organization.name}</p>
            <label>Image</label>
            <figure>
              <img src="${image.contentUrl}" />
              <figcaption>${image.contentUrl}</figcaption>
            </figure>
          </div>
        </details>
      `;
    }
    function getWebPage(state, webpage, photo) {
      return `
        <details ${state}>
          <summary>&nbsp;WebPage</summary>
          <div>
            <label>Name</label>
            <h3>${webpage.name}</h3>
            <label>Description</label>
            <p>${webpage.description}</p>
            <label>Language</label>
            <p>${webpage.inLanguage}</p>
            <label>URL</label>
            <a href="${webpage.url}" target="_blank">${webpage.url}</a>
            <label>Photo</label>
            <figure>
              <img src="${photo.contentUrl}" />
            </figure>
            <label>Photo Name</label>
            <p>${photo.caption}</p>
            <label>Photo Copyright</label>
            <p>${photo.copyrightNotice}</p>
            <label>Photo License Page</label>
            <a href="${photo.acquireLicensePage}" target="_blank">${photo.acquireLicensePage}</a>
            <label>Photo URL</label>
            <a href="${photo.url}" target="_blank">${photo.url}</a>
            <label>Photo Discussion URL</label>
            <a href="${photo.discussionUrl}" target="_blank">${photo.discussionUrl}</a>
          </div>
        </details>
      `;
    }
    function getWebSite(website, organization) {
      return `
        <details>
          <summary>&nbsp;WebSite</summary>
          <div>
            <label>Name</label>
            <p>${website.name}</p>
            <label>Description</label>
            <p>${website.description}</p>
            <label>Language</label>
            <p>${website.inLanguage}</p>
            <label>Publisher</label>
            <p>${organization.name}</p>
          </div>
        </details>
      `;
    }
    function getOrganization(organization) {
      return `
        <details>
          <summary>&nbsp;Organization</summary>
          <div>
            <label>Name</label>
            <p>${organization.name}</p>
            <label>Logo</label>
            <img src="${organization.logo}" />
        </div>
        </details>
      `;
    }
    function getPerson(person) {
      let sameAsList = "";
      for (let i = 0; i < person.sameAs.length; i++) {
        sameAsList += `<li><a href="${person.sameAs[i]}">${person.sameAs[i]}</a></li>`;
      }
      return `
        <details>
          <summary>&nbsp;Person</summary>
          <div>
            <label>Name</label>
            <p>${person.name}</p>
            <label>Image</label>
            <img src="${person.image}" />
            <label>URL</label>
            <a href="${person.url}" target="_blank">${person.url}</a>
            <label>Same As</label>
            <ul>${sameAsList}</ul>
        </div>
        </details>
    `;
    }

  },
  'contact': function() {
    dpDialog.base.init({
      headerText: "Contact",
      urlHash: "contact",
      minContentHeight: 540,
      width: "min(600px, 100%)",
      contentTransparency: 0.33
    });

    // get content from global template
    let content = document.getElementById("contact-dialog").content.cloneNode(true);    
    let jContent = $(content);

    jContent.find(".contact-card").click(function(e) {
      if(e.target.tagName !== 'A') {
        $(this).toggleClass("is-flipped");
      }
    });
    jContent.appendTo(dpDialog.base.content);

    // Get options and generate qrcode
    (async () => {
      const response = await fetch(document.getElementById('qr-code-styling-options-' + theme).src);
      const options = await response.json();
      let qrCode = new QRCodeStyling(options);
      qrCode.append(document.getElementById("contact-qrcode"));      
    })(); //immediately invoked async function
    
    dpDialog.base.show();
  },
  'shareOnMastodon': function() {
    dpDialog.base.init({
      headerText: "Share on Mastodon",
      urlHash: "share",
      minContentHeight: 475,
      width: "min(600px, 100%)"
    });

    let content = document.getElementById("mastodon-share-dialog").content.cloneNode(true);
    let jContent = $(content);

    let instance = getCookie("mastodon-instance");
    if (instance) {
      jContent.find("#mastodon-instance").val(instance);
    }

    const title = document.querySelector('meta[name="title"]').content.replace(" - kiko.io", "");
    const subtitle = document.querySelector('meta[name="description"]').content;
    const text = document.querySelector('meta[name="excerpt"]')?.content;
    const permalink = document.querySelector('link[rel="canonical"]').href;

    let textarea = jContent.find("#mastodon-text");
    let count = jContent.find("#mastodon-text-count");
    textarea.on('input propertychange', function (e) {
      count[0].innerHTML = e.target.value.length;
    });
    textarea.val(title + "\n\n" + subtitle + "\n\n" + text + "\n\n" + permalink);
    textarea[0].dispatchEvent(new Event('input', { bubbles: true }));

    jContent.find("#mastodon-share").click(function(e) { 
      const eInstance = document.getElementById("mastodon-instance");
      const eText = document.getElementById("mastodon-text");
      
      const isValid = eInstance.reportValidity();
      if (isValid) {
        setCookie("mastodon-instance", eInstance.value, 360);
        let shareUrl = `https://${eInstance.value}/share?text=${encodeURIComponent(eText.value)}`;
        window.open(shareUrl, '_blank');
        dpDialog.base.element.downupPopup("close");
      }
    });

    jContent.appendTo(dpDialog.base.content);

    dpDialog.base.show(function() {
      document.getElementById("mastodon-instance").focus();
    });
  },
  'myFirstTest': function() {
    dpDialog.base.init({
      headerText: "Test",
      distance: 75
    });

    // CONTENT
    let content = `
      <section>
        <p>Lorem ipsum dolor sit amet...</p>
      </section>
    `;
    $(content).appendTo(dpDialog.base.content);

    dpDialog.base.show();
  }
};
window.dialog = dpDialog; // make it globally available
