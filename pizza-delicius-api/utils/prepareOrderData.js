/*
 Premisa: Todos los productos tienen un 10% de IVA
 */
import {BadRequestError} from "../errors/BadRequestError.js";
import {productRepository} from "../repository/productRepository.js";
import {userRepository} from "../repository/userRepository.js";
import {NotFoundError} from "../errors/NotFoundError.js";

export const prepareOrderData = async (data, customerId) => {
  if (!customerId) {
    throw new BadRequestError('customer_id_is_required')
  }
  const user = await userRepository.getItem(customerId)
  if (!user) {
    throw new NotFoundError('user_not_found')
  }
  const orderPreparedData = {
    deliverAt: data.deliverAt,
    status: 'pending',
    total: 0,
    taxes: 0,
    subtotal: 0,
    user: {
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      phone: user.phone,
      address: user.address
    },
    products: [],
    deliverType: data.deliverType
  }

  const databaseProducts = await productRepository.list('-id', false)

  for (const product of data.products) {
    //obtenemos todos los productos de la base de datos
    const databaseProduct = databaseProducts.find(p => p._id.toString() === product._id)
    //no permitimos pedir productos que no existan en base de datos
    if (!databaseProduct) {
      throw new NotFoundError('product_not_found')
    }
    //calculamos totales de la línea de pedido (multiplicamos por 0.1 para obtener el 10% de IVA)
    const total = databaseProduct.price * product.qty
    const taxes = total * 0.1
    const subtotal = total - taxes
    //añadimos la información del producto al pedido
    orderPreparedData.products.push({
      _id: databaseProduct._id,
      name: databaseProduct.name,
      image: databaseProduct.image,
      category: databaseProduct.category,
      qty: product.qty,
      price: databaseProduct.price,
      subtotal: subtotal,
      taxes: taxes,
      total: total
    })
    //incrementamos los valores totales del pedido con los del producto
    orderPreparedData.total += total
    orderPreparedData.taxes += taxes
    orderPreparedData.subtotal += subtotal
  }

  return orderPreparedData
}
