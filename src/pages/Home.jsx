import { Box, CircularProgress, Container, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BottomIcons from '../components/BottomIcons';
import Header from '../components/Header';
import RightPanel from '../components/RightPanel';
import Search from '../components/Search';
import ChatList from './ChatList';
import FollowTabs from './FollowTabs';
import ProfileSection from './ProfileSection'; // Import ProfileSection component

function Home() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showFollowSection, setShowFollowSection] = useState(false);
  const [showProfileSection, setShowProfileSection] = useState(false); // State for profile section
  const [activeTab, setActiveTab] = useState(0);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error("User ID not found in localStorage");
        }

        // Fetch the current user's friends
        const userResponse = await axios.get(`http://localhost:3000/api/v1/users/${userId}`);
        const friends = userResponse.data.friends;

        // Filter mutual friends where both users follow and accepted each other
        const mutualFriends = friends.filter(friend => 
          friend.followed && friend.accepted &&
          userResponse.data.friends.some(f => f.friendId === friend.friendId && f.followed && f.accepted)
        );

        const chatListPromises = mutualFriends.map(async (friend) => {
          // Fetch friend's profile and chat data by friendId
          const friendResponse = await axios.get(`http://localhost:3000/api/v1/users/${friend.friendId}`);
          const friendProfile = friendResponse.data;

          return {
            name: friendProfile.username,
            email: friendProfile.email,
            image: friendProfile.image || 'default-image-url', // Set a default image if none
            message: friend.chats.length > 0 ? friend.chats[friend.chats.length - 1].message : 'No recent messages',
            time: friend.chats.length > 0 ? friend.chats[friend.chats.length - 1].time : 'N/A',
            friendId: friendProfile._id,
          };
        });

        // Resolve all chatList promises
        const chatList = await Promise.all(chatListPromises);
        setChats(chatList);
      } catch (err) {
        setError(err.message || 'Error fetching chats');
        console.error('Error fetching chats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: '100vh',
        display: 'flex',
        backgroundColor: '#1a1a1a',
        color: '#f0f0f0',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '28%' },
          borderRight: '1px solid #333',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          backgroundColor: '#2c2c2c',
          position: 'relative', // Ensure the BottomIcons is positioned correctly within this panel
        }}
      >
        <Header
          showFollowSection={showFollowSection}
          showProfileSection={showProfileSection}
          setShowProfileSection={setShowProfileSection} // Pass state handler for profile section
        />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : showProfileSection ? (
          <ProfileSection /> // Display the profile section
        ) : showFollowSection ? (
          <FollowTabs activeTab={activeTab} handleTabChange={handleTabChange} />
        ) : (
          <>
            <Search />
            <ChatList chats={chats} setSelectedChat={setSelectedChat} />
          </>
        )}

        {/* Bottom Icons */}
        <BottomIcons 
          setShowFollowSection={setShowFollowSection} 
          setShowProfileSection={setShowProfileSection}
          showFollowSection={showFollowSection} 
        />
      </Box>
      <RightPanel selectedChat={selectedChat} />
    </Container>
  );
}

export default Home;
