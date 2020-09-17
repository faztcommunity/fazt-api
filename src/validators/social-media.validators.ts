import { check } from 'express-validator';
import { validate } from '../middlewares/validator.middleware';

const formCreate = [
  check('nameSocial', 'the name social media is required').not().isEmpty(),
  check('socialLogo', 'the social logo is required').not().isEmpty()
];

export const createSocialMediaValidator = validate(formCreate);
