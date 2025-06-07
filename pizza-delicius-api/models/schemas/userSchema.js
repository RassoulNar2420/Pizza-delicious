import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  alias: { type: String, default: '' },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  enabled: { type: Boolean, default: false },
  profile: { type: String, default: 'user' },
},
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)
