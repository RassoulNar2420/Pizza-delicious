import express from 'express'
import {v4 as uuidv4} from 'uuid'
import {articleCreateValidations} from '../validations/articleCreateValidations.js';
import {articleUpdateValidations} from '../validations/articleUpdateValidations.js';
import {articleRepository} from '../repository/articleRepository.js';
import {validateObjectIdFormat} from '../validations/validateObjectIdFormat.js'
import slugify from 'slugify'
import {NotFoundError} from '../errors/NotFoundError.js';
import {checkSession} from '../models/security/checkSession.js';
import mongoose from "mongoose"

const slugifyOpts = {
  lower: true,
  replacement: "-",
  trim: true
}

const articleController = express.Router()

articleController.route('/articles')
  .post(checkSession(['admin'], true), articleCreateValidations, async (req, res, next) => {

    //si la información recibida no tiene id, establecemos un uuidv4 por defecto
    if (!req.data?.id) req.data.id = uuidv4()
    req.data.slug = !req.data.slug ? slugify(req.data.title, slugifyOpts) : slugify(req.data.slug, slugifyOpts)
    // creamos el artículo en nuestra db temporal (constante en memoria)
    try {
      const createdItem = await articleRepository.create(req.data)

      //devolvemos el artículo recien creado
      res.status(201).json(createdItem)
    } catch (e) {
      next(e)
    }
  })
  .get(checkSession(['user', 'admin'], false), async (req, res) => {
    const sortField = req.query?.sort || '-dateAt'
    const onlyEnabled = req.userIsAdmin ? false : true
    const currentItems = await articleRepository.list(sortField, onlyEnabled)
    res.json(currentItems)
  })

articleController.route('/articles/:articleId')
  .put(checkSession(['admin'], true), validateObjectIdFormat('articleId'), articleUpdateValidations, async (req, res, next) => {
    const articleId = req.params.articleId
    if (req.data.slug) req.data.slug = slugify(req.data.slug)
    try {
      const updatedItem = await articleRepository.updateItem(articleId, req.data)

      if (!updatedItem) {
        return next(new NotFoundError('article_not_found'))
      }
      res.json(updatedItem)
    } catch (e) {
      next(e)
    }
  })
  .delete(checkSession(['admin'], true), validateObjectIdFormat('articleId'), async (req, res, next) => {
    const articleId = req.params.articleId
    const deletedItem = await articleRepository.deleteItem(articleId)
    if (!deletedItem) {
      return next(new NotFoundError('article_not_found'))
    }
    res.status(204).json(null)
  })
  .get(checkSession(['user', 'admin'], false), async (req, res, next) => {
    const articleId = req.params.articleId
    const isObjectId = mongoose.isValidObjectId(articleId)
    const onlyEnabled = req.userIsAdmin ? false : true
    let foundItem = null
    if(isObjectId) {
      foundItem = await articleRepository.getItem(articleId, onlyEnabled)
    }else{
      foundItem = await articleRepository.getItemBySlug(articleId, onlyEnabled)
    }
    if (!foundItem) {
      return next(new NotFoundError('article_not_found'))
    }

    res.json(foundItem)
  })

export {articleController}
