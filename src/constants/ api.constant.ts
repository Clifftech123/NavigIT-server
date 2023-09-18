class Api {
  // Define a static property called ROOT that is a string representing the root path
  public static readonly ROOT: string = '/'

  //  Define a static property called API that is a string representing the path to the student API
  public static readonly API: string = '/student'

  public static readonly AUTH: string = `/auth`
  public static readonly USERS: string = '/users'

  // auth
  public static readonly AUTH_REGISTER: string = '/register'
  public static readonly AUTH_LOGIN: string = '/login'

  // user
  public static readonly USER_UPDATE_USERNAME: string = '/update-username/:id'
  public static readonly USER_UPDATE_NAME: string = '/update-name/:id'
  public static readonly USER_UPDATE_EMAIL: string = '/update-email/:id'
  public static readonly USER_UPDATE_PASSWORD: string = '/update-password/:id'
  public static readonly USER_UPDATE_PHONE: string = '/update-phone/:id'
  public static readonly USER_UPDATE_ADDRESS: string = '/update-address/:id'
  public static readonly USER_DELETE: string = '/delete/:id'
  public static readonly USER_GET: string = '/find/:id'
  public static readonly USER_GET_ALL: string = '/'
  public static readonly USER_GET_ALL_STATS: string = '/stats'

  //  post Routes  
}
export default Api
