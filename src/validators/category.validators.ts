import { check } from 'express-validator';
import { validate } from '../middlewares/validator.middleware';

const formCreate = [
  check('nameCategory', 'the name category is required').not().isEmpty()
];

export const categoryCategoryValidator = validate(formCreate);
