import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const contactRequestSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true }
},
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)
