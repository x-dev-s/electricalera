(function (global) {
  "use strict";
  const store = {};
  const linkData = "/data/links.json";
  var Yposition = 0;
  var isSidepanelOpen = false;
  var isallfour = true;
  var shareClickCount = 0;
  var history;
  var Asin;
  var Contents = [];
  var ContentsLocation = [];
  var tiles = document.getElementsByClassName("tiles");
  if (tiles.length === 0) { tiles = document.getElementsByClassName("product"); }
  tiles = Array.from(tiles);
  var section = document.querySelectorAll("footer section");
  section = Array.from(section);
  var video = document.querySelectorAll("video");
  video = Array.from(video);
  var media = document.querySelectorAll("img, video");
  media = Array.from(media);
  var documentHeight = document.body.offsetHeight;
  const PageUrl = window.location.href;
  const PagePath = window.location.pathname.substring(0, window.location.pathname.length - 1);
  // if (!PageUrl.includes('#') && window.location.pathname.slice(window.location.pathname.length - 1) === '/') { window.history.replaceState(null, null, PagePath); }
  const windowHeight = window.visualViewport.height;
  var num;
  if (window.innerWidth >= 992) { num = '1'; }
  else { num = '2'; }
  var counter = 0;
  const observer = new MutationObserver((mutations) => {
    if (counter === 7) { css("#loading", "display", "none"); setHtml("#loading", "");}
    if (PagePath.includes('/admin') && counter === 15) {
      insertContents();
    }
    if (Contents.length === 0) {
      Contents = document.querySelectorAll("#contents" + num + " a");
      Contents = Array.from(Contents);
      Contents.forEach(function (content) {
        ContentsLocation.push(document.getElementById(content.getAttribute("href").substring(1)).offsetTop);
      })
    }
    documentHeight = document.body.offsetHeight;
    tiles = document.getElementsByClassName("tiles");
    if (tiles.length === 0) { tiles = document.getElementsByClassName("product"); }
    tiles = Array.from(tiles);
    section = document.querySelectorAll("footer section");
    section = Array.from(section);
    video = document.querySelectorAll("video");
    video = Array.from(video);
    media = document.querySelectorAll("img, video");
    media = Array.from(media);
    if (document.querySelector(".progressier-widget")) {
      document.querySelector(".progressier-widget").setAttribute("title", "Install Electrical Era App");
    }
    var poweredby = document.querySelector("a[href^='https://progressier.com']");
    if (poweredby) {
      poweredby = poweredby.parentNode;
      poweredby.parentNode.removeChild(poweredby);
    }
    counter++
  });

  observer.observe(document.body, {
    subtree: true,
    childList: true,
  });
  if (PageUrl.includes('#') && document.getElementById(window.location.hash.substring(1))) {
    var hash = window.location.hash.substring(1);
    setTimeout(() => {
      document.getElementById(hash).scrollIntoView();
    }, 1500);
  }

  // const insertProperty = function (string, propName, propValue) {
  //   var propToReplace = "{{" + propName + "}}";
  //   string = string.replace(new RegExp(propToReplace, "g"), propValue);
  //   return string;
  // };
  const setHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };
  const setVal = function (selector, value) {
    var targetElem = document.querySelector(selector);
    targetElem.value = value;
  };
  const append = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML += html;
  };
  const prepend = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html + targetElem.innerHTML;
  };
  const addClass = function (selector, className) {
    var targetElem = document.querySelector(selector);
    targetElem.classList.add(className);
  };
  const removeClass = function (selector, className) {
    var targetElem = document.querySelector(selector);
    targetElem.classList.remove(className);
  }
  const getHeight = function (selector) {
    var targetElem = document.querySelector(selector);
    return targetElem.offsetHeight;
  };
  const getTop = function (selector) {
    var targetElem = document.querySelector(selector);
    return targetElem.offsetTop;
  }
  const insertHTMLAt = function (selector, position, html) {
    var targetElem = document.querySelector(selector);
    targetElem.insertAdjacentHTML(position, html);
  };
  const removeElement = function (selector) {
    var targetElem = document.querySelectorAll(selector);
    targetElem = Array.from(targetElem);
    targetElem.forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    })
  }
  const css = function (selector, property, value) {
    var targetElem = document.querySelectorAll(selector);
    targetElem = Array.from(targetElem);
    targetElem.forEach(function (elem) {
      elem.style[property] = value;
    })
  };
  var pagepath = PagePath
  if (pagepath === '') { pagepath = 'home'; }
  else if (pagepath === '/shop') { pagepath = 'shop'; }
  else if (pagepath === '/blogs') { pagepath = 'blogs'; }
  else if (pagepath === '/news') { pagepath = 'AllNews'; }
  else if (pagepath === '/about') { pagepath = 'about'; }
  else if (pagepath.includes('/blogs/')) { pagepath = 'blog'; }
  else if (pagepath.includes('/news/')) { pagepath = 'news'; }
  else if (pagepath.includes('/shop/')) { pagepath = 'category'; }
  else if (pagepath.includes('/privacy')) { pagepath = 'privacy'; }
  else { pagepath = undefined }
  document.addEventListener("scroll",
    function (event) {
      // Scroll Progress Bar
      var scrollval = window.scrollY.toFixed(2);
      if (num === '2' && pagepath && scrollval > getTop("#relatedPosts2") - windowHeight - 50 && document.getElementById("relatedPosts2").innerHTML === '') {
        insertRelatedPosts();
        insertAds();
      }
      var scrollmax = documentHeight - windowHeight;
      scrollmax = scrollmax.toFixed(2);
      scrollval = (scrollval / scrollmax) * 100;
      document.getElementById("scrollProgress").attributes[1].value = scrollval;
      // Animations
      // Animate Tiles
      tiles.forEach(function (tile) {
        var tilePosition = tile.getBoundingClientRect().top;
        if (tilePosition < windowHeight - 50 && tile.style.opacity !== "1") {
          tile.style.opacity = "1";
          tile.style.transform = "translateY(0)";
          tiles.splice(tiles.indexOf(tile), 1);
        }
      })
      // Animate Video
      video.forEach(function (vid) {
        var vidPosition = vid.getBoundingClientRect().top;
        if (vidPosition < windowHeight - 50 && !vid.style.animation) {
          vid.style.visibility = "visible";
          vid.style.animation = "zoom-in 1s ease";
          video.splice(video.indexOf(vid), 1);
        }
      })
      // Animate Footer
      section.forEach(function (sec) {
        var sectionPosition = sec.getBoundingClientRect().top;
        if (sectionPosition < windowHeight - 50 && !sec.style.animation) {
          sec.style.animation = "slide-up 1s ease";
          section.splice(section.indexOf(sec), 1);
        }
      })
      // Add active to contents
      if (Contents.length > 0) {
        scrollval = window.scrollY;
        let i = 0;
        for (let elem of Contents) {
          var elemPosition = ContentsLocation[i];
          if (scrollval > elemPosition - 50) {
            var active = document.querySelector("#contents" + num + " .active");
            if (active) { active.classList.remove("active"); }
            elem.classList.add("active");
          }
          i++;
        }
      }
      //Collapse TopNav
      if (document.getElementById("collapsable-nav") && document.getElementById("collapsable-nav").style.display !== 'none' && window.scrollY > 450 && window.innerWidth < 768 && $) {
        $("#collapsable-nav").collapse('hide');
      }

      //Goto Top button
      if (document.getElementById("ToTop").style.display !== "block" && window.scrollY > 100 && shareClickCount === 0) {
        css("#ToTop", "display", "block");
        isallfour = true;
        document.getElementById("ToTop").onclick = function topFunction() {
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
      }
      else if (document.getElementById("ToTop").style.display !== "none" && window.scrollY < 100 && shareClickCount === 0) {
        css("#ToTop", "display", "none");
        css("#ToBottom", "bottom", "3%");
        css("#emailUs", "bottom", "calc(3% + 42px)");
        css("#shareBtn", "bottom", "calc(3% + 84px)");
        isallfour = false;
      }
      // Go Down Button
      if (document.getElementById("ToBottom").style.display !== "block" && window.scrollY < documentHeight - windowHeight - 100 && shareClickCount === 0) {
        css("#ToBottom", "display", "block");
        isallfour = true;
        document.getElementById("ToBottom").onclick = function bottomFunction() {
          var pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
          document.body.scrollTop = window.scrollY + 400; // For Safari
          document.documentElement.scrollTop = window.scrollY + pageHeight / 4; // For Chrome, Firefox, IE and Opera
        }
      }
      else if (document.getElementById("ToBottom").style.display !== "none" && window.scrollY > documentHeight - windowHeight - 100 && shareClickCount === 0) {
        css("#ToBottom", "display", "none");
        css("#ToTop", "bottom", "3%");
        css("#emailUs", "bottom", "calc(3% + 42px)");
        css("#shareBtn", "bottom", "calc(3% + 84px)");
        isallfour = false;
      }
      if (isallfour === true && window.scrollY > 100 && window.scrollY < documentHeight - windowHeight - 100 && shareClickCount === 0) {
        css("#ToBottom", "bottom", "3%");
        css("#ToTop", "bottom", "calc(3% + 42px)");
        css("#emailUs", "bottom", "calc(3% + 84px)");
        css("#shareBtn", "bottom", "calc(3% + 126px)");
        isallfour = false;
      }

      //Search Hide
      if (pagepath) {
        if (document.getElementById("productSearchContent") && document.getElementById("productSearchContent").innerHTML !== '' && window.scrollY > Yposition + 450) {
          setHtml("#productSearchContent", "");
          css("#productSearchContent", "max-height", "0");
        }
        if (document.getElementById("SearchContent").innerHTML !== '' && window.scrollY > Yposition + 450) {
          setHtml("#SearchContent", "");
          css("#SearchContent", "max-height", "0");
        }
      }
    }
  );

  document.addEventListener("click", function (event) {
    if (history !== "" && Asin !== '' && event.target.className === "blurBackground") {
      if (store.HideDescription) store.HideDescription(Asin);
    }
    if (isSidepanelOpen === true && event.target.id !== "opensidepanel" && event.target.id !== "mySidepanel" && event.target.className !== "openbtnimg" && event.target.id !== "closesidepanel") {
      css("#mySidepanel", "visibility", "hidden");
      css("#mySidepanel", "width", "0");
      isSidepanelOpen = false;
    }
  })

  document.getElementById("opensidepanel").onclick = function () {
    isSidepanelOpen = true;
    css("#mySidepanel", "width", "250px");
    css("#mySidepanel", "visibility", "visible");
  }

  document.getElementById("closesidepanel").onclick = function () {
    isSidepanelOpen = false;
    css("#mySidepanel", "visibility", "hidden");
    css("#mySidepanel", "width", "0");
  }
  if (pagepath) {
    insertContents();
    insertCarousel();
    if (pagepath !== 'category') { css('#SearchMobile', 'display', 'block'); }
    else { css('#SearchMobile', 'display', 'none'); css('#productSearch', 'display', 'block'); }

    let c = 0;
    let txt = 'Stay Updated with the Latest Trends, Innovations and Breakthroughs';
    let speed = 50;
    function typeWriter() {
      if (c < txt.length) {
        document.querySelector("#highlight-section > h1").innerHTML += txt.charAt(c);
        c++;
        setTimeout(typeWriter, speed);
      }
    }
    if (num === '1') {
      // css(`#headline` + num, "animation", "fade-in 1s ease");
      setHtml('#highlight-section > h1', '');
      css('#sidenav1', 'animation', 'slide-right 1s ease 1s');
      css('#sidenav2', 'animation', 'slide-left 1s ease 1s');
      css('.navHighlightTerm:nth-child(2n)', 'animation', 'slide-left 1s ease 1s');
      css('.navHighlightTerm:nth-child(2n+1)', 'animation', 'slide-right 1s ease 1s');
      insertRelatedPosts();
      insertAds();
      typeWriter();
    }
    else {
      // insertHeadline();
      if (window.innerWidth < 576) {
        css(`#exclusiveStripe`, "text-wrap", "nowrap");
        css(`#exclusiveStripe`, "animation", "movingText 20s linear infinite");
      }
    }

    document.getElementById("shareBtn").onclick = function topFunction() {
      if (shareClickCount === 0) {
        shareClickCount++;
        css("#ToTop", "display", "none");
        css("#ToBottom", "display", "none");
        css("#emailUs", "display", "none");
        css("#shareBtn", "bottom", "3%");
        css(".a2a_kit", "visibility", "visible");
        css(".a2a_kit", "height", "196px");
        document.getElementById("shareBtn").removeChild(document.getElementById("shareBtn").childNodes[0]);
        setHtml("#shareBtn", '<img src="/images/close-white.png" alt="Close">');
      }
      else {
        shareClickCount = 0;
        css(".a2a_kit", "visibility", "hidden");
        css(".a2a_kit", "height", "0");
        document.getElementById("shareBtn").removeChild(document.getElementById("shareBtn").childNodes[0]);
        setHtml("#shareBtn", '<img src="/images/shared.png" alt="Share">');
        if (window.scrollY < 100 || window.scrollY > documentHeight - windowHeight - 100) {
          css("#shareBtn", "bottom", "calc(3% + 84px)");
          if (window.scrollY < 100) { css("#ToBottom", "display", "block"); }
          else { css("#ToTop", "display", "block"); }
        }
        else {
          css("#shareBtn", "bottom", "calc(3% + 126px)");
          css("#ToTop", "display", "block");
          css("#ToBottom", "display", "block");
        }
        css("#emailUs", "display", "block");
      }
    }
    store.ShowDescription = function (asin) {
      Asin = asin;
      history = window.location.href.split('#')[0];
      window.location.hash = asin
      css("#" + asin + "-description", "display", "inherit");
      css(".blurBackground", "display", "block")
    }
    store.HideDescription = function (asin) {
      window.history.replaceState(null, null, history);
      css("#" + asin + "-description", "display", "none");
      css(".blurBackground", "display", "none");
      Asin = "";
      history = "";
    }


    if (document.getElementById('searchProducts')) {
      document.getElementById('searchProducts').addEventListener("keyup", function (event) {
        if (event.key === 'Backspace' || event.key === 'Enter' || event.key === 'Delete') {
          css("#productSearchContent", "max-height", "450px");
          Yposition = document.getElementById("productSearchContent").offsetTop;
          let val = document.getElementById('searchProducts').value;
          val = val.toLowerCase();
          if (val === '') { setHtml("#productSearchContent", ""); return; }
          else { setHtml("#productSearchContent", '<div class="my-4 text-center"><img src="/images/loading.gif" alt="Loading..." width="40"></div>'); }
          const res = new XMLHttpRequest();
          res.open("GET", "/data/shop.json");
          res.send();
          res.responseType = "json";
          res.onload = () => {
            if (res.readyState == 4 && res.status == 200) {
              var products = res.response.products;
              for (var i = 0; i < products.length; i++) {
                var innerHtml = document.querySelector("#productSearchContent").innerHTML;
                if (products[i].title.toLowerCase().includes(val) && !innerHtml.includes(products[i].title) && !innerHtml.includes("No results found")) {
                  var html = "<div id='" + products[i].asin + "-search'><a class='row' style='cursor: pointer' onclick='$store.ShowDescription(\"" + products[i].asin + "\")'><div class='d-none d-md-block col-md-2'><img class='ProductImage' src='" + products[i].image + "' width='95%' style='max-height:170px'></div><div class='col-8 col-md-7'>" + products[i].title + "</div><div class='col-4 col-md-3 text-center'><div class='ProductPrice'>" + products[i].price + "</div><div class='ProductRating pt-2'>" + products[i].rating + " out of 5 stars</div></div></a></div>";
                  if (innerHtml === '<div class="my-4 text-center"><img src="/images/loading.gif" alt="Loading..." width="40"></div>') { setHtml("#productSearchContent", ""); }
                  append("#productSearchContent", "<hr>" + html);
                  if (products[i].saving) { append("#" + products[i].asin + "-search .ProductPrice", ' <span style="color: var(--color-primary-dark)">(' + products[i].saving + ')</span>'); }
                }
                var content = document.querySelector("#productSearchContent").innerHTML;
                if (i === products.length - 1 && content === '<div class="my-4 text-center"><img src="/images/loading.gif" alt="Loading..." width="40"></div>') {
                  setHtml("#productSearchContent", "<div class='text-center my-4'>No results found</div>")
                }
              }
              append("#productSearchContent", "<hr>");
            } else {
              console.log(`Error: ${res.status}`);
            }
          }
        }
      })
    }

    if (document.getElementById('searchbar')) {
      document.getElementById('searchbar').addEventListener("keyup", function (event) {
        if (event.key === 'Backspace' || event.key === 'Enter' || event.key === 'Delete') {
          css("#SearchContent", "max-height", "450px");
          Yposition = document.getElementById("SearchContent").offsetTop;
          let val = document.querySelector('#searchbar').value
          val = val.toLowerCase();
          if (val === '') { setHtml("#SearchContent", ""); return; }
          else { setHtml("#SearchContent", '<div class="my-4 text-center"><img src="/images/loading.gif" alt="Loading..." width="40"></div>'); }
          const data = new XMLHttpRequest();
          data.open("GET", linkData);
          data.send();
          data.responseType = "json";
          data.onload = () => {
            if (data.readyState == 4 && data.status == 200) {
              var res = data.response;
              var searchAll = function (i, heading, type) {
                var innerHtml = document.querySelector("#SearchContent").innerHTML;
                var data = res.AllLinks[i].name.toLowerCase();
                if (data.includes(val) && !innerHtml.includes(res.AllLinks[i].name) && !innerHtml.includes("No results found")) {
                  var name = '';
                  var html = '';
                  if (res.AllLinks[i].type !== "shopsubcat" && res.AllLinks[i].type !== "shopsubsubcat") { name = res.AllLinks[i].name }
                  else if (res.AllLinks[i].type === "shopsubcat") { name = res.AllLinks[i].cat + ' > <b>' + res.AllLinks[i].name + '</b>' }
                  else if (res.AllLinks[i].type === "shopsubsubcat") { name = res.AllLinks[i].cat + ' > ' + res.AllLinks[i].subcat + ' > <b>' + res.AllLinks[i].name + '</b>' }
                  if (res.AllLinks[i].type === "shopsubsubcat") { html = "<div><a href='/shop/" + res.AllLinks[i].url + "'>" + name + "</a></div>"; }
                  else if (res.AllLinks[i].type === "shopcat" || res.AllLinks[i].type === "blogcat" || res.AllLinks[i].type === "newscat") { html = "<div><a href='/" + type + "#" + res.AllLinks[i].url + "'>" + res.AllLinks[i].name + "</a></div>"; }
                  else { html = "<div><a href='/" + type + "/" + res.AllLinks[i].url + "'>" + name + "</a></div>"; }
                  if (innerHtml === '<div class="my-4 text-center"><img src="/images/loading.gif" alt="Loading..." width="40"></div>') { setHtml("#SearchContent", ""); }
                  if (!innerHtml.includes(heading)) { append("#SearchContent", "<hr><h5 class='text-center'>" + heading + "</h5>"); }
                  append("#SearchContent", '<hr>' + html);
                }
              }
              if (val !== '') {
                for (let i = 0; i < res.AllLinks.length; i++) {
                  if (res.AllLinks[i].type === "shopcat" || res.AllLinks[i].type === "shopsubcat" || res.AllLinks[i].type === "shopsubsubcat") {
                    searchAll(i, "Product Categories", "shop");
                  }
                }
                for (let i = 0; i < res.AllLinks.length; i++) {
                  if (res.AllLinks[i].type === "blogcat") {
                    searchAll(i, "Blog Categories", "blogs");
                  }
                }
                for (let i = 0; i < res.AllLinks.length; i++) {
                  if (res.AllLinks[i].type === "newscat") {
                    searchAll(i, "News Categories", "news");
                  }
                }
                for (let i = 0; i < res.AllLinks.length; i++) {
                  if (res.AllLinks[i].type === "shop") {
                    searchAll(i, "Products", "shop");
                  }
                }
                for (let i = 0; i < res.AllLinks.length; i++) {
                  if (res.AllLinks[i].type === "blogs") {
                    searchAll(i, " Blog ", "blogs");
                  }
                }
                for (let i = 0; i < res.AllLinks.length; i++) {
                  if (res.AllLinks[i].type === "news") {
                    searchAll(i, " News ", "news");
                  }
                  var content = document.querySelector("#SearchContent").innerHTML;
                  if (i === res.AllLinks.length - 1 && content === '<div class="my-4 text-center"><img src="/images/loading.gif" alt="Loading..." width="40"></div>') {
                    setHtml("#SearchContent", "<div class='text-center my-4'>No results found</div>")
                  }
                }
                append("#SearchContent", "<hr>");
              }
            } else {
              console.log(`Error: ${data.status}`);
            }
          }
        }
      });
    }
  }
  else {
    removeElement(["header", "footer", ".sidenavWrap", "#SearchMobile", "#carouselExampleDark"]);
    css("#main-view", "width", "100%");
    css("#main-view", "margin", "0");
    css("#main-view", "padding", "0");
    css("a.nav-link", "color", "var(--color-dark)");
    document.getElementById("main-view").removeAttribute("class");
    if (PagePath !== '/admin') {
      document.getElementById("submitForm").onclick = function () {
        var isFilled = false;
        var elements = document.querySelectorAll("#Form1 input, #Form1 textarea, #Form1 select");
        elements = Array.from(elements);
        for (let element of elements) {
          if (element.value === '' && element.hasAttribute("required")) {
            element.style.border = "1px solid red";
            element.style.boxShadow = "0 0 5px red";
            element.scrollIntoView();
            element.onchange = function () {
              element.style.border = "var(--bs-border-width) solid var(--bs-border-color)";
              element.style.boxShadow = "none";
            }
            isFilled = false;
            return;
          }
          else {
            isFilled = true;
          }
        };
        if (isFilled === true) {
          css("#FormWrapper1", "display", "none");
          css(".formMessageWrapper", "display", "block");
        }
      }
      document.querySelector(".formMessageWrapper #icon").onclick = function () {
        window.location.reload();
      }
      const observeFormMessage = new MutationObserver(() => {
        removeElement([".formMessage .temp"]);
        css(".formMessageWrapper #icon", "display", "block")
        var message = document.querySelector(".formMessage").innerHTML;
        if (message.includes("Success")) {
          css("#addformsuccess", "display", "block");
          css("#addformerror", "display", "none")
        }
        else {
          css("#addformsuccess", "display", "none");
          css("#addformerror", "display", "block")
        }
      });
      observeFormMessage.observe(document.querySelector(".formMessage"), {
        subtree: true,
        childList: true,
      });
    }
    else {
      store.ShowErrors = function (event) {
        let el = event.target.getAttribute("data-url");
        el = document.querySelector(`div.error[data-url="${el}"]`)
        document.querySelector(".blurBackground").style.display = "block";
        el.style.display = "block";
      }
      store.HideErrors = function (event) {
        let el = event.target.parentElement.parentElement;
        document.querySelector(".blurBackground").style.display = "none";
        el.style.display = "none";
      }
    }

    if (PagePath.includes("/admin/categories")) {
      var draftHtml = '';
      document.getElementById("closeform").onclick = function () {
        if (document.getElementById("subcategory-num")) {
          draftHtml = document.getElementById("subcategory-num").parentElement.outerHTML + document.getElementById("subcategories").outerHTML;
          var element = document.getElementById("subcategory-num").parentElement;
          element.parentNode.removeChild(element);
          removeElement(["#subcategories"]);
        }
        css("#FormWrapper1", "display", "none");
        css("#subcategories", "display", "none");
        css(".blurBackground", "display", "none");
      }
      document.getElementById("category-type").onchange = function () {
        if (document.getElementById("category-type").value === 'shop') {
          if (!document.getElementById("subcategory-num") && draftHtml === '') {
            insertHTMLAt("#Form1 .modal-body", 'beforeend', `<div class="mb-3"><label htmlFor="subcategory-num" class="form-label" style="font-weight: bolder">No. of Subcategories</label><input onchange='$store.AddSubCategoryForm()' type="number" min="1" class="form-control" id="subcategory-num" name="subcategory-num" placeholder="Enter No. of Subcategories" required /></div><div id='subcategories'></div>`)
          }
          else if (draftHtml !== '' && !document.getElementById("subcategory-num")) {
            insertHTMLAt("#Form1 .modal-body", 'beforeend', draftHtml);
          }
          css("#subcategories", "display", "block");
          document.getElementById("subcategory-num").parentElement.style.display = "block";
        }
        else {
          if (document.getElementById("subcategory-num")) {
            draftHtml = document.getElementById("subcategory-num").parentElement.outerHTML + document.getElementById("subcategories").outerHTML;
            var element = document.getElementById("subcategory-num").parentElement;
            element.parentNode.removeChild(element);
            removeElement(["#subcategories"]);
          }
        }
      }
      store.AddSubCategoryForm = function () {
        var html = '';
        var num = document.getElementById("subcategory-num").value;
        num = parseInt(num);
        while (document.getElementById(`subcategory${num + 1}`)) {
          removeElement([`#subcategory${num + 1}`]);
          num++;
        }
        num = document.getElementById("subcategory-num").value;
        for (var i = 1; i <= num; i++) {
          if (document.getElementById(`subcategory${i}-name`)) { continue; }
          html += `<div id="subcategory${i}"><hr/><h6>SubCategory ${i}</h6><div class="row"><div class="mb-3 col-12 col-sm-6"><label htmlFor="subcategory${i}-name" class="form-label">Name</label><input type="name" class="form-control" id="subcategory${i}-name" name="subcategory${i}-name" placeholder="Enter Category Name" required /></div><div class="mb-3 col-12 col-sm-6"><label htmlFor="subcategory${i}-slug" class="form-label">Slug</label><input type="text" class="form-control" id="subcategory${i}-slug" name="subcategory${i}-slug" placeholder="Enter Category Slug" required /></div></div><div class="mb-3"><label htmlFor="subcategory${i}-description" class="form-label">Description</label><textarea class="form-control" id="subcategory${i}-description" name="subcategory${i}-description" placeholder="Enter Category Description" required></textarea></div><div class="mb-3"><label htmlFor="subcategory${i}-necessary" class="form-label">Necessary</label><textarea class="form-control" id="subcategory${i}-necessary" name="subcategory${i}-necessary" placeholder="Enter Category Necessary"></textarea></div><div class="mb-3"><label htmlFor="subsubcategory-num" class="form-label" style="font-weight: bolder">No. of Subsubcategories for Subcategory ${i}</label><input onchange='$store.AddSubSubCategoryForm(event)' type="number" min="1" class="form-control" id="subsubcategory${i}-num" name="subsubcategory${i}-num" placeholder="Enter No. of Subsubcategories" required /></div><div id='subsubcategories${i}'></div></div>`;
        }
        insertHTMLAt("#subcategories", 'beforeend', html);
      }
      store.AddSubSubCategoryForm = function (event) {
        var html = '';
        var num = event.target.value;
        num = parseInt(num);
        var idnum = event.target.id.split('-')[0];
        idnum = idnum.split('subsubcategory')[1];
        while (document.getElementById(`subsubcategory${num + 1}ofsubcat${idnum}`)) {
          removeElement([`#subsubcategory${num + 1}ofsubcat${idnum}`]);
          num++;
        }
        num = event.target.value;
        for (var i = 1; i <= num; i++) {
          if (document.getElementById(`subsubcategory${i}ofsubcat${idnum}`)) { continue }
          html += `<div id="subsubcategory${i}ofsubcat${idnum}"><h6>SubSubCategory ${i} of SubCategory ${idnum}</h6><div class="row"><div class="mb-3 col-12 col-sm-6"><label htmlFor="subsubcategory${i}ofsubcat${idnum}-name" class="form-label">Name</label><input type="name" class="form-control" id="subsubcategory${i}ofsubcat${idnum}-name" name="subsubcategory${i}ofsubcat${idnum}-name" placeholder="Enter Category Name" required /></div><div class="mb-3 col-12 col-sm-6"><label htmlFor="subsubcategory${i}ofsubcat${idnum}-slug" class="form-label">Slug</label><input type="text" class="form-control" id="subsubcategory${i}ofsubcat${idnum}-slug" name="subsubcategory${i}ofsubcat${idnum}-slug" placeholder="Enter Category Slug" required /></div></div><div class="mb-3"><label htmlFor="subsubcategory${i}ofsubcat${idnum}-description" class="form-label">Description</label><textarea class="form-control" id="subsubcategory${i}ofsubcat${idnum}-description" name="subsubcategory${i}ofsubcat${idnum}-description" placeholder="Enter Category Description" required></textarea></div><div class="mb-3"><label htmlFor="subsubcategory${i}ofsubcat${idnum}-fetchkeywords" class="form-label">Product Fetch Keywords</label><textarea type="text" class="form-control" id="subsubcategory${i}ofsubcat${idnum}-fetchkeywords" name="subsubcategory${i}ofsubcat${idnum}-fetchkeywords" placeholder="Enter Category Product Fetch Keywords" required></textarea></div><div class="mb-3"><label htmlFor="subsubcategory${i}ofsubcat${idnum}-filterkeywords" class="form-label">Product Filter Keywords</label><textarea type="text" class="form-control" id="subsubcategory${i}ofsubcat${idnum}-filterkeywords" name="subsubcategory${i}ofsubcat${idnum}-filterkeywords" placeholder="Enter Category Product Filter Keywords"></textarea></div><div class="mb-3"><label htmlFor="subsubcategory${i}ofsubcat${idnum}-dontInclude" class="form-label">Dont Include</label><textarea class="form-control" id="subsubcategory${i}ofsubcat${idnum}-dontInclude" name="subsubcategory${i}ofsubcat${idnum}-dontInclude" placeholder="Enter Category Dont Include"></textarea></div></div>`
        }
        insertHTMLAt(`#subsubcategories${idnum}`, "beforeend", html);
      }
      store.ShowAddCategoryForm = function (id) {
        css(".blurBackground", "display", "block")
        css("#FormWrapper1", "display", "block");
        if (id === 'products') {
          id = 'shop';
          if (!document.getElementById("subcategory-num") && draftHtml === '') {
            insertHTMLAt("#Form1 .modal-body", 'beforeend', `<div class="mb-3"><label htmlFor="subcategory-num" class="form-label" style="font-weight: bolder">No. of Subcategories</label><input onchange='$store.AddSubCategoryForm()' type="number" min="1" class="form-control" id="subcategory-num" name="subcategory-num" placeholder="Enter No. of Subcategories" required /></div><div id='subcategories'></div>`)
          }
          else if (draftHtml !== '' && !document.getElementById("subcategory-num")) {
            insertHTMLAt("#Form1 .modal-body", 'beforeend', draftHtml);
          }
          css("#subcategories", "display", "block");
          document.getElementById("subcategory-num").parentElement.style.display = "block";
        }

        document.getElementById("category-type").value = id;
      }
    }

    else if (PagePath.includes("/admin/posts")) {
      const insertPostCategories = function (type) {
        if (type === 'blogs') {
          var categories = document.querySelectorAll("#blogSection h2");
          categories = Array.from(categories);
          document.getElementById("post-category").innerHTML = "";
          categories.forEach(function (category) {
            var html = "<option value='" + category.innerHTML + "'>" + category.innerHTML + "</option>";
            append("#post-category", html);
          });
        }
        else if (type === 'news') {
          var categories = document.querySelectorAll("#newsSection h2");
          categories = Array.from(categories);
          document.getElementById("post-category").innerHTML = "";
          categories.forEach(function (category) {
            var html = "<option value='" + category.innerHTML + "'>" + category.innerHTML + "</option>";
            append("#post-category", html);
          });
        }
      }
      document.getElementById("post-type").onchange = function (event) {
        var type = event.target.value;
        insertPostCategories(type);
      }
      store.ShowAddPostForm = function (category, type) {
        css(".blurBackground", "display", "block")
        css("#FormWrapper1", "display", "block");
        document.getElementById("post-type").value = type;
        insertPostCategories(type);
        setVal("#post-category", category);
      }
      document.getElementById("closeform").onclick = function () {
        css("#FormWrapper1", "display", "none");
        css(".blurBackground", "display", "none");
      }
    }
    else if (PagePath.includes("/admin/products")) {
      document.getElementById("closeform").onclick = function () {
        css("#FormWrapper1", "display", "none");
        css(".blurBackground", "display", "none");
      }
      store.ShowUpdateProductsForm = function (category, event) {
        var element = event.target.parentElement.parentElement.parentElement;
        var categories = element.querySelectorAll("h1");
        categories = Array.from(categories);
        var html = '';
        categories.forEach(function (category) {
          html += "<option id-of-h1='" + category.id + "'value='" + category.id + "'>" + category.innerHTML + "</option>";
        });
        setHtml("#products-category", html);
        element = event.target.parentElement.parentElement;
        var subcategories = element.querySelectorAll("h2");
        subcategories = Array.from(subcategories);
        var html = '';
        subcategories.forEach(function (subcategory) {
          html += "<div><input type='checkbox' name='subcategory' value='" + subcategory.getAttribute("subsubcat") + "'><label class='ps-2' for='" + subcategory.innerHTML + "'>" + subcategory.innerHTML + "</label></div>";
        });
        setHtml("#products-subcategories", html);
        css(".blurBackground", "display", "block")
        css("#FormWrapper1", "display", "block");
        setVal("#products-category", category);
      }
      document.getElementById("products-category").onchange = function (event) {
        var elements = event.target.querySelectorAll("option");
        elements = Array.from(elements);
        elements.forEach(function (element) {
          if (element.value === event.target.value) {
            var id = element.getAttribute("id-of-h1");
            var subcategories = document.getElementById(id).parentElement.querySelectorAll("h2");
            subcategories = Array.from(subcategories);
            var html = '';
            subcategories.forEach(function (subcategory) {
              html += "<input type='checkbox' name='subcategory' value='" + subcategory.getAttribute("subsubcat") + "'><label class='ps-1' for='" + subcategory.innerHTML + "'>" + subcategory.innerHTML + "</label><br>";
            });
            setHtml("#products-subcategories", html);
          }
        });
      }
    }
  }

  //====================================================================================================
  // inserting headline on home page
  // async function insertHeadline() {
  //   if (pagepath === 'home') {
  //     setHtml("#headline1", "Welcome to the <span style='font-weight: 700;'>Electrical Era</span>, where fashion and technology collide, providing you with the latest insights and trends in electronics and apparel");
  //   }
  //   else { setHtml("#headline2", ""); }
  // }

  // Dynamically insert Related Posts
  async function insertRelatedPosts() {
    var isRelatedPostInserted = true;
    setHtml("#relatedPosts" + num, "<hr>");
    if (pagepath === 'blog' || pagepath === 'news') {
      isRelatedPostInserted = false;
      var category = PagePath.split("/")[1];
      var url = PagePath.split("/")[2];
      const data = new XMLHttpRequest();
      data.open("GET", "/data/content.json");
      data.send();
      data.responseType = "json";
      data.onload = () => {
        if (data.readyState == 4 && data.status == 200) {
          var res = data.response
          if (category === "blogs") { res = res.Blogs.content; }
          else { res = res.News.content; }
          for (var i = 0; i < res.length; i++) {
            for (var j = 0; j < res[i].content.length; j++) {
              if (res[i].content[j].url === url && res[i].content.length > 1) {
                var html = '';
                var count = 0;
                var increement = Math.floor(Math.random() * res[i].content.length / 5) + 1;
                for (var k = 0; k < res[i].content.length && count < 5; k += increement) {
                  if (res[i].content[k].url !== url) {
                    count++;
                    html = "<a href='/" + category + "/" + res[i].content[k].url + "'>" + res[i].content[k].name + "</a><hr>";
                    append('#relatedPosts' + num, html);
                  }
                }
                break;
              }
            }
          }
          isRelatedPostInserted = true;
        } else {
          console.log(`Error: ${data.status}`);
        }
      };
    }
    var interval = setInterval(() => {
      if (isRelatedPostInserted === true) {
        if (document.getElementById('relatedPosts' + num).innerHTML === '<hr>') {
          css('#relatedPosts' + num, 'display', 'none');
          if (window.innerWidth < 992) {
            css('#sidenav2', 'margin-top', '0'); css('.sidenav1MobileAd', 'display', 'none');
            setHtml("#relatedPostsHeading2", "");
          }
          else {
            setHtml("#relatedPostsHeading1", "");
          }
        }
        else {
          css('#relatedPosts' + num, 'display', 'block');
          if (window.innerWidth < 992) {
            css('#sidenav2', 'margin-top', '3rem'); css('.sidenav1MobileAd', 'display', 'block');
            setHtml("#relatedPostsHeading2", "YOU MAY ALSO LIKE");
          }
          else {
            setHtml("#relatedPostsHeading1", "YOU MAY ALSO LIKE");
          }
        }
        if (document.getElementById("relatedPosts1").innerHTML === '<hr>' || document.getElementById("contents1").innerHTML === '') {
          css(".sidenav1Ad", "display", "block");
        }
        else {
          css(".sidenav1Ad", "display", "none");
        }
        clearInterval(interval);
        isRelatedPostInserted = false;
      }
    }, 1000);
  }

  const getads = function (res) {
    for (var i = 0; i < res.length; i++) {
      var item = res[i];
      if (!document.getElementById(item.asin + "-ad")) {
        if (item.title.length > 60) { var title = item.title.substring(0, 60) + "..."; }
        else { var title = item.title; }
        var html = '<div id="' + item.asin + '-ad" class="text-center col-6 col-sm-4 col-md-3 col-lg-12 mx-auto"><div class="sidenavAdLink" title="' + item.title + '"><small class="ProductTag">' + item.tag + '</small><small class="ProductSaving">' + item.saving + '</small><img src="' + item.image + '" alt="' + title + '"><div class="ProductName">' + title + '</div><div class="ProductPrice pt-2">' + item.price + '</div><div class="ProductRating">' + item.rating + ' out of 5 stars</div><div class="ProductReviews">' + item.reviews + '</div><a href="https://www.amazon.com/dp/' + item.asin + '?&tag=electricalera-20&language=en_US&ref_=as_li_ss_tl" target="_blank" class="tileBtn btn btn-outline-dark">Shop Now</a></div></div>';
        // if((i + 1) % 2 === 0) { html += `<div id="atContainer-81f7456d565efea0b0def5b0deec147e" class="text-center"></div>`}
        append('#sidenavAd', html);
      }
    }

  }
  function insertAds() {
    if (pagepath !== 'category' && pagepath !== 'blog' && pagepath !== 'news') {
      setHtml("#sidenavAd", "");
      setHtml("#sidenavAdHeading", "RECOMMENDED PRODUCTS");
      setHtml("#most-recommended-products", "RECOMMENDED PRODUCTS");
      const data = new XMLHttpRequest();
      data.open("GET", linkData,);
      data.send();
      data.responseType = "json";
      data.onload = () => {
        if (data.readyState == 4 && data.status == 200) {
          getads(data.response.Ads);
        } else {
          console.log(`Error: ${data.status}`);
        }
      };
    }
    else {
      setHtml("#sidenavAd", "");
      var cat = PagePath.split("/")[2];
      if (pagepath === 'category') { var directory = 'shop'; }
      else if (pagepath === 'blog') { var directory = 'blogs'; }
      else if (pagepath === 'news') { var directory = 'news'; }
      const data = new XMLHttpRequest();
      data.open("GET", "/data/" + directory + "/" + cat + ".json",);
      data.send();
      data.responseType = "json";
      data.onload = () => {
        if (data.readyState == 4 && data.status == 200) {
          var res = data.response.Ads
          if (res && res.length > 0) {
            if (pagepath === 'category') {
              setHtml("#most-recommended-products", "RECOMMENDED PRODUCTS");
              setHtml("#sidenavAdHeading", "RECOMMENDED PRODUCTS");
            }
            else {
              setHtml("#sidenavAdHeading", "RELATED PRODUCTS");
              setHtml("#most-recommended-products", "RELATED PRODUCTS");
            }
            getads(res);
          }
          else {
            setHtml("#sidenavAdHeading", "RECOMMENDED PRODUCTS");
            setHtml("#most-recommended-products", "RECOMMENDED PRODUCTS");
            const data = new XMLHttpRequest();
            data.open("GET", linkData,);
            data.send();
            data.responseType = "json";
            data.onload = () => {
              if (data.readyState == 4 && data.status == 200) {
                getads(data.response.Ads);
              } else {
                console.log(`Error: ${data.status}`);
              }
            }
          }
        } else {
          console.log(`Error: ${data.status}`);
        }
      }
    }
  }

  // Dynamically insert Contents
  async function insertContents() {
    var $contents = "";
    if (pagepath === 'about') {
      $contents = "<hr><a href='#aboutUs'>About Us</a><hr><a href='#mission'>Our Mission</a><hr><a href='#what-we-offer'>What We Offer</a><hr><a href='#why-pick-electrical-era'>Why Pick Electrical Era?</a><hr><a href='#join-us-today'>Join Us Today</a><hr>";
    }
    else {
      if (PagePath.includes("admin/products")) { var data = document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "h1"); }
      else { var data = document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "h2"); }
      data = Array.from(data);
      var contents = "<hr>";
      let i = 0;
      for (let el of data) {
        if (el.hasAttribute('id') && el.style.display !== "none" && el.innerHTML !== '') {
          if (el.innerHTML === "YOU MAY ALSO LIKE" || el.getAttribute('id') === 'relatedPostsHeading2') { data.splice(i, 1); continue; }
          if (el.innerHTML === "RECOMMENDED PRODUCTS" && window.innerWidth >= 992) { data.splice(i, 1); continue; }
          if (el.innerHTML === "RELATED PRODUCTS" && window.innerWidth >= 992) { data.splice(i, 1); continue; }
          if (el.innerHTML === "Add Category" || el.innerHTML === "Add Post" || el.innerHTML === "Update Products") { data.splice(i, 1); continue; }
          let id = el.getAttribute('id');
          contents += "<a href='#" + id + "'>" + el.innerHTML + "</a><hr>";
        }
        i++;
      }

      $contents = contents;
    }
    if ($contents !== "<hr>") {
      if (window.innerWidth < 992) {
        setHtml("#contentsHeading2", "TABLE OF CONTENTS");
        setHtml("#contents2", $contents);
      }
      else {
        setHtml("#contentsHeading1", "TABLE OF CONTENTS");
        setHtml("#contents1", $contents);
      }
    }
    else {
      if (window.innerWidth < 992) {
        setHtml("#contentsHeading2", "");
        setHtml("#contents2", "");
      }
      else {
        setHtml("#contentsHeading1", "");
        setHtml("#contents1", "");
      }
    }
  }

  // Dynamically insert carousel images
  async function insertCarousel() {
    if (pagepath === 'home' || pagepath === 'blogs' || pagepath === 'AllNews' || pagepath === 'shop') {
      css("#carouselExampleDark", "display", "block");
      setHtml(".carousel-inner", "");
      setHtml(".carousel-indicators", "");
      if (pagepath === 'shop') {
        css("#carouselExampleDark", "min-height", "0"); css("#carouselExampleDark", "padding", "30px 8px")
        const products = new XMLHttpRequest();
        products.open("GET", linkData);
        products.send();
        products.responseType = "json";
        products.onload = () => {
          if (products.readyState == 4 && products.status == 200) {
            var res = products.response.ShopCarousel;
            for (var i = 0; i < res.length; i++) {
              append(".carousel-indicators", "<button type='button' data-bs-target='#carouselExampleDark' data-bs-slide-to='" + i + "' aria-label='Slide " + `${i + 1}` + "'></button>")
              var html = "<div id='" + res[i].asin + "-carousel' class='carousel-item' data-bs-interval='5000'><a target='_blank' class='row' href='https://www.amazon.com/dp/" + res[i].asin + "?&tag=electricalera-20&language=en_US&ref_=as_li_ss_tl'><div class='col-md-3'><img style=\"object-fit:contain\" class='ProductImage' src='" + res[i].image + "' alt='" + res[i].title + "' width='100%' style='max-height:170px'></div><div class='col-8 col-md-6 text-center pt-2 pt-md-0' style='overflow:hidden;color:var(--color-dark);font-weight:bold;'><div style='height: 100%;display: grid;align-items: center;text-overflow:ellipsis'>" + res[i].title + "</div></div><div class='col-4 col-md-3 text-center'><div class='ProductPrice pt-2 pt-md-0' style='height: 100%;display: grid;align-items: center;'>" + res[i].price + '<br/>' + res[i].rating + " out of 5 stars</div></div></a></div>";
              if (i == 0) { addClass(".carousel-indicators > button", "active"); append(".carousel-inner", html); addClass('div.carousel-item', 'active'); }
              else { append(".carousel-inner", html); }
            }

          } else {
            console.log(`Error: ${products.status}`);
          }
        }
      }
      else {
        const data = new XMLHttpRequest();
        data.open("GET", linkData);
        data.send();
        data.responseType = "json";
        data.onload = () => {
          if (data.readyState == 4 && data.status == 200) {
            var res = data.response.LatestLinks;
            for (var i = res.length - 1; i >= 0; i--) {
              append(".carousel-indicators", "<button type='button' data-bs-target='#carouselExampleDark' data-bs-slide-to='" + i + "' aria-label='Slide " + `${i + 1}` + "'></button>")
              var html = "<div class='carousel-item' data-bs-interval='5000'><a href='/" + res[i].type + "/" + res[i].url + "'><img src='/images/" + res[i].type + "/" + res[i].url + "/1.jpg' alt='" + res[i].name + "'><div class='carousel-caption'><p>" + res[i].description + "</p></div><small class='position-absolute bottom-0 end-0 m-1'>Posted on " + res[i].date + "</small></a></div>";
              if (i == res.length - 1) { addClass(".carousel-indicators > button", "active"); append(".carousel-inner", html); addClass('div.carousel-item', 'active'); }
              else { append(".carousel-inner", html); }
            }
          } else {
            console.log(`Error: ${data.status}`);
          }
        }
      }
    }
    else {
      css("#carouselExampleDark", "display", "none");
    }
  }

  global.$store = store;
})(window);