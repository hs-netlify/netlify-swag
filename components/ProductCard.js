import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="group relative">
      <div className="relative w-full h-72 rounded-md overflow-hidden group-hover:opacity-75 xl:h-80">
        {product?.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.imageAlt}
            layout="fill"
            className="w-full h-full object-center object-cover"
          />
        ) : (
          <div className="animate-pulse w-full h-full bg-gray-300" />
        )}
      </div>
      <h3 className="min-h-[1.25rem] w-full mt-4 text-sm text-gray-700">
        {product?.title ? (
          <Link href={product.href}>
            <a>
              <span className="absolute inset-0" />
              {product.title}
            </a>
          </Link>
        ) : (
          <div className="animate-pulse rounded-md w-3/4 h-4 bg-gray-400" />
        )}
      </h3>
    </div>
  );
}
