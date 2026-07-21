import { useState } from 'react';
import { Camera, MapPin, Building, Globe, Clock, Save } from 'lucide-react';
import Toast from '../components/Toast';

export default function BusinessProfile() {
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile updated successfully');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Business Profile</h1>
        <p className="text-slate-500 mt-1">Manage your shop details and location</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-600" /> Basic Details
          </h2>
          
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                <Camera className="w-8 h-8 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <div className="absolute inset-0 bg-slate-900/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs font-medium text-white">Upload</span>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-slate-900">Shop Logo</h3>
              <p className="text-sm text-slate-500 mt-1">Recommended size 512x512px</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Shop Name</label>
              <input type="text" defaultValue="Royal Glow Salon" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Owner Name</label>
              <input type="text" defaultValue="Rajesh" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
              <input type="tel" defaultValue="+91 9876543210" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input type="email" defaultValue="contact@royalglow.com" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea rows={3} defaultValue="Premium beauty salon offering hair, skin, and bridal makeup services." className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none resize-none" required></textarea>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" /> Location
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
            <textarea rows={2} defaultValue="123, Fashion Street, Near City Mall" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none resize-none" required></textarea>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
              <input type="text" defaultValue="Mumbai" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">PIN Code</label>
              <input type="text" defaultValue="400001" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" required />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pb-16 md:pb-0">
          <button type="button" className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
          <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </form>
      <Toast visible={toast.visible} message={toast.message} />
    </div>
  );
}