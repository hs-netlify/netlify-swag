import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    name: "Apparel",
    href: "/collection/apparel",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0578/8490/1573/products/Image5.png?v=1623858501",
    imageAlt: "",
  },
  {
    name: "Accessories",
    href: "/collection/accessories",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0578/8490/1573/products/Image3.png?v=1623858524",
    imageAlt: "",
  },
  {
    name: "Stickers",
    href: "/collection/stickers",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0578/8490/1573/products/Image21.png?v=1623858516",
    imageAlt: "",
  },
];

export default function HeroOverlappingImages() {
  return (
    <div className="relative bg-white">
      {/* Background image and overlap */}
      <div
        aria-hidden="true"
        className="hidden absolute inset-0 sm:flex sm:flex-col"
      >
        <div className="flex-1 relative w-full bg-gray-800">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gray-900 opacity-50" />
        </div>
        <div className="w-full bg-white h-32 md:h-40 lg:h-48" />
      </div>

      <div className="relative max-w-3xl mx-auto pb-96 px-4 text-center sm:pb-0 sm:px-6 lg:px-8">
        {/* Background image and overlap */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col sm:hidden"
        >
          <div className="flex-1 relative w-full bg-gray-800">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                alt=""
                layout="fill"
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gray-900 opacity-50" />
          </div>
          <div className="w-full bg-white h-48" />
        </div>
        <div className="relative py-32">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Mid-Season Sale
          </h1>
          <div className="mt-4 sm:mt-6">
            <a
              href="#"
              className="inline-block bg-green-500 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-green-600"
            >
              Shop Collection
            </a>
          </div>
        </div>
      </div>

      <section
        aria-labelledby="collection-heading"
        className="-mt-96 relative sm:mt-0"
      >
        <h2 id="collection-heading" className="sr-only">
          Collections
        </h2>
        <div className="max-w-md mx-auto grid grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:px-6 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:px-8 lg:gap-x-8">
          {collections.map((collection) => (
            <div
              key={collection.name}
              className="group relative h-96 bg-white rounded-lg shadow-xl sm:h-auto sm:aspect-w-4 sm:aspect-h-5"
            >
              <div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg overflow-hidden"
                >
                  <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                    <Image
                      src={collection.imageSrc}
                      alt={collection.imageAlt}
                      layout="fill"
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                </div>
                <div className="absolute inset-0 rounded-lg p-6 flex items-end">
                  <div>
                    <p aria-hidden="true" className="text-sm text-white">
                      Shop the collection
                    </p>
                    <h3 className="mt-1 font-semibold text-white">
                      <Link href={collection.href}>
                        <a>
                          <span className="absolute inset-0" />
                          {collection.name}
                        </a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
