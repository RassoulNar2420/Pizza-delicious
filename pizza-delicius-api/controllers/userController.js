import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { userCreateValidations } from '../validations/userCreateValidations.js';
import { userUpdateValidations } from '../validations/userUpdateValidations.js';
import { userRepository } from '../repository/userRepository.js';
import { sha512 } from 'js-sha512';
import { NotAuthorizedError } from '../errors/NotAuthorizedError.js';
import { userLoginValidations } from '../validations/userLoginValidations.js';
import { validateObjectIdFormat } from '../validations/validateObjectIdFormat.js';
import { createUserToken } from '../models/security/createUserToken.js';
import { checkSession } from '../models/security/checkSession.js';
import { ForbiddenError } from '../errors/ForbiddenError.js';

const userController = express.Router()

userController.route('/users')
  .post(userCreateValidations, async (req, res, next) => {
    //si la información recibida no tiene id, establecemos un uuidv4 por defecto
    if (!req.data?.id) req.data.id = uuidv4()
    req.data.createdAt = new Date()
    req.data.enabled = true
    req.data.profile = 'user'
    req.data.password = sha512(req.data.password)

    try {
      // creamos el artículo en nuestra db temporal (constante en memoria)
      const createdItem = await userRepository.create(req.data)
      const response = createdItem.toJSON()
      delete response.password
      //devolvemos el artículo recien creado
      res.status(201).json(response)
    } catch (e) {
      next(e)
    }
  })
  .get(checkSession(['admin'], true), async (req, res) => {
    const sortField = req.query?.sort || '-createdAt'
    const currentItems = await userRepository.list(sortField)
    const preparedItems = currentItems.map((user) => {
      const item = user.toJSON()
      delete item.password

      return item
    })
    res.json(preparedItems)
  })

userController.route('/users/logins')
  .post(userLoginValidations, async (req, res, next) => {
    try {
      const receivedPassword = sha512(req.data.password)
      const foundUser = await userRepository.getItemByEmailAndPassword(req.data.email, receivedPassword)
      if (!foundUser) {
        return next(new NotAuthorizedError('user_or_email_are_incorrect'))
      }

      const jwt = await createUserToken(foundUser)

      return res.status(201).json({jwt})
    } catch (e) {
      next(new NotAuthorizedError('user_or_email_are_incorrect'))
    }
  })

userController.route('/users/:userId')
  .put(checkSession(['admin', 'user'], true), validateObjectIdFormat('userId'), userUpdateValidations, async (req, res, next) => {
    try {
      const userId = req.params.userId
      if(!req.isAdminUser && userId !== req.tokenData.id){
        return next(new ForbiddenError('access_not_allowed'))
      }
      const updatedItem = await userRepository.updateItem(userId, req.data)
      if (!updatedItem) {
        return next(new NotFoundError('user_not_found'))
      }
      const result = updatedItem.toJSON()
      delete result.password
      res.json(result)
    } catch (e) {
      next(e)
    }
  })
  .delete(checkSession(['admin', 'user'], true), validateObjectIdFormat('userId'), async (req, res, next) => {
    const userId = req.params.userId
    if(!req.isAdminUser && userId !== req.tokenData.id){
      return next(new ForbiddenError('access_not_allowed'))
    }
    const deletedItem = await userRepository.deleteItem(userId)
    if (!deletedItem) {
      return next(new NotFoundError('user_not_found'))
    }
    res.status(204).json(null)
  })
  .get(checkSession(['admin', 'user'], true), validateObjectIdFormat('userId'), async (req, res, next) => {
    const userId = req.params.userId
    if(!req.isAdminUser && userId !== req.tokenData.id){
      return next(new ForbiddenError('access_not_allowed'))
    }
    const onlyEnabled = req.userIsAdmin ? false : true
    const foundItem = await userRepository.getItem(userId, onlyEnabled)
    if (!foundItem) {
      return next(new NotFoundError('user_not_found'))
    }
    const result = foundItem.toJSON()
    delete result.password
    res.json(result)
  })

export { userController }
