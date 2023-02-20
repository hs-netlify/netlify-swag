import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_SHOPIFY_ENDPOINT ||
    "https://netlify-swag.myshopify.com/api/unstable/graphql.json",
  {
    headers: {
      "X-Shopify-Storefront-Access-Token":
        process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
        "6f7cec05e8c3d2b0ce1463cc99afe293",
    },
  }
);

export async function getInventoryByHandle(handle) {
  const query = gql`
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        variants(first: 5) {
          edges {
            node {
              id
              title
              quantityAvailable
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;
  const variables = {
    handle,
  };
  const res = await client.request(query, variables);
  return res.productByHandle.variants.edges.map((n) => n.node);
}

const CART_FRAGMENT = gql`
  fragment CartDetails on Cart {
    checkoutUrl
    id
    createdAt
    updatedAt
    estimatedCost {
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 250) {
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
              product {
                title
                handle
                images(first: 1) {
                  edges {
                    node {
                      transformedSrc
                    }
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

export async function createEmptyCart() {
  const mutation = gql`
    mutation cartCreate {
      cartCreate {
        cart {
          ...CartDetails
        }
      }
    }
    ${CART_FRAGMENT}
  `;
  const res = await client.request(mutation);
  return res.cartCreate.cart;
}

export async function addToCart(cartId, lines) {
  const mutation = gql`
    mutation addItemToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartDetails
        }
      }
    }
    ${CART_FRAGMENT}
  `;
  const variables = {
    cartId,
    lines,
  };
  const res = await client.request(mutation, variables);
  return res.cartLinesAdd.cart;
}

export async function removeFromCart(cartId, lineId) {
  const mutation = gql`
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartDetails
        }
      }
    }
    ${CART_FRAGMENT}
  `;
  const variables = {
    cartId,
    lineIds: [lineId],
  };
  const res = await client.request(mutation, variables);
  return res.cartLinesRemove.cart;
}

export async function updateItemInCart(cartId, line) {
  const mutation = gql`
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartDetails
        }
      }
    }
    ${CART_FRAGMENT}
  `;
  const variables = {
    cartId,
    lines: [line],
  };
  const res = await client.request(mutation, variables);
  return res.cartLinesUpdate.cart;
}

export async function fetchExistingCart(cartId) {
  const query = gql`
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartDetails
      }
    }
    ${CART_FRAGMENT}
  `;
  const variables = {
    cartId,
  };
  const res = await client.request(query, variables);
  return res.cart;
}
