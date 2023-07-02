import winston from 'winston'
import Variable from '@/env/variable.env'

import ConstantDateFormat from '@/constants/dateformat.constant'

import ConstantPath from '@/constants/path.constant'

// Define log levels and their corresponding numerical values
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

// Determine the log level based on the NODE_ENV environment variable
const level = (): string => {
  const env = Variable.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

// Define colors for each log level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

// Add the log level colors to the winston logger
winston.addColors(colors)

// Define the log format
const format = winston.format.combine(
  winston.format.timestamp({
    format: ConstantDateFormat.YYYY_MM_DD_HH_MM_SS_MS,
  }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

// Define the log transports (i.e. where the logs will be stored)
const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: ConstantPath.LOGS_ERROR,
    level: 'error',
  }),
  new winston.transports.File({
    filename: ConstantPath.LOGS_ALL,
  }),
]

// Create the winston logger instance
const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

// Export the logger instance as the default export of this module
export default Logger
