import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Box mb={4} sx={{ fontFamily: 'Roboto', display: 'flex', alignItems: 'center' }}>
      <SearchIcon sx={{ mr: 2 }} />
      <TextField
        label="Search Items"
        value={query}
        onChange={handleSearch}
        variant="outlined"
        fullWidth
        InputProps={{ style: { backgroundColor: 'white' } }}
      />
    </Box>
  );
};

export default SearchBar;
