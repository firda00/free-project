import React, { useState, useEffect } from 'react';
import { Home, ClipboardList, User, Sparkles } from 'lucide-react';
import MenuScreen from './components/MenuScreen';
import OrdersScreen from './components/OrdersScreen';
import ProfileScreen from './components/ProfileScreen';
import AIDiagnosticModal from './components/AIDiagnosticModal';
import { ViewState, ServiceItem } from './types';
import { SERVICES } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.MENU);
  const [cart, setCart] = useState<ServiceItem[]>([]);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  
  // Logic to highlight a service if recommended by AI
  // In a real app, this might navigate to a specific detail page.
  // Here we just switch to menu and maybe alert for simplicity.
  const handleAIRecommendation = (serviceId: string) => {
    setCurrentView(ViewState.MENU);
    // Optional: Scroll to item or highlight logic could go here
    const service = SERVICES.find(s => s.id === serviceId);
    if (service) {
      alert(`AI Recommendation: ${service.title}\nAdded to your cart.`);
      setCart(prev => [...prev, service]);
    }
  };

  const addToCart = (item: ServiceItem) => {
    setCart([...cart, item]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.MENU:
        return <MenuScreen addToCart={addToCart} cartTotal={cartTotal} cartCount={cart.length} />;
      case ViewState.ORDERS:
        return <OrdersScreen onBack={() => setCurrentView(ViewState.MENU)} />;
      case ViewState.PROFILE:
        return <ProfileScreen />;
      default:
        return <MenuScreen addToCart={addToCart} cartTotal={cartTotal} cartCount={cart.length} />;
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-200">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md bg-white h-[100vh] sm:h-[90vh] sm:my-8 sm:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col border-8 border-gray-900 sm:border-gray-800">
        
        {/* Dynamic Island / Notch Mockup for desktop view */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-50 hidden sm:block"></div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden relative">
          {renderContent()}
        </div>

        {/* Floating AI Button (FAB) */}
        {currentView === ViewState.MENU && (
          <button 
            onClick={() => setIsAIModalOpen(true)}
            className="absolute bottom-24 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg shadow-indigo-300 hover:bg-indigo-700 hover:scale-105 transition-all z-30"
          >
            <Sparkles className="w-6 h-6" />
          </button>
        )}

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center z-40">
          <NavButton 
            active={currentView === ViewState.MENU} 
            onClick={() => setCurrentView(ViewState.MENU)} 
            icon={<Home size={24} />} 
            label="Menu" 
          />
          <NavButton 
            active={currentView === ViewState.ORDERS} 
            onClick={() => setCurrentView(ViewState.ORDERS)} 
            icon={<ClipboardList size={24} />} 
            label="Orders" 
          />
          <NavButton 
            active={currentView === ViewState.PROFILE} 
            onClick={() => setCurrentView(ViewState.PROFILE)} 
            icon={<User size={24} />} 
            label="Profile" 
          />
        </div>
        
        {/* AI Modal Overlay */}
        <AIDiagnosticModal 
            isOpen={isAIModalOpen} 
            onClose={() => setIsAIModalOpen(false)} 
            onRecommendation={handleAIRecommendation}
        />
      </div>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'}`}
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

export default App;