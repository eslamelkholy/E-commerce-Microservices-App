import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@common-kitchen/common';

import { AuthController } from '../controller/auth';

const router = express.Router();
const authController = new AuthController();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password'),
  ],
  validateRequest,
  authController.signin
);

export { router as signinRouter };
