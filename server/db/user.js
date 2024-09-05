import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true
  },
  image:{
    type:String
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('user', userschema);
export default User;