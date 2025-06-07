import { ProductModel } from '../models/productModel.js';
import { prepareSortObject } from "../utils/prepareSortObject.js";

async function create(data) {
  return await new ProductModel(data).save()
}

async function list(sortField, onlyEnabled = true) {
  const preparedSortField = prepareSortObject(sortField)
  const params = {}
  if (onlyEnabled) params.published = true
  return await ProductModel.find(params).sort(preparedSortField)
}

async function getItem(id, onlyEnabled = true) {
  const params = { _id: id }
  if (onlyEnabled) params.published = true
  return await ProductModel.findOne(params).exec()
}

async function deleteItem(id) {
  return await ProductModel.findOneAndDelete({ _id: id }).exec()
}

async function updateItem(id, data) {
  return await ProductModel.findOneAndUpdate({ _id: id }, data, { new: true }).exec()
}

export const productRepository = {
  list,
  create,
  getItem,
  deleteItem,
  updateItem
}
