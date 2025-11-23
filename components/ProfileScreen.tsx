import React from 'react';
import { User, CreditCard, Clock, MapPin, Settings, LogOut } from 'lucide-react';
import { MOCK_USER } from '../constants';

const ProfileScreen: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-6 bg-white shadow-sm mb-4">
        <h1 className="text-xl font-bold text-gray-800 mb-6">My Profile</h1>
        <div className="flex items-center gap-4">
          <img 
            src={MOCK_USER.avatarUrl} 
            alt="Profile" 
            className="w-16 h-16 rounded-full object-cover border-2 border-orange-100"
          />
          <div className="flex-1">
            <h2 className="font-bold text-lg text-gray-900">{MOCK_USER.name}</h2>
            <p className="text-gray-500 text-sm">{MOCK_USER.phone}</p>
          </div>
          <button className="text-xs font-medium bg-gray-100 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-200">
            Edit
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm flex-1 p-4">
        <div className="space-y-1">
          <MenuItem icon={<User size={18} />} label="Personal Data" />
          <MenuItem icon={<Clock size={18} />} label="Repair History" />
          <MenuItem icon={<CreditCard size={18} />} label="Payment Methods" />
          <MenuItem icon={<MapPin size={18} />} label="Workshop Locations" />
          <MenuItem icon={<Settings size={18} />} label="Preferences" />
        </div>

        <button className="mt-12 w-full bg-red-50 text-red-600 font-medium py-3 rounded-xl border border-red-100 hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </div>
  );
};

const MenuItem: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors group">
    <div className="flex items-center gap-4 text-gray-600 group-hover:text-orange-600 transition-colors">
      <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-orange-100 transition-colors">
        {icon}
      </div>
      <span className="font-medium text-sm">{label}</span>
    </div>
    <svg className="w-4 h-4 text-gray-400 group-hover:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

export default ProfileScreen;