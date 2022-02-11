export default `
type response {
  token:String!
}


type Query {
  login(email:String!, password:String!): response
}

type Mutation {
  register(username:String!,password:String!,contact:Int!,email:String!): response
}
`
