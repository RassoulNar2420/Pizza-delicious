import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const articleSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  excerpt: { type: String, required: true, maxlength: 100 },
  content: { type: String, required: true },
  author: { type: String, required: true },
  dateAt: { type: Date, required: true },
  published: { type: Boolean, default: false }
},
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)
