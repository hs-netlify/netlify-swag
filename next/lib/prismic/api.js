import Prismic from "@prismicio/client";
const locale = process.env.NEXT_PUBLIC_PRISMIC_LOCALE;

async function getApi() {
  return await Prismic.client(process.env.NEXT_PUBLIC_PRISMIC_ENDPOINT);
}

export async function getHome() {
  const api = await getApi();
  const home = await api.getSingle("home", {
    lang: locale,
  });
  return home.data;
}

export async function getNavigation() {
  const api = await getApi();
  const nav = await api.getSingle("navigation", {
    lang: locale,
  });
  return nav.data.main_nav_links.map((link) => {
    return {
      name: link.link_title,
      href: link.link_address,
    };
  });
}

export async function getProduct(slug) {
  const api = await getApi();
  const product = await api.getByUID("product", slug, {
    lang: locale,
  });
  return product;
}
