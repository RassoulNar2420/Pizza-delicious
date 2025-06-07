import mongoose from "mongoose"
import { orderSchema } from "./schemas/orderSchema.js"

export const OrderModel = mongoose.model('orders', orderSchema)
