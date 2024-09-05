import SearchIcon from '@mui/icons-material/Search';
import { Box, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const FollowTabs = ({ activeTab, handleTabChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // You can add functionality to search for a friend here based on `searchTerm`
  };

  return (
    <>
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

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: '#333' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Following" />
          <Tab label="Followers" />
        </Tabs>
      </Box>

      {/* Content under tabs */}
      <Box sx={{ padding: 2, color: '#f0f0f0', overflowY: 'auto', flexGrow: 1 }}>
        {activeTab === 0 && (
          <Typography>
            Follower List...
          </Typography>
        )}
        {activeTab === 1 && (
          <Typography>
            Followers List...
          </Typography>
        )}
      </Box>
    </>
  );
};

export default FollowTabs;
