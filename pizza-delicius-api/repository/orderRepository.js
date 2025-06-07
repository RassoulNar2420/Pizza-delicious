import {OrderModel} from '../models/orderModel.js'
import {prepareSortObject} from "../utils/prepareSortObject.js"

async function create(data) {
  return await new OrderModel(data).save()
}

async function list(sortField, customerId = null) {
  const preparedSortField = prepareSortObject(sortField)
  const params = {}
  //if (customerId) params.user = {_id: customerId}
  const orders =  await OrderModel.find(params).sort(preparedSortField)

  return orders.filter((order) => {
    console.info(order.user)
    return !customerId || order.user._id === customerId
  })
}

async function getItem(id, customerId = null) {
  const params = {_id: id}
  if (customerId) params.user = {_id: customerId}
  return await OrderModel.findOne(params).exec()
}

async function deleteItem(id) {
  return await OrderModel.findOneAndDelete({_id: id}).exec()
}

async function updateItem(id, data) {
  return await OrderModel.findOneAndUpdate({_id: id}, data, {new: true}).exec()
}

export const orderRepository = {
  list,
  create,
  getItem,
  deleteItem,
  updateItem
}
