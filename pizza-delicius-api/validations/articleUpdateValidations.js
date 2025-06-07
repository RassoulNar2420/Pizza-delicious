import {bool, date, object, setLocale, string} from 'yup';
import {es} from 'yup-locales';

setLocale(es);

const articleUpdateSchema = object({
  title: string().optional().label('nombre completo'),
  slug: string().optional().nullable().label('fragmento url'),
  image: string().optional().url().label('imagen'),
  excerpt: string().optional().max(100).label('entradilla'),
  content: string().optional().label('contenido'),
  author: string().optional().label('autor'),
  dateAt: date().optional().nullable().label('fecha creación'),
  published: bool().optional().label('publicado')
})

export const articleUpdateValidations = async (req, res, next) => {
  try {
    req.data = await articleUpdateSchema.validate(req.body, {abortEarly: false})
    next()
  } catch (e) {
    next(e)
  }
}
