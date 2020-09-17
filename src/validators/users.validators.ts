import { Handler } from 'express';
import { check, body } from 'express-validator';

export const signUpValidator = [
  check('name', 'the name is required').not().isEmpty(),
  check('username', 'the username is required').not().isEmpty(),
  check('email', 'enter a valid email').isEmail(),
  check('password', 'the password at least 6 characters').isLength({ min: 6 })
];

export const logInValidator = [
  check('email', 'enter a valid email').isEmail(),
  check('password', 'the password at least 6 characters').isLength({ min: 6 })
];
