/*
++++++++++++++++++++++++++++++++++++++++++++++++++++
Author: Henry Le & Panarat Duke
Date: Jul, 2020
++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

// Declare variables
const picFormat = "png";
const strokeStyle = 'black';
const lineWidth = 20;
const lineJoin = "round";
const lineCap = "round";
const fillStyle = "white";
var xPosList = [];
var dataURI;




// this function below will post (streaming) img data
// to the server (managed by Flask App), get number prediction
// then send the response back to client (user) browser

function submitDrawing(imgURL) {
  var imgURL = imgURL.split(',')[imgURL.split(',').length - 1];

  // due to different location of where the file is host
  // build dynamic home directory for the website
  var curRoot = window.location.href;

  var predictURL = `${curRoot}prediction`;

  var xhttpReq = new XMLHttpRequest();

  xhttpReq.open("POST", predictURL, true);

  xhttpReq.setRequestHeader('Content-type', 'application/json');

  xhttpReq.onreadystatechange = function () {
    if (xhttpReq.readyState === XMLHttpRequest.DONE) {
      var status = xhttpReq.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        // The request has been completed successfully
        document.querySelector("#result")
          .innerHTML = JSON.parse(xhttpReq.responseText).prediction;
     
      }
      else {
        alert("WARNING :: REQUEST ERROR !!!");
      }
    }
  };
  xhttpReq.onerror = err => console.log(`Send Request Error:\n${err}`);
  const sendPkg = {
    imgBase64: `${imgURL}`
  };
  xhttpReq.send(JSON.stringify(sendPkg));
  // ###########################################################
  //           THE POWER OF JQUERY ValidityState. VANILLA
  // ###########################################################
  // with this simpler ajax, same results can be achieved
  // the power of lib vs.no lib
  /*
  console.log("Summiting AJAX REQ");
  var request = $.ajax({
    type: "POST",
    url: predictURL,
    data: JSON.stringify(sendPkg),
    contentType: "application/json",
    statusCode: {
      200: () => console.log('ajax call receives response')
    },
  });
  request.done(function (resp) {
    console.log(`receive msg from server ${resp.response}`);
    // $( "#log" ).html( msg );
  });

  request.fail(function (jqXHR, textStatus) {
    console.log(`Request failed: " + ${textStatus}`);
  });
  */
}

// this function is for making the drawing on canvas if we have base64

var imgUloaded;
function previewFiles() {

  // var preview = document.querySelector('#preview');
  var files = document.querySelector('input[type=file]').files;

  function readAndPreview(file) {

    // Make sure `file.name` matches our extensions criteria
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      var reader = new FileReader();

      reader.addEventListener("load", function () {
        var image = new Image();

        image.height = 100;
        image.title = file.name;
        image.src = this.result;
        imgUloaded = image.src;
        submitDrawing(image.src);
        makeDrawing(image.src);
      }, false);
      reader.readAsDataURL(file);
    }
  }
  if (files) {
    [].forEach.call(files, readAndPreview);
  }
}


function makeDrawing(base64) {
  let EL = (sel) => document.querySelector(sel);
  let ctxx = EL("#hwCanvas").getContext("2d");
  const img = new Image();

  img.src = base64;
  img.onload = function () {
    ctxx.drawImage(img, 0, 0, img.height + 40, img.width + 40, 0, 0, 300, 300);
  };
  ctxx.clearRect(0, 0, ctxx.canvas.width, ctxx.canvas.height);

}




// Use jquerry short hand to make sure the html loaded before this function runs
$(function () {

  // =====================================
  // Add download and display image from canvas
  // =====================================
  const btnClear = document.querySelector('#btnClear');
  const btnDownload = document.querySelector('#btnDownload');
  const btnUpload = document.querySelector('#btnUpload');
  const btnPredict = document.querySelector('#btnPredict');
  const imgConverted = document.querySelector('#imgConverted');

  // Create smaller canvas matches MNIST dataset 28 x 28 to help users visualize how tiny it is actually
  // pageYOffset, the prediction accuracy of new digit is phenomenal thanks to the CNN
  var imgConvertedContext = imgConverted.getContext('2d');
  imgConvertedContext.fillStyle = "rgb(255, 255, 255)";

  // ================================================
  // myCanvas Note Pad 1
  // ================================================

  // When true, moving the mouse draws on the canvas
  let isDrawing = false;
  let x = 0;
  let y = 0;
  const canvas = document.getElementById('hwCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

  // Add the event listeners for mousedown, mousemove, and mouseup
  canvas.addEventListener('mousedown', e => {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
    xPosList.push(x);
  });

  canvas.addEventListener('mousemove', e => {
    if (isDrawing === true) {
      drawLine(ctx, x, y, e.offsetX, e.offsetY, strokeStyle);
      x = e.offsetX;
      y = e.offsetY;
    }
  });

  window.addEventListener('mouseup', e => {
    if (isDrawing === true) {
      drawLine(ctx, x, y, e.offsetX, e.offsetY, strokeStyle);
      x = 0;
      y = 0;
      isDrawing = false;

      // get img data from big canvas
      dataURI = canvas.toDataURL(`image/${picFormat}`, 1.0);

      // more interactive for user if smaller canvas
      // and drawing are submitted as soon as user pause drawing
      drawSmallCanvas(dataURI);
      submitDrawing(dataURI);
      document.getElementById("result").innerHTML = "...";
    }
  });

  /*
  ##############################################
  method: 1 :: STREAMING USER DRAWN CANVAS 
  ##############################################
  */
  // constantly tracks user's mouse location and draws the line
  function drawLine(ctx, x1, y1, x2, y2, strS) {
    ctx.beginPath();
    ctx.strokeStyle = strS;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = lineJoin;
    ctx.lineCap = lineCap;
    ctx.fillStyle = fillStyle
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
  };
  // add button and DOM events for the main page
  btnClear.addEventListener('click', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    imgConvertedContext.clearRect(0, 0, imgConverted.width, imgConverted.height);
    //  clear out the img URI and prepare for the new one
    imgConverted.src = "";
    document.getElementById("result").innerHTML = ""
  });

  // if desired, user can download the canvas 
  // the img save from these canvas are excellent to create
  // one's own dataset and train the model instead of using MNIST
  btnDownload.addEventListener('click', function () {
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(canvas.msToBlob(), `canvas-img.${picFormat}`);
    } else {
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = canvas.toDataURL();
      a.download = `canvas-img.${picFormat}`;
      a.click();
      document.body.removeChild(a);
    }
  });


  function drawSmallCanvas(URI) {
    var img = new Image();
    img.onload = function () {
      imgConvertedContext.drawImage(img, 0, 0, 300, 300, 0, 0, 28, 28);
    };
    img.src = URI;
  };


  /*#################################################
        method: 2 :: USER UPLOADED IMAGE
  #################################################*/
  // // due to the time constraint, this function was not made
  // // available on time when this project is realeased


  // btnUpload.addEventListener('click', function () {
  //   console.log('upload');
  //   const base64 = canvas.toDataURL().split(',')[1];
  //   const body = {
  //     'gererated-at': new Date().toISOString(),
  //     'png': base64
  //   };
  // });
});

