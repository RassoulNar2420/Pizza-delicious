import express from 'express'
import {v4 as uuidv4} from 'uuid'
import {orderRepository} from '../repository/orderRepository.js'
import {orderCreateValidations} from '../validations/orderCreateValidations.js';
import {productUpdateValidations} from '../validations/productUpdateValidations.js';
import {checkSession} from "../models/security/checkSession.js";
import {NotFoundError} from "../errors/NotFoundError.js";
import {validateObjectIdFormat} from "../validations/validateObjectIdFormat.js";
import {ForbiddenError} from "../errors/ForbiddenError.js";
import {prepareOrderData} from "../utils/prepareOrderData.js";

const orderController = express.Router()

orderController.route('/orders')
  .post(checkSession(['user'], true), orderCreateValidations, async (req, res, next) => {
    /*
    No aceptamos precios desde el cliente o datos del usuario ya que:
    1. Los datos del usuario los obtendremos de los que tenga guardados
    2.- Los precios los obtendremos de la base de datos, si permitimos que nos digan cantidades del cliente, podrían manipularlo para obtener precios más bajos o gratis
     */
    //si la información recibida no tiene id, establecemos un uuidv4 por defecto
    if (!req.data?.id) req.data.id = uuidv4()
    // creamos el producto en nuestra db temporal (constante en memoria)
    try {
      console.info("aquí")
      const customerId = req.tokenData.id
      const orderData = await prepareOrderData(req.data, customerId)
      const createdItem = await orderRepository.create(orderData)

      //devolvemos el artículo recien creado
      res.status(201).json(createdItem)
    } catch (e) {
      console.error(e)
      next(e)
    }
  })
  .get(checkSession(['user', 'admin'], true), async (req, res, next) => {
    const sortField = req.query?.sort || 'category'
    const customerId = req.userIsAdmin ? null : req.tokenData.id
    if (!customerId && !req.userIsAdmin) next(new ForbiddenError('access_not_allowed'))
    const currentItems = await orderRepository.list(sortField, customerId)
    res.json(currentItems)
  })

orderController.route('/orders/:orderId')
  .put(checkSession(['admin'], true), validateObjectIdFormat('orderId'), productUpdateValidations, async (req, res, next) => {
    const orderId = req.params.orderId
    try {
      const updatedItem = await orderRepository.updateItem(orderId, req.data)

      if (!updatedItem) {
        return next(new NotFoundError('order_not_found'))
      }
      res.json(updatedItem)
    } catch (e) {
      next(e)
    }
  })
  .delete(checkSession(['admin'], true), validateObjectIdFormat('orderId'), async (req, res, next) => {
    try {
      const orderId = req.params.orderId
      await orderRepository.updateItem(orderId, {status: 'cancelled'})

      res.status(204).json(null)
    } catch (e) {
      next(e)
    }
  })
  .get(checkSession(['user', 'admin'], false), validateObjectIdFormat('orderId'), async (req, res, next) => {
    const orderId = req.params.orderId
    const customerId = req.userIsAdmin ? null : req.tokenData.id
    if (!customerId && !req.userIsAdmin) next(new ForbiddenError('access_not_allowed'))
    const foundItem = await orderRepository.getItem(orderId, customerId)
    if (!foundItem) {
      return next(new NotFoundError('order_not_found'))
    }

    res.json(foundItem)
  })

export {orderController}
