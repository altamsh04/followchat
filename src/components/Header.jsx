import { Box, Typography } from '@mui/material';
import React from 'react';

const Header = ({ showFollowSection, showProfileSection }) => {
  let title;
  
  if (showProfileSection) {
    title = 'Profile'; // Title for the profile section
  } else if (showFollowSection) {
    title = 'Follow'; // Title for the follow section
  } else {
    title = 'Chats'; // Title for the chat section
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #333',
      }}
    >
      <Typography variant="h5" sx={{ color: '#f0f0f0', fontWeight: 'bold' }}>
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
