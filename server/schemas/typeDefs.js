const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    reviews: [Review]!
  }

  type Review {
    reviewId: ID!
    reviewBody: String!
    user: User!
    createdAt: String!
  }

  type Product {
    _id: ID
    name: String!
    description: String!
    price: Float!
    quantity: Int!
    category: String!
    imageUrl: String
    createdAt: String!
    reviews: [Review]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    products: [Product]
    product(name: String!): Product
  }

  input ReviewInput {
    reviewBody: String!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    createProduct(
      name: String!,
      description: String!,
      price: Float!,
      quantity: Int!,
      category: String,
      imageUrl: String!
    ): Product
    addReview(productId: ID!, input: ReviewInput): Product
  }
`;

module.exports = typeDefs;
