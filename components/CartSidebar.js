/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { useCart } from "../context/cart-context";
import { formatPrice } from "../lib/utils";

export default function CartSidebar({ open, setOpen }) {
  const { cart, removeItemFromCart } = useCart();
  const hasItems = cart.lines?.edges?.length > 0;
  const products = cart.lines?.edges;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      {hasItems ? (
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {products.map((p) => {
                              const id = p.node.id;
                              const title = p.node.merchandise.product.title;
                              const variant = p.node.merchandise.title;
                              const price = formatPrice(
                                p.node.merchandise.priceV2.amount
                              );
                              const quantity = p.node.quantity;
                              const imageSrc =
                                p.node.merchandise.product.images.edges[0].node
                                  .transformedSrc;
                              return (
                                <li key={id} className="py-6 flex">
                                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                    <img
                                      src={imageSrc}
                                      alt=""
                                      className="w-full h-full object-center object-cover"
                                    />
                                  </div>

                                  <div className="ml-4 flex-1 flex flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{title}</h3>
                                        <p className="ml-4">{price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {variant}
                                      </p>
                                    </div>
                                    <div className="flex-1 flex items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty {quantity}
                                      </p>

                                      <div className="flex">
                                        <button
                                          onClick={() => removeItemFromCart(id)}
                                          type="button"
                                          className="font-medium text-green-600 hover:text-green-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-12">
                          <div className="flex flex-col items-center space-y-4">
                            <ShoppingCartIcon
                              className="h-20 w-20 text-green-500"
                              aria-hidden="true"
                            />
                            <p>Your cart is empty</p>
                          </div>
                          <button
                            type="button"
                            className="text-white rounded-md py-3 px-8 bg-green-500 font-medium hover:bg-green-600"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {hasItems && (
                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>
                          {formatPrice(cart.estimatedCost.totalAmount.amount)}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          href={cart.checkoutUrl}
                          className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="text-green-600 font-medium hover:text-green-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
