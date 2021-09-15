function dropImageShadow() {
  document.querySelectorAll("img.drop-shadow").forEach(function(item) {
  
    let wrapper = document.createElement("div");
    wrapper.classList.add("shadow-wrapper");
  
    item.classList.forEach(function(c) {
      if (c != "drop-shadow") wrapper.classList.add(c);
    });
    wrapper.style.width = item.clientWidth + "px";
    wrapper.style.height = item.clientHeight + "px";
  
    wrapper.insertAdjacentHTML("beforeend", item.outerHTML);
  
    let shadow = item.cloneNode();
    shadow.classList.remove("drop-shadow");
    shadow.classList.add("shadow");
    wrapper.insertAdjacentHTML("beforeend", shadow.outerHTML);
  
    item.outerHTML = wrapper.outerHTML;
  });
}

function removeImageShadow() {
  document.querySelectorAll("div.shadow-wrapper").forEach(function(wrapper) {
    let image = wrapper.querySelector("img.drop-shadow");
    wrapper.outerHTML = image.outerHTML;
  });
};
