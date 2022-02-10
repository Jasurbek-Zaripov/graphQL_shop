import { forLogin, forRegister } from './auth-service.js'
import { crypting } from '../service/jwt-service.js'

export default {
  Query: {
    login: async (__, _, { db }) => {
      try {
        let { rows } = await forLogin(db, _)
        return await crypting(rows[0])
      } catch (error) {
        throw { error }
      }
    },
  },

  Mutation: {
    register: async (__, _, { db }) => {
      try {
        let { rows } = await forRegister(db, _)
        return await crypting(rows[0])
      } catch (error) {
        throw { error }
      }
    },
  },
}
