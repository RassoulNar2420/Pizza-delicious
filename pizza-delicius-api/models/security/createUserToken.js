import jwt from 'jsonwebtoken'
import md5 from 'md5'

const APP_SECRET = process.env.APP_JWT_SECRET
const TOKEN_VALIDITY_IN_DAYS = '30 days'

export const createUserToken = async (userData) => {
  const emailMD5 = md5(userData.email)
  const payload = {
    id: userData._id,
    name: userData.name,
    email: userData.email,
    avatar: `https://gravatar.com/avatar/${emailMD5}`,
    profile: userData.profile
  }

  try {
    return await jwt.sign(payload, APP_SECRET, {
      expiresIn: TOKEN_VALIDITY_IN_DAYS
    })
  } catch (e) {
    throw new Error('internal_error')
  }
}
