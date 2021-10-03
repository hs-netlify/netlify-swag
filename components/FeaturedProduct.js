export default function FeaturedProduct({ product }) {
  return (
    <div className="space-y-4">
      <div className="aspect-w-1 aspect-h-1">
        <img
          className="object-cover shadow-lg rounded-lg"
          src={product.imageUrl}
          alt=""
        />
      </div>
      <div className="text-lg leading-6 font-medium ">
        <h3>{product.title}</h3>
      </div>
    </div>
  );
}
