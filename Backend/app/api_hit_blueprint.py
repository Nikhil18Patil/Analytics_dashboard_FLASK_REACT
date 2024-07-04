from flask import Blueprint ,current_app , redirect ,request , json ,jsonify 
from .models import Apianalytics , engine
from sqlalchemy.orm import sessionmaker
from user_agents import parse
from sqlalchemy import func , Integer
import datetime
import uuid



api_analytics_bp= Blueprint('api_analytics_bp', __name__)


@api_analytics_bp.route('/get_api_data', methods=['GET'])
def get_api_data():
    """
    this api use to get api hit data
    endpoint- {ip}:5000/get_api_data
    method-GET
    input-None
    output-{
        data:[{data of api hit}]
    }"""
    try:
        Session=sessionmaker(bind=engine)
        session = Session()
        data_l=[]
        data=session.query(Apianalytics).all()
        for i in data:
            data_l.append({"id":i.R_id, "request_id":i.request_id , "requestType":i.requestType,"requestTime":i.requestTime,"payload":i.payload ,"contentType":i.contentType ,"ip_address":i.ip_address ,"os_type":i.os_type , "userAgent":i.userAgent })
        session.close()   
        return jsonify(data=data_l), 200
    except Exception as e:
        return jsonify(error=f'{e}'), 500
    

def add_api_hit(request, requestType, requestId, response_time , request_status ,body=""):
    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        session.begin()

        # Calculate the new R_id
        i_d = session.query(func.max(func.cast(func.substr(Apianalytics.R_id, 2), Integer))).scalar() or 0
        new_R_id = "R0" + str(i_d + 1)
        
        user_agent_str = request.headers.get('User-Agent')
        user_agent = parse(user_agent_str)
        os_type = user_agent.os.family
        
        # Collect analytics data
        request_id = requestId
        request_time = datetime.datetime.now()
        payload = body
        content_type = request.headers.get('Content-Type', 'application/json')
        ip_address = request.remote_addr
        user_agent_str = request.user_agent.string
        
        # Create an instance of Apianalytics
        analytics_data = Apianalytics(
            id=str(uuid.uuid4()),  # Generate a UUID for the primary key
            R_id=new_R_id,
            request_id=request_id,
            requestType=requestType,
            requestTime=request_time,
            payload=str(payload),  # Convert payload to string if it's JSON
            contentType=content_type,
            ip_address=ip_address,
            os_type=os_type,
            userAgent=user_agent_str,
            response_time=response_time,
            request_status=request_status
            
        )
        
        session.add(analytics_data)
        session.commit()
        
    except IntegrityError:
        session.rollback()
        raise
    finally:
        session.close()    


        