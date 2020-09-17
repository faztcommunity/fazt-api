import { check } from 'express-validator';

export const createProjectValidator = [
  check('nameProject', 'the name project is required').not().isEmpty(),
  check('projectDescription', 'the project description is required').not().isEmpty(),
  check('capacity', 'the capacity is required').not().isEmpty()
];
