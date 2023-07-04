import { Document } from "mongoose";

export default interface IUser extends Document {
    username: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    isAdmin: boolean;
}