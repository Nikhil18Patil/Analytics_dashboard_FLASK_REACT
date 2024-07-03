from flask import current_app , Blueprint , json, jsonify , redirect , url_for , request
from  .models import  Person , Apianalytics , engine
from sqlalchemy import func  , Integer
from sqlalchemy.orm import sessionmaker
from  .api_hit_blueprint import add_api_hit
from user_agents import parse
import datetime


user_bp= Blueprint('user_bp' , __name__)

@user_bp.route('/add_person', methods=['POST'])
def add_person():
    """
    this api use to add person data
    endpoint- {ip}:5000/add_person
    method-POST
    input-{
        "name":"Nikhil" , "email":"abc@gmail.com" , "city":"Bhopal"
    }
    output-{
        message-Data added successfully for
    }
    """
    try:
        # import pdb ; pdb.set_trace()
        data = request.json
        name = data.get('name')
        email = data.get('email')
        city = data.get('city')
        
        if not name or not email or not city:
            return jsonify(error="One of the fields is not present"), 400
        
        Session = sessionmaker(bind=engine)
        session = Session()

        # Calculate the new person id
        i_dd = session.query(func.max(func.cast(func.substr(Person.id, 2), Integer))).scalar() or 0
        new_p_id = "P0" + str(i_dd + 1)
        
        # Create a new person instance
        new_person = Person(id=new_p_id, name=name, email=email, city=city)
        session.add(new_person)
        session.commit()
        requestType="POST"
        requestId="add-item"
        payload=data
        add_api_hit(request, session , requestType , requestId , payload)
        session.close()
          
        return jsonify(message=f"Data added successfully for "), 201
    except Exception as e:
        return jsonify(error=f'{e}'), 500


@user_bp.route('/get_all_person', methods=['GET'])
def get_person():
    """
    this api use to get all person data
    endpoint- {ip}:5000/get_all_person
    method-GET
    input-None
    output-{
        data:[{"id":"P01", "name":"Nikhil" , "email":"abc@gmail.com" , "city":"Bhopal"},
              {"id":"P01" ,"name":"Nikhil" , "email":"abc@gmail.com" , "city":"Bhopal"},
              {"id":"P01", "name":"Nikhil" , "email":"abc@gmail.com" , "city":"Bhopal"}
        ]
    }
    """
    try:
        
        Session=sessionmaker(bind=engine)
        session=Session()
        
        data=session.query(Person).all()
        data_l=[]
        for i in data:
            data_l.append({"Person_id":i.id ,"name":i.name , "email":i.email , "city" : i.city})
        
        
        requestId = request.headers.get('RequestId', 'get-item')
        requestType='GET'
        add_api_hit(request, session , requestType , requestId )
         
        session.close()   
        return jsonify(data=data_l), 200        
    except Exception as e:
        return  jsonify(error=f'{e}'), 500



@user_bp.route('/update_person/<string:id>', methods=['PUT'])
def update_person(id):
    """
    this api use to update the person data
    endpoint- {ip}:5000/update_person/<string:id>
    method-PUT
    input-{
        "name":"Nikhil" , "email":"abc@gmail.com" , "city":"Bhopal"
    }
    output-{
        message-Data updated successfully
    }
    """
    try:
        data = request.json
        name = data.get('name', None)
        email = data.get('email', None)
        city = data.get('city', None)

        if not name and not email and not city:
            return jsonify(error="No field to update"), 400

        Session = sessionmaker(bind=engine)
        session = Session()
        person = session.query(Person).filter_by(id=id).first()

        if not person:
            return jsonify(error="Person not found"), 404

        if name:
            person.name = name
        if email:
            person.email = email
        if city:
            person.city = city

        session.commit()

        requestId = request.headers.get('RequestId', 'update-item')
        payload=data
        requestType='PUT'
        add_api_hit(request, session , requestType , requestId , payload)
        
        session.close()

        return jsonify(message=f"Data updated successfully "), 200
    except Exception as e:
        return jsonify(error=f'{e}'), 500

@user_bp.route('/delete_person/<string:id>', methods=['DELETE'])
def delete_person(id):
    """
    this api use to delete the person data
    endpoint- {ip}:5000/delete_person/<string:id>
    method-DELETE
    input-None
    output-{
        message-Data deleted successfully
    }
    """
    try:
        Session = sessionmaker(bind=engine)
        session = Session()
        person = session.query(Person).filter_by(id=id).first()

        if not person:
            return jsonify(error="Person not found"), 404

        session.delete(person)
        session.commit()

        requestId = request.headers.get('RequestId', 'delete-item')
        payload=""
        requestType='DELETE'
        add_api_hit(request, session , requestType , requestId , payload)

        
        session.close()

        return jsonify(message=f"Data deleted successfully"), 200
    except Exception as e:
        return jsonify(error=f'{e}'), 500


@user_bp.route('/hey')
def hey():
    try:
        Session = sessionmaker(bind=engine)
        session = Session()
        requestId = request.headers.get('RequestId', 'get-item')
        payload=""
        requestType='GET'
        add_api_hit(request, session , requestType , requestId , payload)
  
        return jsonify(message=" hey server is running , happy ^_^ ")
    except Exception as e:
        return jsonify(error=" something wrong -> :{ "), 500
        
