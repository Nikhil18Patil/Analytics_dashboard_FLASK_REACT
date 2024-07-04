import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="pie-chart">
      <h2>Number of Requests by Browser</h2>
      <Pie data={pieData} options={options} />
    </div>
  );
};

export default PieChart;
