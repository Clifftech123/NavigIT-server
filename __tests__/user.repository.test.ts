import mongoose from 'mongoose'
import UserRepository from '../src/repositories/user.repository'
import UserModel from '../src/models/ user.model'
import UserInterface from '../src/interfaces/ user.interface'

    
describe('UserRepository', () => {
    const MONGODB_URI =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/test'

  beforeAll(async () => {
    await mongoose.connect( MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    await UserModel.deleteMany({})
  })

  describe('findAll', () => {
    it('should return all users', async () => {
      const user1: UserInterface = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password',
        phone: '1234567890',
        address: '123 Main St',
      }
      const user2: UserInterface = {
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'janedoe@example.com',
        password: 'password',
        phone: '1234567890',
        address: '123 Main St',
      }
      await UserModel.create([user1, user2])

      const users = await UserRepository.findAll()

      expect(users).toHaveLength(2)
      expect(users[0].name).toBe(user1.name)
      expect(users[1].name).toBe(user2.name)
    })
  })

  describe('findById', () => {
    it('should return a user by id', async () => {
      const user: UserInterface = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password',
        phone: '1234567890',
        address: '123 Main St',
      }
      const savedUser = await UserModel.create(user)

      const foundUser = await UserRepository.findById(savedUser._id)

      expect(foundUser).not.toBeNull()
      expect(foundUser?.name).toBe(user.name)
    })

    it('should return null if user is not found', async () => {
      const foundUser = await UserRepository.findById('nonexistent-id')

      expect(foundUser).toBeNull()
    })
  })

  describe('create', () => {
    it('should create a new user', async () => {
      const user: UserInterface = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password',
        phone: '1234567890',
        address: '123 Main St',
      }

      const createdUser = await UserRepository.create(user)

      expect(createdUser).toMatchObject(user)
      expect(createdUser._id).toBeDefined()
    })
  })

  describe('update', () => {
    it('should update an existing user', async () => {
      const user: UserInterface = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password',
        phone: '1234567890',
        address: '123 Main St',
      }
      const savedUser = await UserModel.create(user)

      const updatedUser = await UserRepository.update(savedUser._id, {
        name: 'Jane Doe',
      })

      expect(updatedUser).toMatchObject({
        ...user,
        name: 'Jane Doe',
      })
    })

    it('should return null if user is not found', async () => {
      const updatedUser = await UserRepository.update('nonexistent-id', {
        name: 'Jane Doe',
      })

      expect(updatedUser).toBeNull()
    })
  })

  describe('delete', () => {
    it('should delete an existing user', async () => {
      const user: UserInterface = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password',
        phone: '1234567890',
        address: '123 Main St',
      }
      const savedUser = await UserModel.create(user)

      const deletedUser = await UserRepository.delete(savedUser._id)

      expect(deletedUser).toMatchObject(user)

      const foundUser = await UserModel.findById(savedUser._id)

      expect(foundUser).toBeNull()
    })

    it('should return null if user is not found', async () => {
      const deletedUser = await UserRepository.delete('nonexistent-id')

      expect(deletedUser).toBeNull()
    })
  })
})
