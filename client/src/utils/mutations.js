import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
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




