import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const PRODUCTS = gql`
  query {
    products {
      _id
      name
      description
      price
      quantity
      userQuantity
      category
      imageUrl
      createdAt
      reviews {
        reviewId
        reviewBody
        user {
          _id
          username
        }
        createdAt
      }
    }
  }

`;

export const GET_PRODUCT_BY_ID = gql`
  query Product($_id: ID!) {
    product(_id: $_id) {
      _id
      name
      description
      price
      quantity
      userQuantity
      category
      imageUrl
      createdAt
      reviews {
        reviewId
        reviewBody
        user {
          _id
          username
        }
        createdAt
      }
    }
  }
`;


export const GET_CATEGORY_BY_ID = gql`
  query Category($_id: ID!) {
    category(_id: $_id) {
      _id
      category_name
    }
  }
`;




