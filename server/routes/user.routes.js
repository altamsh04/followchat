import { Router } from 'express';

import userController from '../controller/user.controller.js';

const router = Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/users', userController.users);
router.get('/users/:id', userController.usersid);

export default router;