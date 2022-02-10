import { makeExecutableSchema } from '@graphql-tools/schema'
import category from './category/category.js'
import product from './product/product.js'
import order from './order/order.js'
import auth from './auth/auth.js'
import upload from './upload/upload.js'
import uploadResolver from './upload/upload-resolver.js'
import uploadSchema from './upload/upload-schema.js'

export default makeExecutableSchema({
  typeDefs: [uploadSchema, category.schema, product.schema, order.schema, auth.schema],
  resolvers: [uploadResolver, category.resolver, product.resolver, order.resolver, auth.resolver, upload],
})
