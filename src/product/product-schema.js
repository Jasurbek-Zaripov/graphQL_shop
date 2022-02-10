export default `
scalar Any
enum Price {
  desc
  asc
}
scalar Date

type MyType {
   created: Date
}
type Query {
  products(productId: ID, sapCategoryId: ID, price: Price,addedTime:Date, search:String, page:Int, limit:Int): Any
}
type Mutation {
  editProduct(name:String!, price:Int!, shortDesc:String!, LongDesc: String!, imgUrl:String!):Any
  removeProduct(productId:ID!):Any
}
`
