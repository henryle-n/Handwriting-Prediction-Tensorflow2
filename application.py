# Author: Henry Le
# Date: Jul. 18, 2020
# version 0 - first release
# if you some how find this file of mine on github, please feel free to take and modify it. I wish you the best of luck on what you want to do.
# learning coding is not easy as it's about learning a new language but definitely FUN FUN FUN !!!
# HAVE FUN !

# dependencies
from  prediction import img_predict
from flask import Flask, jsonify, render_template, request
import tensorflow as tf


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
    incoming_pkg = request.get_json()
    author = incoming_pkg['author']
    app.logger.debug(f"This is the author ::\n {author}")
    app.logger.debug(f"This is the imc pkg ::\n {incoming_pkg}")
    app.logger.debug('================================')
    # img_b64_str_encoded = request.get_json()['imgBase64']
    # app.logger.debug(f"This is the img data ::\n {img_b64_str_encoded}")
        
    result = "is ran already"
    return jsonify(result)


# if program is run from this file ::
if __name__ == '__main__':
    print(tf.__version__)
    app.run(debug=True)