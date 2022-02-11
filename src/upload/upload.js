import { finished } from 'stream/promises'
import path from 'path'
import fs from 'fs'
import { decrypting } from '../service/jwt-service.js'
import { addProduct } from '../product/product-service.js'

export default {
  Mutation: {
    addProduct: async (__, _, { db, token }) => {
      try {
        const { createReadStream, filename, mimetype } = await _.file

        //validate type
        if (/(jpg)|(png)|(jpeg)/gi.test(mimetype)) throw new Error('invalid type')

        const fileLink = Date.now() + filename.replace(/\s/g, '_')

        const stream = createReadStream()
        const fileaddress = path.join(process.cwd(), 'src', 'files', fileLink)
        const out = fs.createWriteStream(fileaddress)
        stream.pipe(out)
        await finished(out)
        // end write file

        if (!token) throw new Error('user unAuthorezation!')

        let { id, role } = await decrypting(token)

        if (role != 'admin') throw new Error("ruxsat yo'q!")

        _.imgUrl = fileLink

        let { rows } = await addProduct(db, _)
        return rows
      } catch (error) {
        throw { error }
      }
    },
  },
}
