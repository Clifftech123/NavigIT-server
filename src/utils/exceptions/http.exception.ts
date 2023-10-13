// Define a new class called HttpException that extends the built-in Error class
class HttpException extends Error {
  // Define three public properties for the class
  public statusCode: number // A number representing the HTTP status code
  public statusMsg: string // A string representing the HTTP status message
  public msg: string // A string representing the error message

  // Define a constructor function that takes three arguments
  constructor(statusCode: number, statusMsg: string, msg: string) {
    // Call the constructor of the parent class (Error) with the error message as an argument
    super(msg)
    // Set the statusCode, statusMsg, and msg properties of the class to the values passed as arguments
    this.statusCode = statusCode
    this.statusMsg = statusMsg
    this.msg = msg
  }
}

// Export the HttpException class as the default export of this module
export default HttpException
