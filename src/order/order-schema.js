export default `
scalar Any

enum Count {
  asc
  desc
}

scalar Date

type MyType {
   created: Date
}
enum Product {
  top
  lowest
}
type Query {
  orders(userId: ID, productId:Int, byPaid:Boolean, byAddedTime: Date, limit:Int, page:Int, count:Count): Any
  Totalmoney(paid:Boolean!):Any
  The(product:Product):Any
}

type Mutation {
  addOrder(productId:ID!,):Any
  buyAll:Any
  removeOrder(orderId:ID!):Any
}
`
