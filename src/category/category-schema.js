export default `
scalar Any
type Query {
  categories: Any
}

type Mutation {
  addCategory(name:String!):Any
  addSapCategory(ParentCategoryId:ID!,name:String!):Any
  editCategoryName(categoryId:ID, sapCategoryId:ID,name:String!):Any
  removeCategory(categoryId:ID, sapCategoryId:ID):Any
}
`
