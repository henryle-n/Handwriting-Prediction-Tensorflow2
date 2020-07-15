(function($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
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
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 75
    });

    // function to collapse nav bar
    var navbarCollapse = function() {
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




// // Good trial for Vanilla JS, hope to create a "plain" animation!
// var textContainerID = "h1.main-page-title";
// var textContainer = document.querySelector(textContainerID);
// var textString = textContainer.textContent;
// var splittedText = textString.split("");
// textContainer.textContent = "";
// var strLen = splittedText.length;


// for (let i = 0; i < strLen; i++) {

//     if (splittedText[i] === " ") {
//         textContainer.innerHTML += '<span class="hidden-Text">' + "&nbsp" + "</span>";
//     } else if (splittedText[i] == "#") {
//         textContainer.innerHTML += '<span style="display: block;">' + "</span>";
//     } else {
//         textContainer.innerHTML += '<span class="hidden-Text">' + splittedText[i] + "</span>";
//     }
// }

// var nthChild = 0;
// var textAnimSpeed = 50;
// var userTextWaitTime = textAnimSpeed * strLen;
// var timer;

// // build a timer loop
// setTimeout(userMessage, userTextWaitTime);

// function animMainT() {

//     var animTexts = textContainer.querySelectorAll('span')[nthChild];
//     animTexts.setAttribute('class', 'myAnim');
//     nthChild++

//     if (nthChild == strLen) {
//         clearInterval(timer);
//         timer = null;
//     };
// }


// // this is for animation text on the webpage upon loading
// var facts = [
//     "Do you know?",
//     "In the last 46 years, 2,666 Satellites have been successfully lauched!",
//     "They're orbiting around the Earth 24/7!",
//     "That's why we can call our friends & families.",
//     "No matter where they are, all days and all nights.",
//     "Satellites make GPS available",
//     "not only cars but also airplanes!",
//     "Pretty AMAZING, right?",
//     "But do you know who owns the most satellite?",
//     "... make a guess, is it the U.S.A.?",
//     "Hum... not sure...",
//     "Then, who come the second and the third?",
//     "Rumors said China and Russia...",
//     "... but",
//     "Do we know the answers for sure?",
//     "Let's find out...",
//     "... thru amazing Data Analytics & Visualization!",
//     "May be we can find interesting facts...",
//     "Scroll down to see our team and project.",
//     "Or select one of the options in the Navigation Bar.",
//     "On behalf of my team...",
//     "Thank you for visting and enjoy! -- Henry"
// ]


// var nFact = 0;
// // let timerMsgBox= setInterval(userMessage, 10000);
// var msgArea = document.querySelector('#user-exp-text');
// var factsLen = facts.length;

// promise to delay the class change - main driving for animation using css
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// since I use the promise, await need to be used so to queu each text change and class change
async function userMessage() {

    // first time run, need to get the active class added 
    if (!msgArea.classList.contains("activeText")) {
        msgArea.classList.add('activeText');
    }

    // loop thru facts and get each fact, then push it to the message area
    for (nFact = 0; nFact < factsLen - 1; nFact++) {

        if (!msgArea.classList.contains("inactiveText")) {
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
    timer = setInterval(animMainT, textAnimSpeed);

    // change class to run anim on button 
    document.querySelector('.btn-xl-hidden').classList.replace('btn-xl-hidden', 'btn-xl-show');

    // change class to make rolling down prompt
    document.querySelector('.box-arrow-hidden').classList.replace('box-arrow-hidden', 'box-arrow');

    // change class to run the header divider 
    document.querySelector('.masthead-divider-inactive').classList.replace('masthead-divider-inactive', 'masthead-divider-active');
};



function canvasLayer(location, id) {

    this.width = $(window).width();
    this.height = $(window).height();
    this.element = document.createElement('myCanvas');

    $(this.element)
        .attr('myCanvas', id)
        .text('unsupported browser')
        .width(this.width)
        .height(this.height)
        .appendTo(location);

    this.context = this.element.getContext("2d");
}



// this.element = $(myCanvas)[0];
// context = document.getElementById('myCanvas').getContext("2d").getContext('webgl');


// Prepare HTML5 Canvas: Scripting


$(function() {

    // var canvas = document.querySelector("myCanvas");
    // var context = canvas.getContext("2d");
    // var context = canvas.getContext('webgl'); // will always be null

    this.element = $(myCanvas)[0];
    context = document.getElementById('myCanvas').getContext("2d").getContext('webgl');

    var canvasDiv = document.getElementById('myCanvas');
    canvas = document.createElement('canvas');



    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext("2d");

    //  Create a Simple Drawing "myCanvas"
    $('#canvas').mousedown(function(e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });
    $('#canvas').mousedown(function(e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    //   Mouse Move Event: 

    $('#canvas').mousemove(function(e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });
    //   Mouse Up Event: 
    $('#canvas').mouseup(function(e) {
        paint = false;
    });


    // Mouse Leave Event: 

    $('#canvas').mouseleave(function(e) {
        paint = false;
    });


    //   Here is the addClick function that will save the click position:
    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;

    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }


    // The redraw function is where the magic happens. Each time the function is called the canvas is cleared and everything is redrawn


    function redraw() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

        context.strokeStyle = "#df4b26";
        context.lineJoin = "round";
        context.lineWidth = 5;

        for (var i = 0; i < clickX.length; i++) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.stroke();
        }
    }
    var colorPurple = "#cb3594";
    var colorGreen = "#659b41";
    var colorYellow = "#ffcf33";
    var colorBrown = "#986928";

    var curColor = colorPurple;


    var clickColor = new Array();

    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
        clickColor.push(curColor);
    }

    var height = (canvas.height = window.innerHeight);
    var width = (canvas.width = window.innerWidth);

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    let mouseClicked = false;

    document.addEventListener("click", onMouseClick, false);
    document.addEventListener("mousemove", onMouseMove, false);

    function onMouseClick(e) {
        mouseClicked = !mouseClicked;
    }

    function onMouseMove(e) {
        if (mouseClicked) {
            context.beginPath();
            context.arc(e.clientX, e.clientY, 7.5, 0, Math.PI * 2, false);
            context.lineWidth = 5;
            context.strokeStyle = getRandomColor();
            context.stroke();
        }
    }

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("scream");
    ctx.drawImage(img, 10, 10);

    // -------PANARAT CODE------




    // When true, moving the mouse draws on the canvas
    let isDrawing = false;
    let x = 0;
    let y = 0;
    const canvas3 = document.getElementById('myCanvas');
    const context3 = canvas3.getContext('2d');
    // event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.
    // Add the event listeners for mousedown, mousemove, and mouseup
    canvas3.addEventListener('mousedown', e => {
        x = e.offsetX;
        y = e.offsetY;
        isDrawing = true;
    });
    canvas3.addEventListener('mousemove', e => {
        if (isDrawing === true) {
            drawLine(context3, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
        }
    });
    window.addEventListener('mouseup', e => {
        if (isDrawing === true) {
            drawLine(context3, x, y, e.offsetX, e.offsetY);
            x = 0;
            y = 0;
            isDrawing = false;
        }
    });

    function drawLine(context3, x1, y1, x2, y2) {
        context3.beginPath();
        context3.strokeStyle = 'black';
        context3.lineWidth = 5;
        context.lineJoin = "round";
        context3.moveTo(x1, y1);
        context3.lineTo(x2, y2);
        context3.stroke();
        context3.closePath();
    }

});