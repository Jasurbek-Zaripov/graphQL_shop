import { getCategory } from './category-service.js'
import { decrypting } from '../service/jwt-service.js'
export default {
  Query: {
    categories: async (__, _, { db }) => {
      let { rows } = await getCategory(db)
      return rows
    },
  },
  Mutation: {
    addCategory: async (__, _, { db, token }) => {
      try {
        if (token) throw new Error('user unAuthorezation!')

        let { id, role } = await decrypting(token)

        if (role != 'admin') throw new Error("ruxsat yo'q!")

        let { rows } = await db.query(`INSERT INTO categories (name) VALUES ($1) RETURNING name newCategory`, [_.name])

        return rows
      } catch (error) {
        throw { error }
      }
    },
    addSapCategory: async (__, _, { db, token }) => {
      try {
        if (token) throw new Error('user unAuthorezation!')

        let { id, role } = await decrypting(token)

        if (role != 'admin') throw new Error("ruxsat yo'q!")

        let { rows } = await db.query('INSERT INTO (parent_category_id, name) VALUES ($1, $2) RETURNING name newSapCategory', [_.ParentCategoryId, _.name])

        return rows
      } catch (error) {
        throw { error }
      }
    },
    editCategoryName: async (__, _, { db, token }) => {
      try {
        if (token) throw new Error('user unAuthorezation!')

        let { id, role } = await decrypting(token)

        if (role != 'admin') throw new Error("ruxsat yo'q!")
        let result
        if (_.categoryId) {
          result = await db.query('UPDATE categories c SET name = $1 WHERE c.id = $2 RETURNING name updated_name', [_.name, _.categoryId])
        } else if (_.sapCategoryId) {
          result = await db.query('UPDATE sap_categories sc SET name = $1 WHERE sc.id = $2 RETURNING name updated_name', [_.name, _.sapCategoryId])
        }

        if (!result) throw new Error('Bad Request!')
        return result.rows
      } catch (error) {
        throw { error }
      }
    },
    removeCategory: async (__, _, { db, token }) => {
      try {
        if (token) throw new Error('user unAuthorezation!')

        let { id, role } = await decrypting(token)

        if (role != 'admin') throw new Error("ruxsat yo'q!")

        let result
        if (_.categoryId) {
          result = await db.query('DELETE FROM categories c WHERE c.id = $1 RETURNING name deleted_name', [_.categoryId])
        } else if (_.sapCategoryId) {
          result = await db.query('DELETE FROM sap_categories sc WHERE sc.id = $1 RETURNING name deleted_name', [_.sapCategoryId])
        }

        if (!result) throw new Error('Bad Request!')
        return result.rows
      } catch (error) {
        throw { error }
      }
    },
  },
}
