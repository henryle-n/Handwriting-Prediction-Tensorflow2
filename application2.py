# dependencies
from flask import Flask, jsonify, render_template



################## Flask App set up###############
app = Flask(__name__)


####### custome routes for website and data######
# main home page route
@app.route("/")
def home_page():
    ''' Home Page Access Route'''
    return render_template("index.html")

# to data filterable
@app.route("/data-filterable")
def get_images():
    ''' save images '''
    return render_template("get_images.html")



# if program is run from this file ::
if __name__ == '__main__':
    app.run(debug=True)
