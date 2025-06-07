import {object, setLocale, string} from 'yup';
import {es} from 'yup-locales';

setLocale(es);

const userLoginSchema = object({
  email: string().required().email().label('email'),
  password: string().required().min(8).max(40).label('contraseña'),
})

export const userLoginValidations = async (req, res, next) => {
  try {
    req.data = await userLoginSchema.validate(req.body, {abortEarly: false})
    next()
  } catch (e) {
    next(e)
  }
}
