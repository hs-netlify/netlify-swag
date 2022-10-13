import { getNavigation, getHome, getProduct } from "../lib/prismic";
import HeroOverlappingImages from "../components/HeroOverlappingImages";
import Perks from "../components/Perks.js";
import FeaturedProducts from "../components/FeaturedProducts";
import { useHydrated } from "../lib/utils";
import TopBanner from "../components/TopBanner";

export default function Home({
  discountMessage,
  featuredProducts,
  recommendedProducts,
}) {
  const hydrated = useHydrated();
  const featured =
    hydrated && recommendedProducts ? recommendedProducts : featuredProducts;
  return (
    <>
      <TopBanner message={discountMessage} />
      <FeaturedProducts title={featured?.title} products={featured?.products} />
      <HeroOverlappingImages />
      <Perks />
    </>
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
        id: p.featured_product.uid,
        href: `/product/${p.featured_product.uid}`,
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
      discountMessage: "Save 10% with code: WELCOME10",
      navLinks,
      featuredProducts,
    },
  };
}
