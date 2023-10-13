import { Schema } from 'mongoose'
import constantNumber from '../constants/number.constant'
import UserInterface from '../interfaces/ user.interface'

const UserSchema = new Schema<UserInterface>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: constantNumber.USERNAME_MIN_LENGTH,
    maxlength: constantNumber.USERNAME_MAX_LENGTH,
  },
  name: {
    type: String,
    required: true,
    minlength: constantNumber.NAME_MIN_LENGTH,
    maxlength: constantNumber.NAME_MAX_LENGTH,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: constantNumber.EMAIL_MAX_LENGTH,
  },
  password: {
    type: String,
    required: true,
    minlength: constantNumber.PASSWORD_MIN_LENGTH,
    maxlength: constantNumber.PASSWORD_MAX_LENGTH,
  },
  phone: {
    type: String,
    required: true,
    minlength: constantNumber.PHONE_MIN_LENGTH,
    maxlength: constantNumber.PHONE_MAX_LENGTH,
  },
  address: {
    type: String,
    required: true,
    minlength: constantNumber.ADDRESS_MIN_LENGTH,
    maxlength: constantNumber.ADDRESS_MAX_LENGTH,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default UserSchema
