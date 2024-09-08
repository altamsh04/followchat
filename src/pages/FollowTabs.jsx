import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FollowButton from '../components/FollowButton';

const FollowTabs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchCurrentUserId = () => {
      const userId = localStorage.getItem('userId');
      setCurrentUserId(userId);
    };
    
    fetchCurrentUserId();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [usersResponse, currentUserResponse] = await Promise.all([
          axios.get("http://localhost:3000/api/v1/users"),
          axios.get(`http://localhost:3000/api/v1/users/${currentUserId}`)
        ]);

        const currentUser = currentUserResponse.data;

        // Filter users who are not in the current user's friends list
        const usersNotInFriendsList = usersResponse.data
          .filter(user => 
            user._id !== currentUserId && 
            !currentUser.friends.some(friend => friend.friendId.toString() === user._id)
          )
          .map((user) => ({
            ...user,
            followed: currentUser.friends.some(friend => friend.friendId.toString() === user._id && friend.followed) // Check if user is followed
          }));
          
        setUsers(usersNotInFriendsList);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    if (currentUserId) {
      fetchUsers();
    }
  }, [currentUserId]);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleFollow = async (friendId) => {
    if (!currentUserId) return;
    console.log(friendId);

    try {
      await axios.post(`http://localhost:3000/api/v1/users/${currentUserId}/follow`, {
        friendId: friendId,
      });

      const updatedUsers = users.map((user) =>
        user._id === friendId ? { ...user, followed: true } : user
      );
      setUsers(updatedUsers);

      // Alert user
      window.alert('Followed successfully!');
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        fullWidth
        placeholder="Search or start new chat"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          input: { color: "#f0f0f0" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#555" },
            "&:hover fieldset": { borderColor: "#777" },
            "&.Mui-focused fieldset": { borderColor: "#fff" },
          },
        }}
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1, color: "#aaa" }} />,
        }}
      />

      <Box sx={{ marginTop: 2 }}>
        {filteredUsers.length > 0 ? (
          <List sx={{ overflowY: "auto", maxHeight: "400px" }}>
            {filteredUsers.map((user) => (
              <ListItem
                key={user._id}
                sx={{
                  "&:hover": { backgroundColor: "#333" },
                  "&.Mui-selected": {
                    backgroundColor: "#444",
                    "&:hover": { backgroundColor: "#555" },
                  },
                }}
              >
                <Avatar
                  src={user.image}
                  sx={{ marginRight: 2, backgroundColor: "#555" }}
                >
                  {user.username[0]}
                </Avatar>
                <ListItemText
                  primary={user.username}
                  secondary={user.bio}
                  primaryTypographyProps={{ color: "#f0f0f0" }}
                  secondaryTypographyProps={{ color: "#bbb" }}
                />
                <FollowButton
                  followed={user.followed}
                  onClick={() => handleFollow(user._id)}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography sx={{ color: "#bbb", textAlign: "center" }}>
            No users found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FollowTabs;
