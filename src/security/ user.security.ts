import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

import Variable from '@/env/variable.env'

class UserSecurity {
  // encrypt password from database to compare with the password entered by the user
  public encrypt(password: string): string {
    return CryptoJS.AES.encrypt(password, Variable.PASS_SECRET).toString()
  }

  // decrypt password from database to compare with the password entered by the user
  public decrypt(password: string): string {
    return CryptoJS.AES.decrypt(password, Variable.PASS_SECRET).toString(
      CryptoJS.enc.Utf8,
    )
  }

  //  compare password entered by the user with the password in the database

  public compare(password: string, passwordHash: string): boolean {
    return this.decrypt(passwordHash) === password
  }

  // generate token for user
  public generateAccessToken(id: string, isAdmin: boolean): string {
    const token = jwt.sign({ id, isAdmin }, Variable.JWT_SECRET, {
      expiresIn: '3d',
    })
    return `Bearer ${token}`
  }
}

export default new UserSecurity()
