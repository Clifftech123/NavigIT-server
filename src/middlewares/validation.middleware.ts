import { Request, Response, NextFunction, RequestHandler } from 'express'
import Joi from 'joi' // Importing Joi for validation

// Importing constants for HTTP status codes and reasons
import ConstantHttpCode from '../constants/http.code.constant'
import ConstantHttpReason from '../constants/http.reason.constant'

// This is a validation middleware function that takes a Joi schema as input
const validationMiddleware = (schema: Joi.Schema): RequestHandler => {
  // The middleware function returns an async function that takes in the request, response, and next function
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    // Validation options for Joi
    const validationOptions = {
      abortEarly: false, // Return all errors instead of stopping at the first one
      allowUnknown: true, // Allow unknown keys in the input object
      stripUnknown: true, // Remove unknown keys from the input object
    }

    try {
      // Validate the request body using the Joi schema and validation options
      const value = await schema.validateAsync(req.body, validationOptions)
      // If validation succeeds, set the request body to the validated value and call the next middleware function
      req.body = value
      next()
    } catch (e: any) {
      // If validation fails, create an array of error messages from the validation error details
      const errors: string[] = []
      e.details.forEach((error: Joi.ValidationErrorItem) => {
        errors.push(error.message)
      })

      // Send an HTTP response with the error messages and a NOT_FOUND status code and reason
      res.status(ConstantHttpCode.NOT_FOUND).send({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: errors,
      })
    }
  }
}

export default validationMiddleware
