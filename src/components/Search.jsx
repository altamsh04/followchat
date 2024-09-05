import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField } from '@mui/material';
import React from 'react';

const Search = () => (
  <Box sx={{ padding: '10px' }}>
    <TextField
      fullWidth
      placeholder="Search or start new chat"
      variant="outlined"
      size="small"
      sx={{
        input: { color: '#f0f0f0' },
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: '#555' },
          '&:hover fieldset': { borderColor: '#777' },
          '&.Mui-focused fieldset': { borderColor: '#fff' },
        },
      }}
      InputProps={{
        startAdornment: <SearchIcon sx={{ mr: 1, color: '#aaa' }} />,
      }}
    />
  </Box>
);

export default Search;
