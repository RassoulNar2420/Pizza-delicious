import {bool, number, object, setLocale, string} from 'yup';
import {es} from 'yup-locales';
import {allowedProductCategories} from "../models/schemas/productSchema.js";

setLocale(es);

const productUpdateSchema = object({
  reference: string().optional().label('referencia'),
  name: string().optional().label('nombre'),
  price: number().optional().positive().label('precio'),
  description: string().optional().label('descripción'),
  image: string().optional().url().label('imagen'),
  category: string().optional().oneOf(allowedProductCategories).label('categoría'),
  featured: bool().optional().nullable().label('destacado'),
  menu: bool().optional().nullable().label('menú'),
  published: bool().optional().nullable().label('publicado')
})

export const productUpdateValidations = async (req, res, next) => {
  try {
    req.data = await productUpdateSchema.validate(req.body, {abortEarly: false})
    next()
  } catch (e) {
    next(e)
  }
}
