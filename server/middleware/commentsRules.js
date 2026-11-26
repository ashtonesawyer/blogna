import { body, param } from 'express-validator';

export const patchRules = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer')
    .bail(),

  body('content')
    .isString()
    .withMessage('Content must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .bail(),
  // .isLength({ max: 255 })
];

export const deleteRules = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer')
    .bail(),
];
