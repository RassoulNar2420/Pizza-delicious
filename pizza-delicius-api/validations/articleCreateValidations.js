import {bool, date, object, setLocale, string} from 'yup';
import {es} from 'yup-locales';

setLocale(es);

const articleCreateSchema = object({
  title: string().required().label('nombre completo'),
  slug: string().optional().nullable().label('fragmento url'),
  image: string().required().url().label('imagen'),
  excerpt: string().required().max(100).label('entradilla'),
  content: string().required().label('contenido'),
  author: string().optional().default('Pizza Delicious').label('autor'),
  dateAt: date().required().nullable().label('fecha creación'),
  published: bool().optional().default(false).label('publicado')
})

export const articleCreateValidations = async (req, res, next) => {
  try {
    req.data = await articleCreateSchema.validate(req.body, {abortEarly: false})
    next()
  } catch (e) {
    next(e)
  }
}
