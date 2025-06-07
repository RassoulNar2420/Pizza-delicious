import {bool, number, object, setLocale, string} from 'yup';
import {es} from 'yup-locales';
import {allowedProductCategories} from "../models/schemas/productSchema.js";

setLocale(es);

const productCreateSchema = object({
  reference: string().required().label('referencia'),
  name: string().required().label('nombre'),
  price: number().required().positive().label('precio'),
  description: string().required().label('descripción'),
  image: string().required().url().label('imagen'),
  category: string().required().oneOf(allowedProductCategories).label('categoría'),
  featured: bool().optional().nullable().label('destacado'),
  menu: bool().optional().nullable().label('menú'),
  published: bool().optional().nullable().label('publicado')
})

export const productCreateValidations = async (req, res, next) => {
  try {
    req.data = await productCreateSchema.validate(req.body, {abortEarly: false})
    next()
  } catch (e) {
    next(e)
  }
}
