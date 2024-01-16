const { User, Product, Category } = require('../models/index');
const { signToken, AuthenticationError, dateFormat } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { _id }) => {
      return User.findOne({ _id });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('Not authenticated');
    },
    product: async (parent, { _id }) => {
      return Product.findById({ _id });
    },
    products: async () => {
      return await Product.find();
    },
    categories: async () => {
      return await Category.find();
    },
    category: async (parent, { _id }) => {
      return await Category.findOne({ _id });
    }
  },

  Mutation: {
    addUser: async (parent, { email, password, firstName, lastName }) => {
      const user = await User.create({ email, password, firstName, lastName });
      const token = signToken(user);
      return { token, user };
    },
    
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect Password');
      }

      const token = signToken(user);

      return { token, user };
    },

    addCategory: async (parent, { category_name }) => {
      try {
        const newCategory = new Category({ category_name });
        const saveCategory = await newCategory.save();
        return saveCategory;
      } catch (error) {
        throw new Error(`Failed to add category: ${error.message}`);
      }
    },

    createProduct: async (parent, {
      name,
      description,
      price,
      quantity,
      category,
      imageUrl
    }) => {
      try {
        const existingProduct = await Product.findOne({ name });
    
        if (existingProduct) {
          throw new Error("Product with this name already exists");
        }

        const product = await Product.create({
          name,
          description,
          price,
          quantity,
          category,
          imageUrl,
          createdAt: Date.now(),
        });
    
        return product;
      } catch (error) {
        console.error("Error creating product:", error);
        throw new Error("Failed to create product");
      }
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
  }
};

module.exports = resolvers;
