// import React, { useEffect, useState } from 'react';
// import Chart from './chart';
// import h1 from './table.jpeg';
// import socket from './socket';
// import './App.css';

// function App() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchData = () => {
//     setLoading(true);
//     fetch('http://127.0.0.1:5000/user/get_api_data', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('status code is not ok');
//         }
//         return response.json();
//       })
//       .then(newData => {
//         console.log('Received data:', newData.data);
//         setData(newData.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="App">
//       <div className="dashboard">
//         <h1 className="h1">API Hit Analytics Dashboard</h1>
//         <button onClick={fetchData} className="refresh-button">Refresh</button>
//         {loading ? (
//           <div className="spinner">
//             <div className="loading-circle"></div>
//             <p>Loading...</p>
//           </div>
//         ) : (
//           <>
//             {data && <Chart data={data} />}
//             <div className="table_data">
//               {data && Array.isArray(data) ? (
//                 <table>
//                   <thead>
//                     <tr>
                      
//                       <th>ID</th>
//                       <th>CONTENT TYPE</th>
//                       <th>IP ADDRESS</th>
//                       <th>OS TYPE</th>
//                       <th>PAYLOAD</th>
//                       <th>REQUEST TIME</th>
//                       <th>REQUEST TYPE</th>
//                       <th>REQUEST ID</th>
//                       <th>USER AGENT</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data.map((item, index) => (
//                       <tr key={index}>
                        
//                         <td>{item.id}</td>
//                         <td>{item.contentType}</td>
//                         <td>{item.ip_address}</td>
//                         <td>{item.os_type}</td>
//                         <td>{item.payload}</td>
//                         <td>{item.requestTime}</td>
//                         <td>{item.requestType}</td>
//                         <td>{item.request_id}</td>
//                         <td>{item.userAgent}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <p>No data available</p>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import Chart from './chartComponent';
import './App.css';

function App() {
  const [data, setData] = useState([]);
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
    <div className="App">
      <div className="dashboard">
        <h1 className="h1">API Hit Analytics Dashboard</h1>
        <button onClick={fetchData} className="refresh-button">Refresh</button>
        {loading ? (
          <div className="spinner">
            <div className="loading-circle"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {filteredData && <Chart data={filteredData} />}
            <div className="table_data">
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
              {filteredData.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>CONTENT TYPE</th>
                      <th>IP ADDRESS</th>
                      <th>OS TYPE</th>
                      <th>PAYLOAD</th>
                      <th>REQUEST TIME</th>
                      <th>REQUEST TYPE</th>
                      <th>REQUEST ID</th>
                      <th>USER AGENT</th>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No data available</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
