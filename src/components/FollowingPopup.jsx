import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FollowingPopup = ({ open, onClose }) => {
  const [followingUsers, setFollowingUsers] = useState([]);

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}`);
        const followedFriends = response.data.friends.filter(friend => friend.followed);

        const followedUsers = await Promise.all(
          followedFriends.map(async (friend) => {
            const userResponse = await axios.get(`http://localhost:3000/api/v1/users/${friend.friendId}`);
            return userResponse.data;
          })
        );

        setFollowingUsers(followedUsers);
      } catch (err) {
        console.error("Error fetching followed users:", err);
      }
    };

    if (open) {
      fetchFollowingUsers();
    }
  }, [open]);

  const handleUnfollow = async (friendId) => {
    const userId = localStorage.getItem('userId');
    try {
      await axios.post(`http://localhost:3000/api/v1/users/${userId}/unfollow`, { friendId });
      setFollowingUsers(prev => prev.filter(user => user._id !== friendId));
    } catch (err) {
      console.error("Error unfollowing user:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" align="center">
          Following
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <List>
          {followingUsers.length > 0 ? (
            followingUsers.map((user) => (
              <ListItem
                key={user._id}
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 8px' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={user.image} alt={user.username} sx={{ width: 48, height: 48, marginRight: 2 }}>
                    {user.username[0].toUpperCase()}
                  </Avatar>
                  <ListItemText
                    primary={user.username}
                    primaryTypographyProps={{ fontWeight: 500, fontSize: '1.1rem' }}
                  />
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ textTransform: 'none' }}
                  onClick={() => handleUnfollow(user._id)}
                >
                  Unfollow
                </Button>
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
              No users found.
            </Typography>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default FollowingPopup;
