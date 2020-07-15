// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { check } from 'express-validator';

export const signUpValidator = [
  check('nickname', 'the nickname is required').not().isEmpty(),
  check('email', 'enter a valid email').isEmail(),
  check('password', 'the password at least 6 characters').isLength({ min: 6 })
];

export const logInValidator = [
  check('email', 'enter a valid email').isEmail(),
  check('password', 'the password at least 6 characters').isLength({ min: 6 })
];
