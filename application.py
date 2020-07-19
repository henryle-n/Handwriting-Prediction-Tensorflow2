# Author: Henry Le
# Date: Jul. 18, 2020
# version 0 - first release
# if you somehow find this file of mine on github, please feel free to take and modify it. 
# I wish you the best of luck on what you want to do.
# learning coding is not easy as it's about learning a new language but definitely FUN FUN FUN !!!
# SO, HAVE FUN !

# dependencies
from  predict import img_predict
from flask import Flask, jsonify, render_template, request


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
    author = incoming_pkg['author']
    img_b64_str_encoded = incoming_pkg['imgBase64']

    # app.logger.debug(f"This is the imc pkg ::\n {incoming_pkg}")
    # app.logger.debug(f"This is the author ::\n {author}")
    # app.logger.debug(f"This is the img pk::\n {img_b64_str_encoded}")
    
    result = img_predict(img_b64_str_encoded)
    app.logger.debug("this is number what?", result)
    print ("this is the result :: \n", result[0])
    r
    done = "hey it's done"
    return done

# if program is run from this file ::
if __name__ == '__main__':
    app.run(debug=True)