import {date, object, setLocale, string} from 'yup';
import {es} from 'yup-locales';

setLocale(es);

const contactRequestCreateSchema = object({
  fullname: string().required().label('nombre completo'),
  email: string().required().email().label('email'),
  subject: string().required().label('asunto'),
  message: string().required().label('mensaje'),
  createdAt: date().optional().nullable().label('fecha creación'),
})

export const contactRequestCreateValidations = async (req, res, next) => {
  try {
    req.data = await contactRequestCreateSchema.validate(req.body, {abortEarly: false})
    next()
  } catch (e) {
    next(e)
  }
}
