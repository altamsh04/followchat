import mongoose from 'mongoose';

// Define the schema for the Friend object
const friendSchema = new mongoose.Schema({
  friendId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  followed: {
    type: Boolean,
    default: false
  },
  accepted: {
    type: Boolean,
    default: false
  },
  chats: [{
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat' // Assuming you have a Chat model
    },
    message: {
      type: String
    },
    isSent: {
      type: Boolean,
      default: false
    },
    dateTime: {
      type: Date,
      default: Date.now
    }
  }]
});

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  password: {
    type: String,
    required: true,
  },
  friends: [friendSchema] // Add the friends field
});

const User = mongoose.model('User', userSchema);
export default User;
