import { Schema, model } from "mongoose";

export interface IUser {
  _id?: string;
  username: string;
  password: string;
  availableMoney: number;
  isAdmin: boolean;
  role: { type: string, enum: string[], default: string}
  purchasedItems: string[];
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  availableMoney: { type: Number, default: 5000 },
  isAdmin: { type: Boolean, default: false },
  purchasedItems: [{ type: Schema.Types.ObjectId, ref: "product", default: [] }],
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
})

export const UserModel = model<IUser>("user", UserSchema);

