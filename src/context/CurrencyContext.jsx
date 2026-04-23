import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('MAD');

  const toggleCurrency = () => {
    setCurrency((prevCurrency) => (prevCurrency === 'MAD' ? 'USD' : 'MAD'));
  };

  const formatPrice = (amount) => {
    const formattedAmount = Number(amount).toLocaleString();
    return currency === 'MAD' ? `${formattedAmount} MAD` : `$${formattedAmount}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};
