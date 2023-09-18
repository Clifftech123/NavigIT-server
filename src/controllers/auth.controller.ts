import { Router, Request, Response, NextFunction } from 'express'

// Import Auth service
import AuthService from '../services/auth.service'
// Import Controller interface
import Controller from '../interfaces/controller.interface'

// Import user validation
import Validate from '../validations// user.validation'

// Import validation middleware
import validationMiddleware from '../middlewares/validation.middleware'

// Import Http exception
import HttpException from '../utils//exceptions/ http.exception'

// Import API constant
import ConstantAPI from '../constants/ api.constant'

// Import message constant
import ConstantMessage from '../constants/message.constant'

// Import HTTP constant
import ConstantHttpCode from '../constants/http.code.constant'
import ConstantHttpReason from '../constants/http.reason.constant'

// Import logger
import logger from '../utils/logger.util'

/**
 * Auth controller
 * This controller is used to handle all requests related to authentication
 * @path: /auth
 */
class AuthController implements Controller {
  public path: string
  public router: Router
  private authService: AuthService
  private validate: Validate

  constructor() {
    this.path = ConstantAPI.AUTH
    this.router = Router()
    this.authService = new AuthService()
    this.validate = new Validate()
    this.initializeRoutes()
  }

  /**
   * Initialize routes
   * This method is used to Initialize all routes in this controller
   */
  private initializeRoutes(): void {
    // Register route
    this.router.post(
      `${this.path}${ConstantAPI.AUTH_REGISTER}`,
      validationMiddleware(this.validate.register),
      this.register,
    )

    // Login route
    this.router.post(
      `${this.path}${ConstantAPI.AUTH_LOGIN}`,
      validationMiddleware(this.validate.login),
      this.login,
    )
  }

  /**
   * Register function that is used to register new user
   * @param: req: Request, res: Response, next: NextFunction
   * @return: Promise<Response | void>
   */
  private register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      // Get data from request body
      const { username, name, email, password, phone, address } = req.body

      // Validate username from request body
      const usernameValidated = this.validate.validateUsername(username)
      if (!usernameValidated) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.USERNAME_NOT_VALID,
          ),
        )
      }

      // Log that username is valid
      logger.info(`username ${username} is valid`)

      // Validate name from request body
      const nameValidated = this.validate.validateName(name)
      if (!nameValidated) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.NAME_NOT_VALID,
          ),
        )
      }

      // Log that name is valid
      logger.info(`name ${name} is valid`)

      // Validate email from request body
      const emailValidated = this.validate.validateEmail(email)
      if (!emailValidated) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.EMAIL_NOT_VALID,
          ),
        )
      }

      // Log that email is valid
      logger.info(`email ${email} is valid`)

      // Validate password from request body
      const passwordValidated = this.validate.validatePassword(password)
      if (!passwordValidated) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.PASSWORD_NOT_VALID,
          ),
        )
      }

      // Log that password is valid
      logger.info(`password ${password} is valid`)

      // Validate phone from request body
      const phoneValidated = this.validate.validatePhone(phone)
      if (!phoneValidated) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.PHONE_NOT_VALID,
          ),
        )
      }

      // Log that phone is valid
      logger.info(`phone ${phone} is valid`)

      // Validate address from request body
      const addressValidated = this.validate.validateAddress(address)
      if (!addressValidated) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.ADDRESS_NOT_VALID,
          ),
        )
      }

      // Log that address is valid
      logger.info(`address ${address} is valid`)

      // Check if username already exists in database
      const usernameCheck = await this.authService.findByUsername(username)
      if (usernameCheck) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.USERNAME_EXIST,
          ),
        )
      }

      // Check if email already exists in database
      const emailCheck = await this.authService.findByEmail(email)
      if (emailCheck) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.EMAIL_EXIST,
          ),
        )
      }

      // Check if phone already exists in database
      const phoneCheck = await this.authService.findByPhone(phone)
      if (phoneCheck) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.PHONE_EXIST,
          ),
        )
      }

      // Create new user data
      const newUserData = {
        username,
        name,
        email,
        password,
        phone,
        address,
      }

      // Create new user and save in database
      const user = await this.authService.createUser(newUserData)
      if (user === undefined) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.USER_NOT_CREATE,
          ),
        )
      }

      // Log that user is created
      const newUser = user as any;
      // or const newUser = user ? user.toObject() : null;
      logger.info({ newUserpassword: newUser.password })

      // Delete password from new user data
      delete newUser.password
      logger.info({ newUserpassword: newUser.password })

      // Return success response
      return res.status(ConstantHttpCode.CREATED).json({
        status: {
          code: ConstantHttpCode.CREATED,
          msg: ConstantHttpReason.CREATED,
        },
        msg: ConstantMessage.USER_CREATE_SUCCESS,
        data: newUser,
      })
    } catch (err: any) {
      // Return error response
      return next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          err.message,
        ),
      )
    }
  }

  /**
   *  login user
   * If user is is already exist in database
   * and password is correct
   * return user data
   * else return error message
   *
   *
   *
   */
  // Login function to authenticate user
  private login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      // Getting the password and email from request body
      const { email, password } = req.body

      // Validate email from request body
      const emailValidated = this.validate.validateEmail(email)
      if (!emailValidated) {
        // If email is not valid, return error message
        return next(
          new HttpException(
            ConstantHttpCode.INTERNAL_SERVER_ERROR,
            ConstantHttpReason.INTERNAL_SERVER_ERROR,
            ConstantMessage.EMAIL_NOT_VALID,
          ),
        )
      }

      // If email is valid, log email is valid
      logger.info(`email ${email} is valid`)

      // Validate password from request body
      const passwordValidated = this.validate.validatePassword(password)
      if (!passwordValidated) {
        // If password is not valid, return error message
        return next(
          new HttpException(
            ConstantHttpCode.INTERNAL_SERVER_ERROR,
            ConstantHttpReason.INTERNAL_SERVER_ERROR,
            ConstantMessage.PASSWORD_NOT_VALID,
          ),
        )
      }

      // If password is valid, log password is valid
      logger.info(`password ${password} is valid`)

      // Find user by email and password
      // If user is exist return user data
      // Else return error message
      const user = await this.authService.findByEmailWithPassword(email)
      if (!user) {
        return next(
          new HttpException(
            ConstantHttpCode.INTERNAL_SERVER_ERROR,
            ConstantHttpReason.INTERNAL_SERVER_ERROR,
            ConstantMessage.USER_NOT_FOUND,
          ),
        )
      }

      // If user is exist log user is exist
      // and compare password from request body
      // with password from database
      const isMatch = this.authService.comparePassword(password, user.password)
      if (!isMatch) {
        // If password is not match, return error message
        return next(
          new HttpException(
            ConstantHttpCode.INTERNAL_SERVER_ERROR,
            ConstantHttpReason.INTERNAL_SERVER_ERROR,
            ConstantMessage.PASSWORD_NOT_MATCH,
          ),
        )
      }

      // If password is match log password is match
      // and generate access token
      // and return user data and access token
      const accessToken = this.authService.generateAccessToken(
        user.id,
        user.isAdmin
      )
      // Log access token
      logger.info(`accessToken: ${accessToken}`)

      // Remove password from user data
      const newUser = { ...user }._doc
      delete newUser.password

      // Return user data and access token
      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.USER_LOGIN_SUCCESS,
        data: {
          user: newUser,
          accessToken,
        },
      })
    } catch (err: any) {
      // If any error occurs, return error message
      return next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          err.message,
        ),
      )
    }
  }
}
export default AuthController
