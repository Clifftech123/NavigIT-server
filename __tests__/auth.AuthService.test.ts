import AuthService from '../src/services/auth.service'
import UserRepository from '../src/repositories/user.repository'
import UserSecurity from '../src/security/ user.security'

// Test suite for AuthService
describe('AuthService', () => {
  let authService: AuthService

  // Set up before each test
  beforeEach(() => {
    authService = new AuthService()
  })

  // Test suite for findByUsername method
  describe('findByUsername', () => {
    it('should return a user by username', async () => {
      // Create a user
      const user = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password',
        phone: '1234567890',
        address: '123 Main St',
      }
      await UserRepository.create(user)

      // Call the findByUsername method
      const foundUser = await authService.findByUsername(user.username)

      // Assert that the found user is not null and has the correct name
      expect(foundUser).not.toBeNull()
      expect(foundUser?.name).toBe(user.name)
    })

    it('should return null if user is not found', async () => {
      // Call the findByUsername method with a nonexistent username
      const foundUser = await authService.findByUsername('nonexistent-username')

      // Assert that the found user is null
      expect(foundUser).toBeNull()
    })
  })

  // Test suite for findByEmail method
  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      // Create a user
      const user = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password',
        phone: '1234567890',
        address: '123 Main St',
      }
      await UserRepository.create(user)

      // Call the findByEmail method
      const foundUser = await authService.findByEmail(user.email)

      // Assert that the found user is not null and has the correct name
      expect(foundUser).not.toBeNull()
      expect(foundUser?.name).toBe(user.name)
    })

    it('should return null if user is not found', async () => {
      // Call the findByEmail method with a nonexistent email
      const foundUser = await authService.findByEmail(
        'nonexistent-email@example.com',
      )

      // Assert that the found user is null
      expect(foundUser).toBeNull()
    })
  })

  // Test suite for findByPhone method
  describe('findByPhone', () => {
    it('should return a user by phone', async () => {
      // Create a user
      const user = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password',
        phone: '1234567890',
        address: '123 Main St',
      }
      await UserRepository.create(user)

      // Call the findByPhone method
      const foundUser = await authService.findByPhone(user.phone)

      // Assert that the found user is not null and has the correct name
      expect(foundUser).not.toBeNull()
      expect(foundUser?.name).toBe(user.name)
    })

    it('should return null if user is not found', async () => {
      // Call the findByPhone method with a nonexistent phone number
      const foundUser = await authService.findByPhone('nonexistent-phone')

      // Assert that the found user is null
      expect(foundUser).toBeNull()
    })
  })

  // Test suite for findByEmailWithPassword method
  describe('findByEmailWithPassword', () => {
    it('should return a user by email with password', async () => {
      // Create a user
      const user = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password',
        phone: '1234567890',
        address: '123 Main St',
      }
      await UserRepository.create(user)

      // Call the findByEmailWithPassword method
      const foundUser = await authService.findByEmailWithPassword(user.email)

      // Assert that the found user is not null and has the correct name and password
      expect(foundUser).not.toBeNull()
      expect(foundUser?.name).toBe(user.name)
      expect(foundUser?.password).toBeDefined()
    })

    it('should return null if user is not found', async () => {
      // Call the findByEmailWithPassword method with a nonexistent email
      const foundUser = await authService.findByEmailWithPassword(
        'nonexistent-email@example.com',
      )

      // Assert that the found user is null
      expect(foundUser).toBeNull()
    })
  })

  // Test suite for comparePassword method
  describe('comparePassword', () => {
    it('should return true if password matches', () => {
      // Define a password and hash it
      const password = 'password'
      const hashedPassword = UserSecurity.hashPassword(password)

      // Call the comparePassword method with the correct password and hashed password
      const result = authService.comparePassword(password, hashedPassword)

      // Assert that the result is true
      expect(result).toBe(true)
    })

    it('should return false if password does not match', () => {
      // Define a password and hash it
      const password = 'password'
      const wrongPassword = 'wrong-password'
      const hashedPassword = UserSecurity.hashPassword(password)

      // Call the comparePassword method with the wrong password and hashed password
      const result = authService.comparePassword(wrongPassword, hashedPassword)

      // Assert that the result is false
      expect(result).toBe(false)
    })
  })
})
