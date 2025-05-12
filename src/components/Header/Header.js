import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, IconButton, AppBar, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RedditIcon from '@mui/icons-material/Reddit';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          onClick={() => navigate('/')}
        >
          <RedditIcon fontSize="large" />
        </IconButton>
        <form onSubmit={handleSearch} className="search-form">
          <TextField
            placeholder="Search Reddit..."
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton type="submit">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </form>
      </Toolbar>
    </AppBar>
  );
};

export default Header;