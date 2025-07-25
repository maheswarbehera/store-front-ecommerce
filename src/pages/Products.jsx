import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../component/Breadcrumbs';
import Loading from '../component/Loading';
import notifyService from '../services/notifyService';

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const breadcrumbs = [{ title: 'Product', url: '/products' }];

  const handleAddToCart = (product, redirect = false) => {
    dispatch(addToCart(product));
    notifyService.success(`${product.name} added to cart`);
    if (redirect) navigate('/cart');
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4">
        <Breadcrumb title="Home" url="/" breadcrumbs={breadcrumbs} />
      </div>
      <div className="text-center py-5">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4 uppercase">
          Featured Products
        </h1>
        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
          New In Pre-Loved
        </p>
        <div className="flex mt-6 justify-center">
          <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-7xl products-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {Array.isArray(products) &&
          products.map((product) => (
            <div key={product._id} className="rounded-md border">
              <Link to={`/products/${product.sku}`}>
                <img
                  src="https://dummyimage.com/600x400/000/fff"
                  alt={product.name}
                  className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
                />
              </Link>
              <div className="p-4">
                <p className="font-semibold uppercase text-red-500">
                  {product.category?.[0]?.name || 'General'}
                </p>
                <h1 className="inline-flex items-center text-lg font-semibold">
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </h1>
                <p className="text-gray-500 text-lg font-semibold">
                  ${product.price.toFixed(2)}{' '}
                  <span className="pl-2 text-sm text-gray-400 line-through">
                    ${(product.price + 20).toFixed(2)}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Products;
