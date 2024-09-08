import User from "../db/user.js";

const signup = async (req, res, next) => {
  try {
    const { username, email,image, password } = req.body;
    const newUser = new User({ username, email,image, password });
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
      id: validUser._id,
    });
  } catch (error) {
    console.error("Error processing request:", error); // Log the error for debugging
    return res.status(500).json({ message: "Error processing request" });
  }
};

const users = async function (req, res) {
  try {
    const dbUsers = await User.find().select("-password").exec();
    return res.status(200).json(dbUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const usersId = async function (req, res) {
  try {
    let {id}= req.params;
    const dbUsers = await User.findById(id).select("-password").exec();
    return res.status(200).json(dbUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const followUser = async (req, res) => {
  const { userId } = req.params; // ID of the user performing the follow
  const { friendId } = req.body; // ID of the user being followed

  if (!userId || !friendId) {
    return res.status(400).send('User ID and Friend ID are required');
  }

  if (userId === friendId) {
    return res.status(400).send('You cannot follow yourself');
  }

  try {
    // Find the current user
    const currentUser = await User.findById(userId);
    if (!currentUser) return res.status(404).send('User not found');

    // Check if the user is already following the friend
    const alreadyFollowing = currentUser.friends.some(friend => friend.friendId.toString() === friendId);
    if (alreadyFollowing) return res.status(400).send('Already following this user');

    // Add friendId to the friends list
    currentUser.friends.push({
      friendId: friendId,
      followed: true,
      accepted: false,
      chats: []
    });

    await currentUser.save();
    res.status(200).send('User followed successfully');
  } catch (err) {
    console.error('Error following user:', err);
    res.status(500).send('Server error');
  }
};

const unfollowUser = async (req, res) => {
  const { userId } = req.params; // ID of the user performing the unfollow
  const { friendId } = req.body; // ID of the user being unfollowed

  if (!userId || !friendId) {
    return res.status(400).send('User ID and Friend ID are required');
  }

  try {
    // Find the current user
    const currentUser = await User.findById(userId);
    if (!currentUser) return res.status(404).send('User not found');

    // Check if the user is already following the friend
    const isFollowing = currentUser.friends.some(friend => friend.friendId.toString() === friendId);
    if (!isFollowing) return res.status(400).send('You are not following this user');

    // Remove friendId from the friends list
    currentUser.friends = currentUser.friends.filter(friend => friend.friendId.toString() !== friendId);

    await currentUser.save();
    res.status(200).send('User unfollowed successfully');
  } catch (err) {
    console.error('Error unfollowing user:', err);
    res.status(500).send('Server error');
  }
};

const usersFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all users who are following the current user
    const followers = await User.find({
      'friends.friendId': userId, 
      'friends.followed': true
    });

    res.status(200).json(followers);
  } catch (err) {
    console.error('Error fetching followers:', err);
    res.status(500).send('Server error');
  }
};

const friendRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by their ID
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find users who have sent friend requests to the logged-in user
    const friendRequests = await User.find({
      'friends.friendId': userId,        // Users who have the logged-in user in their friends list
      'friends.accepted': false          // But the friend request is not yet accepted
    }, '_id username email image');       // Select only the necessary fields

    res.status(200).json(friendRequests);
  } catch (err) {
    console.error('Error fetching friend requests:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const acceptFriendRequest = async (req, res) => {
  const { userId } = req.params; // The logged-in user accepting the request
  const { friendId } = req.body; // The friend who sent the request

  if (!friendId) {
    return res.status(400).json({ message: 'Friend ID is required' });
  }

  try {
    // Find the logged-in user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the friend in the user's friends list
    const friendRequest = user.friends.find(friend => friend.friendId.toString() === friendId);
    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    // Mark the friend request as accepted
    friendRequest.accepted = true;

    // Save the updated user data
    await user.save();

    // Optionally, you may want to update the friend document to reflect mutual friendship
    await User.findOneAndUpdate(
      { _id: friendId, 'friends.friendId': userId }, // Find the friend who sent the request
      { $set: { 'friends.$.accepted': true } } // Accept the friendship from their side as well
    );

    res.status(200).json({ message: 'Friend request accepted' });
  } catch (err) {
    console.error('Error accepting friend request:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default { signup, signin, users, usersId, followUser, unfollowUser, usersFollowers, friendRequests, acceptFriendRequest};
