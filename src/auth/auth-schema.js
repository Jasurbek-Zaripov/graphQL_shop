export default `
scalar Any
type Query {
  login(email:String!, password:String!): Any
}

type Mutation {
  register(username:String!,password:String!,contact:Int!,email:String!): Any
}
`
