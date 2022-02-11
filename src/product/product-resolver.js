import { addProduct, editProduct, getProducts } from './product-service.js'
import { decrypting } from '../service/jwt-service.js'

export default {
  Query: {
    products: async (__, _, { db }) => {
      let { rows } = await getProducts(db, _)
      return rows
    },
  },
  Mutation: {
    editProduct: async (__, _, { db }) => {
      try {
        if (!token) throw new Error('user unAuthorezation!')

        let { id, role } = await decrypting(token)

        if (role != 'admin') throw new Error("ruxsat yo'q!")

        let { rows } = await editProduct(db, _)
        return rows
      } catch (error) {
        throw {
          error,
        }
      }
    },
    removeProduct: async (__, { productId }, { db, token }) => {
      try {
        if (!token) throw new Error('user unAuthorezation!')

        let { id, role } = await decrypting(token)

        if (role != 'admin') throw new Error("ruxsat yo'q!")

        let { rows } = awaitdb.query('DELETE FROM products p WHERE p.id = $1 RETURNING p.name deleted_product', [productId])
        return rows
      } catch (error) {
        throw { error }
      }
    },
  },
}
