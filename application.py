# Author: Henry Le
# Date: Jul. 18, 2020
# version 0 - first release
# if you somehow find this file of mine on github, please feel free to take and modify it.
# I wish you the best of luck on what you want to do.
# learning coding is not easy as it's about learning a new language but definitely FUN FUN FUN !!!
# SO, HAVE FUN !

# dependencies
from predict import img_predict
from flask import Flask, jsonify, render_template, request

import json
import time
################## Flask App set up###############
app = Flask(__name__)

##################################################

####### custome routes for website and data######
# main home page route


@app.route("/", methods=["GET", "POST"])
def home_page():
    ''' Home Page Access Route'''
    return render_template("index.html")


# country count per year
@app.route("/prediction", methods=["GET", "POST"])
def predict():
    '''
    create a 2 way communication channels between client and server
    GET , POST method to take incoming data from client
    '''
    incoming_pkg = request.get_json()
   
   # if the packages come in slow, may cause issue of empty package (obj)
    while incoming_pkg is None:
        app.logger.debug("none type inc pk")
        time.sleep(1)
    
    else:
        app.logger.error("no longer none type")

    img_b64_str_encoded = str(incoming_pkg['imgBase64'])   
    prediction = int(img_predict(img_b64_str_encoded))
    
    response = f'Model predicts: {prediction}'

    return jsonify(response=response)
    # return "got the response"

# if program is run from this file ::
if __name__ == '__main__':
    app.run(debug=True)
