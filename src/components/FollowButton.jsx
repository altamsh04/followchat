import { Button } from '@mui/material';
import React from 'react';

const FollowButton = ({ followed, onClick }) => {
  return (
    <Button
      variant="contained"
      color={followed ? "error" : "primary"}
      onClick={onClick}
      sx={{
        marginLeft: 'auto',
        color: '#f0f0f0',
        backgroundColor: followed ? '#ff1744' : '#1976d2',
      }}
    >
      {followed ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
