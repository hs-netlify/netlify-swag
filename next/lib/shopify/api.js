import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_SHOPIFY_ENDPOINT, {
  headers: {
    "X-Shopify-Storefront-Access-Token":
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  },
});

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
  const results = await client.request(query, variables);
  return results.productByHandle.variants.edges.map((n) => n.node);
}
