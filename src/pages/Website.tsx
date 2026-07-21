import { useState } from 'react';
import { Globe, ExternalLink, Image, LayoutTemplate, Settings, CheckCircle2, ChevronRight, Share2, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import Toast from '../components/Toast';

export default function Website() {
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [isPublished, setIsPublished] = useState(true);

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  const sections = [
    { name: 'Hero Section', status: 'Completed', visible: true },
    { name: 'About Business', status: 'Completed', visible: true },
    { name: 'Services List', status: 'Completed', visible: true },
    { name: 'Staff Members', status: 'Completed', visible: true },
    { name: 'Photo Gallery', status: 'Needs Update', visible: true },
    { name: 'Customer Reviews', status: 'Completed', visible: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Website Builder</h1>
          <p className="text-slate-500 mt-1">Manage your shop's online presence</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => showToast('Link copied to clipboard')} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button onClick={() => {setIsPublished(!isPublished); showToast(isPublished ? 'Website Unpublished' : 'Website Published successfully');}} className={`inline-flex items-center gap-2 px-4 py-2 text-white font-medium rounded-lg transition-colors ${isPublished ? 'bg-slate-900 hover:bg-slate-800' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {isPublished ? 'Unpublish' : 'Publish Site'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
            <Globe className="w-10 h-10 text-blue-600" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isPublished ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
              <span className="text-sm font-medium text-slate-500">{isPublished ? 'Live & Accepting Bookings' : 'Draft / Offline'}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">royalglow.nexora.in</h2>
            <p className="text-sm text-slate-500 mt-1">Last updated: Today at 10:30 AM</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button onClick={() => showToast('Opening preview...')} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2">
              <ExternalLink className="w-4 h-4" /> Preview
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-semibold text-slate-900">Website Sections</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {sections.map((section, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-slate-400 cursor-grab" />
                    <div>
                      <p className="font-medium text-slate-900">{section.name}</p>
                      <p className={`text-xs ${section.status === 'Completed' ? 'text-emerald-600' : 'text-amber-600'}`}>{section.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={section.visible} onChange={() => showToast(`${section.name} visibility updated`)} />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    <button onClick={() => showToast(`Edit ${section.name}`)} className="text-sm font-medium text-blue-600 hover:text-blue-700">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Link to="/templates" className="block bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors group">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 flex items-center justify-between">
              Change Theme <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </h3>
            <p className="text-sm text-slate-500 mt-1">Currently using "Royal Luxe"</p>
          </Link>

          <Link to="/gallery" className="block bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors group">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Image className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 flex items-center justify-between">
              Manage Gallery <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </h3>
            <p className="text-sm text-slate-500 mt-1">10 photos uploaded</p>
          </Link>

          <div className="bg-slate-900 rounded-2xl p-5 text-white">
            <h3 className="font-semibold mb-2">Setup Progress</h3>
            <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Basic Details added</li>
              <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Services linked</li>
              <li className="flex gap-2 items-center text-slate-400"><div className="w-4 h-4 border-2 border-slate-500 rounded-full"></div> Add Staff photos</li>
            </ul>
          </div>
        </div>
      </div>

      <Toast visible={toast.visible} message={toast.message} />
    </div>
  );
}