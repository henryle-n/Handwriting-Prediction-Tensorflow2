var sourceImage;

function stepByStepResize() {
     img = new Image();
    img.src = sourceImage;
    
    img.onload = () => {
    
		var originalCanvas = document.getElementById("canvas1");
		var originalCanvasContext = originalCanvas.getContext("2d");

		originalCanvas.width = img.width;
		originalCanvas.height = originalCanvas.width * (img.height / img.width);
		
		//	Set original canvas size
		originalCanvasContext.drawImage(img, 0, 0, originalCanvas.width, 				originalCanvas.height);
		
			var canvas2 = document.getElementById("canvas2");
			var canvas2context = canvas2.getContext("2d");

			canvas2.width = Math.floor(originalCanvas.width / 2);
			canvas2.height = Math.floor(originalCanvas.width / 2);

			//	Set original canvas size
			canvas2context.drawImage(originalCanvas, 0, 0, originalCanvas.width, originalCanvas.height, 0, 0, canvas2.width, canvas2.height);
			
			var canvas3 = document.getElementById("canvas3");
			var canvas3context = canvas3.getContext("2d");

			canvas3.width = Math.floor(canvas2.width / 2);
			canvas3.height = Math.floor(canvas2.width / 2);

			//	Set original canvas size
						canvas3context.drawImage(canvas2, 0, 0, canvas2.width, canvas2.height, 0, 0, canvas3.width, canvas3.height);

			
			var canvas4 = document.getElementById("canvas4");
			var canvas4context = canvas4.getContext("2d");

			canvas4.width = Math.floor(canvas3.width / 2);
			canvas4.height = Math.floor(canvas3.width / 2);

			//	Set original canvas size
									canvas4context.drawImage(canvas3, 0, 0, canvas3.width,   canvas3.height, 0, 0, canvas4.width, canvas4.height);				
									
  		// Now use target canvas, to hold the final image, and output image from it

    } // End of the img.onLoad
}

function directResize() {
img = new Image();
    img.src = sourceImage;
    
    img.onload = () => {
			var directCanvas = document.getElementById("direct");
			var directCanvasContext = directCanvas.getContext("2d");

			directCanvas.width = canvas4.width
			directCanvas.height = canvas4.height;

			//	Set original canvas size
			directCanvasContext.drawImage(img, 0, 0, directCanvas.width, 	 
																		directCanvas.height);
																		
			// Now use target canvas, to hold the final image, and output image from it
		} // End of the img.onLoad
}

function resizingCanvas() {
 		img = new Image();
    img.src = sourceImage;
    
    img.onload = () => {
    
		// Now for the efficient loop solution
		var resizingCanvas = document.getElementById("loopcanvas");
		var resizingCanvasContext = resizingCanvas.getContext("2d");

    resizingCanvas.width = img.width;
    resizingCanvas.height = img.height;

    // Draw the image on the temp resizing canvas
    resizingCanvasContext.drawImage(img, 0, 0, resizingCanvas.width, resizingCanvas.height);

		var width = 200;
		var height = width * (img.height / img.width);
						
		var curWidth = img.width; 
		var curHeight = img.height;
						
    // Quickly reduce the dize by 50% each time in few itterations until the size is less then
    // 2x time the target size - the motivation for it, is to reduce the aliasing that would have been
    // created with direct reduction of very big image to small image
     while (curWidth * 0.5 > width) {
     		// Reduce the resizing canvas by half and refresh the image
        halfWidth = Math.floor(curWidth * 0.5);
        halfHeight = Math.floor(curHeight * 0.5);
		
        resizingCanvasContext.drawImage(resizingCanvas, 0, 0, curWidth, curHeight, 0, 0, halfWidth, halfHeight);
							
		  	curWidth = halfWidth
   		  curHeight = halfHeight;
     }
						
		// Now do fineal resize for the resizingCanvas to meet the dimension requirments
		resizingCanvasContext.drawImage(resizingCanvas, 0, 0, curWidth, curHeight, 0, 0, width, height);
	
	  // Now use target canvas, to hold the final image, and output image from it
	} // End of the img.onLoad				
}

stepByStepResize();
directResize();
resizingCanvas();

