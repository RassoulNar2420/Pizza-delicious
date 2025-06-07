import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const allowedProductCategories = ['Pizzas', 'Bebidas', 'Postres', 'Pastas', 'Entrantes']
export const productSchema = new Schema({
  reference: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true, enum: allowedProductCategories },
  featured: { type: Boolean, default: false },
  menu: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
},
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)
