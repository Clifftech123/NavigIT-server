import { Request, Response, NextFunction } from 'express'
import HttpException from '../utils//exceptions/ http.exception'

import { verifyToken } from '.././validations/ token.validation'

// Import constants for messages, HTTP codes, and HTTP reasons
import ConstantMessage from '../constants/message.constant'
import ConstantHttpCode from '../constants/http.code.constant'
import ConstantHttpReason from '../constants/http.reason.constant'

// Define a class for the authenticated middleware
class AuthenticatedMiddleware {
  // Middleware function that verifies the token and authorization
  public async verifyTokenAndAuthorization(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    // Verify the token using the verifyToken function from token.validation
    verifyToken(req, res, () => {
      // Check if the user is authorized to access the resource
      if (req?.user?.id === req?.params?.id || req?.user?.isAdmin) {
        // If the user is authorized, call the next middleware function
        return next()
      }

      // If the user is not authorized, return a 403 Forbidden error
      return next(
        new HttpException(
          ConstantHttpCode.FORBIDDEN,
          ConstantHttpReason.FORBIDDEN,
          ConstantMessage.NOT_ALLOWED,
        ),
      )
    })
  }

  // Middleware function that verifies the token and admin status
  public async verifyTokenAndAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    // Verify the token using the verifyToken function from token.validation
    verifyToken(req, res, () => {
      // Check if the user is an admin
      if (req?.user?.isAdmin) {
        // If the user is an admin, call the next middleware function
        return next()
      }

      // If the user is not an admin, return a 403 Forbidden error
      return next(
        new HttpException(
          ConstantHttpCode.FORBIDDEN,
          ConstantHttpReason.FORBIDDEN,
          ConstantMessage.NOT_ALLOWED,
        ),
      )
    })
  }
}

// Export the AuthenticatedMiddleware class
export default AuthenticatedMiddleware
