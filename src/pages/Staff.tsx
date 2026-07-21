import { useState } from 'react';
import { Plus, Star, Calendar, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { staffData } from '../data/mock';
import Toast from '../components/Toast';
import Modal from '../components/Modal';

export default function Staff() {
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [staffList, setStaffList] = useState(staffData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const newStaff = {
      id: Date.now(),
      name: (e.target as any).staffName.value,
      role: (e.target as any).staffRole.value,
      avatar: 'https://i.pravatar.cc/150?u=' + Date.now(),
      rating: '5.0',
      bookings: 0,
      status: 'Available'
    };
    setStaffList([newStaff, ...staffList]);
    setIsAddModalOpen(false);
    showToast('New staff member added successfully');
  };

  const deleteStaff = (id: number) => {
    if(confirm('Remove this staff member?')) {
      setStaffList(staffList.filter(s => s.id !== id));
      showToast('Staff removed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Staff Management</h1>
          <p className="text-slate-500 mt-1">Manage your team and their schedules</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" /> Add Staff
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffList.map(staff => (
          <div key={staff.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative group">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <button onClick={() => showToast('Edit Staff')} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => deleteStaff(staff.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                <Trash2 className="w-4 h-4" />
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

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Staff Member">
        <form onSubmit={handleAddStaff} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input name="staffName" type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role / Specialization</label>
            <input name="staffRole" type="text" placeholder="e.g. Senior Stylist" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
            <input type="tel" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" required />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Add Staff</button>
          </div>
        </form>
      </Modal>

      <Toast visible={toast.visible} message={toast.message} />
    </div>
  );
}