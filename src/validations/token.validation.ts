import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import HttpException from 'utils/exceptions/ http.exception'

// Import environment variables
import Variable from 'env/variable.env'

// Import message constants
import ConstantMessage from '../constants/message.constant'

// Import HTTP constants
import ConstantHttpCode from '../constants/http.code.constant'
import ConstantHttpReason from '../constants/http.reason.constant'

// Import logger utility
import logger from '../utils/logger.util'

// Verify token middleware function
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Get the authorization header from the request
  const bearer = req.headers.authorization
  logger.info(`bearer: ${bearer}`)

  // If there is no authorization header, return an error
  if (!bearer) {
    return next(
      new HttpException(
        ConstantHttpCode.UNAUTHORIZED,
        ConstantHttpReason.UNAUTHORIZED,
        ConstantMessage.TOKEN_NOT_VALID,
      ),
    )
  }

  // If the authorization header is not in the correct format, return an error
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return next(
      new HttpException(
        ConstantHttpCode.UNAUTHORIZED,
        ConstantHttpReason.UNAUTHORIZED,
        ConstantMessage.UNAUTHORIZED,
      ),
    )
  }

  // Extract the access token from the authorization header
  const accessToken = bearer.split('Bearer ')[1].trim()

  // Verify the access token using the JWT_SECRET environment variable
  return jwt.verify(accessToken, Variable.JWT_SECRET, (err, user: any) => {
    // If there is an error verifying the token, return an error
    if (err) {
      res.status(ConstantHttpCode.FORBIDDEN).json({
        status: {
          code: ConstantHttpCode.FORBIDDEN,
          msg: ConstantHttpReason.FORBIDDEN,
        },
        msg: ConstantMessage.TOKEN_NOT_VALID,
      })
    }
    // Set the user property of the request object to the verified user
    req.user = user
    // Call the next middleware function
    return next()
  })
}

// Export the middleware function
export default { verifyToken }
