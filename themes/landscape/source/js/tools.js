function addStylesheet(url, id) {
  var stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.type = "text/css";
  stylesheet.href = url;

  if (id) {
    stylesheet.setAttribute("id", id);
  }
  document.getElementsByTagName("head")[0].appendChild(stylesheet);
}

function addScriptAsync(url) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;

    script.addEventListener(
      "load",
      function () {
        resolve(script);
      },
      false
    );

    script.addEventListener(
      "error",
      function () {
        reject(script);
      },
      false
    );

    document.getElementsByTagName("head")[0].appendChild(script);
  });
}

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

//https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying ' + text + ' was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}

/* https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript */
function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'key';
          } else {
              cls = 'string';
          }
      } else if (/true|false/.test(match)) {
          cls = 'boolean';
      } else if (/null/.test(match)) {
          cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
  });
}

/* downupPopup Dialog */
var dpDialog = {
  'base': {
    'element': null,
    'content': null,
    'options': {
      animation: "ease",
      duration: 400,
      radiusLeft: "4px",
      radiusRight: "4px",
      width: "100%",
      contentScroll: false,
      contentTransparency: 1
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
      } else { // reset existing
        dpDialog.base.element.downupPopup("close");
        dpDialog.base.content.empty();
        dpDialog.base.content.attr("style", "");
      }

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
    'show': function() {
      setTimeout(() => {
        dpDialog.base.element.downupPopup("open");
      }, 100);  
    }
  },
  'pageMeta': function() {
    dpDialog.base.init({
      headerText: "Page Meta",
      contentScroll: true,
      distance: 6
    });

    // CONTENT
    let json = JSON.parse($('script[type="application/ld+json"]').text());

    let secVisual = $('<section></section>').appendTo(dpDialog.base.content);
    let tIntroduction = `
      <p style="margin-bottom: 20px; font-style: italic;">
        This is a visual representation of the metadata for this page, included as JSON-LD. 
        For more information on this topic, see my post 
        <a href="https://kiko.io/post/Provide-Blog-Metadata-via-JSON-LD/">Provide Blog Metadata via JSON-LD</a> and the raw metadata below.
      </p>
    `;
    secVisual.append(tIntroduction);
    
    let state = "open";
    //---
    let jArticle = json["@graph"].filter(x => x["@type"] === "Article");
    if (jArticle.length > 0) {
      let jImage = json["@graph"].filter(x => x["@id"] === jArticle[0].image["@id"]);
      let jAuthor = json["@graph"].filter(x => x["@id"] === jArticle[0].author["@id"]);
      let jPublisher = json["@graph"].filter(x => x["@id"] === jArticle[0].publisher["@id"]);
      let tArticle = getArticle(state, jArticle[0], jAuthor[0], jPublisher[0], jImage[0]);
      state = "";
      secVisual.append($(tArticle));
    }
    //--
    let jBlogPosting = json["@graph"].filter(x => x["@type"] === "BlogPosting");
    if (jBlogPosting.length > 0) {
      let jAuthor = json["@graph"].filter(x => x["@id"] === jBlogPosting[0].author["@id"]);
      let jPublisher = json["@graph"].filter(x => x["@id"] === jBlogPosting[0].publisher["@id"]);
      let tBlogPosting = getBlogPosting(state, jBlogPosting[0], jAuthor[0], jPublisher[0]);
      state = "";
      secVisual.append($(tBlogPosting));
    }
    //--
    let jWebPage = json["@graph"].filter(x => x["@type"] === "WebPage");
    let jPhoto = json["@graph"].filter(x => x["@id"] === jWebPage[0].image["@id"]);
    let tWebPage = getWebPage(state, jWebPage[0], jPhoto[0]);
    secVisual.append($(tWebPage));
    //--
    let jWebSite = json["@graph"].filter(x => x["@type"] === "WebSite");
    let jPublisher = json["@graph"].filter(x => x["@id"] === jWebSite[0].publisher["@id"]);
    let tWebSite = getWebSite(jWebSite[0], jPublisher[0]);
    secVisual.append($(tWebSite));
    //--
    let jOrganization = json["@graph"].filter(x => x["@type"] === "Organization");
    let tOrganization = getOrganization(jOrganization[0]);
    secVisual.append($(tOrganization));
    //--
    let jPerson = json["@graph"].filter(x => x["@type"] === "Person");
    let tPerson = getPerson(jPerson[0]);
    secVisual.append($(tPerson));

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
              <figcaption>(Social Media Image)</figcaption>
            </figure>
          </div>
        </details>
      `;
    }
    function getBlogPosting(state, post, person, organization) {
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
    };
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
