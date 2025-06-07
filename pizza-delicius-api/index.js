import express from 'express'
import { productController } from './controllers/productController.js'
import { contactRequestController } from './controllers/contactRequestController.js'
import { orderController } from './controllers/orderController.js'
import { articleController } from './controllers/articleController.js'
import { ConflictError } from './errors/ConflictError.js'
import { NotFoundError } from './errors/NotFoundError.js'
import { ValidationError } from 'yup'
import { userController } from './controllers/userController.js'
import { NotAuthorizedError } from './errors/NotAuthorizedError.js'
import mongoose from 'mongoose'
import { BadRequestError } from './errors/BadRequestError.js'
import bearerToken from 'express-bearer-token'
import jwt from 'jsonwebtoken'
import { ForbiddenError } from './errors/ForbiddenError.js'
import cors from 'cors'

const app = express()
const port = process.env.SERVER_PORT || 3000

app.use(cors())
//enganchamos el middleware express.json que obtiene el cuerpo y lo establece en req.body con formado de objeto de js
app.use(express.json())
app.use(bearerToken())

app.get('/', (req, res) => {
  res.json({ version: "1.0.0" })
})

app.use(productController)
app.use(articleController)
app.use(contactRequestController)
app.use(userController)
app.use(orderController)

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  /*console.info("---------")
  console.info(err)
  console.info("---------")*/
  if (err instanceof ConflictError) {
    res.status(409)
    res.json({ message: err.message })
  } else if (err instanceof NotFoundError) {
    res.status(404)
    res.json({ message: err.message })
  } else if (err instanceof ValidationError) {
    res.status(400)
    res.json({ message: "validation_error", errors: err.errors })
  } else if (err instanceof BadRequestError) {
    res.status(400)
    res.json({ message: err.message })
  } else if (err instanceof NotAuthorizedError) {
    res.status(401)
    res.json({ message: err.message })
  } else if (err instanceof jwt.JsonWebTokenError ||
    err instanceof ForbiddenError) {
    res.status(403)
    res.json({ message: 'forbidden' })
  } else if (err?.code === 11000) {
    res.status(409)
    res.json({ message: 'duplicated_key', errors: [err.errorResponse.keyValue] })
  } else {
    res.status(500)
    res.json({ message: 'internal_error' })
  }
})

try {
  console.info("conectando con la base de datos...")
  await mongoose.connect(process.env.MONGO_CONN_STR)

  app.listen(port, () => {
    console.info(`El servidor está corriendo en http://localhost:${port}`)
  })
} catch (e) {
  console.info("Error al conectar con la base de datos, el servidor no se levantará.")
  console.info(e.message)
}
