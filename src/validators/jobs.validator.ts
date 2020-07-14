import { check } from 'express-validator';

export const createJobValidator = [
  check('title').not().isEmpty().withMessage('title is required'),
  check('description').not().isEmpty().withMessage('description is required'),
  check('employer').not().isEmpty().withMessage('employer is required'),
  check('employerEmail').isEmail().withMessage('employer email is required')
];
