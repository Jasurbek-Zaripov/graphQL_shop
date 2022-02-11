import { addOrder, buyAll, editOrder, getOrders, removeOrder, TheFun, TotalmoneyFun } from './order-service.js'
import { decrypting } from '../service/jwt-service.js'

export default {
  Query: {
    orders: async (__, _, { db, token }) => {
      if (!token) throw new Error('user unAuthorezation!')

      let { id, role } = await decrypting(token)

      _.userId = role == 'admin' ? null : id

      let { rows } = await getOrders(db, _)
      return rows
    },
    Totalmoney: async (__, { paid }, { db, token }) => {
      try {
        if (!token) throw new Error('user unAuthorezation!')

        let { id, role } = await decrypting(token)

        if (role != 'admin') throw new Error('role not admin!')

        return await TotalmoneyFun(db, paid)
      } catch (error) {
        throw { error }
      }
    },
    The: async (__, { product }, { db, token }) => {
      try {
        if (!token) throw new Error('user unAuthorezation!')

        let { id, role } = await decrypting(token)

        if (role != 'admin') throw new Error('role not admin!')

        return await TheFun(db, product)
      } catch (error) {
        throw { error }
      }
    },
  },
  Mutation: {
    addOrder: async (__, { productId }, { db, token }) => {
      try {
        if (!token) throw new Error('user unAuthorezation!')
        let { id, role } = await decrypting(token)

        if (role != 'user') throw new Error('role not user!')
        let { rows } = await addOrder(db, id, productId)
        return rows
      } catch (error) {
        throw { error }
      }
    },
    editOrder: async (__, { productId, count }, { db, token }) => {
      try {
        if (!token) throw new Error('user unAuthorezation!')
        let { id, role } = await decrypting(token)

        if (role != 'user') throw new Error('role not user!')
        let { rows } = await editOrder(db, count, id, productId)
        return rows
      } catch (error) {
        throw { error }
      }
    },
    buyAll: async (__, _, { db, token }) => {
      try {
        if (!token) throw new Error('user unAuthorezation!')

        let { id, role } = await decrypting(token)

        if (role != 'user') throw new Error('role not user!')

        let { rows } = await buyAll(db, id)

        return rows
      } catch (error) {
        throw { error }
      }
    },
    removeOrder: async (__, { orderId }, { db, token }) => {
      try {
        if (!token) throw new Error('user unAuthorezation!')

        let { id, role } = await decrypting(token)

        if (role != 'user') throw new Error('role not user!')

        let { rows } = await removeOrder(db, orderId)

        return rows
      } catch (error) {
        throw { error }
      }
    },
  },
}
