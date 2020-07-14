// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { check } from 'express-validator';

export const createProjectValidator = [
  // name must not be empty
  check('name').not().isEmpty().withMessage('Name is required'),
  // description must not be empty
  check('description').not().isEmpty().withMessage('Description is required')
];
