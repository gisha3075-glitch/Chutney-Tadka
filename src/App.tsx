import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { RestaurantDetailPage } from './pages/RestaurantDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { TrackingPage } from './pages/TrackingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/tracking/:orderId" element={<TrackingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
