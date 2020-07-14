(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 75
  });

  // function to collapse nav bar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 500) {
      $("#mainNav").addClass("navbar-scrolled");
    } else {
      $("#mainNav").removeClass("navbar-scrolled");
    }
  };
  // if not at top :: collapse navbar
  navbarCollapse();

// navbar hiden when scroll
  $(window).scroll(navbarCollapse);



})(jQuery); // End of use strict




// Good trial for Vanilla JS, hope to create a "plain" animation!
var textContainerID = "h1.main-page-title";
var textContainer = document.querySelector(textContainerID);
var textString= textContainer.textContent;
var splittedText = textString.split("");
textContainer.textContent = "";
var strLen = splittedText.length;


for (let i=0; i<strLen; i++) {

  if (splittedText[i] === " ") {
    textContainer.innerHTML += '<span class="hidden-Text">' + "&nbsp" + "</span>";
  }

  else if (splittedText[i] == "#") {
    textContainer.innerHTML += '<span style="display: block;">' + "</span>";
  }

  else {
  textContainer.innerHTML += '<span class="hidden-Text">' + splittedText[i] + "</span>";
  }
}

var nthChild = 0;
var textAnimSpeed = 50;
var userTextWaitTime = textAnimSpeed * strLen;
var timer;

// build a timer loop
setTimeout(userMessage, userTextWaitTime);

function animMainT () {
  
    var animTexts = textContainer.querySelectorAll('span')[nthChild];
    animTexts.setAttribute('class', 'myAnim');
    nthChild++

    if (nthChild == strLen){
      clearInterval(timer);
      timer=null;
    };
  }


// this is for animation text on the webpage upon loading
var facts = [
  "Do you know?",
  "In the last 46 years, 2,666 Satellites have been successfully lauched!",
  "They're orbiting around the Earth 24/7!",
  "That's why we can call our friends & families.",
  "No matter where they are, all days and all nights.",
  "Satellites make GPS available",
  "not only cars but also airplanes!",
  "Pretty AMAZING, right?",
  "But do you know who owns the most satellite?",
  "... make a guess, is it the U.S.A.?",
  "Hum... not sure...",  
  "Then, who come the second and the third?",
  "Rumors said China and Russia...",
  "... but",
  "Do we know the answers for sure?",
  "Let's find out...",
  "... thru amazing Data Analytics & Visualization!",
  "May be we can find interesting facts...",
  "Scroll down to see our team and project.",
  "Or select one of the options in the Navigation Bar.",
  "On behalf of my team...",
  "Thank you for visting and enjoy! -- Henry"
]
  

var nFact=0;
// let timerMsgBox= setInterval(userMessage, 10000);
var msgArea = document.querySelector('#user-exp-text');
var factsLen = facts.length;

// promise to delay the class change - main driving for animation using css
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// since I use the promise, await need to be used so to queu each text change and class change
async function userMessage() {
  
  // first time run, need to get the active class added 
  if(!msgArea.classList.contains("activeText")) {
  msgArea.classList.add('activeText');
  }
  
  // loop thru facts and get each fact, then push it to the message area
  for (nFact=0; nFact<factsLen-1; nFact++) {

    if(!msgArea.classList.contains("inactiveText")) {
      msgArea.classList.add('inactiveText');
    }

    msgArea.classList.replace('inactiveText', 'activeText');
    fact = facts[nFact]
    msgArea.textContent = fact;
    await sleep(3000);
    
    msgArea.classList.replace('activeText', 'inactiveText');
    await sleep(150);
  }
  
    // get the last item in the user mssg box - this will have different anim
  msgArea.textContent = facts.slice(-1);
  msgArea.classList.replace('inactiveText', 'activeText-last');
  
  // timer to call and run the title text anim
  timer= setInterval(animMainT, textAnimSpeed);
  
  // change class to run anim on button 
  document.querySelector('.btn-xl-hidden').classList.replace('btn-xl-hidden', 'btn-xl-show');
  
  // change class to make rolling down prompt
  document.querySelector('.box-arrow-hidden').classList.replace('box-arrow-hidden', 'box-arrow');

  // change class to run the header divider 
  document.querySelector('.masthead-divider-inactive').classList.replace('masthead-divider-inactive', 'masthead-divider-active');
};
