import Image from "next/image";
import { formatPrice } from "../lib/utils";

export default function ProductCard({ product }) {
  return (
    <div key={product.id} className="group relative">
      <div className="relative w-full h-72 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 xl:h-80">
        <Image
          src={product.images[0]}
          alt={product.imageAlt}
          layout="fill"
          className="w-full h-full object-center object-cover"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">
        <a>
          <span className="absolute inset-0" />
          {product.name}
        </a>
      </h3>
      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
      <p className="mt-1 text-sm font-medium text-gray-900">
        {product.price && formatPrice(product.price)}
      </p>
    </div>
  );
}
