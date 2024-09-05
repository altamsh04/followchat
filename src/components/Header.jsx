import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';

const Header = ({ setShowProfileSection, setShowFollowSection, showFollowSection, showProfileSection }) => {
  let title;
  
  if (showProfileSection) {
    title = 'Profile'; // Title for the profile section
  } else if (showFollowSection) {
    title = 'Friends'; // Title for the follow section
  } else {
    title = 'Chats'; // Title for the chat section
  }

  const handleAccountClick = () => {
    setShowProfileSection(true); // Show profile section
    setShowFollowSection(false); // Hide follow section
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start', // Align items to the left
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #333',
      }}
    >
      <IconButton onClick={handleAccountClick} sx={{ color: '#f0f0f0' }}>
        <AccountCircleIcon />
      </IconButton>
      <Typography variant="h5" sx={{ color: '#f0f0f0', fontWeight: 'bold', marginLeft: '10px' }}>
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
