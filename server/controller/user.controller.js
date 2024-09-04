import User from '../db/user.js';
const signup = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username, email, password });
      await newUser.save();
      res.status(201).json({ message: "SignUp Successful" });
    } catch (error) {
      res.status(500).json({ message: "Error processing request", error });
    }
    next();
  };

const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return res.status(401).json({ message: "Invalid user" });
      }
  
      const validPassword = password === validUser.password;
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid user authentication" });
      }
      
      res.status(200).json({
        message: "Login successful",
        success: true,
        username: validUser.username,
        id: validUser._id
      });
    } catch (error) {
      console.error("Error processing request:", error); // Log the error for debugging
      return res.status(500).json({ message: "Error processing request" });
    }
  };



export default {signup,signin};