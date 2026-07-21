import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Scissors, Users, UserCircle, Star, Globe, Wallet, LineChart, HelpCircle, User } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/bookings', label: 'Bookings', icon: CalendarDays },
  { to: '/services', label: 'Services', icon: Scissors },
  { to: '/staff', label: 'Staff', icon: Users },
  { to: '/customers', label: 'Customers', icon: UserCircle },
  { to: '/reviews', label: 'Reviews', icon: Star },
  { to: '/website', label: 'Website', icon: Globe },
  { to: '/wallet', label: 'Wallet', icon: Wallet },
  { to: '/analytics', label: 'Analytics', icon: LineChart },
  { to: '/support', label: 'Support', icon: HelpCircle },
  { to: '/owner-profile', label: 'Profile', icon: User },
];

export default function OwnerSidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 h-full bg-white border-r border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Nexora<span className="text-blue-600">OS</span></h1>
        <p className="text-sm text-slate-500 mt-1">Owner Portal</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => twMerge(
              clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}