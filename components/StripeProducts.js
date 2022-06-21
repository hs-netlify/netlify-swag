import StripeProduct from "./StripeProduct";

export default function StripeProducts({ onegraphData }) {
  console.log(onegraphData);
  const products = onegraphData?.data?.stripe?.products?.nodes;
  return (
    <div className="mx-12 my-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
      {products?.length > 0 &&
        products.map((product) => <StripeProduct product={product} />)}
    </div>
  );
}
