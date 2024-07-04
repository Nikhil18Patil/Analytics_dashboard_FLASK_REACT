import React, { useState , useEffect} from 'react';
import BarChart from './barGraph';
import PieChart from './pieChart';
import './Dashboard.css'
import cancel from './images/icons8-cancel-50.png';
import checkIcon from './images/icons8-check-inbox-50.png';
import timeIcon from './images/icons8-time-50.png';


const Dashboard = () => {
    const [data, setData] = useState([]);
    const [total_request, setTotal] = useState();
    const [fail_request, setFail] = useState();
    const [avg, setAvg] = useState();

    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
      requestType: '',
      userAgent: '',
      request_id: '',
    });


    const fetchData = () => {
        setLoading(true);
        fetch('http://127.0.0.1:5000/get_api_data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('status code is not ok');
            }
            return response.json();
          })
          .then(newData => {
            console.log('Received data:', newData.data);
            setData(newData.data);
            setFail(newData.fail_request);
            setTotal(newData.total_request);
            setAvg(newData.avg_response_time)
            setFilteredData(newData.data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error:', error);
            setLoading(false);
          });
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    
      useEffect(() => {
        const applyFilters = () => {
          let filtered = data;
    
          Object.keys(filters).forEach(key => {
            if (filters[key]) {
              filtered = filtered.filter(item =>
                item[key].toString().toLowerCase().includes(filters[key].toLowerCase())
              );
            }
          });
    
          setFilteredData(filtered);
        };
    
        applyFilters();
      }, [filters, data]);
    
      const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
          ...filters,
          [name]: value,
        });
      };

  return (
    <div className='Analytics_bord'>

     <div className='upper'>
        <h1>Hello! 👋</h1>  
        <div class="search-container">
            <input type="text" placeholder="Search..."/>
            <div class="search-icon">&#128269;</div>
        </div>                
     </div>

     <div className='request_counts'>
            <div className="ii_t">
                <img src={checkIcon} alt="check Icon" className="menuu-icon" />
                <div className='req_count'>
                    <p>Total Request</p>
                    <h1>{total_request}</h1>
                </div>
            </div>
            <div className="ii_t">
                <img src={timeIcon} alt="time Icon" className="menuu-icon" />
                <div className='req_count'>
                    <p>AVG. Response time </p>
                    <h1>{avg}</h1>
                </div>
            </div>
            <div className="ii_t">
                <img src={cancel} alt="cancel Icon" className="menuu-icon" />
                <div className='req_count'>
                    <p>Failed Request</p>
                    <h1>{fail_request}</h1>
                </div>
            </div>      
     </div>

     <div className='charts'>
         <div className='Bar_chart'> 
         <BarChart data={data} />
         </div>
         <div className='Pie_chart'>
         <PieChart data={data} />
         </div>
    </div>


    
    <div className="requestTable">
 
  <div className="filters">
    <input
      type="text"
      placeholder="Filter by Request Type"
      name="requestType"
      value={filters.requestType}
      onChange={handleFilterChange}
    />
    <input
      type="text"
      placeholder="Filter by User Agent"
      name="userAgent"
      value={filters.userAgent}
      onChange={handleFilterChange}
    />
    <input
      type="text"
      placeholder="Filter by Request ID"
      name="request_id"
      value={filters.request_id}
      onChange={handleFilterChange}
    />
  </div>
  <div className="header-row">
    <span className="request-tag">Request</span>
    <div className="right-controls">
      <button className="search-button">Search</button>
      <select className="days-filter">
        <option>Last 30 Days</option>
        <option>Last 7 Days</option>
        <option>Last 24 Hours</option>
      </select>
    </div>
  </div>
  <div className="table-container">
    {filteredData.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Content Type</th>
            <th>IP Address</th>
            <th>OS Type</th>
            <th>Payload</th>
            <th>Request Time</th>
            <th>Request Type</th>
            <th>Request ID</th>
            <th>User Agent</th>
            <th>Response Time</th>
            <th>Request Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.contentType}</td>
              <td>{item.ip_address}</td>
              <td>{item.os_type}</td>
              <td>{item.payload}</td>
              <td>{item.requestTime}</td>
              <td>{item.requestType}</td>
              <td>{item.request_id}</td>
              <td>{item.userAgent}</td>
              <td>{item.response_time}</td>
              <td>{item.request_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No data available</p>
    )}
  </div>
</div>


    </div>
  );
}

export default Dashboard;
