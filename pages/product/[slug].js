import ProductVariantPicker from "../../components/ProductVariantPicker";
import Image from "next/image";
import {
  getMostPopularProductsUid,
  getNavigation,
  getProduct,
} from "../../lib/prismic";
import Cookies from "js-cookie";
import { useEffect } from "react";

function setVisitedProductsCookie(product) {
  const slug = product.shopify_product.handle;
  const productSummary = {
    title: product.name,
    id: slug,
    href: `/product/${slug}`,
    imageUrl: product.shopify_product.image.src,
  };
  const visitedProductsJson = Cookies.get("visitedProducts");
  let visitedProducts = {};
  if (visitedProductsJson) {
    visitedProducts = JSON.parse(visitedProductsJson);
  }
  if (visitedProducts[slug]) {
    visitedProducts[slug].product = productSummary;
    visitedProducts[slug].vistCount++;
    visitedProducts[slug].lastVisited = new Date();
  } else {
    visitedProducts[slug] = {
      product: productSummary,
      vistCount: 1,
      lastVisited: new Date(),
    };
  }
  Cookies.set("visitedProducts", JSON.stringify(visitedProducts));
}

export default function Product({ product, cookieConsentGiven }) {
  useEffect(() => {
    if (cookieConsentGiven) {
      setVisitedProductsCookie(product);
    }
  }, [cookieConsentGiven]);

  return (
    <main className="max-w-7xl py-12 mx-auto flex-grow px-4 sm:px-6 lg:px-8 grid gap-12 grid-cols-[3fr,2fr]">
      <div className="relative h-[46rem]">
        <Image
          className="object-cover shadow-lg rounded-lg"
          src={product.shopify_product.image.src}
          alt=""
          layout="fill"
        />
      </div>
      <div className="space-y-6">
        <h1 className="font-bold text-3xl">{product.name}</h1>
        <p>{product.description[0].text}</p>
        <ProductVariantPicker productHandle={product.shopify_product.handle} />
      </div>
    </main>
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
  return {
    props: {
      navLinks,
      product: product.data,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  // We will only statically generate the most popular product pages
  // Below we are generating the paths for the products that are tagged as most popular in the CMS
  // The Essential Next plugin will automatically create a builder function to handle
  // generating any other pages on demand using a Netlify On-demand Builder
  const mostPopularProductsUid = await getMostPopularProductsUid();
  const productStaticPaths = mostPopularProductsUid.map(
    (uid) => `/product/${uid}`
  );
  return {
    paths: productStaticPaths,
    fallback: "blocking",
  };
}
