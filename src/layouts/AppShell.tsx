import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import OwnerSidebar from './OwnerSidebar';
import BottomNavigation from './BottomNavigation';
import MobileHeader from './MobileHeader';
import NotificationDrawer from '../components/NotificationDrawer';

export default function AppShell() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <OwnerSidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <MobileHeader onOpenNotifications={() => setNotificationsOpen(true)} />
        
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <div className="max-w-5xl mx-auto w-full p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>

      <BottomNavigation />
      
      {notificationsOpen && (
        <NotificationDrawer onClose={() => setNotificationsOpen(false)} />
      )}
    </div>
  );
}