
'use strict';

const video = document.getElementById('video');
var canvas;

const errorMsgElement = document.querySelector('span#errorMsg');




// Access webcam
async function init() {
    try {
        const constraints = {
            audio: false,
            video: {
                width: 640, height: 480
            }
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        canvas = document.getElementById('mycanvas');
        handleSuccess(stream);
        console.log("this is stream :: ", stream)
    }
    catch (e) {
        // errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
        alert(`navigator.getUserMedia error:${e.toString()}`);
    }
}

// Success
function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;
    console.log("this is video :: ", video );
}

// Load init


// Draw image
function drawCanvas()
    {
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);

}