from flask import Flask , json , jsonify , request , g
from flask_cors import CORS
from app.blueprints import all_bluprints
from app.api_hit_blueprint import add_api_hit
import time

def create_app():
    app=Flask(__name__)
    CORS(app)#will set the cors according to my origins and configurations i want
    #here i am registering all the blueprints 
    for b_prints in all_bluprints:
        app.register_blueprint(b_prints)
    
    @app.before_request
    def before_request():
        g.start_time = time.time()
        
        request_id_map = {
            'POST': 'add-item',
            'GET': 'get-item',
            'PUT': 'update-item',
            'DELETE': 'delete-item',
            'PATCH': 'patch-item',
            'OPTIONS': 'options-item',
            'HEAD': 'head-item'
        }
        
        request_id = request_id_map.get(request.method, 'unknown')
        request_type = request.method
        body = request.get_json(silent=True) or ""
        
        try:
            add_api_hit(request, request_type, request_id, body)
            print("Before Request: Analytics data has been logged.")
        finally:
            print("Done")
        
    @app.route('/')
    def hello():
        return jsonify(message=" hey server is running , happy ^_^ ")
    
    return app


  