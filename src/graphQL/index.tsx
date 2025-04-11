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
    }
  }
`;

const CREATE_CART = gql`
  mutation CreateCart {
    cartCreate {
      cart {
        id
        createdAt
        updatedAt
        lines(first: 10) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }

        buyerIdentity {
          deliveryAddressPreferences {
            __typename
          }
          preferences {
            delivery {
              deliveryMethod
            }
          }
        }
        attributes {
          key
          value
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          # The estimated amount, before taxes and discounts, for the customer to pay at checkout.
          subtotalAmount {
            amount
            currencyCode
          }
          # The estimated tax amount for the customer to pay at checkout.
          totalTaxAmount {
            amount
            currencyCode
          }
          # The estimated duty amount for the customer to pay at checkout.
          totalDutyAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export {GET_PRODUCTS, CUSTOMER_LOGIN, GET_CUSTOMER, CREATE_CART};
