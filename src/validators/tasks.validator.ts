// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { check } from 'express-validator';

export const createTaskValidator = [
  check('title').not().isEmpty().withMessage('title is required'),
  check('description').not().isEmpty().withMessage('description is required')
];
