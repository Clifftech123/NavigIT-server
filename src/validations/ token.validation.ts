import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import HttpException from '../utils/exceptions/ http.exception'
import User from '../interfaces/ user.interface'
import Variable from '../env/variable.env'
import ConstantMessage from '../constants/message.constant'
import  ConstantHttpCode from '../constants/http.code.constant'
import ConstantHttpReason from '../constants/http.reason.constant'
import logger from '../utils/logger.util'

interface AuthenticatedRequest extends Request {
  user?: User
}

export const verifyToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const bearer = req.headers.authorization
  logger.info(`bearer: ${bearer}`)

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return next(
      new HttpException(
        ConstantHttpCode.UNAUTHORIZED,
        ConstantHttpReason.UNAUTHORIZED,
        ConstantMessage.UNAUTHORIZED,
      ),
    )
  }

  const accessToken = bearer.split('Bearer ')[1]?.trim()

  if (!accessToken) {
    return next(
      new HttpException(
        ConstantHttpCode.UNAUTHORIZED,
        ConstantHttpReason.UNAUTHORIZED,
        ConstantMessage.TOKEN_NOT_VALID,
      ),
    )
  }

  try {
    const user = jwt.verify(accessToken, Variable.JWT_SECRET) as User
    req.user = user
    return next()
  } catch (error) {
    return next(
      new HttpException(
        ConstantHttpCode.FORBIDDEN,
        ConstantHttpReason.FORBIDDEN,
        ConstantMessage.TOKEN_NOT_VALID,
      ),
    )
  }
}

export default { verifyToken }
