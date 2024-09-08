import { Avatar, Button, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FriendRequestsPopup = ({ open, onClose }) => {
  const [requests, setRequests] = useState([]);

  // Fetch friend requests when the dialog is open
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}/friend-requests`);
        setRequests(response.data);
      } catch (err) {
        console.error("Error fetching friend requests:", err);
      }
    };

    if (open) {
      fetchFriendRequests();
    }
  }, [open]);

  const handleAcceptRequest = async (friendId) => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.post(`http://localhost:3000/api/v1/users/${userId}/accept-friend`, {
        friendId, // Send friendId as per server-side logic
      });
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== friendId)
      );
    } catch (err) {
      console.error('Error accepting friend request:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Friend Requests</DialogTitle>
      <DialogContent dividers>
        <List>
          {requests.length > 0 ? (
            requests.map((request) => (
              <ListItem key={request._id} sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={request.image} sx={{ marginRight: 2 }}>
                  {request.username[0].toUpperCase()}
                </Avatar>
                <ListItemText primary={request.username} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAcceptRequest(request._id)}
                >
                  Accept
                </Button>
              </ListItem>
            ))
          ) : (
            <Typography align="center">No friend requests found.</Typography>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default FriendRequestsPopup;
