import { Schema } from 'mongoose';
import { User } from '../Interfaces/user.interface';
import { validate } from 'class-validator';

// create a schema for the user data
export const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

// validate the user data
UserSchema.pre('validate', async function () {
  const userData = this as User;

  // validate the user data and log any errors
  try {
    await validate(userData);
  } catch (errors) {
    console.error(errors);
    throw new Error('Validation error');
  }
});
