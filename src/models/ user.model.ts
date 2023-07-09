import mongoose from 'mongoose'
import UserSchema from '@/schemas/user.schema'
import UserInterface from '@/interfaces/ user.interface'

import constantModel from '@/constants/model.constant'

const UserModel = mongoose.model<UserInterface>(
  constantModel.USER_MODEL,
  UserSchema,
)

export default UserModel
