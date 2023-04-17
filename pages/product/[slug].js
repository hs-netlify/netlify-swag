import { useEffect, useContext } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import ProductVariantPicker from "../../components/ProductVariantPicker";
import {
  getMostPopularProductsUid,
  getNavigation,
  getProduct,
} from "../../lib/prismic";
import CookiesContext from "../../context/cookies-context";

function setLastVisitedProductCookie(product) {
  const slug = product.shopify_product.handle;
  Cookies.set("lastVisitedProduct", slug);
}

export default function Product({ product }) {
  const { cookieConsentGiven } = useContext(CookiesContext);

  useEffect(() => {
    if (cookieConsentGiven) {
      setLastVisitedProductCookie(product);
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
