import React from "react";
import { getNavigation, getProduct } from "../../lib/prismic/api";
import { adminApiIdtoStorefrontId } from "../../lib/shopify/api";
import { GraphQLClient, gql } from "graphql-request";

const endpoint = "https://netlify-swag.myshopify.com/api/2021-07/graphql.json";

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": "6f88231ac7ae4121461b916ef11d3a27",
  },
});

export default function Product({ product, shopifyProduct }) {
  return (
    <div>
      <h1>Product</h1>
      <h2>Prismic</h2>
      <p>{JSON.stringify(product)}</p>
      <h2>Shopify</h2>
      <p>{JSON.stringify(shopifyProduct)}</p>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const navLinks = await getNavigation();

  const product = await getProduct(params.slug);
  if (!product) {
    return {
      notFound: true,
    };
  }
  const storefrontId = adminApiIdtoStorefrontId(
    product.data.shopify_product.admin_graphql_api_id
  );
  const query = gql`
  {
    node(id: "${storefrontId}") {
      ... on Product {
        title
      }
    }
  }
  `;
  const data = await graphQLClient.request(query);

  return {
    props: {
      navLinks,
      product: product.data,
      shopifyProduct: data,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
