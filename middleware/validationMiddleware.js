import { body, validationResult,param } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errros/customError.js'
import { JOB_STATUS,JOB_TYPE } from "../utils/constants.js";
import mongoose from 'mongoose';
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        if(errorMessages[0].startsWith('no job')){
            throw new NotFoundError(errorMessages)
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('jobLocation').notEmpty().withMessage('job location is required'),
    body('jobStatus')
      .isIn(Object.values(JOB_STATUS))
      .withMessage('invalid status value'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type'),
  ]);

export const validateIdParam=withValidationErrors([
   

    param('id').
    custom(async(value)=>{
    const isValid=mongoose.Types.ObjectId.isValid(value)

    if(!isValid){
        throw new BadRequestError('invalid mongo db id')
    }
    const job = await Job.findById(value)
    if (!job) {
        throw new NotFoundError(`no job with id ${value}`)
      }
    })
  
])

export const validateRegisterInput=withValidationErrors([

  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('email already exists');
      }
    }),

    body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 4 })
    .withMessage('password must be at least 4 characters long'),
  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
])