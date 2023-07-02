import express, { Application, Request, Response, NextFunction } from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'

import ErrorMiddleware from './middlewares/error.middleware'
import HttpException from './utils/exceptions/ http.exception'
import Controller from './interfaces/controller.interface'

// API constant import
import ConstantAPI from './constants/ api.constant'

// Message constant import
import ConstantMessage from './constants/message.constant'

// HTTP constant imports
import ConstantHttpCode from './constants/http.code.constant'
import ConstantHttpReason from './constants/http.reason.constant'

class App {
  public app: Application

  constructor(controllers: Controller[]) {
    this.app = express()

    //  Initialise the application
    this.initialiseConfig()
    this.initialiseRoutes()
    this.initialiseControllers(controllers)
    this.initialiseErrorHandling()
  }

  // Start the application
  private initialiseConfig(): void {
    this.app.use(express.json()) // Parse JSON bodies
    this.app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies
    this.app.use(cookieParser()) // Parse cookie headers
    this.app.use(compression()) // Compress response bodies
    this.app.use(cors()) // Enable Cross-Origin Resource Sharing (CORS)
    this.app.use(helmet()) // Apply various HTTP headers for security
  }

  // Initializes the application routes
  private initialiseRoutes(): void {
    this.app.get(
      ConstantAPI.ROOT, // Root endpoint URL
      (_req: Request, res: Response, next: NextFunction) => {
        try {
          return res.status(ConstantHttpCode.OK).json({
            status: {
              code: ConstantHttpCode.OK,
              msg: ConstantHttpReason.OK,
            },
            msg: ConstantMessage.API_WORKING_GOOD,
          })
        } catch (err: any) {
          return next(
            new HttpException(
              ConstantHttpCode.INTERNAL_SERVER_ERROR,
              ConstantHttpReason.INTERNAL_SERVER_ERROR,
              err.message,
            ),
          )
        }
      },
    )
  }

  // Initializes the application controllers
  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.app.use(ConstantAPI.API, controller.router) // Mount each controller's router under the API base path
    })
  }

  // Initializes the application error handling
  private initialiseErrorHandling(): void {
    this.app.use(ErrorMiddleware) // Use the error handling middleware
  }
}

export default App
