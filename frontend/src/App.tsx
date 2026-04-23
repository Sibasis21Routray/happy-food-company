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
import { RoleBasedRedirect } from './components/Auth/RoleBasedRedirect';
import { NotFound } from './pages/NotFound';
import { AboutUsPage } from './pages/AboutUsPage';

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
import HappyTeam from './pages/HappyTeam';
import Careers from './pages/Careers';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Term from './pages/Term';
import ReturnsPolicyPage from './pages/ReturnsPolicyPage';

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin') || location.pathname.startsWith('/vendor') || location.pathname === '/404';

  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
        {!isDashboard && <Navbar />}
        <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<RoleBasedRedirect><HomePage /></RoleBasedRedirect>} />
          <Route path="/home" element={<RoleBasedRedirect><HomePage /></RoleBasedRedirect>} />
          <Route path="/product/:id" element={<RoleBasedRedirect><ProductDetailsPage /></RoleBasedRedirect>} />
          <Route path="/happy-bars" element={<RoleBasedRedirect><ProductsPage /></RoleBasedRedirect>} />
          <Route path="/happy-shop" element={<RoleBasedRedirect><ProductsPage /></RoleBasedRedirect>} />
          <Route path="/about-us" element={<RoleBasedRedirect><AboutUsPage /></RoleBasedRedirect>} />
          <Route path='/happy-team' element={<RoleBasedRedirect><HappyTeam /></RoleBasedRedirect>} />
          <Route path='/careers' element={<RoleBasedRedirect><Careers /></RoleBasedRedirect>} />

          <Route path='/privacy' element={<RoleBasedRedirect><PrivacyPolicy /></RoleBasedRedirect>} />
          <Route path='/terms' element={<RoleBasedRedirect><Term /></RoleBasedRedirect>} />
          <Route path='/returns' element={<RoleBasedRedirect><ReturnsPolicyPage /></RoleBasedRedirect>} />

          {/* Blog Routes */}
          <Route path="/blog" element={<RoleBasedRedirect><BlogPage /></RoleBasedRedirect>} />
          <Route path="/blog/satisfy-your-sugar-cravings-naturally" element={<RoleBasedRedirect><SatisfySugarCravingsPage /></RoleBasedRedirect>} />
          <Route path="/blog/fueling-your-day-with-happy-bars" element={<RoleBasedRedirect><FuelingYourDayPage /></RoleBasedRedirect>} />
          <Route path="/blog/fueling-your-workouts-with-happy-bars" element={<RoleBasedRedirect><FuelingWorkoutsPage /></RoleBasedRedirect>} />
          <Route path="/blog/unwrapping-happiness-ingredients" element={<RoleBasedRedirect><UnwrappingHappinessPage /></RoleBasedRedirect>} />
          <Route path="/blog/fuel-wellbeing-happy-bars" element={<RoleBasedRedirect><FuelWellbeingPage /></RoleBasedRedirect>} />
          <Route path="/blog/craving-control-weight-loss" element={<RoleBasedRedirect><CravingControlPage /></RoleBasedRedirect>} />
          <Route path="/blog/nourish-energize-thrive" element={<RoleBasedRedirect><NourishEnergizeThrivePage /></RoleBasedRedirect>} />
          <Route path="/blog/happy-bars-parents-kids" element={<RoleBasedRedirect><HappyBarsParentsKidsPage /></RoleBasedRedirect>} />
          
          <Route path="/my-account" element={<RoleBasedRedirect><ProfilePage /></RoleBasedRedirect>} />
          <Route path="/profile" element={<RoleBasedRedirect><ProfilePage /></RoleBasedRedirect>} />
          <Route path="/orders" element={<RoleBasedRedirect><OrdersPage /></RoleBasedRedirect>} />
          <Route path="/orders/:id" element={<RoleBasedRedirect><OrderDetailsPage /></RoleBasedRedirect>} />
          <Route path="/wishlist" element={<RoleBasedRedirect><WishlistPage /></RoleBasedRedirect>} />
          <Route path="/cart" element={<RoleBasedRedirect><CartPage /></RoleBasedRedirect>} />
          <Route path="/coupons" element={<RoleBasedRedirect><CouponsPage /></RoleBasedRedirect>} />
          <Route path="/gift-cards" element={<RoleBasedRedirect><GiftCardsPage /></RoleBasedRedirect>} />
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
