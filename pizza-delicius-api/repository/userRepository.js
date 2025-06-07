import {UserModel} from '../models/userModel.js'
import {prepareSortObject} from "../utils/prepareSortObject.js"

async function create(data) {
  return await new UserModel(data).save()
}

async function list(sortField) {
  const preparedSortField = prepareSortObject(sortField)
  return await UserModel.find().sort(preparedSortField)
}

async function getItem(id, onlyEnabled = true) {
  const params = { _id: id}
  if(onlyEnabled) params.enabled = true
  return await UserModel.findOne(params).exec()
}

async function deleteItem(id) {
  return await UserModel.findOneAndDelete({ _id: id }).exec()
}

async function updateItem(id, data) {
  return await UserModel.findOneAndUpdate({ _id: id }, data, {new: true}).exec()
}

async function getItemByEmailAndPassword(email, password) {
  return await UserModel.findOne({ email, password, enabled: true }).exec()
}

export const userRepository = {
  list,
  create,
  getItem,
  deleteItem,
  updateItem,
  getItemByEmailAndPassword
}
