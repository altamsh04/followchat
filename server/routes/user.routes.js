import { Router } from 'express';

import userController from '../controller/user.controller.js';

const router = Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/users', userController.users);
router.get('/users/:id', userController.usersId);
router.post('/users/:userId/follow', userController.followUser);
router.post('/users/:userId/unfollow', userController.unfollowUser);
router.get('/users/:userId/followers', userController.usersFollowers);
router.get('/users/:userId/friend-requests', userController.friendRequests);
router.post('/users/:userId/accept-friend', userController.acceptFriendRequest);

export default router;