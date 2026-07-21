import { Bell, Menu } from 'lucide-react';
import { shopInfo } from '../data/mock';

interface Props {
  onOpenNotifications: () => void;
}

export default function MobileHeader({ onOpenNotifications }: Props) {
  return (
    <header className="md:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img 
          src={shopInfo.owner.avatar} 
          alt="Profile" 
          className="w-9 h-9 rounded-full object-cover border border-slate-200"
        />
        <div>
          <h2 className="text-sm font-semibold text-slate-900 leading-tight">{shopInfo.name}</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-slate-500 font-medium">{shopInfo.status}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={onOpenNotifications}
          className="p-2 relative text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </div>
    </header>
  );
}