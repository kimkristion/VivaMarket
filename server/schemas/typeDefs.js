const typeDefs = `
  type User {
    _id: ID
    email: String!
    password: String!
    firstName: String!
    lastName: String!
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
    user(_id: ID!): User
    me: User
    products: [Product]
    product(_id: ID!): Product
    categories: [Category]
    category(_id: ID!): Category
  }

  input ReviewInput {
    reviewBody: String!
  }

  type Mutation {
    addUser(email: String!, password: String!, firstName: String!, lastName: String!): Auth
    login(email: String!, password: String!): Auth
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
