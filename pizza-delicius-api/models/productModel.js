import mongoose from "mongoose"
import { productSchema } from "./schemas/productSchema.js"

export const ProductModel = mongoose.model('products', productSchema)
