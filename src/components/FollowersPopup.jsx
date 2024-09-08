import { Avatar, Box, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FollowersPopup = ({ open, onClose }) => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}/followers`);
        
        setFollowers(response.data);
      } catch (err) {
        console.error("Error fetching followers:", err);
      }
    };

    if (open) {
      fetchFollowers();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" align="center">
          Followers
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <List>
          {followers.length > 0 ? (
            followers.map((user) => (
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
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
              No followers found.
            </Typography>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default FollowersPopup;
