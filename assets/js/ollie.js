/*!
=========================================================
* Ollie Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
// smooth scroll
$(document).ready(function () {
    $(".navbar .nav-link").on("click", function (event) {
      if (this.hash !== "") {
        event.preventDefault();
  
        var hash = this.hash;
  
        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top,
          },
          700,
          function () {
            window.location.hash = hash;
          }
        );
      }
    });
  });
  
  // portfolio carousel
  $("#owl-portfolio").owlCarousel({
    margin: 30,
    dots: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 3,
        nav: false,
      },
      1000: {
        items: 4,
        nav: false,
        loop: false,
      },
    },
  });
  
  // testmonial carousel
  $("#owl-testmonial").owlCarousel({
    center: true,
    items: 1,
    loop: true,
    nav: true,
    dots: false,
  });
  
  var cards = $('.card');
  
  // cards.each( (index, card) => {
  //   $(card).prepend("<div class='shineLayer'></div>")
  // });
  
  $(".card").mousemove( function(event) {
    
    var card = this;
    var mouseCoord = {
      x: event.offsetX,
      y: event.offsetY
    };
    
    //cleanup
    mouseCoord.x = mouseCoord.x < 0 ? 0 : mouseCoord.x;
    mouseCoord.x = mouseCoord.x > $(card).width() ? $(card).width() : mouseCoord.x;
    mouseCoord.y = mouseCoord.y < 0 ? 0 : mouseCoord.y;
    mouseCoord.y = mouseCoord.y > $(card).height() ? $(card).height() : mouseCoord.y;
    
    var transformCard = "scale3d(1.08, 1.08, 1.08) perspective(700px)";
    transformCard += " ";
    //rotateX between -9 and +9
    transformCard += "rotateX(" + ( ( ( (mouseCoord.y / $(card).height()) * 18 ) - 9 )) + "deg)";
    transformCard += " ";
    //rotateY between -13 and +13
    transformCard += "rotateY(" + ( ( ( (mouseCoord.x / $(card).width()) * 26 ) - 13 ) * -1 ) + "deg)";
    
    transformCard += " ";
    //translateX between -3 and +3
    transformCard += "translateX(" + ( ( (mouseCoord.x / $(card).width()) * 4 ) - 3 ) + "px)";
    transformCard += " ";
    //translateY between -5 and +5
    transformCard += "translateY(" + ( ( (mouseCoord.y / $(card).height()) * 6 ) - 5 ) + "px)";
    
    $(card).css("transform", transformCard);
    
    //rotateX between -5 and +5
    var transformCardImage = "rotateX(" + ( ( ( (mouseCoord.y / $(card).height()) * 10 ) - 10 ) * -1 ) + "deg)";
    transformCardImage += " ";
    //rotateX between -13 and +13
    transformCardImage += "rotateY(" + ( ( ( (mouseCoord.x / $(card).width()) * 26 ) - 18 ) * -1 ) + "deg)";
    $(card).find("img").css("transform", transformCardImage);
    
    //opacity of ShineLayer between 0.1 and 0.4
    var backgroundShineLayerOpacity = ((mouseCoord.y / $(card).height()) * 0.3) + 0.1;
    //bottom=0deg; left=90deg; top=180deg; right=270deg;
    var backgroundShineLayerDegree = (Math.atan2(mouseCoord.y - ($(card).height()/2), mouseCoord.x - ($(card).width()/2)) * 180/Math.PI) - 90;
    backgroundShineLayerDegree = backgroundShineLayerDegree < 0 ? backgroundShineLayerDegree += 360 : backgroundShineLayerDegree
    var backgroundShineLayer = "linear-gradient(" + backgroundShineLayerDegree + "deg, rgba(255,255,255," + backgroundShineLayerOpacity + ") 0%, rgba(255,255,255,0) 80%)";
    $(card).find(".shineLayer").css("background", backgroundShineLayer);
  });
  
  $(".card").mouseenter( function(event) {
    $(".card").addClass("blur");
    $(this).removeClass("blur");
  });
  
  $(".card").mouseleave( function(event) {
    var card = this;
    $(card).css("transform", "scale3d(1, 1, 1)");
    $(card).find("img").css("transform", "");
    $(card).find(".shineLayer").css("background", "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 80%)");
  
    $(".card").removeClass("blur");
  });
  class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = "";
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }
  
    type() {
      // Current index of word
      const current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];
  
      // Check if deleting
      if (this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      // Insert txt into element
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      // Initial Type Speed
      let typeSpeed = 100;
  
      if (this.isDeleting) {
        typeSpeed /= 2;
      }
  
      // If word is complete
      if (!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 300;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  // Init On DOM Load
  document.addEventListener("DOMContentLoaded", init);
  
  // Init App
  function init() {
    const txtElement = document.querySelector(".txt-type");
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }
  
  var cards = $('.card');
  
  // cards.each( (index, card) => {
  //   $(card).prepend("<div class='shineLayer'></div>")
  // });
  
  $(".card").mousemove( function(event) {
    
    var card = this;
    var mouseCoord = {
      x: event.offsetX,
      y: event.offsetY
    };
    
    //cleanup
    mouseCoord.x = mouseCoord.x < 0 ? 0 : mouseCoord.x;
    mouseCoord.x = mouseCoord.x > $(card).width() ? $(card).width() : mouseCoord.x;
    mouseCoord.y = mouseCoord.y < 0 ? 0 : mouseCoord.y;
    mouseCoord.y = mouseCoord.y > $(card).height() ? $(card).height() : mouseCoord.y;
    
    var transformCard = "scale3d(1.08, 1.08, 1.08) perspective(700px)";
    transformCard += " ";
    //rotateX between -9 and +9
    transformCard += "rotateX(" + ( ( ( (mouseCoord.y / $(card).height()) * 18 ) - 9 )) + "deg)";
    transformCard += " ";
    //rotateY between -13 and +13
    transformCard += "rotateY(" + ( ( ( (mouseCoord.x / $(card).width()) * 26 ) - 13 ) * -1 ) + "deg)";
    
    transformCard += " ";
    //translateX between -3 and +3
    transformCard += "translateX(" + ( ( (mouseCoord.x / $(card).width()) * 4 ) - 3 ) + "px)";
    transformCard += " ";
    //translateY between -5 and +5
    transformCard += "translateY(" + ( ( (mouseCoord.y / $(card).height()) * 6 ) - 5 ) + "px)";
    
    $(card).css("transform", transformCard);
    
    //rotateX between -5 and +5
    var transformCardImage = "rotateX(" + ( ( ( (mouseCoord.y / $(card).height()) * 10 ) - 10 ) * -1 ) + "deg)";
    transformCardImage += " ";
    //rotateX between -13 and +13
    transformCardImage += "rotateY(" + ( ( ( (mouseCoord.x / $(card).width()) * 26 ) - 18 ) * -1 ) + "deg)";
    $(card).find("img").css("transform", transformCardImage);
    
    //opacity of ShineLayer between 0.1 and 0.4
    var backgroundShineLayerOpacity = ((mouseCoord.y / $(card).height()) * 0.3) + 0.1;
    //bottom=0deg; left=90deg; top=180deg; right=270deg;
    var backgroundShineLayerDegree = (Math.atan2(mouseCoord.y - ($(card).height()/2), mouseCoord.x - ($(card).width()/2)) * 180/Math.PI) - 90;
    backgroundShineLayerDegree = backgroundShineLayerDegree < 0 ? backgroundShineLayerDegree += 360 : backgroundShineLayerDegree
    var backgroundShineLayer = "linear-gradient(" + backgroundShineLayerDegree + "deg, rgba(255,255,255," + backgroundShineLayerOpacity + ") 0%, rgba(255,255,255,0) 80%)";
    $(card).find(".shineLayer").css("background", backgroundShineLayer);
  });
  
  $(".card").mouseenter( function(event) {
    $(".card").addClass("blur");
    $(this).removeClass("blur");
  });
  
  $(".card").mouseleave( function(event) {
    var card = this;
    $(card).css("transform", "scale3d(1, 1, 1)");
    $(card).find("img").css("transform", "");
    $(card).find(".shineLayer").css("background", "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 80%)");
  
    $(".card").removeClass("blur");
  });