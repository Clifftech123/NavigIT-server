//  This repository is used to interact with the database and perform CRUD operations on the User table.

import User from '../models/ user.model'
import UserInterface from '../interfaces/ user.interface'

/**
 *  Class UserRepository
 * @class
 *  @description  This class is used to interact with the database and perform CRUD operations on the User table.       
 * @access public
 * @constructs
*/

class UserRepository {
  //  find all users
  public async findAll(): Promise<UserInterface[]> {
    const users = await User.find({}).select('-password')
    return users
  }

  // find uer by id
  public async findById(id: string): Promise<UserInterface | null> {
    const user = await User.findById(id).select('-password')
    return user
  }

  // find uer by name
  public async findByUserName(username: string): Promise<UserInterface | null> {
    const user = await User.findOne({ username }).select('-password')
    return user
  }

  //  find email
  public async findByEmail(email: string): Promise<UserInterface | null> {
    const user = await User.findOne({ email }).select('-password')

    return user
  }

  // find by phone
  public async findByPhone(phone: string): Promise<UserInterface | null> {
    const user = await User.findOne({ phone }).select('-password')
    return user
  }

  //  find by id with password
  public async findByIdWithPassword(id: string): Promise<UserInterface | null> {
    const user = await User.findById(id)

    return user
  }

  /// find by email with password

  public async findByEmailWithPassword(
    email: string,
  ): Promise<UserInterface | null> {
    const user = await User.findOne({ email })
    return user
  }

  //  find by phone with password

  public async findByPhoneWithPassword(
    phone: string,
  ): Promise<UserInterface | null> {
    const user = await User.findOne({ phone })

    return user
  }

  // find by username with password

  public async findByUserNameWithPassword(
    username: string,
  ): Promise<UserInterface | null> {
    const user = await User.findOne({ username })

    return user
  }

  //  create user

  public async createUser(user: any): Promise<UserInterface | null> {
    const NewUser = new User({
      username: user.username,
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin,
    })

    const savedUser = await NewUser.save()

    return savedUser
  }

  //  update user username
  public async updateUserName(
    id: string,
    username: string,
  ): Promise<UserInterface | null> {
    const user = await User.findByIdAndUpdate(
      id,
      { username },
      { new: true },
    ).select('-password')
    return user
  }

  //  update user name
  public async updateName(
    id: string,
    name: string,
  ): Promise<UserInterface | null> {
    const user = await User.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    ).select('-password')
    return user
  }

  //  update user email

  public async updateEmail(
    id: string,
    email: string,
  ): Promise<UserInterface | null> {
    const user = await User.findByIdAndUpdate(
      id,
      { email },
      { new: true },
    ).select('-password')

    return user
  }

  //  update user password

  public async updatePassword(
    id: string,
    password: string,
  ): Promise<UserInterface | null> {
    const user = await User.findByIdAndUpdate(
      id,
      { password },
      { new: true },
    ).select('-password')

    return user
  }

  // update user phone

  public async updatePhone(
    id: string,
    phone: string,
  ): Promise<UserInterface | null> {
    const user = await User.findByIdAndUpdate(
      id,
      { phone },
      { new: true },
    ).select('-password')

    return user
  }

  // update user address

  public async updateAddress(
    id: string,
    address: string,
  ): Promise<UserInterface | null> {
    const user = await User.findByIdAndUpdate(
      id,

      { address },

      { new: true },
    ).select('-password')

    return user
  }

  // Delete user
  public async DeleteUser(id: string): Promise<UserInterface | null> {
    const user = await User.findByIdAndDelete(id)

    return user
  }

  //   get user stats
  public async getUsersStats(lastYear: Date): Promise<UserInterface[] | null> {
    const users = await User.aggregate([
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

export default UserRepository
