import { useCart } from "../context/cart-context";

export default function Cart() {
  const {
    cart,
    removeItemFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
  } = useCart();

  return (
    <div className="h-full flex flex-col justify-between">
      {cart.lines?.edges?.length > 0 ? (
        <>
          <div className="space-y-3">
            {cart.lines.edges.map((p) => {
              return (
                <div key={p.node.id} className="flex gap-2 items-center">
                  <p>
                    {p.node.merchandise.product.title}: {p.node.quantity}
                  </p>
                  <button
                    className="py-1 px-3 border rounded"
                    onClick={() => increaseItemQuantity(p.node.id)}
                  >
                    +
                  </button>
                  <button
                    className="py-1 px-3 border rounded"
                    onClick={() => decreaseItemQuantity(p.node.id)}
                  >
                    -
                  </button>
                  <button
                    className="py-1 px-3 border rounded"
                    onClick={() => removeItemFromCart(p.node.id)}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
          <a
            className="text-center justify-center inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            href={cart.checkoutUrl}
          >
            Proceed to Checkout
          </a>
        </>
      ) : (
        <p>Empty</p>
      )}
    </div>
  );
}
