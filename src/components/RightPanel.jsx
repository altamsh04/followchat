import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, Paper, TextField, Typography } from '@mui/material';
import React from 'react';

const RightPanel = ({ selectedChat }) => (
  <Box
    sx={{
      width: { xs: '100%', md: '70%' },
      display: selectedChat ? 'block' : 'none',
      height: '100vh',
      backgroundColor: '#1a1a1a',
    }}
  >
    {selectedChat ? (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            borderBottom: '1px solid #333',
          }}
        >
          <Typography variant="h6" sx={{ color: '#f0f0f0' }}>
            {selectedChat.name}
          </Typography>
          <IconButton>
            <MoreVertIcon sx={{ color: '#f0f0f0' }} />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, padding: 2, overflowY: 'auto', color: '#f0f0f0' }}>
          {/* Display selected chat messages here */}
          <Typography variant="body2">Chat messages go here...</Typography>
        </Box>

        <Paper
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            borderTop: '1px solid #333',
            backgroundColor: '#2c2c2c',
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Type a message"
            fullWidth
            sx={{
              input: { color: '#f0f0f0' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#555' },
                '&:hover fieldset': { borderColor: '#777' },
                '&.Mui-focused fieldset': { borderColor: '#fff' },
              },
            }}
          />
          <IconButton>
            <SendIcon sx={{ color: '#f0f0f0' }} />
          </IconButton>
        </Paper>
      </Box>
    ) : (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" color="textSecondary">
          Select a chat to start messaging
        </Typography>
      </Box>
    )}
  </Box>
);

export default RightPanel;
