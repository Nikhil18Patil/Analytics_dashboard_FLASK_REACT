import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Chart = ({ data }) => {
  const [barChartCriteria, setBarChartCriteria] = useState('ip_address');

  // Data for Pie Chart - Number of Requests by Browser
  const browserCount = data.reduce((acc, item) => {
    const browser = item.userAgent.split(' ')[0];
    acc[browser] = (acc[browser] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(browserCount),
    datasets: [
      {
        label: 'Number of Requests',
        data: Object.values(browserCount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for Bar Chart - Flexible criteria
  const criteriaCount = data.reduce((acc, item) => {
    const criteria = item[barChartCriteria];
    acc[criteria] = (acc[criteria] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(criteriaCount),
    datasets: [
      {
        label: 'Number of Requests',
        data: Object.values(criteriaCount),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options to make the charts responsive
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="visualization">
      <div className='pie'>
        <h2>Number of Requests by Browser</h2>
        <Pie data={pieData} options={options} />
     </div>
    <div  className='bar'>
        <h2>Number of Requests by {barChartCriteria}</h2>
        <select onChange={(e) => setBarChartCriteria(e.target.value)}>
          <option value="ip_address">IP Address</option>
          <option value="os_type">OS Type</option>
          <option value="requestType">Request Type</option>
          <option value="request_id">Request ID</option>
        </select>
        <Bar data={barData} options={options} />
    </div>
    </div>
  );
};

export default Chart;
