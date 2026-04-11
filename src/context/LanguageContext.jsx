import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    // English is default
    const [language, setLanguage] = useState('en');

    // Simulate basic translations structure
    const translations = {
        en: {
            categories: 'Categories',
            artisans: 'Our Artisans',
            aboutUs: 'About Us',
            searchPlaceholder: 'Search "Beni Ouarain", "Argan"...',
            promo: 'Get 50% Off on Selected Artisanal Pieces',
            motto: 'Handmade with love, delivered with care.',
            cart: 'Cart',
            profile: 'Profile',
            viewArtisan: 'View Artisan',
        },
        ar: {
            // Future Arabic translations
        }
    };

    const setLang = (lang) => {
        setLanguage(lang);
        // Toggle dir="rtl" for Arabic down the line
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    };

    // Very basic t() function
    const t = (key) => {
        return translations[language]?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};