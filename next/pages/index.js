import { getNavigation, getHome, getProduct } from "../lib/prismic";
import Link from "next/link";
import FeaturedProduct from "../components/FeaturedProduct";

export default function Home({ featuredProducts }) {
  return (
    <main className="flex-grow max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <h1 className="mb-12 text-3xl font-bold">{featuredProducts.title}</h1>
      <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
        {featuredProducts.products.map((product) => (
          <li key={product.title}>
            <Link href={`/product/${product.slug}`}>
              <a>
                <FeaturedProduct product={product} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getStaticProps({ params }) {
  const navLinks = await getNavigation();
  const homeData = await getHome();
  const products = await Promise.all(
    homeData.featured_products.map(async (p) => {
      const product = await getProduct(p.featured_product.uid);
      return {
        title: product.data.name,
        slug: p.featured_product.uid,
        imageUrl: product.data.shopify_product.image.src,
      };
    })
  );
  const featuredProducts = {
    title: homeData.featured_products_title,
    products,
  };
  return {
    props: {
      navLinks,
      featuredProducts,
    },
  };
}
