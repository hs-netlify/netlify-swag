import { useEffect, useState } from "react";
import { getInventoryByHandle } from "../lib/shopify/api";

export default function ProductVariantPicker({ productHandle }) {
  const [selectedVariant, setSelectedVariant] = useState("");
  const [variants, setVariants] = useState([]);
  // API calls made in useEffect will be run client side
  // We can use this to fetch dynamic data like inventory levels at runtime
  useEffect(() => {
    getInventoryByHandle(productHandle).then(setVariants);
  }, []);
  return (
    <div className="space-y-4">
      <h2 className="uppercase text-sm text-gray-400">Size</h2>
      <ul className="flex flex-wrap gap-2">
        {variants &&
          variants.map((variant) => {
            return (
              <li
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`py-2 px-3 border rounded-md cursor-pointer ${
                  variant.quantityAvailable > 0 ? "" : "opacity-50 line-through"
                } ${
                  variant.id === selectedVariant.id
                    ? "border-green-500 text-green-500"
                    : "border-gray-600"
                } `}
              >
                {variant.title}
              </li>
            );
          })}
      </ul>
      <button
        className={`w-full text-center py-4 px-6 rounded-md text-white font-semibold ${
          !selectedVariant || selectedVariant.quantityAvailable === 0
            ? "bg-gray-300"
            : "bg-green-500"
        }`}
      >
        {!selectedVariant
          ? "Select A Size"
          : selectedVariant.quantityAvailable > 0
          ? `Add to Cart - $${selectedVariant.priceV2.amount}`
          : "Out of Stock"}
      </button>
    </div>
  );
}
