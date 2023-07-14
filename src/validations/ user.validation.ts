import Joi from 'joi'
import ConstantRegex from '../constants/regex.constant'

class UserValidation {
  // User validation
  public register = Joi.object({
    username: Joi.string().max(30).required(),
    name: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    phone: Joi.string().min(10).max(15).required(),
    address: Joi.string().max(100).required(),
  })

  // login validation
  public login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
  })

  //  update user username validation
  public updateUsername = Joi.object({
    username: Joi.string().max(30).required(),
    password: Joi.string().min(6).max(30).required(),
  })

  //  update user name validation
  public updateName = Joi.object({
    name: Joi.string().max(30).required(),
    password: Joi.string().min(6).max(30).required(),
  })

  //  update user email validation
  public updateEmail = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
  })

  //  update user password validation
  public updatePassword = Joi.object({
    oldPassword: Joi.string().min(6).max(30).required(),
    newPassword: Joi.string().min(6).max(30).required(),
    confirmPassword: Joi.string().min(6).max(30).required(),
  })

  //  update user phone validation
  public updatePhone = Joi.object({
    phone: Joi.string().min(10).max(15).required(),
    password: Joi.string().min(6).max(30).required(),
  })

  //  update user address validation
  public updateAddress = Joi.object({
    address: Joi.string().max(100).required(),
    password: Joi.string().min(6).max(30).required(),
  })

  // delete user validation
  public deleteUser = Joi.object({
    password: Joi.string().min(6).max(30).required(),
  })

  //  validate username
  public validateUsername(username: string): boolean {
    return ConstantRegex.USERNAME.test(username)
  }

  // validate name
  public validateName(name: string): boolean {
    return ConstantRegex.NAME.test(name)
  }

  // validate email
  public validateEmail(email: string): boolean {
    return ConstantRegex.EMAIL.test(email)
  }

  // validate password
  public validatePassword(password: string): boolean {
    return ConstantRegex.PASSWORD.test(password)
  }

  // validate phone
  public validatePhone(phone: string): boolean {
    return ConstantRegex.PHONE.test(phone)
  }

  // validate address
  public validateAddress(address: string): boolean {
    return ConstantRegex.ADDRESS.test(address)
  }
}

export default UserValidation
