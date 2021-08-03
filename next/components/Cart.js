import { useCart } from "../context/cart-context";

export default function Cart() {
  const {
    cart,
    removeItemFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
  } = useCart();

  return (
    <div>
      {cart.lines?.edges?.length > 0 ? (
        <>
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
          <a href={cart.checkoutUrl}>Checkout</a>
        </>
      ) : (
        <p>Empty</p>
      )}
    </div>
  );
}
