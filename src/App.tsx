import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './layouts/AppShell';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import BookingCalendar from './pages/BookingCalendar';
import Services from './pages/Services';
import Staff from './pages/Staff';
import Customers from './pages/Customers';
import Reviews from './pages/Reviews';
import Wallet from './pages/Wallet';
import Payouts from './pages/Payouts';
import Website from './pages/Website';
import TemplateSelection from './pages/TemplateSelection';
import Gallery from './pages/Gallery';
import BusinessProfile from './pages/BusinessProfile';
import Analytics from './pages/Analytics';
import Support from './pages/Support';
import OwnerProfile from './pages/OwnerProfile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Wrap owner routes in /app/owner to match requirements */}
        <Route path="/app/owner" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="calendar" element={<BookingCalendar />} />
          <Route path="services" element={<Services />} />
          <Route path="staff" element={<Staff />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="payouts" element={<Payouts />} />
          <Route path="website" element={<Website />} />
          <Route path="templates" element={<TemplateSelection />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="profile" element={<BusinessProfile />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="support" element={<Support />} />
          <Route path="owner-profile" element={<OwnerProfile />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/app/owner" replace />} />
      </Routes>
    </BrowserRouter>
  );
}