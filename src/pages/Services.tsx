import { useState } from 'react';
import { Plus, Search, MoreVertical, Edit2, Copy, Trash2 } from 'lucide-react';
import { servicesData } from '../data/mock';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

export default function Services() {
  const [services, setServices] = useState(servicesData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  const deleteService = (id: number) => {
    if(confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== id));
      showToast('Service deleted successfully');
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newSvc = {
      id: Date.now(),
      name: (e.target as any).svcName.value,
      category: (e.target as any).svcCat.value,
      duration: (e.target as any).svcDur.value,
      price: '₹' + (e.target as any).svcPrice.value,
      active: true
    };
    setServices([newSvc, ...services]);
    setIsAddModalOpen(false);
    showToast('New service added');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services</h1>
          <p className="text-slate-500 mt-1">Manage your service menu and pricing</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" /> Add Service
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search services..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 hide-scrollbar shrink-0">
          {['All', 'Hair', 'Makeup', 'Spa', 'Nail'].map((filter, i) => (
            <button key={i} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${i === 0 ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(service => (
          <div key={service.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <button onClick={() => showToast('Edit modal opened')} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => deleteService(service.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-600 tracking-wide uppercase">{service.category}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{service.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{service.duration} • Staff Assigned</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                {service.discount ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-slate-900">{service.discount}</span>
                    <span className="text-sm text-slate-400 line-through">{service.price}</span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-slate-900">{service.price}</span>
                )}
              </div>
              <div className={`px-2.5 py-1 rounded-md text-xs font-medium ${service.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                {service.active ? 'Active' : 'Inactive'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Service">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Service Name</label>
            <input name="svcName" type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select name="svcCat" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-white">
                <option>Hair</option>
                <option>Makeup</option>
                <option>Spa</option>
                <option>Nail</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
              <select name="svcDur" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-white">
                <option>30 Min</option>
                <option>45 Min</option>
                <option>60 Min</option>
                <option>120 Min</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
              <input name="svcPrice" type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Discount Price (Optional)</label>
              <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="active-toggle" className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-600" defaultChecked />
            <label htmlFor="active-toggle" className="text-sm font-medium text-slate-700">Active (Visible to customers)</label>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Save Service</button>
          </div>
        </form>
      </Modal>

      <Toast visible={toast.visible} message={toast.message} />
    </div>
  );
}