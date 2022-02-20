import { Schema, model, models } from "mongoose"

export interface IUser extends Document {
  first: string
  last: string
  phone: string
  cin: string
  birthday: Date
  address: string
  vaccination: [object]
}

const schema = new Schema<IUser>(
  {
    first: { type: String },
    last: { type: String },
    cin: { type: String, required: true, unique: true },
    birthday: { type: Date, required: true },
    address: { type: String },
    phone: { type: String },
    vaccination: [
      {
        shot: Number,
        value: Boolean,
      },
    ],
  },
  { timestamps: true }
)
export const User = models.User || model<IUser>("User", schema)
