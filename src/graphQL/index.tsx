import {gql} from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          variants(first: 1) {
            edges {
              node {
                priceV2 {
                  amount
                }
              }
            }
          }
          images(first: 10) {
            edges {
              node {
                src
              }
            }
          }
        }
      }
    }
  }
`;

const CUSTOMER_LOGIN = gql`
  mutation CustomerAccessTokenCreate($email: String!, $password: String!) {
    customerAccessTokenCreate(input: {email: $email, password: $password}) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customer {
        id
        displayName
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export {GET_PRODUCTS, CUSTOMER_LOGIN};
