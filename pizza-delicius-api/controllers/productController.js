import express from 'express'
import {v4 as uuidv4} from 'uuid'
import {productRepository} from '../repository/productRepository.js'
import {productCreateValidations} from '../validations/productCreateValidations.js';
import {productUpdateValidations} from '../validations/productUpdateValidations.js';
import {checkSession} from "../models/security/checkSession.js";
import {NotFoundError} from "../errors/NotFoundError.js";
import {validateObjectIdFormat} from "../validations/validateObjectIdFormat.js";

const productController = express.Router()

productController.route('/products')
  .post(checkSession(['admin'], true), productCreateValidations, async (req, res, next) => {
    //si la información recibida no tiene id, establecemos un uuidv4 por defecto
    if (!req.data?.id) req.data.id = uuidv4()
    // creamos el producto en nuestra db temporal (constante en memoria)
    try {
      const createdItem = await productRepository.create(req.data)

      //devolvemos el artículo recien creado
      res.status(201).json(createdItem)
    } catch (e) {
      next(e)
    }
  })
  .get(checkSession(['user', 'admin'], false), async (req, res, next) => {
    const sortField = req.query?.sort || 'category'
    const onlyEnabled = req.userIsAdmin ? false : true
    const currentItems = await productRepository.list(sortField, onlyEnabled)
    res.json(currentItems.map(item => {
      const prepared = item.toJSON()
      prepared.price = parseFloat(prepared.price)
      return prepared
    }))
  })

productController.route('/products/:productId')
  .put(checkSession(['admin'], true), validateObjectIdFormat('productId'), productUpdateValidations, async (req, res, next) => {
    const productId = req.params.productId
    try {
      const updatedItem = await productRepository.updateItem(productId, req.data)

      if (!updatedItem) {
        return next(new NotFoundError('product_not_found'))
      }
      res.json(updatedItem)
    } catch (e) {
      next(e)
    }
  })
  .delete(checkSession(['admin'], true), validateObjectIdFormat('productId'), (req, res) => {
    const productId = req.params.productId
    productRepository.deleteItem(productId)
    res.status(204).json(null)
  })
  .get(checkSession(['user', 'admin'], false), validateObjectIdFormat('productId'), async (req, res, next) => {
    const productId = req.params.productId
    const onlyEnabled = req.userIsAdmin ? false : true
    const foundItem = await productRepository.getItem(productId, onlyEnabled)
    if (!foundItem) {
      return next(new NotFoundError('product_not_found'))
    }

    const prepared = foundItem.toJSON()
    prepared.price = parseFloat(prepared.price)
    res.json(prepared)
  })

export {productController}
