import { getNavigation } from "../../lib/prismic";

const collections = {
  apparel: {
    name: "Apparel",
    description: "Stylish garments for every occasion.",
  },
  stickers: {
    name: "Stickers",
    description:
      "Rep your love of Netlify with stickers for your laptop, water bottle or other smooth surface of choice...",
  },
  accessories: {
    name: "Accessories",
    description: "Odds and ends to upgrade any workspace.",
  },
};

export async function getStaticProps({ params }) {
  const navLinks = await getNavigation();

  const collection = collections[params.slug];
  if (!collection) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      navLinks,
      collection,
    },
  };
}

export async function getStaticPaths() {
  const paths = Object.keys(collections).map((c) => {
    return {
      params: {
        slug: c,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}

export default function Collection({ collection }) {
  return (
    <main>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="py-24 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            {collection.name}
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-base text-gray-500">
            {collection.description}
          </p>
        </div>
      </div>
    </main>
  );
}
