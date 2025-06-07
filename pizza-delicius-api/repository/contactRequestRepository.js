import {prepareSortObject} from "../utils/prepareSortObject.js";
import {ContactRequestModel} from "../models/contactRequestModel.js";
import {ArticleModel} from "../models/articleModel.js";

const contactRequests = []

function create(data) {
  contactRequests.push(data)

  return data
}

async function list(sortField) {
  const preparedSortField = prepareSortObject(sortField)
  const params = {}
  return await ContactRequestModel.find(params).sort(preparedSortField)
}

async function getItem(id) {
  const params = { _id: id }
  return await ContactRequestModel.findOne(params).exec()
}

async function deleteItem(id) {
  return await ArticleModel.findOneAndDelete({ _id: id }).exec()
}

export const contactRequestRepository = {
  list,
  create,
  getItem,
  deleteItem
}
