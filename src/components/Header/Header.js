import { useState } from 'react';
import { searchPosts } from '../../services/redditApi';
import { getCacheKey, getCached, setCached } from '../../services/cache';
import '../../styles/main.css';

const Header = ({ onSearchComplete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      const cacheKey = getCacheKey('search', { q: searchQuery });
      const cachedResults = getCached(cacheKey);

      if (cachedResults) {
        onSearchComplete(cachedResults);
      } else {
        const results = await searchPosts(searchQuery);
        setCached(cacheKey, results);
        onSearchComplete(results);
      }
    } catch (err) {
      if (err.response?.status === 429) {
        setSearchError({
          message: 'Search is rate limited. Please wait before searching again.',
          isRateLimit: true
        });
      } else {
        setSearchError('Failed to perform search. Please try again.');
      }
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <header className="header">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search Reddit..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isSearching}
        />
        <button type="submit" disabled={isSearching}>
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>
      {searchError && (
        <div className="search-error">
          {searchError.message}
          {searchError.isRateLimit && (
            <button onClick={handleSearch}>Retry</button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;