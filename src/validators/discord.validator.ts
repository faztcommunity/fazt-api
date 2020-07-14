import { check } from 'express-validator';

export const updateOrCreateSettingValidator = [
  check('value').not().isEmpty().withMessage('the value is required')
];

export const createModerationValidator = [
  check('user_id').not().isEmpty().withMessage('user_id is required'),
  check('type').not().isEmpty().withMessage('type is required'),
  check('reason').not().isEmpty().withMessage('reason is required'),
  check('moderator_id').not().isEmpty().withMessage('moderator id is required'),
  check('expiration_date').not().isEmpty().withMessage('expiration date is required')
];

export const revokeModerationValidator = [
  check('id').isMongoId().withMessage('enter a valid mongodb id'),
  check('revoke').isBoolean().withMessage('revoke is required')
];
