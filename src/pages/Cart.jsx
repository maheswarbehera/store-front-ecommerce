// components/CartDrawer.jsx
import React, { useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/slices/cartSlice';

export default function CartDrawer({ open, setOpen, products = [] }) {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    console.log(cartItems);
    const subtotal = products.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {

    }, [products, dispatch]);

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    }
    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };
    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                        <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button onClick={() => setOpen(false)} className="p-2 text-gray-400 hover:text-gray-500">
                                                <XMarkIcon className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </div>

                                    {cartItems.length > 0 ? (
                                        <div className="mt-8">
                                            <ul className="-my-6 divide-y divide-gray-200">
                                                {products.map((product) => (
                                                    <li key={product._id} className="flex py-6 gap-4">
                                                        {/* Product Image */}
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                src={product.imageSrc || 'https://dummyimage.com/600x400/000/fff'}
                                                                alt={product.imageAlt}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>

                                                        {/* Product Info */}
                                                        <div className="flex flex-1 flex-col justify-between">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3 className="truncate max-w-[180px]">{product.name}</h3>
                                                                    <div className="text-right">
                                                                        <p className="text-sm text-gray-600 mt-1"> Price: ${product.price.toFixed(2)}</p>
                                                                        <p className="text-sm text-black-600 mt-1">
                                                                            Total: ${(product.price * product.quantity).toFixed(2)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                            </div>

                                                            {/* Quantity and Actions */}
                                                            <div className="mt-4 flex items-center justify-between">
                                                                <div className="flex items-center space-x-2 border rounded px-2 py-1">
                                                                    <button
                                                                        onClick={() => handleDecrement(product._id)}
                                                                        className="text-sm text-gray-700 hover:text-black px-2"
                                                                    >
                                                                        −
                                                                    </button>
                                                                    <span className="text-sm font-medium text-gray-800">
                                                                        {product.quantity}
                                                                    </span>
                                                                    <button
                                                                        onClick={() => handleIncrement(product._id)}
                                                                        className="text-sm text-gray-700 hover:text-black px-2"
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>

                                                                <button
                                                                    onClick={() => handleRemove(product._id)}
                                                                    className="text-sm text-red-500 hover:text-red-600 ml-4"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <main className="grid min-h-full w-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"><div className="text-center"><p className="text-base font-semibold text-indigo-600">Oop's</p><h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Cart is empty!</h1><div className="mt-10 flex items-center justify-center gap-x-6"><a className="flex font-semibold text-indigo-600 text-sm mt-10" href="/products"><svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"></path></svg>Continue Shopping</a></div></div></main>

                                    )}
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${subtotal.toFixed(2)}</p>
                                    </div>
                                    {cartItems.length > 0 &&
                                        <>
                                            <div className="mt-6">
                                                <a
                                                    href="/cart"
                                                    className="flex justify-center items-center rounded-md bg-black px-6 py-3 text-white text-base font-medium hover:bg-black/80"
                                                >
                                                    View Cart
                                                </a>
                                            </div>
                                            <div className="mt-6">
                                                <a
                                                    href="/checkout"
                                                    className="flex justify-center items-center rounded-md bg-indigo-600 px-6 py-3 text-white text-base font-medium hover:bg-indigo-700"
                                                >
                                                    Checkout
                                                </a>
                                            </div>
                                            <div className="mt-6 text-center text-sm text-gray-500">
                                                or{' '}
                                                <Link
                                                    to="/products"
                                                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                                                >
                                                    Continue Shopping →
                                                </Link>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}


// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import {
//   incrementQuantity,
//   decrementQuantity,
//   removeFromCart,
// } from '../redux/slices/cartSlice';
import Breadcrumb from '../component/Breadcrumbs'; // Optional

const Cart = () => {
  const breadcrumbs = [{ title: 'Cart', url: '/cart' }];
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
console.log(cartItems);
  const handleDec = (id) => dispatch(decrementQuantity(id));
  const handleInc = (id) => dispatch(incrementQuantity(id));
  const handleRemove = (id) => dispatch(removeFromCart(id));

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="rounded-lg bg-slate-100 pb-5">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumb title="Home" url="/" breadcrumbs={breadcrumbs} />
          <main className="grid min-h-full w-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-indigo-600">Oop's</p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Cart is empty!</h1>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/products" className="flex font-semibold text-indigo-600 text-sm mt-10">
                  <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    // <div className="rounded-lg bg-gray-100 pb-5">
    //   <div className="mx-auto max-w-7xl px-4">
    //     <Breadcrumb title="Home" url="/" breadcrumbs={breadcrumbs} />
    //     <div className="flex flex-col lg:flex-row shadow-md my-10">
    //       {/* Cart Items Section */}
    //       <div className="w-full lg:w-3/4 bg-white px-4 lg:px-10 py-10">
    //         <div className="flex justify-between border-b pb-8">
    //           <h1 className="font-semibold text-2xl">Shopping Cart</h1>
    //           <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
    //         </div>

    //         <div className="hidden lg:flex mt-10 mb-5 text-gray-600 text-xs uppercase">
    //           <h3 className="font-semibold w-2/5">Product Details</h3>
    //           <h3 className="font-semibold w-1/5 text-center">Quantity</h3>
    //           <h3 className="font-semibold w-1/5 text-center">Price</h3>
    //           <h3 className="font-semibold w-1/5 text-center">Total</h3>
    //         </div>

    //         {cartItems.map((item) => (
    //           <div key={item._id} className="flex flex-col lg:flex-row items-center hover:bg-gray-50 px-2 lg:px-6 py-5 border-t">
    //             <div className="flex w-full lg:w-2/5">
    //               <img className="h-20 w-20 object-cover rounded border" src={item.image || 'https://dummyimage.com/600x400/000/fff'} alt={item.name} />
    //               <div className="ml-4 flex flex-col justify-between">
    //                 <span className="font-bold text-sm">{item.name}</span>
    //                 {/* <span className="text-gray-500 text-xs">{item.category}</span> */}
    //                 <button
    //                   onClick={() => handleRemove(item._id)}
    //                   className="text-xs text-red-600 hover:underline mt-2"
    //                 >
    //                   Remove
    //                 </button>
    //               </div>
    //             </div>

    //             <div className="flex justify-center items-center w-full lg:w-1/5 mt-4 lg:mt-0">
    //               <button
    //                 onClick={() => handleDec(item._id)}
    //                 className="text-xl px-2 rounded border border-gray-300"
    //               >
    //                 −
    //               </button>
    //               <input
    //                 className="mx-2 border text-center w-10 h-8 rounded"
    //                 type="text"
    //                 value={item.quantity}
    //                 readOnly
    //               />
    //               <button
    //                 onClick={() => handleInc(item._id)}
    //                 className="text-xl px-2 rounded border border-gray-300"
    //               >
    //                 +
    //               </button>
    //             </div>

    //             <span className="text-center w-full lg:w-1/5 font-medium text-sm mt-4 lg:mt-0">
    //               ${item.price.toFixed(2)}
    //             </span>
    //             <span className="text-center w-full lg:w-1/5 font-medium text-sm mt-4 lg:mt-0">
    //               ${(item.price * item.quantity).toFixed(2)}
    //             </span>
    //           </div>
    //         ))}

    //         <Link to="/products" className="flex font-semibold text-indigo-600 text-sm mt-10">
    //           <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
    //             <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
    //           </svg>
    //           Continue Shopping
    //         </Link>
    //       </div>

    //       {/* Order Summary Section */}
    //       <div id="summary" className="w-full lg:w-1/4 px-6 py-10 bg-slate-200">
    //         <h1 className="font-semibold text-2xl border-b pb-4">Order Summary</h1>
    //         <div className="flex justify-between mt-6 mb-4">
    //           <span className="font-medium text-sm uppercase">Items ({cartItems.length})</span>
    //           <span className="font-medium text-sm">${total.toFixed(2)}</span>
    //         </div>

    //         <div className="my-4">
    //           <label className="font-medium text-sm uppercase">Shipping</label>
    //           <select className="mt-2 block w-full p-2 text-sm text-gray-700 border rounded">
    //             <option>Standard - $10.00</option>
    //           </select>
    //         </div>

    //         <div className="my-4">
    //           <label className="font-medium text-sm uppercase">Promo Code</label>
    //           <input
    //             type="text"
    //             placeholder="Enter your code"
    //             className="mt-2 w-full px-3 py-2 text-sm border rounded"
    //           />
    //           <button className="w-full bg-red-500 text-white text-sm mt-2 py-2 rounded hover:bg-red-600">Apply</button>
    //         </div>

    //         <div className="border-t pt-4 mt-4">
    //           <div className="flex justify-between font-semibold text-sm uppercase">
    //             <span>Total</span>
    //             <span>${(total + 10).toFixed(2)}</span>
    //           </div>
    //           <Link to="/checkout">
    //             <button className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 text-sm uppercase rounded">
    //               Checkout
    //             </button>
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className='rounded-lg bg-gray-100 pb-5'>
    <div className="mx-auto max-w-7xl px-4"> 
    <Breadcrumb title='Home' url="/" breadcrumbs={breadcrumbs}/>
    <div className="flex shadow-md my-10">
      <div className="w-3/4 bg-white px-10 py-10">
        <div className="flex justify-between border-b pb-8">
          <h1 className="font-semibold text-2xl">Shopping Cart</h1>
          <h2 className="font-semibold text-2xl">{cartItems?.length} Items</h2>          
        </div>
        <div className="flex mt-10 mb-5">
          <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
        </div>

       {
        cartItems?.map(cart => {
          return (
            <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={cart?._id}>
            <div className="flex w-2/5"> 
              <div className="w-20">
                <img className="h-24" src={'https://dummyimage.com/600x400/000/fff'} alt={cart?.name}/>
              </div>
              <div className="flex flex-col justify-between ml-4 flex-grow">
                <span className="font-bold text-sm">{cart?.name}</span>
                {/* <span className="text-red-500 text-xs uppercase">{cart?.category}</span> */}
                <div onClick={()=> handleRemove(cart._id)} className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer">Remove</div>
              </div>
            </div>
            <div className="flex justify-center w-1/5">
              <svg className="fill-current text-gray-600 w-3 cursor-pointer" onClick={() => handleDec(cart?._id)} viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
              </svg>
  
              <input className="mx-2 border text-center w-8" type="text" value={cart.quantity} readOnly />
  
              <svg className="fill-current text-gray-600 w-3 cursor-pointer" onClick={() => handleInc(cart?._id)} viewBox="0 0 448 512">
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
              </svg>
            </div>
            <span className="text-center w-1/5 font-semibold text-sm">${cart?.price}</span>
            <span className="text-center w-1/5 font-semibold text-sm">${(cart?.price * cart?.quantity).toFixed(2)}</span>
          </div>
          )
        })
      }
 

        <Link to="/products" className="flex font-semibold text-indigo-600 text-sm mt-10">
      
          <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
          Continue Shopping
        </Link>
      </div> 

      <div id="summary" className="w-1/4 px-8 py-10 bg-slate-200 ">
        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div className="flex justify-between mt-10 mb-5">
          <span className="font-semibold text-sm uppercase">Items {cartItems?.length}</span>
          <span className="font-semibold text-sm">${total.toFixed(2)}</span>
        </div>
        <div>
          <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
          <select className="block p-2 text-gray-600 w-full text-sm">
            <option>Standard shipping - $10.00</option>
          </select>
        </div>
        <div className="py-10">
          <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
          <input type="text" id="promo" placeholder="Enter your code" className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" />
        </div>
        <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white w-full uppercase">Apply</button>
        <div className="border-t mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>${(total + 10).toFixed(2)}</span>
          </div>
          <Link to='/checkout'>
          <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
             Checkout</button></Link>
        </div>
      </div>

    </div>
  </div>
  </div>
  );
};
 

   
export {Cart};