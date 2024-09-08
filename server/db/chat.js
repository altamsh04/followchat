import mongoose from 'mongoose';

// Define the schema for a Chat
const chatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  }],
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    },
    content: {
      type: String,
      required: true
    },
    isSent: {
      type: Boolean,
      default: false
    },
    dateTime: {
      type: Date,
      default: Date.now
    }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create a Chat model
const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
