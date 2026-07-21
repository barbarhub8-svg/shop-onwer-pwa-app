import { useState, useRef } from 'react';
import { Plus, Star, Calendar, Edit2, Trash2, Camera } from 'lucide-react';
import { staffData } from '../data/mock';
import Toast from '../components/Toast';
import Modal from '../components/Modal';

export default function Staff() {
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [staffList, setStaffList] = useState(staffData);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [viewingStaff, setViewingStaff] = useState<any>(null);
  
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newUrl = URL.createObjectURL(e.target.files[0]);
      setAvatarUrl(newUrl);
      showToast('Photo uploaded successfully');
    }
  };

  const openAddModal = () => {
    setEditingStaff(null);
    setAvatarUrl(null);
    setIsModalOpen(true);
  };

  const openEditModal = (staff: any) => {
    setEditingStaff(staff);
    setAvatarUrl(staff.avatar);
    setIsModalOpen(true);
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    const finalAvatar = avatarUrl || (editingStaff ? editingStaff.avatar : 'https://i.pravatar.cc/150?u=' + Date.now());

    if (editingStaff) {
      setStaffList(staffList.map(s => s.id === editingStaff.id ? {
        ...s,
        name: form.staffName.value,
        role: form.staffRole.value,
        avatar: finalAvatar,
      } : s));
      showToast('Staff updated successfully');
    } else {
      const newStaff = {
        id: Date.now(),
        name: form.staffName.value,
        role: form.staffRole.value,
        avatar: finalAvatar,
        rating: '5.0',
        bookings: 0,
        status: 'Available'
      };
      setStaffList([newStaff, ...staffList]);
      showToast('New staff member added successfully');
    }
    setIsModalOpen(false);
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
        <button onClick={openAddModal} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" /> Add Staff
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffList.map(staff => (
          <div key={staff.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative group">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <button onClick={() => openEditModal(staff)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md">
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
              <button onClick={() => setViewingStaff(staff)} className="flex-1 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors">
                Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingStaff ? "Edit Staff" : "Add Staff Member"}>
        <form onSubmit={handleSaveStaff} className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-8 h-8 text-slate-400 group-hover:text-blue-600 transition-colors" />
                )}
              </div>
              <div className="absolute inset-0 bg-slate-900/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs font-medium text-white">{avatarUrl ? 'Change' : 'Upload'}</span>
              </div>
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input name="staffName" defaultValue={editingStaff?.name} type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role / Specialization</label>
            <input name="staffRole" defaultValue={editingStaff?.role} type="text" placeholder="e.g. Senior Stylist" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
            <input type="tel" defaultValue={editingStaff ? "+91 9876543210" : ""} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" required />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">{editingStaff ? 'Save Changes' : 'Add Staff'}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!viewingStaff} onClose={() => setViewingStaff(null)} title="Staff Profile">
        {viewingStaff && (
          <div className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <img src={viewingStaff.avatar} alt={viewingStaff.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-4" />
              <h2 className="text-xl font-bold text-slate-900">{viewingStaff.name}</h2>
              <p className="text-sm text-slate-500">{viewingStaff.role}</p>
              <div className="flex items-center gap-1 mt-2 text-sm font-medium">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {viewingStaff.rating} Rating
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                <p className="text-xs text-slate-500 font-medium mb-1">Today's Bookings</p>
                <p className="text-xl font-bold text-slate-900">{viewingStaff.bookings}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                <p className="text-xs text-slate-500 font-medium mb-1">Current Status</p>
                <p className={`inline-block px-2.5 py-1 rounded-md text-sm font-semibold mt-1 ${
                  viewingStaff.status === 'Available' ? 'text-emerald-700 bg-emerald-100' :
                  viewingStaff.status === 'Busy' ? 'text-amber-700 bg-amber-100' :
                  'text-slate-700 bg-slate-100'
                }`}>
                  {viewingStaff.status}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-3">
              <button onClick={() => {setViewingStaff(null); openEditModal(viewingStaff);}} className="w-full py-2.5 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors">
                Edit Details
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Toast visible={toast.visible} message={toast.message} />
    </div>
  );
}