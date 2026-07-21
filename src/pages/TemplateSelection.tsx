import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { templatesData } from '../data/mock';
import Toast from '../components/Toast';

export default function TemplateSelection() {
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [templates, setTemplates] = useState(templatesData);

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  const selectTemplate = (id: number) => {
    setTemplates(templates.map(t => ({...t, selected: t.id === id})));
    showToast('Theme updated successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/website" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Website Themes</h1>
          <p className="text-slate-500 mt-1">Choose a look for your online store</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {templates.map(template => (
          <div key={template.id} className={`bg-white rounded-2xl border-2 overflow-hidden transition-all ${template.selected ? 'border-blue-600 shadow-md' : 'border-slate-200 shadow-sm hover:border-blue-300'}`}>
            <div className="aspect-[4/3] bg-slate-100 relative group overflow-hidden">
              <img src={template.img} alt={template.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button onClick={() => showToast('Opening Live Preview...')} className="px-4 py-2 bg-white text-slate-900 font-medium rounded-lg text-sm flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Preview
                </button>
              </div>
              {template.selected && (
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" /> Active
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-900">{template.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{template.style}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-100">
                {!template.selected ? (
                  <button onClick={() => selectTemplate(template.id)} className="w-full py-2.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors">
                    Apply Theme
                  </button>
                ) : (
                  <button disabled className="w-full py-2.5 bg-blue-50 text-blue-700 font-medium rounded-xl flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Currently Applied
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Toast visible={toast.visible} message={toast.message} />
    </div>
  );
}