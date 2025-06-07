import { ForbiddenError } from "../../errors/ForbiddenError.js"
import { NotAuthorizedError } from "../../errors/NotAuthorizedError.js"
import jwt from 'jsonwebtoken'

const APP_SECRET = process.env.APP_JWT_SECRET

export const checkSession = (allowedProfiles = [], isMandatory = true) => {
  return async (req, res, next) => {
    const currentToken = req?.token || null

    if (!currentToken && isMandatory) {
      return next(new NotAuthorizedError('session_is_required'))
    }

    if (!currentToken && !isMandatory) {
      req.tokenData = null
      req.userIsAdmin = false
      return next()
    }

    try {
      const tokenData = await jwt.verify(currentToken, APP_SECRET)

      if(!allowedProfiles.includes(tokenData.profile)){
        return next(new ForbiddenError('access_not_allowed'))
      }
      req.tokenData = tokenData
      req.userIsAdmin = tokenData.profile === 'admin'

      next()
    } catch (e) {
      console.info(e)
      next(e)
    }
  }
}
