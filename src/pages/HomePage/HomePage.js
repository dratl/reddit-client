import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { fetchMultipleQueriesStats } from '../../api/redditApi';
import { fetchQueryStats, selectAllQueries, selectQueryStats } from '../../features/search/searchSlice';
import SearchChart from '../../components/SearchChart/SearchChart';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queries = useSelector(selectAllQueries);
  const stats = useSelector(selectQueryStats);

  useEffect(() => {
    dispatch(fetchQueryStats(queries));
  }, [dispatch, queries]);

  const handleQueryClick = (query) => {
    navigate(`/search/${encodeURIComponent(query)}`);
  };

  return (
    <div className="home-page">
      <div className="content">
        <h1>Reddit Search Trends</h1>
        <SearchChart stats={stats} />
        <div className="queries-list">
          <h2>Predefined Searches</h2>
          <ul>
            {queries.map((query) => (
              <li key={query} onClick={() => handleQueryClick(query)}>
                {query}
                {stats[query] && (
                  <span className="stats">
                    {stats[query].upvotes} upvotes • {stats[query].comments} comments
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;