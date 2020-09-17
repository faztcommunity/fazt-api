import { check } from 'express-validator';
import { validate } from '../middlewares/validator.middleware';

const formCreate = [check('nameSkill', 'the name skill is required').not().isEmpty()];

export const createSkillValidator = validate(formCreate);
