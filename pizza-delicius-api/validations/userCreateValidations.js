import {object, setLocale, string} from 'yup';
import {es} from 'yup-locales';

setLocale(es);

const userCreateSchema = object({
  email: string().required().email().label('email'),
  password: string().required().min(8).max(40).label('contraseña'),
  name: string().required().label('nombre'),
  lastname: string().optional().label('apellido(s)'),
  alias: string().optional().nullable().label('alias'),
  phone: string().required().label('móvil'),
  address: string().required().label('dirección')
})

export const userCreateValidations = async (req, res, next) => {
  try {
    req.data = await userCreateSchema.validate(req.body, {abortEarly: false})
    next()
  } catch (e) {
    next(e)
  }
}
