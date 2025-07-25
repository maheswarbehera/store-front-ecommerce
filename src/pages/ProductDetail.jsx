import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail, clearProductDetail } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../component/Breadcrumbs';
import Loading from '../component/Loading';
import Grid from '../component/Grid';
import notifyService from '../services/notifyService';

function ProductDetail() {
  const { sku } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Fixed: use correct slice key (products)
  const { productDetail: product, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (sku) dispatch(getProductDetail(sku));

    return () => {
      dispatch(clearProductDetail());
    };
  }, [dispatch, sku]);

  const handleAddToCart = (product, redirect = false) => {
    dispatch(addToCart(product));
    notifyService.success(`${product.name} added to cart`);
    if (redirect) {
      navigate('/cart');
    }
  };

  if (loading || !product) return <Loading />;

  const breadcrumbs = [{ title: 'Products', url: '/products' }];

  return (
    <>
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 pb-24 mx-auto">
        <Breadcrumb title="Home" url="/" subTitle={product.name} subUrl={`/product/${sku}`} breadcrumbs={breadcrumbs} />
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={product.name}
            className="lg:w-1/2 w-full object-contain rounded"
            src={product.image || '	https://dummyimage.com/600x400/000/fff'}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 mt-6 lg:mt-0">
            <h2 className="text-sm text-gray-500 uppercase">
              {product.category?.[0]?.name || product.category || 'General'}
            </h2>
            <h1 className="text-3xl font-medium mb-1">{product.name}</h1>
            <p className="leading-relaxed">{product.description}</p>
            <span className="text-2xl text-gray-900">${product.price?.toFixed(2)}</span>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleAddToCart(product, true)}
                className="bg-indigo-500 text-white py-2 px-6 rounded hover:bg-indigo-600"
              >
                Buy now
              </button>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-indigo-500 text-white py-2 px-6 rounded hover:bg-indigo-600"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Grid/>
    </>
  );
}

export default ProductDetail;
