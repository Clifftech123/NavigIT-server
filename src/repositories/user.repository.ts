import { Model } from 'mongoose'
import UserInterface from '../interfaces/ user.interface'
import UserModel from '../models/ user.model'

class UserRepository {
  constructor(private readonly userModel: Model<UserInterface>) {}

  // Find all users in the database and return them without their password
  public async findAll(): Promise<UserInterface[]> {
    const users = await this.userModel.find({}).select('-password')
    return users
  }

  // Find a user by their ID and return them without their password
  public async findById(id: string): Promise<UserInterface | null> {
    const user = await this.userModel.findById(id).select('-password')
    return user ?? null
  }

  // Find a user by their username and return them without their password
  public async findByUserName(username: string): Promise<UserInterface | null> {
    const user = await this.userModel.findOne({ username }).select('-password')
    return user ?? null
  }

  // Find a user by their email and return them without their password
  public async findByEmail(email: string): Promise<UserInterface | null> {
    const user = await this.userModel.findOne({ email }).select('-password')
    return user ?? null
  }

  // Find a user by their phone number and return them without their password
  public async findByPhone(phone: string): Promise<UserInterface | null> {
    const user = await this.userModel.findOne({ phone }).select('-password')
    return user ?? null
  }

  // Find a user by their ID and return them with their password
  public async findByIdWithPassword(id: string): Promise<UserInterface | null> {
    const user = await this.userModel.findById(id)
    return user ?? null
  }

  // Find a user by their email and return them with their password
  public async findByEmailWithPassword(
    email: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel.findOne({ email })
    return user ?? null
  }

  // Find a user by their phone number and return them with their password
  public async findByPhoneWithPassword(
    phone: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel.findOne({ phone })
    return user ?? null
  }

  // Find a user by their username and return them with their password
  public async findByUserNameWithPassword(
    username: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel.findOne({ username })
    return user ?? null
  }

  // Create a new user in the database
  public async createUser(user: UserInterface): Promise<UserInterface> {
    const newUser = new this.userModel(user)
    const savedUser = await newUser.save()
    return savedUser
  }

  // Update a user's username and return the updated user without their password
  public async updateUserName(
    id: string,
    username: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { username }, { new: true })
      .select('-password')
    return user ?? null
  }

  // Update a user's name and return the updated user without their password
  public async updateName(
    id: string,
    name: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { name }, { new: true })
      .select('-password')
    return user ?? null
  }

  // Update a user's email and return the updated user without their password
  public async updateEmail(
    id: string,
    email: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { email }, { new: true })
      .select('-password')
    return user ?? null
  }

  // Update a user's password and return the updated user without their password
  public async updatePassword(
    id: string,
    password: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { password }, { new: true })
      .select('-password')
    return user ?? null
  }

  // Update a user's phone number and return the updated user without their password
  public async updatePhone(
    id: string,
    phone: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { phone }, { new: true })
      .select('-password')
    return user ?? null
  }

  // Update a user's address and return the updated user without their password
  public async updateAddress(
    id: string,
    address: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { address }, { new: true })
      .select('-password')
    return user ?? null
  }

  // Delete a user from the database and return the deleted user
  public async deleteUser(id: string): Promise<UserInterface | null> {
    const user = await this.userModel.findByIdAndDelete(id)
    return user ?? null
  }

  // Get an array of user documents that were created within the last year
  public async getUsersStats(lastYear: Date): Promise<UserInterface[]> {
    const users = await this.userModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ])
    return users
  }
}

export default new UserRepository(UserModel)
