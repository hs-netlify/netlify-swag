import Prismic from "@prismicio/client";

async function getApi() {
  return await Prismic.client(
    process.env.NEXT_PUBLIC_PRISMIC_ENDPOINT ||
      "https://netlify-swag.cdn.prismic.io/api/v2"
  );
}

export async function getHome() {
  const api = await getApi();
  const home = await api.getSingle("home");
  return home.data;
}

export async function getNavigation() {
  const api = await getApi();
  const nav = await api.getSingle("navigation");
  return nav.data.main_nav_links.map((link) => {
    return {
      name: link.link_title,
      href: link.link_address,
    };
  });
}

export async function getProduct(slug) {
  const api = await getApi();
  const product = await api.getByUID("product", slug);
  return product;
}

export async function getMostPopularProductsUid() {
  const api = await getApi();
  const mostPopular = await api.query(
    [
      Prismic.Predicates.at("document.type", "product"),
      Prismic.Predicates.at("document.tags", ["most_popular"]),
    ],
    {
      fetch: "product.uid",
      pageSize: 100,
    }
  );
  return mostPopular.results.map((r) => r.uid);
}
