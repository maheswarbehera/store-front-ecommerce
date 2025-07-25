
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../component/Breadcrumbs';

function Checkout() {

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCheckout = () => {
    // Handle the payment processing logic here (e.g., send data to a payment gateway).
    // For this example, we'll just mark the form as submitted.
    setIsSubmitted(true);
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and process the payment data here (e.g., send data to a payment gateway).
    // For this example, we'll call the onCheckout callback to simulate a successful payment.
    handleCheckout();
  };

  const breadcrumbs = [{ title: 'Cart', url: '/cart' }];
  return (
    <>
      <div className='rounded-lg pb-5 bg-slate-100 py-2'>
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex" aria-label="Breadcrumb">
            {/* <Breadcrumb parent='Home' child='Cart' child2='Checkout'/> */}
            <Breadcrumb title="Home" url="/" subTitle="Checkout" subUrl={`/checkout}`} breadcrumbs={breadcrumbs} />
          </div>

          {/* Form */}
          {isSubmitted ? (
            <div>
              <main className="grid min-h-full w-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                  <p className="text-base font-semibold text-indigo-600">Wow!!!</p>
                  <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Thank you for your purchase!</h1>
                  <p className="mt-6 text-base leading-7 text-gray-600">Happy to share, Your order will be delivered in 4-5 day.</p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">

                    <Link to="/products" className="flex font-semibold text-indigo-600 text-sm mt-10">

                      <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </main>
            </div>
          ) : (
            <>
              <h2 className="text-center pb-12 text-3xl font-bold">Checkout </h2>
              <div className="overflow-hidden rounded-xl bg-white p-4 shadow">

                <p className="text-sm font-bold text-gray-900">Personal Info</p>
                <form onSubmit={handleSubmit}>
                  <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
                    <div className="w-full">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="firstName"
                      >
                        Name
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      ></input>
                    </div>

                    <div className="w-full">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      ></input>
                    </div>
                    <div className="col-span-2 grid">
                      <div className="w-full">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="address"
                        >
                          Address
                        </label>
                        <textarea
                          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter your address"
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-span-2 grid">
                      <button
                        type="submit"
                        className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        Confirm Checkout
                      </button>
                    </div>
                  </div>
                </form>
              </div></>
          )}
        </div>
      </div>


    </>

  );
}

export default Checkout;
