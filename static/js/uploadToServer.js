// This function accepts three arguments, the URL of the image to be 
// converted, the mime type of the Base64 image to be output, and a 
// callback function that will be called with the data URL as its argument 
// once processing is complete

var convertToBase64 = function(url, imagetype, callback){

    var img = document.createElement('IMG'),
        canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        data = '';

    // Set the crossOrigin property of the image element to 'Anonymous',
    // allowing us to load images from other domains so long as that domain 
    // has cross-origin headers properly set

    img.crossOrigin = 'Anonymous'

    // Because image loading is asynchronous, we define an event listening function that will be called when the image has been loaded
    img.onLoad = function(){
        // When the image is loaded, this function is called with the image object as its context or 'this' value
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        data = canvas.toDataURL(imagetype);
        callback(data);
    };

    // We set the source of the image tag to start loading its data. We define 
    // the event listener first, so that if the image has already been loaded 
    // on the page or is cached the event listener will still fire

    img.src = url;
};

// Here we define the function that will send the request to the server. 
// It will accept the image name, and the base64 data as arguments

var sendBase64ToServer = function(name, base64){
    var httpPost = new XMLHttpRequest(),
        path = "http://127.0.0.1:8000/uploadImage/" + name,
        data = JSON.stringify({image: base64});
    httpPost.onreadystatechange = function(err) {
            if (httpPost.readyState == 4 && httpPost.status == 200){
                console.log(httpPost.responseText);
            } else {
                console.log(err);
            }
        };
    // Set the content type of the request to json since that's what's being sent
    httpPost.setHeader('Content-Type', 'application/json');
    httpPost.open("POST", path, true);
    httpPost.send(data);
};

// This wrapper function will accept the name of the image, the url, and the 
// image type and perform the request

var uploadImage = function(src, name, type){
    convertToBase64(src, type, function(data){
        sendBase64ToServer(name, data);
    });
};

// Call the function with the provided values. The mime type could also be png
// or webp

uploadImage(imgsrc, name, 'image/jpeg')