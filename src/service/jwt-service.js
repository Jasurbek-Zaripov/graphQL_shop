import jwt from 'jsonwebtoken'

export async function crypting(payload) {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
  } catch (error) {
    throw { error }
  }
}

export async function decrypting(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
  } catch (error) {
    throw { error }
  }
}
