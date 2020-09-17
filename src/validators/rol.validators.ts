import { check } from 'express-validator';
import { validate } from '../middlewares/validator.middleware';

const formCreate = [check('nameRol', 'the name rol is required').not().isEmpty()];

export const createRolValidator = validate(formCreate);
