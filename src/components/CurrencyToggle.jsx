import React from 'react';
import { useCurrency } from '../context/CurrencyContext';

const CurrencyToggle = () => {
  const { toggleCurrency, currency } = useCurrency();

  return (
    <button
      onClick={toggleCurrency}
      className="group fixed right-6 top-32 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 rounded-full z-[40] h-14 w-14 hover:w-40 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-end overflow-hidden cursor-pointer p-0"
      title="Switch Currency"
    >
      <span className="whitespace-nowrap font-black text-slate-700 text-lg mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        to {currency === 'USD' ? 'MAD' : 'USD'}
      </span>
      <div className="w-[48px] h-[48px] mr-[3.5px] flex-shrink-0 bg-[#00B4D8] rounded-full flex items-center justify-center text-white font-black text-xl shadow-inner">
        {currency === 'USD' ? '$' : 'MA'}
      </div>
    </button>
  );
};

export default CurrencyToggle;
