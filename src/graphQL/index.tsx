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
      displayName
      email
      firstName
      id
      lastName
      numberOfOrders
      phone
      tags
      defaultAddress {
        address1
        city
        province
        zip
        country
      }
    }
  }
`;

const CREATE_CART = gql`
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        buyerIdentity {
          email
          phone
          countryCode
          customer {
            email
          }
        }
        totalQuantity
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

const UPDATE_CART = gql`
  mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
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
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CREATE_CUSTOMER_ADDRESS = gql`
  mutation CreateCustomerAddress(
    $customerAccessToken: String!
    $address: MailingAddressInput!
  ) {
    customerAddressCreate(
      customerAccessToken: $customerAccessToken
      address: $address
    ) {
      customerAddress {
        id
        firstName
        lastName
        company
        address1
        address2
        city
        province
        country
        zip
      }
    }
  }
`;

export const SET_DEFAULT_CUSTOMER_ADDRESS = gql`
  mutation customerDefaultAddressUpdate(
    $customerAccessToken: String!
    $addressId: ID!
  ) {
    customerDefaultAddressUpdate(
      customerAccessToken: $customerAccessToken
      addressId: $addressId
    ) {
      customer {
        defaultAddress {
          id
          address1
        }
      }
      customerUserErrors {
        message
      }
    }
  }
`;

export const CART_BUYER_IDENTITY_UPDATE = gql`
  mutation CartBuyerIdentityUpdate(
    $cartId: ID!
    $address: MailingAddressInput!
  ) {
    cartBuyerIdentityUpdate(
      cartId: $cartId
      buyerIdentity: {deliveryAddressPreferences: {deliveryAddress: $address}}
    ) {
      cart {
        id
        checkoutUrl
      }
    }
  }
`;

const REMOVE_CART = gql`
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
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
  UPDATE_CART,
  CREATE_CUSTOMER_ADDRESS,
  REMOVE_CART,
};
