import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Phone, Clock, IndianRupee, MoreVertical, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scheduleData } from '../data/mock';
import Toast from '../components/Toast';
import Modal from '../components/Modal';

export default function Bookings() {
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [bookings, setBookings] = useState(scheduleData);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  
  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    showToast(`Booking marked as ${newStatus}`);
    setSelectedBooking(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Today's Bookings</h1>
          <p className="text-slate-500 mt-1">Manage your daily schedule</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/calendar" className="inline-flex items-center justify-center p-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
            <CalendarIcon className="w-5 h-5" />
          </Link>
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1">
            <button className="p-1 hover:bg-slate-100 rounded text-slate-600"><ChevronLeft className="w-5 h-5" /></button>
            <span className="px-3 text-sm font-medium text-slate-700">Today, 21 Jul</span>
            <button className="p-1 hover:bg-slate-100 rounded text-slate-600"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar">
        {['All (18)', 'Pending (4)', 'Confirmed (8)', 'In Progress (2)', 'Completed (4)'].map((filter, i) => (
          <button key={i} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {bookings.map(booking => (
          <div key={booking.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
            <div className="flex justify-between items-start md:w-48 shrink-0">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-900">{booking.time.split(' ')[0]}</span>
                <span className="text-sm font-medium text-slate-500">{booking.time.split(' ')[1]}</span>
              </div>
              <span className={`md:hidden px-2 py-1 rounded text-xs font-medium ${
                booking.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                booking.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                booking.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                'bg-slate-100 text-slate-700'
              }`}>{booking.status}</span>
            </div>
            
            <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={booking.avatar} alt="" className="w-12 h-12 rounded-full object-cover shrink-0" />
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{booking.customer}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 60m</span>
                    <span className="flex items-center gap-1"><IndianRupee className="w-4 h-4" /> {booking.amount.replace('₹', '')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-1 text-sm text-slate-600">
                <p className="font-medium text-slate-900">{booking.service}</p>
                <p>with {booking.staff}</p>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-3 pt-4 border-t border-slate-100 md:pt-0 md:border-t-0 md:w-64 shrink-0">
              <span className={`hidden md:inline-block px-2.5 py-1 rounded-md text-xs font-medium ${
                booking.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                booking.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                booking.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                'bg-slate-100 text-slate-700'
              }`}>{booking.status}</span>
              
              <div className="flex items-center gap-2">
                <button onClick={() => showToast(`Calling ${booking.customer}...`)} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-slate-200">
                  <Phone className="w-4 h-4" />
                </button>
                <button onClick={() => setSelectedBooking(booking)} className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors">
                  Action
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Toast visible={toast.visible} message={toast.message} />

      <Modal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        title="Booking Actions"
      >
        {selectedBooking && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <img src={selectedBooking.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-slate-900">{selectedBooking.customer}</p>
                <p className="text-sm text-slate-500">{selectedBooking.service} • {selectedBooking.time}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleStatusChange(selectedBooking.id, 'In Progress')} className="p-3 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors">
                Start Service
              </button>
              <button onClick={() => handleStatusChange(selectedBooking.id, 'Completed')} className="p-3 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors">
                Complete
              </button>
              <button onClick={() => handleStatusChange(selectedBooking.id, 'Confirmed')} className="p-3 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors">
                Confirm
              </button>
              <button onClick={() => handleStatusChange(selectedBooking.id, 'Cancelled')} className="p-3 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}