import {bool, object, setLocale, string} from 'yup';
import {es} from 'yup-locales';

setLocale(es);

const userUpdateSchema = object({
  email: string().optional().email().label('email'),
  password: string().optional().min(8).max(40).label('contraseña'),
  name: string().optional().label('nombre'),
  lastname: string().optional().label('apellido(s)'),
  alias: string().optional().nullable().label('alias'),
  phone: string().optional().label('móvil'),
  address: string().optional().label('dirección'),
  published: bool().optional().label('publicado')
})

export const userUpdateValidations = async (req, res, next) => {
  try {
    req.data = await userUpdateSchema.validate(req.body, {abortEarly: false})
    next()
  } catch (e) {
    next(e)
  }
}
