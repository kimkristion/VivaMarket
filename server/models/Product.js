const { Schema, model, Types } = require('mongoose');
const { dateFormat } = require('../utils/dateFormat');
const validator = require('validator');

const reviewSchema = new Schema({
  reviewId: {
    type: Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reviewBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timestamp) => dateFormat(timestamp),
  },
});

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    max: 1000,
  },
  userQuantity: {
    type: Number,
    default: 1,
    min: 1
  },
  category: {
    type: Schema.Types.Mixed,
    ref: 'Category'
  },
  imageUrl: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timestamp) => dateFormat(timestamp),
  },
  reviews: [reviewSchema],
});

const Product = model('Product', productSchema);

module.exports = Product;
