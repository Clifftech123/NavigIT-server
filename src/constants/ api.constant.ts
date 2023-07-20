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
}
export default Api
