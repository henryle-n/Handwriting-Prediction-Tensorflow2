$(function () {
  console.log('test canvas')
  // ================================================
  // myCanvas Note Pad 1
  // ================================================

  // When true, moving the mouse draws on the canvas
  let isDrawing = false;
  let x = 0;
  let y = 0;

  const canvas = document.getElementById('test_Canvas');
  const ctx = canvas.getContext('2d');

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
    ctx.lineWidth = 10;
    ctx.lineJoin = "round";
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
  }

  console.log('line 72')
  // =====================================
  // Add submit function out put as array
  // =====================================

  var submit_btn = document.getElementById('submit_btn');

  console.log(submit_btn)

  // ---------------
  // Test Function on Button Click
  // ---------------

  // submit_btn.addEventListener('click', consoleTest);
  // function consoleTest()
  // {
  //   {console.log('test')}
  // }
  // console.log('after add event')

  // ---------------
  // Test addEventListener on Button Click
  // ---------------
  //submit_btn.addEventListener('click', function(){console.log('Test Click Button')});


  submit_btn.addEventListener('click', submit_imgArray);

  console.log('before enter submit_image')
  function submit_imgArray() {
    console.log('test submit_image');
    image_array = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(image_array);
  }

  // =====================================
  // Add submit function out put as image
  // =====================================

  //Set canvasImg image src to dataURL (png format 96 dpi by default)
  // Set canvasImg image src to dataURL
  // So it can be saved as an image
  // const canvas = document.getElementById('test_Canvas');
  // const ctx = canvas.getContext('2d');

  upload_btn.addEventListener('click', submit_ImgURL);
  // upload_btn.addEventListener('click', consoleTest);
  // function consoleTest()
  // {
  //   {console.log('upload_btn')}
  // }
  function submit_ImgURL() {
    // const t_canvasImg = document.getElementById('test_Canvas');
    // const t_ctx = t_canvasImg.getContext('2d');
    console.log('function submit_ImgURL')
    var dataURL = canvas.toDataURL();
    document.getElementById('test_canvasImg').src = dataURL;
    console.log(dataURL);
    

    // let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // t_ctx.putImageData(t_ctx);
    // console.log(imgSmall);
    // const width = 28;
    // const height = 28;
    // elem.width = width;
    // elem.height = height;
    // imgNo.addEventListener('load', e => {
    //   ctx.drawImage(dataURL, 0, 0);
    // })
  }




});
