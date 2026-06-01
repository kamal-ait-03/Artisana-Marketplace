import React from 'react';
import { X, ShoppingBag, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterModal = ({ isOpen, onClose, onLoginClick }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleRoleSelect = (role) => {
    onClose();
    if (role === 'client') {
      navigate('/register');
    } else {
      navigate('/seller-register');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden relative animate-slide-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
        >
          <X size={24} className="text-slate-400" />
        </button>

        <div className="p-10 pt-12 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-2">Rejoindre Artisana</h2>
          <p className="text-slate-500 font-medium mb-10">Choisissez votre type de compte pour commencer</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {/* Client Card */}
            <button 
              onClick={() => handleRoleSelect('client')}
              className="group flex flex-col items-center p-8 rounded-[32px] border-2 border-slate-100 hover:border-[#00BCD4] hover:bg-[#00BCD4]/5 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#00BCD4]/10 rounded-2xl flex items-center justify-center text-[#00BCD4] mb-4 group-hover:scale-110 transition-transform">
                <ShoppingBag size={32} />
              </div>
              <span className="text-xl font-black text-slate-900 mb-1 uppercase tracking-tight">CLIENT</span>
              <p className="text-xs text-slate-500 font-bold leading-tight">J'achète des produits artisanaux</p>
            </button>

            {/* Artisan Card */}
            <button 
              onClick={() => handleRoleSelect('artisan')}
              className="group flex flex-col items-center p-8 rounded-[32px] border-2 border-slate-100 hover:border-[#00BCD4] hover:bg-[#00BCD4]/5 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#00BCD4]/10 rounded-2xl flex items-center justify-center text-[#00BCD4] mb-4 group-hover:scale-110 transition-transform">
                <Palette size={32} />
              </div>
              <span className="text-xl font-black text-slate-900 mb-1 uppercase tracking-tight">ARTISAN</span>
              <p className="text-xs text-slate-500 font-bold leading-tight">Je vends mes créations</p>
            </button>
          </div>

          <p className="text-slate-500 font-bold text-sm">
            Déjà un compte? {' '}
            <button 
              onClick={() => { onClose(); onLoginClick(); }}
              className="text-[#00BCD4] hover:underline"
            >
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
