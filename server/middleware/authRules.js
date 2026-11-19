import { body } from 'express-validator';
import db from '../db.js';

export const registerRules = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .bail()
    .normalizeEmail()
    .custom(async (email) => {
      const exists = await db('users').select('id').where({ email }).first();
      if (exists) {
        throw new Error('Email is already in use');
      }
    }),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 10, max: 100 })
    .withMessage('Password must be between 10 and 100 characters long')
    .bail()
    .custom((value) => {
      if (!value.trim()) {
        throw new Error('Password cannot contain only whitespace');
      }
      return true;
    }),

  body('fullname')
    .optional()
    .isString()
    .withMessage('Full name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters long'),
];

export const loginRules = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .bail()
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 10, max: 100 })
    .withMessage('Password must be between 10 and 100 characters long')
    .bail()
    .custom((value) => {
      if (!value.trim()) {
        throw new Error('Password cannot contain only whitespace');
      }
      return true;
    }),
];
