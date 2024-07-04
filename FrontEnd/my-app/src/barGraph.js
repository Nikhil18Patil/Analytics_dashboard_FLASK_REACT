import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data }) => {
  const [barChartCriteria, setBarChartCriteria] = useState('ip_address');

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
        backgroundColor: 'rgba(0, 0, 139, 0.2)', // Dark blue with 20% opacity
        borderColor: 'rgba(0, 0, 139, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bar-chart">
      <h2>Number of Requests by {barChartCriteria}</h2>
      <select onChange={(e) => setBarChartCriteria(e.target.value)}>
        <option value="ip_address">IP Address</option>
        <option value="os_type">OS Type</option>
        <option value="requestType">Request Type</option>
        <option value="request_id">Request ID</option>
      </select>
      <Bar data={barData} options={options} />
    </div>
  );
};

export default BarChart;
