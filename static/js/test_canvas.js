const picFormat = "png";
const strokeStyle = 'black';
const lineWidth = 20;
const lineJoin = "round";
const lineCap = "round";
const fillStyle = "white";

$(function () {
  console.log('test canvas')
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
  console.log('Drawing on Canvas')
  // event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

  // Add the event listeners for mousedown, mousemove, and mouseup
  canvas.addEventListener('mousedown', e => {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
  });

  canvas.addEventListener('mousemove', e => {
    if (isDrawing === true) {
      drawLine(ctx, x, y, e.offsetX, e.offsetY);
      x = e.offsetX;
      y = e.offsetY;
    }
  });

  window.addEventListener('mouseup', e => {
    if (isDrawing === true) {
      drawLine(ctx, x, y, e.offsetX, e.offsetY);
      x = 0;
      y = 0;
      isDrawing = false;
    }
  });

  function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = lineJoin;
    ctx.lineCap = lineCap;
    ctx.fillStyle = fillStyle
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
  }
  // =====================================
  // Add download and display image from canvas
  // =====================================
  const btnClear = document.querySelector('#btnClear');
  const btnDisplay = document.querySelector('#btnDisplay');
  const btnDownload = document.querySelector('#btnDownload');
  const btnUpload = document.querySelector('#btnUpload');
  const btnPredict = document.querySelector('#btnPredict');
  const imgConverted = document.querySelector('#imgConverted');

  btnClear.addEventListener('click', function () {
    console.log('Function : btnClear');
    console.log("clear button hit");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //  clear out the img URI and prepare for the new one
    imgConverted.src ="";
  });

  btnDisplay.addEventListener('click', function () {
    const dataURI = canvas.toDataURL(`image/${picFormat}`, 1.0);
    imgConverted.src = dataURI;
    console.log('Show DatURI: ', dataURI);
    console.log('She Image Converted: ', imgConverted);
  });

  btnDownload.addEventListener('click', function () {
    console.log('download');
    // IE/Edge Support (PNG Only)
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

  btnUpload.addEventListener('click', function () {
    console.log('upload');
    const base64 = canvas.toDataURL().split(',')[1];
    const body = {
      'gererated-at': new Date().toISOString(),
      'png': base64
    };

    console.log('Print Body', body);
    
    
    // fetch('http://127.0.0.1:5500', {
    //   method: 'post',
    //   body: JSON.stringify(body),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
  });

  btnPredict.addEventListener('click', function submitDrawing() {
    console.log("you hit predict button")
  
    const imgURI = canvas.toDataURL(`image/${picFormat}`, 1.0).split(',');
    console.log("Submitting from Predict Button: " + imgURI[0] + "\n" + imgURI[1]);
  
    var curRoot = window.location.href;
    var predictURL = curRoot ;//+ 'prediction';
    console.log(`this is the current URL : \n ${predictURL}`)
    var xhttpReq = new XMLHttpRequest();
    xhttpReq.open("GET", predictURL, true);
    xhttpReq.onreadystatechange = data => {
      // 1: not send yet, 2: request sent, 3: something back, 4: got full response
      // 200 : successfully requested
      // https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
      if (this.readyState == 4 && this.status == 200) {
        console.log("this is data :: ", data);
        // document.querySelector("#results").innerHTML = data.result;
      }
    }
    xhttpReq.onerror = err => console.log(`Send Request Error:\n${err}`)
    // xhttpReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log("this is the imgURI", imgURI);
    const sendPkg = {
      imgURI: imgURI,
    };
  
    xhttpReq.send(sendPkg);
  
    console.log("");
  });
});




