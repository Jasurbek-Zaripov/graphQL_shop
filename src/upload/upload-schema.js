export default `
scalar Any
scalar Upload

type Mutation {
  addProduct(file: Upload!, name:String!, sapCategoryId: ID!, price:Int!, shortDesc:String!, LongDesc: String!):Any
}
`
