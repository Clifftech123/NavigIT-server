import UserRepository from '../repositories/user.repository'
import UserSecurity from '../security/ user.security'



// UserService class definition
class UserService {
  private userRepository: UserRepository
  private userSecurity: UserSecurity

  // Constructor initializes UserRepository and UserSecurity instances
  constructor() {
    this.userRepository = new UserRepository()
    this.userSecurity = new UserSecurity()
  }

  // Compares a plaintext password with an encrypted password
  public comparePassword(password: string, encryptedPassword: string): boolean {
    return this.userSecurity.comparePassword(password, encryptedPassword)
  }

  // Finds all users
  public async findAll(): Promise<unknown> {
    const users = await this.userRepository.findAll()
    return users
  }

  // Finds a user by ID
  public async findById(id: string): Promise<unknown> {
    const user = await this.userRepository.findById(id)
    return user
  }

  // Finds a user by username
  public async findByUsername(username: string): Promise<unknown> {
    const user = await this.userRepository.findByUserName(username)
    return user
  }

  // Finds a user by email
  public async findByEmail(email: string): Promise<unknown> {
    const user = await this.userRepository.findByEmail(email)
    return user
  }

  // Finds a user by phone number
  public async findByPhone(phone: string): Promise<unknown> {
    const user = await this.userRepository.findByPhone(phone)
    return user
  }

  // Finds a user by ID and returns the user object with the encrypted password
  public async findByIdWithPassword(id: string): Promise<unknown> {
    const user = await this.userRepository.findByIdWithPassword(id)
    return user
  }

  // Updates a user's username
  public async updateUsername(id: string, username: string): Promise<unknown> {
    const user = await this.userRepository.updateUserName(id, username)
    return user
  }

  // Updates a user's name
  public async updateName(id: string, name: string): Promise<unknown> {
    const user = await this.userRepository.updateName(id, name)
    return user
  }

  // Updates a user's email
  public async updateEmail(id: string, email: string): Promise<unknown> {
    const user = await this.userRepository.updateEmail(id, email)
    return user
  }

  // Updates a user's password
  public async updatePassword(id: string, password: string): Promise<unknown> {
    const encryptedPassword = this.userSecurity.encrypt(password)
    const user = await this.userRepository.updatePassword(id, encryptedPassword)
    return user
  }

  // Updates a user's phone number
  public async updatePhone(id: string, phone: string): Promise<unknown> {
    const user = await this.userRepository.updatePhone(id, phone)
    return user
  }

  // Updates a user's address
  public async updateAddress(id: string, address: string): Promise<unknown> {
    const user = await this.userRepository.updateAddress(id, address)
    return user
  }

  // Deletes a user by ID
  public async deleteUser(id: string): Promise<unknown> {
    const user = await this.userRepository.DeleteUser(id)
    return user
  }

  // Gets statistics about users
  public async getUsersStats(): Promise<unknown> {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    const usersStats = await this.userRepository.getUsersStats(lastYear)
    return usersStats
  }
}

export default UserService
