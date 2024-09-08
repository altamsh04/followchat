import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FollowersPopup from '../components/FollowersPopup';
import FollowingPopup from '../components/FollowingPopup';
import FriendRequestsPopup from '../components/FriendRequestsPopup'; // Import FriendRequestsPopup

const ProfileSection = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');

  const [openFollowingPopup, setOpenFollowingPopup] = useState(false);
  const [openFollowersPopup, setOpenFollowersPopup] = useState(false);
  const [openFriendRequestsPopup, setOpenFriendRequestsPopup] = useState(false); // State for FriendRequestsPopup

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError("User not found in localStorage.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}`);
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (err) {
        setError("Failed to fetch user profile.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.put(`http://localhost:3000/api/v1/users/${userId}`, {
        username,
        email,
      });
      setIsEditingUsername(false);
      setIsEditingEmail(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleEditUsernameClick = () => {
    setIsEditingUsername(!isEditingUsername);
  };

  const handleEditEmailClick = () => {
    setIsEditingEmail(!isEditingEmail);
  };

  const handleOpenDialog = (title, content) => {
    setDialogTitle(title);
    setDialogContent(content);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenFollowingPopup = () => {
    setOpenFollowingPopup(true);
  };

  const handleCloseFollowingPopup = () => {
    setOpenFollowingPopup(false);
  };

  const handleOpenFollowersPopup = () => {
    setOpenFollowersPopup(true);
  };

  const handleCloseFollowersPopup = () => {
    setOpenFollowersPopup(false);
  };

  const handleOpenFriendRequestsPopup = () => {
    setOpenFriendRequestsPopup(true); // Open FriendRequestsPopup
  };

  const handleCloseFriendRequestsPopup = () => {
    setOpenFriendRequestsPopup(false); // Close FriendRequestsPopup
  };

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

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          disabled={!isEditingUsername}
          sx={{ marginRight: 1 }}
        />
        <IconButton onClick={handleEditUsernameClick}>
          {isEditingUsername ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          disabled={!isEditingEmail}
          sx={{ marginRight: 1 }}
        />
        <IconButton onClick={handleEditEmailClick}>
          {isEditingEmail ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      </Box>

      {(isEditingUsername || isEditingEmail) && (
        <Button
          variant="contained"
          sx={{ marginTop: 2, backgroundColor: '#555', color: '#f0f0f0' }}
          onClick={handleSave}
        >
          Save
        </Button>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 4 }}>
        <Button
          variant="contained"
          sx={{ marginBottom: 1, backgroundColor: '#444' }}
          onClick={handleOpenFriendRequestsPopup} // Trigger for FriendRequestsPopup
        >
          Requests
        </Button>
        <Button
          variant="contained"
          sx={{ marginBottom: 1, backgroundColor: '#444' }}
          onClick={handleOpenFollowersPopup} // Trigger for FollowersPopup
        >
          Followers
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#444' }}
          onClick={handleOpenFollowingPopup}
        >
          Following
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
      </Dialog>

      <FollowingPopup
        open={openFollowingPopup}
        onClose={handleCloseFollowingPopup}
      />
      <FollowersPopup
        open={openFollowersPopup}
        onClose={handleCloseFollowersPopup}
      />
      <FriendRequestsPopup
        open={openFriendRequestsPopup}
        onClose={handleCloseFriendRequestsPopup} // FriendRequestsPopup component
      />
    </Box>
  );
};

export default ProfileSection;
