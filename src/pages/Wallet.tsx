import { useState } from 'react';
import { IndianRupee, ArrowUpRight, ArrowDownRight, Download, AlertCircle, TrendingUp, Clock } from 'lucide-react';
import { transactionsData, kpiData } from '../data/mock';
import Toast from '../components/Toast';

export default function Wallet() {
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Wallet & Payments</h1>
        <p className="text-slate-500 mt-1">Manage your earnings and settlements</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <p className="text-slate-300 font-medium text-sm flex items-center gap-2"><IndianRupee className="w-4 h-4" /> Available Balance</p>
            <h2 className="text-4xl font-bold mt-2">{kpiData.wallet}</h2>
            <div className="mt-6 flex gap-3">
              <button onClick={() => showToast('Withdraw request initiated')} className="px-4 py-2 bg-white text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors">Withdraw</button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center"><Clock className="w-5 h-5" /></div>
            <p className="text-sm font-medium text-slate-500">Pending Settlement</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">₹4,500</p>
          <p className="text-xs text-slate-400 mt-1">Expected tomorrow</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><TrendingUp className="w-5 h-5" /></div>
            <p className="text-sm font-medium text-slate-500">Today's Collection</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{kpiData.todayRevenue}</p>
          <p className="text-xs text-slate-400 mt-1">From 18 bookings</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-900">Recent Transactions</h2>
          <div className="flex gap-2">
            {['All', 'Credits', 'Debits', 'Payouts'].map((tab, i) => (
              <button key={i} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${i === 0 ? 'bg-white shadow border border-slate-200 text-slate-900' : 'text-slate-600 hover:bg-slate-100'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="divide-y divide-slate-100">
          {transactionsData.map(txn => (
            <div key={txn.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  txn.type === 'Credit' || txn.type === 'Payout' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                }`}>
                  {txn.type === 'Credit' || txn.type === 'Payout' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{txn.ref}</p>
                  <p className="text-xs text-slate-500">{txn.date} • {txn.id}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-base font-bold ${txn.type === 'Credit' || txn.type === 'Payout' ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {txn.type === 'Credit' || txn.type === 'Payout' ? '+' : ''}{txn.amount}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{txn.type}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center">
          <button onClick={() => showToast('Loading more transactions...')} className="text-sm font-medium text-blue-600 hover:text-blue-700">View All Transactions</button>
        </div>
      </div>

      <Toast visible={toast.visible} message={toast.message} />
    </div>
  );
}