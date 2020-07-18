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
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
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
  const imgConverted = document.querySelector('#imgConverted');
  const hwCanvas = document.querySelector('#hwCanvas')
  const hwctx = hwCanvas.getContext('2d');

  btnClear.addEventListener('click', function(){
    console.log('Function : btnClear');   
    // hwctx.fillStyle = "white";
    // ctx.fillRect(0, 0, 150, 150);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    imgConverted.src ="";
  });

  btnDisplay.addEventListener('click', function () {
    const dataURI = hwCanvas.toDataURL('image/png');
    imgConverted.src = dataURI;
    console.log('Show DatURI: ',dataURI);
    console.log('She Image Converted: ',imgConverted);
  });

  btnDownload.addEventListener('click', function () {
    console.log('download');
    // IE/Edge Support (PNG Only)
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(hwCanvas.msToBlob(), 'canvas-img.png');
    } else {
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = hwCanvas.toDataURL();
      a.download = 'canvas-img.png';
      a.click();
      document.body.removeChild(a);
    }
  });

  btnUpload.addEventListener('click', function () {
    console.log('upload');
    const base64 = hwCanvas.toDataURL().split(',')[1];

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
  // // Make window object and wait for request comes through
  // const xhr = new XMLHttpRequest();
  // // when response comes back show response into html
  // xhr.onload = function(){
  //   const serverResponse = document.getElementById('serverResponse');
  //   serverResponse.innerHTML = this.responseText;
  // };
  // // http method 'POST' and URL 'dom.php'
  // xhr.open('POST',fetch());
  // // set content-type header is very important
  // xhr.setRequestHeader('Content-type','application/x-www-form-urlendcoded');
  // // send request
  // xhr.send('name=domenic&message=How s going');
});
