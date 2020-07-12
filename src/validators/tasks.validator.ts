// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import { check } from 'express-validator';

export const createTaskValidator = [
    check('title')
        .isString()
        .not().isEmpty().withMessage('Title is required'),
    check('description')
        .isString()
        .not().isEmpty().withMessage('description is required'),
]