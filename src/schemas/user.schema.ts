import mangoose from 'mongoose';

import constantNumber from '@/constants/number.constant';



const userSchema = new mangoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: constantNumber.USERNAME_MIN_LENGTH,
    max: constantNumber.USERNAME_MAX_LENGTH,
  },

  name: {
    type: String,
    required: true,
    min: constantNumber.NAME_MIN_LENGTH,
    max: constantNumber.NAME_MAX_LENGTH,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    max: constantNumber.EMAIL_MAX_LENGTH,
  },

  password: {
    type: String,
    required: true,
    min: constantNumber.PASSWORD_MIN_LENGTH,
    max: constantNumber.PASSWORD_MAX_LENGTH,
  },

  phone: {
    type: String,
    required: true,
    min: constantNumber.PHONE_MIN_LENGTH,
    max: constantNumber.PHONE_MAX_LENGTH,
  },
  address: {
    type: String,
    required: true,
    min: constantNumber.ADDRESS_MIN_LENGTH,
    max: constantNumber.ADDRESS_MAX_LENGTH,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
})



export default userSchema;