from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL") or 'postgres://postgres:postgres@localhost/flask-hw'
print(app.config['SQLALCHEMY_DATABASE_URI'])

db = SQLAlchemy(app)

@app.route('/')
def index():
    #return 'Hello World!'
    return render_template("index.html")

@app.route('/map')
def map():
    #return 'Hello World!'
    return render_template("map.html")

@app.route('/natural_gas')
def natural_gas():
    #return 'Hello World!'
    return render_template("natural_gas.html")



if __name__ == '__main__':
    app.run()


# @app.route("/api/whatever")
# def my_func():
#     # call databse with criteria

#     return render_template("derek/index.html")
# #     #return json data
# #     return jsonify(data)

#have to use pythondata 3.6.10 on bottom left of VSC



