import { Request, Response, NextFunction } from 'express'
import HttpException from '../utils/exceptions/ http.exception'

import { verifyToken } from '../validations/ token.validation'

import ConstantMessage from '../constants/message.constant'
import  ConstantHttpCode from '../constants/http.code.constant'

import ConstantHttpReason from '../constants/http.reason.constant'

import User  from 'src/interfaces/ user.interface'

interface AuthenticatedRequest extends Request {
  user?: User
}

class AuthenticatedMiddleware {
  public async verifyTokenAndAuthorization(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    verifyToken(req, res, () => {
      const { id, isAdmin } = req.user || {}

      if (id === req.params.id || isAdmin) {
        return next()
      }

      return next(
        new HttpException(
          ConstantHttpCode.FORBIDDEN,
          ConstantHttpReason.FORBIDDEN,
          ConstantMessage.NOT_ALLOWED,
        ),
      )
    })
  }

  public async verifyTokenAndAdmin(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    verifyToken(req, res, () => {
      const { isAdmin } = req.user || {}

      if (isAdmin) {
        return next()
      }

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

export default AuthenticatedMiddleware
