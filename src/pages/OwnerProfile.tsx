import { useState } from 'react';
import { User, Store, Bell, Moon, Languages, Shield, HelpCircle, FileText, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { shopInfo } from '../data/mock';
import Toast from '../components/Toast';

export default function OwnerProfile() {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const menuItems = [
    { icon: User, label: 'Personal Details', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Store, label: 'Business Profile', color: 'text-emerald-500', bg: 'bg-emerald-50', to: '/profile' },
    { icon: Moon, label: 'Appearance', color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: Bell, label: 'Notifications', color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: Languages, label: 'Language', color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { icon: Shield, label: 'Security', color: 'text-rose-500', bg: 'bg-rose-50' },
  ];

  const supportItems = [
    { icon: HelpCircle, label: 'Help & Support', to: '/support' },
    { icon: FileText, label: 'Privacy Policy' },
    { icon: FileText, label: 'Terms of Service' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 hidden md:block">Settings</h1>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <img src={shopInfo.owner.avatar} alt="Profile" className="w-16 h-16 rounded-full object-cover border border-slate-200" />
        <div>
          <h2 className="text-xl font-bold text-slate-900">{shopInfo.owner.name}</h2>
          <p className="text-sm text-slate-500">{shopInfo.name}</p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-medium text-slate-600">Active Account</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Account Settings</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {menuItems.map((item, idx) => {
            const content = (
              <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors w-full text-left">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.bg} ${item.color}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-700">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            );
            return item.to ? (
              <Link key={idx} to={item.to} className="block">{content}</Link>
            ) : (
              <button key={idx} onClick={() => showToast(`Opened ${item.label}`)} className="block w-full">{content}</button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Support & About</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {supportItems.map((item, idx) => {
            const content = (
              <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors w-full text-left">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-slate-400" />
                  <span className="font-medium text-slate-700">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            );
            return item.to ? (
              <Link key={idx} to={item.to} className="block">{content}</Link>
            ) : (
              <button key={idx} onClick={() => showToast(`Opened ${item.label}`)} className="block w-full">{content}</button>
            );
          })}
        </div>
      </div>

      <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 font-semibold rounded-2xl hover:bg-red-100 transition-colors">
        <LogOut className="w-5 h-5" /> Log Out
      </button>

      <div className="text-center pb-8">
        <p className="text-xs text-slate-400 font-medium">NexoraOS version 1.0.0</p>
      </div>

      <Toast visible={toast.visible} message={toast.message} />
    </div>
  );
}