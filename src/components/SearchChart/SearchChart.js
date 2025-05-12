import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SearchChart = ({ stats }) => {
  const queries = Object.keys(stats);
  const upvotesData = queries.map(query => stats[query].upvotes);
  const commentsData = queries.map(query => stats[query].comments);

  const data = {
    labels: queries,
    datasets: [
      {
        label: 'Upvotes',
        data: upvotesData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Comments',
        data: commentsData,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Reddit Search Statistics',
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default SearchChart;