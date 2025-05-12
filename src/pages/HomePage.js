import React from 'react';
import { useSelector } from 'react-redux';
import { selectSearch } from '../features/search/searchSlice';
import Chart from 'react-apexcharts';

const HomePage = () => {
  const { stats, predefinedQueries } = useSelector(selectSearch);

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: predefinedQueries,
    },
    yaxis: {
      title: {
        text: 'Count',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const chartSeries = [
    {
      name: 'Posts',
      data: predefinedQueries.map((query) => stats[query]?.count || 0),
    },
    {
      name: 'Comments',
      data: predefinedQueries.map((query) => stats[query]?.comments || 0),
    },
    {
      name: 'Votes',
      data: predefinedQueries.map((query) => stats[query]?.score || 0),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Reddit Search Analytics</h2>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">About This App</h3>
        <p className="mb-4">
          This application displays Reddit posts based on predefined search queries. Click on any
          search term in the left navigation to view the latest posts.
        </p>
        <p>
          The chart above shows the number of posts, comments, and votes for each search term in the
          past three days.
        </p>
      </div>
    </div>
  );
};

export default HomePage;