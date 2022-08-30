import React, {
  createContext,
  useEffect,
  useCallback,
  useContext,
  useReducer,
} from "react";
import {
  fetchExistingCart,
  addToCart,
  removeFromCart,
  updateItemInCart,
  createEmptyCart,
} from "../lib/shopify";

const IS_CLIENT = typeof window !== "undefined";

const reducer = (cart, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.cart;

    default:
      return cart;
  }
};

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, false);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  const { cart, dispatch } = context;

  const setCart = useCallback(
    (cart) => dispatch({ type: "SET_CART", cart }),
    [dispatch]
  );

  useEffect(() => {
    async function runEffect() {
      if (!cart) {
        if (!IS_CLIENT) {
          setCart({});
        }

        // check if we already have a cart stored for this browser
        const existingCartId = localStorage.getItem("shopify_cart_id");
        if (existingCartId && existingCartId !== "null") {
          try {
            const existingCart = await fetchExistingCart(existingCartId);
            if (!existingCart) {
              // if the user has completed checkout with the cart we get a null cart and need to create a new one
              throw "Cart has no data";
            }
            setCart(existingCart);
          } catch (error) {
            localStorage.removeItem("shopify_cart_id");
          }
        } else {
          // if we get here, we need to create a new cart
          const newCart = await createEmptyCart();
          localStorage.setItem("shopify_cart_id", newCart.id);
          setCart(newCart);
        }
      }
    }
    runEffect();
  }, [cart, setCart]);

  async function addItemToCart(variantId, quantity) {
    dispatch({ type: "PENDING" });

    const lines = [
      {
        quantity,
        merchandiseId: variantId,
      },
    ];

    try {
      const updatedCart = await addToCart(cart.id, lines);
      setCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeItemFromCart(lineId) {
    dispatch({ type: "PENDING" });

    try {
      const updatedCart = await removeFromCart(cart.id, lineId);
      setCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  }

  async function decreaseItemQuantity(lineId) {
    dispatch({ type: "PENDING" });
    const currentItem = getItemFromCart(cart, lineId);
    if (!currentItem) return;
    const newQuantity = currentItem.quantity - 1;

    try {
      if (newQuantity < 1) {
        const updatedCart = await removeFromCart(cart.id, lineId);
        setCart(updatedCart);
      } else {
        const newLine = {
          id: lineId,
          quantity: newQuantity,
        };
        const updatedCart = await updateItemInCart(cart.id, newLine);
        setCart(updatedCart);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function increaseItemQuantity(lineId) {
    dispatch({ type: "PENDING" });
    const currentItem = getItemFromCart(cart, lineId);
    if (!currentItem) return;
    try {
      const newLine = {
        id: lineId,
        quantity: currentItem.quantity + 1,
      };
      const updatedCart = await updateItemInCart(cart.id, newLine);
      setCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  }

  const total = cart?.lines?.edges?.reduce((sum, current) => {
    return sum + current.node.quantity;
  }, 0);
  const totalItems = total ?? 0;

  return {
    cart,
    addItemToCart,
    removeItemFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    totalItems,
  };
}

function getItemFromCart(cart, lineId) {
  const item = cart.lines.edges.find((line) => {
    return line.node.id === lineId;
  });
  return item.node;
}

export { CartProvider, useCart };
