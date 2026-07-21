import { useState } from 'react';
import { Plus, Star, Calendar, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { staffData } from '../data/mock';
import Toast from '../components/Toast';

export default function Staff() {
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Staff Management</h1>
          <p className="text-slate-500 mt-1">Manage your team and their schedules</p>
        </div>
        <button onClick={() => showToast('Opening Add Staff Modal...')} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" /> Add Staff
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffData.map(staff => (
          <div key={staff.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative group">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <button onClick={() => showToast('Edit Staff')} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <img src={staff.avatar} alt={staff.name} className="w-16 h-16 rounded-full object-cover border border-slate-200" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">{staff.name}</h3>
                <p className="text-sm text-slate-500">{staff.role}</p>
                <div className="flex items-center gap-1 mt-1 text-sm font-medium">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {staff.rating}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-500 font-medium">Today's Bookings</p>
                <p className="text-lg font-bold text-slate-900 flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-blue-600" /> {staff.bookings}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Status</p>
                <div className="mt-1">
                  <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${
                    staff.status === 'Available' ? 'bg-emerald-100 text-emerald-700' :
                    staff.status === 'Busy' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {staff.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button onClick={() => showToast('View Schedule')} className="flex-1 py-2 bg-slate-50 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors">
                Schedule
              </button>
              <button onClick={() => showToast('View Profile')} className="flex-1 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors">
                Profile
              </button>
            </div>
          </div>
        ))}
      </div>
      <Toast visible={toast.visible} message={toast.message} />
    </div>
  );
}