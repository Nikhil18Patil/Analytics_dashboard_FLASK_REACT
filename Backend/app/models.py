from sqlalchemy import  Integer , String , Boolean , create_engine , Float  ,Column
from sqlalchemy.ext.declarative import declarative_base 
from sqlalchemy_utils import database_exists , create_database 
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import relationship
from flask import current_app



Base= declarative_base()

#example database for api hits
class Person(Base):
    __tablename__="person"
    id=Column(String(250) , primary_key=True )
    name=Column(String(255), nullable=False)
    email=Column(String(255), nullable=False)
    city=Column(String(255), nullable=False)


#api hit database, here all data of any request hit will be saved   
class Apianalytics(Base):
    __tablename__ = 'apianalytics'
    id = Column(String(36), primary_key=True)  
    R_id = Column(String(350),  nullable=False)  
    request_id = Column(String(250), nullable=False)
    requestType = Column(String(250), nullable=False)
    requestTime = Column(String(50), nullable=False)
    payload = Column(String(400))
    contentType = Column(String(250))
    ip_address = Column(String(250), nullable=False)
    os_type = Column(String(250), nullable=False)
    userAgent = Column(String(250), nullable=False)
 
# uri="'postgresql://username:password@localhost/dbname'" 
#if you want to use the postgresql , put your credentials and use the above url ,
uri ="sqlite:///person.db"
engine= create_engine(uri)  
if not database_exists(engine.url):
    create_database(engine.url)  
Base.metadata.create_all(engine)
 