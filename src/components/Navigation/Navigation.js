import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAllQueries, selectQueryStats } from '../../features/search/searchSlice';
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();
  const { query } = useParams();
  const queries = useSelector(selectAllQueries);
  const stats = useSelector(selectQueryStats);

  const handleQueryClick = (selectedQuery) => {
    if (selectedQuery !== query) {
      navigate(`/search/${encodeURIComponent(selectedQuery)}`);
    }
  };

  return (
    <div className="navigation-container">
      <h2>Predefined Searches</h2>
      <ul className="navigation-list">
        {queries.map((q) => (
          <li
            key={q}
            className={`navigation-item ${decodeURIComponent(query) === q ? 'active' : ''}`}
            onClick={() => handleQueryClick(q)}
          >
            <span className="query-text">{q}</span>
            {stats[q] && (
              <span className="query-stats">
                <span className="stat">{stats[q].upvotes} ▲</span>
                <span className="stat">{stats[q].comments} 💬</span>
              </span>
            )}
          </li>
        ))}
      </ul>
      <button
        className="back-button"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Navigation;