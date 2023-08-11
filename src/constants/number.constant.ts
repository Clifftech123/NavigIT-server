class Number {
  // user
  public static readonly USERNAME_MIN_LENGTH: number = 3
  public static readonly USERNAME_MAX_LENGTH: number = 20
  public static readonly NAME_MIN_LENGTH: number = 3
  public static readonly NAME_MAX_LENGTH: number = 80
  public static readonly EMAIL_MAX_LENGTH: number = 50
  public static readonly PASSWORD_MIN_LENGTH: number = 8
  public static readonly PASSWORD_MAX_LENGTH: number = 20
  public static readonly PHONE_MIN_LENGTH: number = 10
  public static readonly PHONE_MAX_LENGTH: number = 20
  public static readonly ADDRESS_MIN_LENGTH: number = 10
  public static readonly ADDRESS_MAX_LENGTH: number = 200


  //  Comment 
  public static readonly COMMENT_CONTENT_MIN_LENGTH: number = 2
  public static readonly COMMENT_CONTENT_MAX_LENGTH: number = 20



  // Post 

  public static readonly POST_TITLE_MIN_LENGTH: number = 3
  public static readonly POST_TITLE_MAX_LENGTH: number = 80


  public static readonly POST_CONTENT_MIN_LENGTH: number = 10
  public static readonly POST_CONTENT_MAX_LENGTH: number = 2000
}

export default Number
