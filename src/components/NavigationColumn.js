import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchTermStats } from '../features/search/searchSlice';
import { selectSearch } from '../features/search/searchSlice';
import { useNavigate } from 'react-router-dom';
import { clearPosts } from '../features/posts/postsSlice';
import Chart from 'react-apexcharts';

const NavigationColumn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { predefinedQueries, stats, isLoading, error } = useSelector(selectSearch);

  useEffect(() => {
    dispatch(fetchSearchTermStats());
  }, [dispatch]);

  const handleQueryClick = (query) => {
    dispatch(clearPosts());
    navigate(`/search/${encodeURIComponent(query)}`);
  };

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
    <div className="bg-white rounded-lg shadow p-4 sticky top-4">
      <h2 className="text-lg font-semibold mb-4">Search Queries</h2>
      <div className="mb-6">
        <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
      </div>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => {
              dispatch(clearPosts());
              navigate('/');
            }}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            Back to Home
          </button>
        </li>
        {predefinedQueries.map((query) => (
          <li key={query}>
            <button
              onClick={() => handleQueryClick(query)}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors flex justify-between items-center"
            >
              <span className="truncate">{query}</span>
              {stats[query] && (
                <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                  {stats[query].count} posts, {stats[query].score} votes
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      {isLoading && <div className="mt-4 text-center text-gray-500">Loading stats...</div>}
      {error && <div className="mt-4 text-center text-red-500">{error}</div>}
    </div>
  );
};

export default NavigationColumn;