import mongoose from "mongoose"
import { articleSchema } from "./schemas/articleSchema.js"

export const ArticleModel = mongoose.model('articles', articleSchema)
