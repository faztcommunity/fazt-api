import { check } from 'express-validator';
import { validate } from '../middlewares/validator.middleware';

const formCreate = [
  check('nameProject', 'the name project is required').not().isEmpty(),
  check('projectDescription', 'the project description is required').not().isEmpty(),
  check('capacity', 'the capacity is required').not().isEmpty()
];

export const createProjectValidator = validate(formCreate);
