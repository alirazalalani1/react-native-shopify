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
      userErrors {
        field
        message
      }
    }
  }
`;

const GET_CUSTOMER = gql`
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      displayName
      email
    }
  }
`;

const CREATE_CART = gql`
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const GET_CART = gql`
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      totalQuantity
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                  width
                  height
                }
                product {
                  id
                  title
                  handle
                }
              }
            }
          }
        }
      }
    }
  }
`;

const ADD_TO_CART = gql`
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CHECKOUT_URL = gql`
  mutation CheckoutCreate($lineItems: [CheckoutLineItemInput!]!) {
    checkoutCreate(input: {lineItems: $lineItems}) {
      checkout {
        id
        webUrl
      }
    }
  }
`;

export {
  GET_PRODUCTS,
  CUSTOMER_LOGIN,
  GET_CUSTOMER,
  CREATE_CART,
  GET_CART,
  ADD_TO_CART,
  CHECKOUT_URL,
};
