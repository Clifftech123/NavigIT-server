import { Model } from 'mongoose'
import UserInterface from '../interfaces/ user.interface'
import UserModel from '../models/ user.model'

class UserRepository {
  constructor(private readonly userModel: Model<UserInterface>) {}

  public async findAll(): Promise<UserInterface[]> {
    const users = await this.userModel.find({}).select('-password')
    return users
  }

  public async findById(id: string): Promise<UserInterface | null> {
    const user = await this.userModel.findById(id).select('-password')
    return user
  }

  public async findByUserName(username: string): Promise<UserInterface | null> {
    const user = await this.userModel.findOne({ username }).select('-password')
    return user
  }

  public async findByEmail(email: string): Promise<UserInterface | null> {
    const user = await this.userModel.findOne({ email }).select('-password')
    return user
  }

  public async findByPhone(phone: string): Promise<UserInterface | null> {
    const user = await this.userModel.findOne({ phone }).select('-password')
    return user
  }

  public async findByIdWithPassword(id: string): Promise<UserInterface | null> {
    const user = await this.userModel.findById(id)
    return user
  }

  public async findByEmailWithPassword(
    email: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel.findOne({ email })
    return user
  }

  public async findByPhoneWithPassword(
    phone: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel.findOne({ phone })
    return user
  }

  public async findByUserNameWithPassword(
    username: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel.findOne({ username })
    return user
  }

  public async createUser(user: UserInterface): Promise<UserInterface> {
    const newUser = new this.userModel(user)
    const savedUser = await newUser.save()
    return savedUser
  }

  public async updateUserName(
    id: string,
    username: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { username }, { new: true })
      .select('-password')
    return user
  }

  public async updateName(
    id: string,
    name: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { name }, { new: true })
      .select('-password')
    return user
  }

  public async updateEmail(
    id: string,
    email: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { email }, { new: true })
      .select('-password')
    return user
  }

  public async updatePassword(
    id: string,
    password: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { password }, { new: true })
      .select('-password')
    return user
  }

  public async updatePhone(
    id: string,
    phone: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { phone }, { new: true })
      .select('-password')
    return user
  }

  public async updateAddress(
    id: string,
    address: string,
  ): Promise<UserInterface | null> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { address }, { new: true })
      .select('-password')
    return user
  }

  public async deleteUser(id: string): Promise<UserInterface | null> {
    const user = await this.userModel.findByIdAndDelete(id)
    return user
  }

  public async getUsersStats(lastYear: Date): Promise<UserInterface[] | null> {
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
