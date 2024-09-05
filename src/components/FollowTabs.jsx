import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';

const FollowTabs = ({ activeTab, handleTabChange }) => {
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: '#333' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Follow" />
          <Tab label="Followers" />
        </Tabs>
      </Box>
      <Box sx={{ padding: 2, color: '#f0f0f0', overflowY: 'auto', flexGrow: 1 }}>
        {activeTab === 0 && (
          <Typography>
            Follow List...
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
