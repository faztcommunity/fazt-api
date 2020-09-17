import { check } from 'express-validator';
import { validate } from '../middlewares/validator.middleware';

const formRegister = [
  check('name', 'the name is required').not().isEmpty(),
  check('username', 'the username is required').not().isEmpty(),
  check('email', 'enter a valid email').isEmail(),
  check('password', 'the password at least 6 characters').isLength({ min: 6 })
];

const formLogin = [
  check('email', 'enter a valid email').isEmail(),
  check('password', 'the password at least 6 characters').isLength({ min: 6 })
];

export const signUpValidator = validate(formRegister);
export const logInValidator = validate(formLogin);
