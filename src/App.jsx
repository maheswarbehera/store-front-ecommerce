import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { forwardRef, useEffect, useState } from 'react';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { store } from './redux/store';

import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoute';

import PageNotFound from './component/404';
import About from './component/About';
import Contact from './component/Contact';
import Top from './component/Top';
import NewsLetter from './component/NewsLetter';
import Loading from './component/Loading';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import {Cart} from './pages/Cart';
import Checkout from './pages/Checkout';

const CustomSnackbar = forwardRef(({ message, style }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      padding: '10px 16px',
      borderRadius: '6px',
      fontWeight: '500',
    }}
  >
    {message}
  </div>
));

const App = () => {
  const [loading, setLoading] = useState(() => {
    // Check if the user has already visited
    return !localStorage.getItem('hasVisited');
  });

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        localStorage.setItem('hasVisited', 'true');
        setLoading(false);
      }, 1000); // simulate loading time

      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) return <Loading />;

  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        Components={{
          success: forwardRef((props, ref) => (
            <CustomSnackbar ref={ref} {...props} style={{ backgroundColor: '#4CAF50', color: '#fff' }} />
          )),
          error: forwardRef((props, ref) => (
            <CustomSnackbar ref={ref} {...props} style={{ backgroundColor: '#F44336', color: '#fff' }} />
          )),
          warning: forwardRef((props, ref) => (
            <CustomSnackbar ref={ref} {...props} style={{ backgroundColor: '#FF9800', color: '#fff' }} />
          )),
          info: forwardRef((props, ref) => (
            <CustomSnackbar ref={ref} {...props} style={{ backgroundColor: '#2196F3', color: '#fff' }} />
          )),
        }}
      >
        <Router>
          <Top login="Login" signup="Create Account" />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={ <GuestRoute> <Login /> </GuestRoute> } />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:sku" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          <NewsLetter />
        </Router>
      </SnackbarProvider>
    </Provider>
  );
};

export default App;

export function GuestRoute({ children }) {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}