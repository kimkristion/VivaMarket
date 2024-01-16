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
    _id: ID!
    name: String!
    description: String!
    price: Float!
    quantity: Int!
    userQuantity: Int
    category: ID!
    imageUrl: String
    createdAt: String!
    reviews: [Review]!
  }

  type Category {
    _id: ID!
    category_name: String!
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
    product(_id: ID!): Product
    categories: [Category]
    category(category_name: String!): Category
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
      category: ID!,
      imageUrl: String!
    ): Product
    addReview(productId: ID!, input: ReviewInput): Product
    addCategory(category_name: String!): Category
  }
`;

module.exports = typeDefs;
