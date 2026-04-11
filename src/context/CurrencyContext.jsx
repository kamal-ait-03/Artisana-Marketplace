import React, { createContext, useState, useContext } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');

  const toggleCurrency = () => {
    setCurrency(prev => (prev === 'USD' ? 'MAD' : 'USD'));
  };

  const formatPrice = (amount) => {
    // Assuming base price in mock data is currently just a number that we considered USD.
    // If current is USD, return `$ amount`
    // If current is MAD, 1 USD = 9.28 MAD
    if (currency === 'MAD') {
      return `${Math.round(amount * 9.28).toLocaleString()} MAD`;
    }
    return `$${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};
