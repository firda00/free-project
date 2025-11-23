import React, { useState } from 'react';
import { X, Sparkles, Send, Wrench, Loader2 } from 'lucide-react';
import { diagnoseProblem } from '../services/geminiService';

interface AIDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecommendation: (serviceId: string) => void;
}

const AIDiagnosticModal: React.FC<AIDiagnosticModalProps> = ({ isOpen, onClose, onRecommendation }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string, id?: string } | null>(null);

  if (!isOpen) return null;

  const handleDiagnose = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);

    const diagnosis = await diagnoseProblem(input);
    
    setResult({
      text: diagnosis.text,
      id: diagnosis.recommendedServiceId
    });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors">
            <X size={20} />
          </button>
          <div className="flex items-center gap-2 mb-1">
             <Sparkles className="w-5 h-5 text-yellow-300" />
             <h2 className="font-bold text-lg">AI Diagnostics</h2>
          </div>
          <p className="text-blue-100 text-sm">Describe the issue, and our AI will suggest a repair plan.</p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {!result ? (
            <div className="space-y-4">
               <textarea
                 className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                 placeholder="e.g. My drone wobbles when hovering and makes a grinding noise..."
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 disabled={loading}
               />
               <button
                 onClick={handleDiagnose}
                 disabled={loading || !input.trim()}
                 className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-all active:scale-95"
               >
                 {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
                 {loading ? 'Analyzing...' : 'Analyze Problem'}
               </button>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <h3 className="text-indigo-900 font-bold mb-2 text-sm uppercase tracking-wider">Analysis Result</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{result.text}</p>
              </div>
              
              {result.id ? (
                <button 
                  onClick={() => {
                      onRecommendation(result.id!);
                      onClose();
                  }}
                  className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
                >
                  <Wrench className="w-5 h-5" />
                  View Recommended Service
                </button>
              ) : (
                <button onClick={() => setResult(null)} className="w-full text-indigo-600 font-medium text-sm">
                  Try Another Description
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIDiagnosticModal;