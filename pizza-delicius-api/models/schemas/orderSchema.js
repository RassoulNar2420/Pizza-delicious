import mongoose from 'mongoose'

const Schema = mongoose.Schema
const allowedOrderStates = ['pending', 'cooking', 'delivered', 'shipped', 'cancelled']
export const allowedOrderDeliverTypes = ['pickup', 'delivery']

export const orderSchema = new Schema({
  deliverAt: { type: Date, required: true },
  status: { type: String, default: 'pending', enum: allowedOrderStates },
  total: { type: Number, required: true },
  taxes: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  user: {
    _id: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    name: {type: String, required: true},
    lastname: {type: String, required: true},
   },
  products: [{
    _id: {type: String, required: true},
    name: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    qty: {type: Number, required: true},
    price: {type: Number, required: true},
    subtotal: {type: Number, required: true},
    taxes: {type: Number, required: true},
    total: {type: Number, required: true},
   }],
  deliverType: { type: String, default: 'delivery', enum: allowedOrderDeliverTypes },
},
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)
