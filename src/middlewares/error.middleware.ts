import { Request, Response, NextFunction } from 'express'

import HttpException from 'utils/exceptions/ http.exception'

//  http constant
import ConstantHttpCode from 'constants//http.code.constant'
import ConstantHttpReason from 'constants//http.reason.constant'

// message constant

import ConstantMessage from 'constants//message.constant'
// Error handling middleware function

//   Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.
const errorMiddleware = (
  error: HttpException, // Represents the error thrown during request processing
  _req: Request, // Represents the incoming request (unused in this middleware)
  res: Response, // Represents the outgoing response
  next: NextFunction, // Represents the next middleware or error handler
): Response | void => {
  try {
    const statusCode =
      error.statusCode || ConstantHttpCode.INTERNAL_SERVER_ERROR // Get the status code from the error or use the default value
    const statusMsg =
      error.statusMsg || ConstantHttpReason.INTERNAL_SERVER_ERROR // Get the status message from the error or use the default value
    const msg = error.msg || ConstantMessage.SOMETHING_WENT_WRONG // Get the error message from the error or use the default value

    // Send the error response
    return res.status(statusCode).send({
      status: {
        code: statusCode,
        msg: statusMsg,
      },
      msg: msg,
    })
  } catch (err) {
    // If an error occurs while handling the error, pass it to the next middleware or error handler
    return next(err)
  }
}

export default errorMiddleware
