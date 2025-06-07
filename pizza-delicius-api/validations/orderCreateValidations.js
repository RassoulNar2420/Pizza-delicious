import {object, setLocale, string, date, array} from 'yup';
import {es} from 'yup-locales';
import { allowedOrderDeliverTypes } from '../models/schemas/orderSchema.js';

setLocale(es);

const orderCreateSchema = object({
  deliverAt: date().required().label('fecha/hora de entrega'),
  user: string().required().label('usuario'),
  products: array().required().min(1).label('productos'),
  deliverType: string().required().oneOf(allowedOrderDeliverTypes).label('tipo de entrega'),
})

const orderProductsCreateSchema = array({
    _id: {type: String, required: true},
    qty: {type: String, required: true},
})

export const orderCreateValidations = async (req, res, next) => {
  try {
    req.data = await orderCreateSchema.validate(req.body, {abortEarly: false})
    //req.data = await orderProductsCreateSchema.validate(req.body.products, {abortEarly: false})
    next()
  } catch (e) {
    next(e)
  }
}
