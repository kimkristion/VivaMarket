const { User, Product } = require('../models/index')
const { signToken, AuthenticationError, dateFormat } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    product: async (parent, { name }) => {
      return Product.findOne({ name });
    },
    products: async () => {
      return await Product.find();
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    createProduct: async (parent, { input }) => {
      const product = await Product.create({
        ...input,
        createdAt: Date.now(),
      });
      await product.save();
      return product;
    },
    addReview: async (_, { name, input }) => {
      const product = await Product.findOne({ name });
      if (!product) {
        throw new Error('Product not found');
      }

      const user = await User.findOne({ username: input.username });
      if (!user) {
        throw new Error('User not found');
      }

      const review = {
        reviewBody: input.reviewBody,
        user: user,
        createdAt: dateFormat(Date.now()),
      };

      product.reviews.push(review);
      await product.save();
      return product;
    },
  },
};

module.exports = resolvers;
