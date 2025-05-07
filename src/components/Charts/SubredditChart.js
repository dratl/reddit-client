// src/components/Charts/SubredditChart.js
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../actions/postsActions';
import '../../styles/main.css';

// Register chart components
Chart.register(...registerables);

const SubredditChart = ({ subreddits }) => {
  const chartRef = useRef(null);
  const dispatch = useDispatch();
  const { postsBySubreddit = {} } = useSelector((state) => state.posts);
  
  // Fetch data for each subreddit when component mounts
  useEffect(() => {
    subreddits.forEach(subreddit => {
      if (!postsBySubreddit[subreddit]) {
        dispatch(fetchPosts(subreddit, 'hot', 10));
      }
    });
  }, [dispatch, subreddits, postsBySubreddit]);

  // Create or update chart when data changes
  useEffect(() => {
    if (!subreddits.length) return;

    const ctx = chartRef.current.getContext('2d');
    
    const datasets = subreddits.map(subreddit => {
      const posts = postsBySubreddit[subreddit] || [];
      const avgScore = posts.length 
        ? posts.reduce((sum, post) => sum + post.score, 0) / posts.length 
        : 0;
      
      return {
        label: `r/${subreddit}`,
        data: [avgScore],
        backgroundColor: getRandomColor(),
      };
    });

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Average Score'],
        datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Average Post Score by Subreddit',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Score',
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [subreddits, postsBySubreddit]);

  // Helper function for random colors
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="chart-wrapper">
      <canvas ref={chartRef} />
    </div>
  );
};

export default SubredditChart;