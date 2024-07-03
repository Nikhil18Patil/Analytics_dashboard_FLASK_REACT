from flask import Flask , json , jsonify
from flask_cors import CORS
from app.blueprints import all_bluprints
import os

def create_app():
    app=Flask(__name__)
    CORS(app)#will set the cors according to my origins and configurations i want
    #here i am registering all the blueprints 
    for b_prints in all_bluprints:
        app.register_blueprint(b_prints)
 
    @app.route('/')
    def hello():
        return jsonify(message=" hey server is running , happy ^_^ ")
    
    return app


    