import UserRepository from 'repositories/user.repository'
import UserSecurity from 'security/ user.security'

class AuthService {
  private userRepository: typeof UserRepository
  private userSecurity: UserSecurity

  constructor() {
    this.userRepository = UserRepository
    this.userSecurity = new UserSecurity()
  }

  // find user by username
  public async findByUsername(username: string): Promise<any> {
    const user = await this.userRepository.findByUserName(username)
    return user
  }

  // find user by email
  public async findByEmail(email: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email)
    return user
  }

  // find user by phone

  public async findByPhone(phone: string): Promise<any> {
    const user = await this.userRepository.findByPhone(phone)
    return user
  }

  // find by email with password

  public async findByEmailWithPassword(email: string): Promise<any> {
    const user = await this.userRepository.findByEmailWithPassword(email)
    return user
  }

  // compare password

  public comparePassword(password: string, decryptedPassword: string): boolean {
    return this.userSecurity.comparePassword(password, decryptedPassword)
  }
}

export default AuthService
