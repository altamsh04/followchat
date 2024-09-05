import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import { Box, IconButton } from '@mui/material';
import React from 'react';

const BottomIcons = ({ setShowFollowSection, setShowProfileSection, showFollowSection }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px',
        borderTop: '1px solid #ddd',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '95%',
        backgroundColor: '#2c2c2c',
        zIndex: 1000,
      }}
    >
      <IconButton onClick={() => {
        setShowProfileSection(false); // Hide the profile section
        setShowFollowSection(false); // Hide the follow section
      }}>
        <ChatIcon sx={{ color: '#f0f0f0' }} />
      </IconButton>

      <IconButton onClick={() => {
        setShowProfileSection(false); // Hide the profile section
        setShowFollowSection(!showFollowSection); // Toggle the follow section
      }}>
        <GroupIcon sx={{ color: '#f0f0f0' }} />
      </IconButton>
    </Box>
  );
};

export default BottomIcons;
