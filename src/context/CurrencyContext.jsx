import React, { createContext, useContext } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  const currency = 'MAD';

  const formatPrice = (amount) => {
    return `${Number(amount).toLocaleString()} MAD`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};
