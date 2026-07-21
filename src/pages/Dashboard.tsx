import { useState } from 'react';
import { Calendar, IndianRupee, Users, Clock, Star, Wallet, Phone, Plus, Scissors, Image, Globe, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { shopInfo, kpiData, scheduleData } from '../data/mock';
import Toast from '../components/Toast';

const revenueData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 8900 },
  { name: 'Sat', revenue: 12450 },
  { name: 'Sun', revenue: 15000 },
];

export default function Dashboard() {
  const [toast, setToast] = useState({ visible: false, message: '' });
  
  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  const kpis = [
    { label: "Today's Bookings", value: kpiData.todayBookings, icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Today's Revenue", value: kpiData.todayRevenue, icon: IndianRupee, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Customers", value: kpiData.customers, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Pending", value: kpiData.pendingRequests, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Rating", value: kpiData.rating, icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" },
    { label: "Wallet", value: kpiData.wallet, icon: Wallet, color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Good morning, {shopInfo.owner.name}</h1>
        <p className="text-slate-500 mt-1">Here is what is happening at {shopInfo.name} today.</p>
        <div className="mt-4 flex gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Open Now
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} onClick={() => showToast(`View ${kpi.label} details`)} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-blue-300 transition-colors">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${kpi.bg} ${kpi.color}`}>
              <kpi.icon className="w-5 h-5" />
            </div>
            <p className="text-sm text-slate-500 font-medium">{kpi.label}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-semibold text-slate-900">Today's Schedule</h2>
              <Link to="/app/owner/bookings" className="text-sm text-blue-600 font-medium hover:underline flex items-center">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {scheduleData.map(booking => (
                <div key={booking.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div className="text-center w-16 shrink-0">
                    <p className="text-sm font-bold text-slate-900">{booking.time.split(' ')[0]}</p>
                    <p className="text-xs text-slate-500 font-medium">{booking.time.split(' ')[1]}</p>
                  </div>
                  <img src={booking.avatar} alt={booking.customer} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 truncate">{booking.customer}</h3>
                    <p className="text-sm text-slate-500 truncate">{booking.service} • {booking.staff}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                      booking.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      booking.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      booking.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {booking.status}
                    </span>
                    <button onClick={() => showToast(`Calling ${booking.customer}...`)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Weekly Revenue</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `₹${value/1000}k`} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} dot={false} activeDot={{r: 6, fill: '#2563eb', stroke: '#fff', strokeWidth: 2}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/app/owner/bookings" className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 transition-colors group">
                <Plus className="w-6 h-6 text-slate-500 group-hover:text-blue-600 mb-2" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">Add Booking</span>
              </Link>
              <Link to="/app/owner/services" className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 transition-colors group">
                <Scissors className="w-6 h-6 text-slate-500 group-hover:text-blue-600 mb-2" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">Add Service</span>
              </Link>
              <Link to="/app/owner/gallery" className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 transition-colors group">
                <Image className="w-6 h-6 text-slate-500 group-hover:text-blue-600 mb-2" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">Add Photo</span>
              </Link>
              <Link to="/app/owner/website" className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 transition-colors group">
                <Globe className="w-6 h-6 text-slate-500 group-hover:text-blue-600 mb-2" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">Edit Site</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { text: "New booking from Vikram", time: "10m ago", icon: Calendar, color: "text-blue-500" },
                { text: "Anita left a 5-star review", time: "1h ago", icon: Star, color: "text-yellow-500" },
                { text: "Website template updated", time: "2h ago", icon: Globe, color: "text-purple-500" },
                { text: "Payout of ₹18,000 processed", time: "1d ago", icon: Wallet, color: "text-emerald-500" },
              ].map((activity, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className={`mt-0.5 ${activity.color}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-700">{activity.text}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Toast visible={toast.visible} message={toast.message} />
    </div>
  );
}