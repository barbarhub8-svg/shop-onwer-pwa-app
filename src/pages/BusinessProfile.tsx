import { useState, useRef, useEffect } from 'react';
import { Camera, MapPin, Building, Save } from 'lucide-react';
import { api } from '../lib/api';
import Toast from '../components/Toast';

export default function BusinessProfile() {
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [shopData, setShopData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [shop, profile] = await Promise.all([api.getShop(), api.getProfile()]);
      setShopData(shop);
      setProfileData(profile);
      if (shop.logo_url) setLogoUrl(shop.logo_url);
    } catch (err) {
      console.error(err);
      showToast('Error loading business profile');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoUrl(URL.createObjectURL(file));
      showToast('Logo ready to be saved');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const form = e.target as HTMLFormElement;

    try {
      let finalLogoUrl = shopData?.logo_url || null;
      if (logoFile) {
        finalLogoUrl = await api.uploadFile(logoFile, 'logos');
      }

      await api.updateShop({
        name: form.shopName.value,
        phone: form.shopPhone.value,
        email: form.shopEmail.value,
        description: form.shopDesc.value,
        address: form.shopAddress.value,
        city: form.shopCity.value,
        pin_code: form.shopPin.value,
        logo_url: finalLogoUrl
      });

      await api.updateProfile({
        full_name: form.ownerName.value
      });

      showToast('Profile updated successfully');
    } catch (err) {
      showToast('Error updating profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading business profile...</div>;
  }

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
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                {logoUrl ? (
                  <img src={logoUrl} alt="Shop Logo" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-8 h-8 text-slate-400 group-hover:text-blue-600 transition-colors" />
                )}
              </div>
              <div className="absolute inset-0 bg-slate-900/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs font-medium text-white">{logoUrl ? 'Change' : 'Upload'}</span>
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
            <div>
              <h3 className="font-medium text-slate-900">Shop Logo</h3>
              <p className="text-sm text-slate-500 mt-1">Recommended size 512x512px</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Shop Name</label>
              <input name="shopName" defaultValue={shopData?.name} type="text" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Owner Name</label>
              <input name="ownerName" defaultValue={profileData?.full_name} type="text" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
              <input name="shopPhone" defaultValue={shopData?.phone} type="tel" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input name="shopEmail" defaultValue={shopData?.email} type="email" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea name="shopDesc" rows={3} defaultValue={shopData?.description} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none resize-none"></textarea>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" /> Location
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
            <textarea name="shopAddress" rows={2} defaultValue={shopData?.address} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none resize-none"></textarea>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
              <input name="shopCity" defaultValue={shopData?.city} type="text" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">PIN Code</label>
              <input name="shopPin" defaultValue={shopData?.pin_code} type="text" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pb-16 md:pb-0">
          <button type="button" className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
          <button type="submit" disabled={isSaving} className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
      <Toast visible={toast.visible} message={toast.message} />
    </div>
  );
}