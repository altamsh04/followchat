import { Box, Container } from '@mui/material';
import React, { useState } from 'react';
import BottomIcons from '../components/BottomIcons';
import ChatList from '../components/ChatList';
import FollowTabs from '../components/FollowTabs';
import Header from '../components/Header';
import ProfileSection from '../components/ProfileSection'; // Import ProfileSection component
import RightPanel from '../components/RightPanel';
import Search from '../components/Search';

const chats = [
  { name: 'John Doe', message: 'Hey, how are you?', time: '10:30 AM' },
  { name: 'Jane Smith', message: 'Meeting at 3 PM', time: '9:00 AM' },
  { name: 'Michael', message: 'See you tomorrow!', time: 'Yesterday' },
];

function Home() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showFollowSection, setShowFollowSection] = useState(false);
  const [showProfileSection, setShowProfileSection] = useState(false); // State for profile section
  const [activeTab, setActiveTab] = useState(0);

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

        {showProfileSection ? (
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
