import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AuthPage } from './pages/AuthPage';
import { BlogPage } from './pages/BlogPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ProfilePage } from './pages/ProfilePage';
import { OrdersPage, WishlistPage, CouponsPage, GiftCardsPage } from './pages/AccountPages';
import { CartPage } from './pages/CartPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { VendorDashboard } from './pages/VendorDashboard';
import { AdminProfilePage } from './pages/AdminProfilePage';
import { VendorProfilePage } from './pages/VendorProfilePage';
import { OrderDetailsPage } from './pages/OrderDetailsPage';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { NotFound } from './pages/NotFound';

// Import individual blog post pages
import { SatisfySugarCravingsPage } from './pages/blogs/SatisfySugarCravingsPage';
import FuelingYourDayPage from './pages/blogs/FuelingYourDayPage';
import FuelingWorkoutsPage from './pages/blogs/FuelingWorkoutsPage';
import UnwrappingHappinessPage from './pages/blogs/UnwrappingHappinessPage';
import FuelWellbeingPage from './pages/blogs/FuelWellbeingPage';
import CravingControlPage from './pages/blogs/CravingControlPage';
import NourishEnergizeThrivePage from './pages/blogs/NourishEnergizeThrivePage';
import HappyBarsParentsKidsPage from './pages/blogs/HappyBarsParentsKidsPage';

import { ToastProvider } from './components/Layout/Toast';

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin') || location.pathname.startsWith('/vendor') || location.pathname === '/404';

  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
        {!isDashboard && <Navbar />}
        <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/happy-bars" element={<ProductsPage />} />
          <Route path="/happy-shop" element={<ProductsPage />} />
          {/* Blog Routes */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/satisfy-your-sugar-cravings-naturally" element={<SatisfySugarCravingsPage />} />
          <Route path="/blog/fueling-your-day-with-happy-bars" element={<FuelingYourDayPage />} />
          <Route path="/blog/fueling-your-workouts-with-happy-bars" element={<FuelingWorkoutsPage />} />
          <Route path="/blog/unwrapping-happiness-ingredients" element={<UnwrappingHappinessPage />} />
          <Route path="/blog/fuel-wellbeing-happy-bars" element={<FuelWellbeingPage />} />
          <Route path="/blog/craving-control-weight-loss" element={<CravingControlPage />} />
          <Route path="/blog/nourish-energize-thrive" element={<NourishEnergizeThrivePage />} />
          <Route path="/blog/happy-bars-parents-kids" element={<HappyBarsParentsKidsPage />} />
          
          <Route path="/my-account" element={<ProfilePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailsPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/coupons" element={<CouponsPage />} />
          <Route path="/gift-cards" element={<GiftCardsPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/profile" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminProfilePage />
            </ProtectedRoute>
          } />
          
          {/* Vendor Routes */}
          <Route path="/vendor/dashboard" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <VendorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/vendor/profile" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <VendorProfilePage />
            </ProtectedRoute>
          } />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
      </div>
    </ToastProvider>
  );
}

export default App;
