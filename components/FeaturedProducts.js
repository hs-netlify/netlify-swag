import ProductCard from "./ProductCard";

export default function FeaturedProducts({ title, products }) {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="min-h-[2rem] text-2xl font-extrabold tracking-tight text-gray-900">
            {title ?? (
              <div className="animate-pulse rounded-md w-64 h-7 bg-gray-400" />
            )}
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products
            ? products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            : Array(3)
                .fill({})
                .map((_, index) => <ProductCard key={index} />)}
        </div>
      </div>
    </div>
  );
}
