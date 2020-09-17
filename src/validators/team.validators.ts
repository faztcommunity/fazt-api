import { check } from 'express-validator';
import { validate } from '../middlewares/validator.middleware';

const formCreate = [
  check('nameTeam', 'the name team is required').not().isEmpty(),
  check('teamDescription', 'the team description is required').not().isEmpty(),
  check('teamCapacity', 'the team capacity is required').not().isEmpty()
];

export const createTeamValidator = validate(formCreate);
