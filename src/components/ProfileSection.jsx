import { Avatar, Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProfileSection = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError("User not found in localStorage.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}`);
        console.log(response.data);
        setUser(response.data); // Assuming the API returns the user data
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to fetch user profile.");
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 2, color: '#f0f0f0', textAlign: 'center' }}>
      <Avatar
        src={user.image}
        sx={{ width: 100, height: 100, margin: 'auto' }}
      >
        {user.username[0]}
      </Avatar>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        {user.username}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        {user.email}
      </Typography>
      {/* <Typography variant="body2" sx={{ marginTop: 1, color: '#bbb' }}>
        {user.bio}
      </Typography> */}
      <Button
        variant="contained"
        sx={{ marginTop: 2, backgroundColor: '#555', color: '#f0f0f0' }}
        onClick={() => console.log('Edit profile clicked')}
      >
        Edit Profile
      </Button>
    </Box>
  );
};

export default ProfileSection;
