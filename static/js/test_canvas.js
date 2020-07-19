const picFormat = "png";
const strokeStyle = 'blue';
const lineWidth = 20;
const lineJoin = "round";
const lineCap = "round";
const fillStyle = "white";
var  xPosList=[];




$(function () {

  // =====================================
  // Add download and display image from canvas
  // =====================================
  const btnClear = document.querySelector('#btnClear');
  const btnDownload = document.querySelector('#btnDownload');
  const btnUpload = document.querySelector('#btnUpload');
  const btnPredict = document.querySelector('#btnPredict');
  const imgConverted = document.querySelector('#imgConverted');
  var imgConvertedContext = imgConverted.getContext('2d');

  imgConvertedContext.fillStyle = "rgb(255, 255, 255)";


  console.log('test canvas');

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
    }
  });

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

  btnClear.addEventListener('click', function () {
    console.log('Function : btnClear');
    console.log("clear button hit");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    imgConvertedContext.clearRect(0, 0, imgConverted.width, imgConverted.height);
    //  clear out the img URI and prepare for the new one
    imgConverted.src = "";
  });

  btnPredict.addEventListener('click', function () {

    // remember to hide the resized canvas by style='display:none'
    const dataURI = canvas.toDataURL(`image/${picFormat}`, 1.0);
    var img = new Image();
    img.onload = function () {
      imgConvertedContext.drawImage(img, 0, 0, 300, 300, 0, 0, 28, 28);
    };
    img.src = dataURI;
    console.log('This is the final large Img URL :: ', dataURI);
    submitDrawing(dataURI)
    // var resizeImgURI = imgConverted.toDataURL(`image/${picFormat}`, 1.0);
    // checkPkg(resizeImgURI);
    // function checkPkg (URI) {
    //   let flag1 = /data/i.test(URI);
    //   let flag2 = /=/i.test(URI);
    //   // let flag1 = URI.includes("data");
    //   // let flag2 = URI.includes("=");
    //   console.log("this is flag data", flag1, flag2);
    //   if (flag1 == true && flag2==true) {
    //     console.log("done encoded with base64 ready");
    //     console.log("resizeImgURI :: ", resizeImgURI);
    //     return true;
    //   } else {
    //     window.setTimeout(checkPkg, 100);
    //     console.log("encoding base64 not ready");
    //     return false;
    //   }
    // };

    // const dataURI = canvas.toDataURL(`image/${picFormat}`, 1.0);
    // function checkPkg() {
    //   let flag1 = resizeImgURI.includes("data");
    //   let flag2 = resizeImgURI.includes("=");
    //   console.log("this is flag data", resizeImgURI, dataURI, flag1, flag2);
    //   if (flag1 == true && flag2==true) {
    //     console.log("done encoded with base64 ready");
    //   } else {
    //     window.setTimeout(checkPkg, 100);
    //     console.log("encoding base64 not ready");
    //   }
    // };
  
  });

  


  /* ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
  img	Specifies the image, canvas, or video element to use	 
  sx	Optional. The x coordinate where to start clipping	
  sy	Optional. The y coordinate where to start clipping	
  swidth	Optional. The width of the clipped image	
  sheight	Optional. The height of the clipped image	
  x	The x coordinate where to place the image on the canvas	
  y	The y coordinate where to place the image on the canvas	
  width	Optional. The width of the image to use (stretch or reduce the image)	
  height	Optional. The height of the image to use (stretch or reduce the image)
  */


  // btnPredict.addEventListener('click', function () {
  //   const dataURI = canvas.toDataURL(`image/${picFormat}`, 1.0);

  //   var resizedCanvas = document.createElement("canvas");
  //   console.log("resize canvas created");
  //   resizedCanvas.setAttribute("class", "reSizeImg");
  //   resizedCanvas.setAttribute("width", "50px");
  //   resizedCanvas.setAttribute("height", "50px");
  //   resizedCanvas.setAttribute("style", "border:1px solid #000000; background-color: white");
  //   var resizedContext = resizedCanvas.getContext("2d");

  //   resizedCanvas.height = "100";
  //   resizedCanvas.width = "100";

  //   resizedContext.drawImage(dataURI, 0, 0, 300, 300, 0, 0, 28, 28);
  //   var myResizedData = resizedCanvas.toDataURL();
  //   imgConverted.src = myResizedData;

  // });

  btnDownload.addEventListener('click', function () {
    console.log('download');
    // let newC = document.querySelector('#imgConverted').toDataURL(`image/${picFormat}`, 1.0);
    // var npArr = imgConverted.get_image_data(x=0, y=0);
    // console.log("smaller img np arr :: ", npArr);
    // IE/Edge Support (PNG Only)
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(imgConverted.msToBlob(), `canvas-img.${picFormat}`);
    } 
    else {
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = imgConverted.toDataURL();
      console.log("data from download button :: ", newC);
      a.download = `canvas-img.${picFormat}`;
      a.click();
      document.body.removeChild(a);
    }
  });

  // btnUpload.addEventListener('click', function () {
  //   console.log('upload');
  //   const base64 = canvas.toDataURL().split(',')[1];
  //   const body = {
  //     'gererated-at': new Date().toISOString(),
  //     'png': base64
  //   };

  //   console.log('Print Body', body);

  // });

  // btnPredict.addEventListener('click', submitDrawing);

  function submitDrawing(imgURL) {
    console.log("you hit predict button")
    console.log(`Full Image URI :: \n ${imgURL}`);
    var imgURL = imgURL.split(',')[imgURL.split(',').length-1];
    console.log("this is the imgURL :: ", imgURL);

    var curRoot = window.location.href;
    var predictURL = `${curRoot}prediction`;
    console.log(`this is the current URL : \n ${predictURL}`)
    var xhttpReq = new XMLHttpRequest();
    xhttpReq.open("POST", predictURL, true);
    xhttpReq.setRequestHeader('Content-type', 'application/json');
    xhttpReq.onreadystatechange = data => {
      // 1: not send yet, 2: request sent, 3: something back, 4: got full response
      // 200 : successfully requested
      // https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(xhr.responseText);
        console.log("this is data :: ", response);
        // document.querySelector("#results").innerHTML = data.result;
      }
    }
    xhttpReq.onerror = err => console.log(`Send Request Error:\n${err}`);
    const sendPkg = {
      imgBase64: `${imgURL}`,
      author: "Henry N Le"
    };
    xhttpReq.send(JSON.stringify(sendPkg));


  //   $.ajax({
  //     type: "POST", 
  //     url: predictURL,
  //     data : JSON.stringify(sendPkg),
  //     contentType: "application/json",
  // });

  }
});