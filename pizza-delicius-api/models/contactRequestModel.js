import mongoose from "mongoose"
import { contactRequestSchema } from "./schemas/contactRequestSchema.js"

export const ContactRequestModel = mongoose.model('contactRequest', contactRequestSchema)
