import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@common-kitchen/common';

import { AuthController } from '../controller/auth';

const router = express.Router();
const authController = new AuthController();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  authController.signup
);

export { router as signupRouter };
