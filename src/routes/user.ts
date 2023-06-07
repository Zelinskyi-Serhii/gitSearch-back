'use strict';

import express from 'express';
import userController from '../controllers/userControlers'

export const router = express.Router();

router.get('/:nickname', userController.getByNickName);
router.get('/shortInfo/:nickname', userController.getShortInfoByNickName);
