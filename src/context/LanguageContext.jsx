import { createContext, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const language = 'en';

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
        }
    };

    const t = (key) => {
        return translations.en[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: () => {}, t }}>
            {children}
        </LanguageContext.Provider>
    );
};