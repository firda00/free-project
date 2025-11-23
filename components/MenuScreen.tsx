import React, { useState } from 'react';
import { ShoppingCart, Plus, Search } from 'lucide-react';
import { CATEGORIES, SERVICES } from '../constants';
import { ServiceItem } from '../types';

interface MenuScreenProps {
  addToCart: (item: ServiceItem) => void;
  cartTotal: number;
  cartCount: number;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ addToCart, cartTotal, cartCount }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = SERVICES.filter(service => {
    const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm pb-2">
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">RoboFix</h1>
          </div>
          <div className="relative">
             <ShoppingCart className="w-6 h-6 text-gray-600" />
             {cartCount > 0 && (
               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                 {cartCount}
               </span>
             )}
          </div>
        </div>

        {/* Search */}
        <div className="px-4 mb-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search repairs..." 
              className="w-full bg-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto px-4 gap-2 no-scrollbar pb-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeCategory === cat 
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {filteredServices.map(service => (
          <div key={service.id} className="bg-white rounded-2xl p-3 shadow-sm flex gap-4 animate-fade-in">
            <img 
              src={service.imageUrl} 
              alt={service.title} 
              className="w-28 h-28 object-cover rounded-xl flex-shrink-0 bg-gray-200"
            />
            <div className="flex flex-col flex-1 justify-between py-1">
              <div>
                <h3 className="font-bold text-gray-900 leading-tight mb-1">{service.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{service.description}</p>
              </div>
              <div className="flex justify-between items-end mt-2">
                <span className="font-bold text-lg text-gray-900">{service.price} $</span>
                <button 
                  onClick={() => addToCart(service)}
                  className="bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg shadow-orange-200"
                >
                  Add <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Bottom Cart Summary */}
      {cartCount > 0 && (
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="bg-orange-500 text-white p-4 rounded-2xl shadow-xl shadow-orange-200 flex justify-between items-center cursor-pointer hover:bg-orange-600 transition-colors">
            <div className="flex items-center gap-2">
              <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold">{cartCount} items</span>
              <span className="font-bold">{cartTotal} $</span>
            </div>
            <div className="flex items-center gap-1 font-medium text-sm">
              Checkout
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuScreen;