class message {
  //  Define a static property called API that is a string representing the path to the student API
  public static readonly API_WORKING_GOOD: string = 'API is working good'

  //  Define a static property called API that is a string representing the path to the student API
  public static readonly SOMETHING_WENT_WRONG: string = 'Something went wrong'

  
  // aut hmessage 
  public static readonly USERNAME_NOT_VALID: string = 'username is not valid'
  public static readonly NAME_NOT_VALID: string = 'name is not valid'
  public static readonly EMAIL_NOT_VALID: string = 'email is not valid'
  public static readonly PASSWORD_NOT_VALID: string = 'password is not valid'
  public static readonly PHONE_NOT_VALID: string = 'phone is not valid'
  public static readonly ADDRESS_NOT_VALID: string = 'address is not valid'
  public static readonly USERNAME_EXIST: string = 'username is exist'
  public static readonly EMAIL_EXIST: string = 'email is exist'
  public static readonly PHONE_EXIST: string = 'phone is exist'
  public static readonly USER_NOT_CREATE: string =
    'user is not create, please try again'
  public static readonly USER_CREATE_SUCCESS: string =
    'user is create success, please login'
  public static readonly USER_NOT_FOUND: string = 'user is not found'
  public static readonly PASSWORD_NOT_MATCH: string = 'password is not match'
  public static readonly USER_LOGIN_SUCCESS: string = 'user is login success'
}

export default message
