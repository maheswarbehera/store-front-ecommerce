import { useEffect, useState } from 'react';

const useCartCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cartItem')) || [];
      const total = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCount(total);
    };

    getCartCount();

    // Optional: update count when localStorage changes
    window.addEventListener('storage', getCartCount);

    return () => window.removeEventListener('storage', getCartCount);
  }, [count]);

  return count;
};

export default useCartCount;
