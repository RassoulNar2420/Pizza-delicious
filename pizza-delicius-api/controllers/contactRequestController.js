import express from 'express'
import {v4 as uuidv4} from 'uuid'
import {contactRequestCreateValidations} from '../validations/contactRequestCreateValidations.js';
import {contactRequestRepository} from '../repository/contactRequestRepository.js';
import {checkSession} from "../models/security/checkSession.js";
import {validateObjectIdFormat} from "../validations/validateObjectIdFormat.js";

const contactRequestController = express.Router()

contactRequestController.route('/contact-requests')
  .post(contactRequestCreateValidations, async (req, res, next) => {
    try {
      //si la información recibida no tiene id, establecemos un uuidv4 por defecto
      if (!req.data?.id) req.data.id = uuidv4()
      if (!req.data?.createdAt) req.data.createdAt = new Date()
      // creamos el elemento en nuestra db temporal (constante en memoria)
      const createdItem = await contactRequestRepository.create(req.data)
      //devolvemos el elemento recien creado
      res.status(201).json(createdItem)
    } catch (e) {
      next(e)
    }
  })
  .get(checkSession(['admin'], true), async (req, res) => {
    const currentItems = await contactRequestRepository.list('-createdAt')
    res.json(currentItems)
  })

contactRequestController.route('/contact-requests/:contactRequestId')
  .delete(checkSession(['admin'], true), validateObjectIdFormat('contactRequestId'), async (req, res, next) => {
    try {
      const itemId = req.params.contactRequestId
      await contactRequestRepository.deleteItem(itemId)
      res.status(204).json(null)
    } catch (e) {
      next(e)
    }
  })
  .get(checkSession(['admin'], true), validateObjectIdFormat('contactRequestId'), async (req, res, next) => {
    try {
      const itemId = req.params.contactRequestId
      const foundItem = await contactRequestRepository.getItem(itemId)
      res.json(foundItem)
    } catch (e) {
      next(e)
    }
  })

export {contactRequestController}
