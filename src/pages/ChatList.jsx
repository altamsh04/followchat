import { Avatar, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';

const ChatList = ({ chats, setSelectedChat }) => (
  <List sx={{ overflowY: 'auto', flexGrow: 1 }}>
    {chats.map((chat, index) => (
      <ListItem
        button
        key={index}
        onClick={() => setSelectedChat(chat)}
        sx={{
          '&:hover': { backgroundColor: '#333' },
          '&.Mui-selected': {
            backgroundColor: '#444',
            '&:hover': { backgroundColor: '#555' },
          },
        }}
      >
        <Avatar sx={{ marginRight: 2, backgroundColor: '#555' }}>{chat.name[0]}</Avatar>
        <ListItemText
          primary={chat.name}
          secondary={`${chat.message} - ${chat.time}`}
          primaryTypographyProps={{ color: '#f0f0f0' }}
          secondaryTypographyProps={{ color: '#bbb' }}
        />
      </ListItem>
    ))}
  </List>
);

export default ChatList;
