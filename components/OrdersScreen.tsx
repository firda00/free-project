import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, Truck, Clock } from 'lucide-react';
import { MOCK_ORDERS } from '../constants';
import { Order } from '../types';

interface OrdersScreenProps {
  onBack: () => void;
}

const OrdersScreen: React.FC<OrdersScreenProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const filteredOrders = MOCK_ORDERS.filter(order => 
    activeTab === 'active' 
      ? ['Diagnosing', 'Repairing', 'Ready'].includes(order.status)
      : order.status === 'Completed'
  );

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Diagnosing': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Repairing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Ready': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-1 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">My Repairs</h1>
        </div>
        
        {/* Tabs */}
        <div className="bg-gray-100 p-1 rounded-xl flex">
          <button 
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'active' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Active
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'history' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            History
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredOrders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-900">Repair #{order.id}</h3>
                <p className="text-xs text-gray-400">from {order.date}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {order.items.map((item, idx) => (
                <div key={`${order.id}-${idx}`} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                  {item.title}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                 <p className="text-xs text-gray-400">Estimated Cost</p>
                 <p className="font-bold text-gray-900">{order.total.toFixed(2)} $</p>
              </div>
              
              {activeTab === 'active' ? (
                 <button className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-orange-600 flex items-center gap-2">
                   <Clock className="w-4 h-4" /> Track
                 </button>
              ) : (
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Warranty
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-10 opacity-50">
            <Truck className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-500">No repair tickets found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersScreen;