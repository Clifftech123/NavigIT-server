import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  readonly username: string;
  readonly password: string;
  readonly email: string;
}
