import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, LogOut, ChevronDown, Phone, MapPin, Book, Scissors, Shirt, Leaf, LayoutGrid } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/mockData';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropOpen, setIsUserDropOpen] = useState(false);
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
    const [language, setLanguage] = useState('EN'); // EN or AR
    const [searchQuery, setSearchQuery] = useState('');
    const { cartItems } = useCart();
    const { user, logout, role } = useAuth();
    const navigate = useNavigate();
    const timeoutRef = useRef(null);

    const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const categoryMetaData = {
        pottery: { icon: <Book size={24} />, color: 'text-amber-600', bg: 'bg-amber-50', desc: 'Hand-painted Safi ceramics' },
        leather: { icon: <Scissors size={24} />, color: 'text-orange-700', bg: 'bg-orange-50', desc: 'Hand-tanned leather from Fès' },
        clothing: { icon: <Shirt size={24} />, color: 'text-indigo-600', bg: 'bg-indigo-50', desc: 'Traditional caftans & djellabas' },
        beauty: { icon: <Leaf size={24} />, color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'Pure Argan & natural elixirs' },
        carpets: { icon: <LayoutGrid size={24} />, color: 'text-rose-700', bg: 'bg-rose-50', desc: 'Symbols of Moroccan heritage' },
        decoration: { icon: <LayoutGrid size={24} />, color: 'text-cyan-700', bg: 'bg-cyan-50', desc: 'Modern & traditional decor' },
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            if (isUserDropOpen) setIsUserDropOpen(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isUserDropOpen]);

    const handleLogout = () => {
        logout();
        setIsUserDropOpen(false);
        navigate('/');
    };

    const toggleLanguage = (lang) => {
        setLanguage(lang);
        document.documentElement.dir = (lang === 'AR') ? 'rtl' : 'ltr';
    };

    const translations = {
        EN: {
            categories: 'Categories',
            artisans: 'Nos Artisans',
            aboutUs: 'About Us',
            searchPlaceholder: 'Search "Beni Ouarain", "Argan"...',
            promo: 'Get 50% Off on Selected Artisanal Pieces',
            motto: 'Handmade with love, delivered with care.',
            cart: 'Cart',
            profile: 'Profile',
        },
        AR: {
            categories: 'الأصناف',
            artisans: 'حرفيونا',
            aboutUs: 'من نحن',
            searchPlaceholder: 'ابحث عن "منتجات يدوية", "الأركان"...',
            promo: 'خصم 50% على قطع مختارة',
            motto: 'صنع بكل حب، يصلكم بكل عناية.',
            cart: 'سلة التسوق',
            profile: 'الحساب',
        }
    };
    const t = translations[language];

    const navLinks = [
        { name: t.artisans, path: '/artisans' },
        { name: t.aboutUs, path: '/about' },
    ];

    const enterCategoryMenu = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsCategoryMenuOpen(true);
    };

    const leaveCategoryMenu = () => {
        timeoutRef.current = setTimeout(() => {
            setIsCategoryMenuOpen(false);
        }, 150);
    };

    const zelligePattern = (
        <div className="absolute right-0 top-0 h-full w-32 opacity-20 pointer-events-none hidden lg:block overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 100 200" fill="none" stroke="#00B4D8">
                <path d="M50 0 L100 50 L50 100 L0 50 Z M50 100 L100 150 L50 200 L0 150 Z" strokeWidth="1" />
                <circle cx="50" cy="50" r="10" />
                <circle cx="50" cy="150" r="10" />
                <path d="M0 100 L25 75 L50 100 L25 125 Z M75 75 L100 100 L75 125 L50 100 Z" strokeWidth="1" />
                <path d="M50 0 L25 25 L50 50 L75 25 Z" strokeWidth="1" />
            </svg>
        </div>
    );

    return (
        <header className="fixed top-0 w-full z-50 transition-all duration-300">
            {/* Top Tier (Utility) */}
            <div className={`bg-[#00B4D8] text-white py-2 px-4 transition-all duration-500 overflow-hidden text-xs md:text-sm hidden md:block ${isScrolled ? 'h-0 py-0 opacity-0' : 'h-10 opacity-100'}`}>
                <div className="container mx-auto flex justify-between items-center relative">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5"><Phone size={14} /> +212 5XX-XXXXXX</span>
                        <span className="mx-2 opacity-30">|</span>
                        <div className="flex items-center gap-1.5 cursor-pointer hover:underline"><MapPin size={14} /> Global Delivery from Morocco</div>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] md:text-sm">
                        <span className="opacity-90 font-medium italic">{t.motto}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Language Switcher with Moroccan Red highlights */}
                        <div className="flex bg-white/10 rounded-lg p-0.5 border border-white/20">
                            <button 
                                onClick={() => toggleLanguage('EN')}
                                className={`px-2 py-0.5 rounded-md text-[10px] font-black transition-all ${language === 'EN' ? 'bg-[#C1272D] text-white shadow-md' : 'text-white/70 hover:text-white'}`}
                            >
                                EN
                            </button>
                            <button 
                                onClick={() => toggleLanguage('AR')}
                                className={`px-2 py-0.5 rounded-md text-[10px] font-black transition-all ${language === 'AR' ? 'bg-[#C1272D] text-white shadow-md' : 'text-white/70 hover:text-white'}`}
                            >
                                AR
                            </button>
                        </div>
                        <span className="mx-2 opacity-30">|</span>
                        <div className="flex items-center gap-1.5 cursor-pointer hover:underline">🇲🇦 Morocco</div>
                    </div>
                </div>
            </div>

            {/* Main Nav */}
            <div className={`w-full bg-white transition-all duration-300 relative ${isScrolled ? 'shadow-soft py-2' : 'py-4 shadow-sm'}`}>
                <div className="container mx-auto px-4 md:px-8 flex items-center justify-between relative">
                    
                    {/* Zellige Decorative Vector (Right side) */}
                    {zelligePattern}

                    {/* Logo & Category Trigger */}
                    <div className="flex items-center gap-8 lg:gap-16">
                        <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
                          <div className={`transition-all duration-500 bg-[#00B4D8] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 ${isScrolled ? 'w-10 h-10' : 'w-12 h-12'}`}>
                            <svg width={isScrolled ? "22" : "28"} height={isScrolled ? "22" : "28"} viewBox="0 0 60 60" fill="currentColor" className="transition-all duration-500">
                                <path d="M30 0l15 15-15 15-15-15L30 0z M30 30l15 15-15 15-15-15L30 30z M0 30l15-15 15 15-15 15L0 30z M60 30l-15-15-15 15 15 15 15-15z" />
                            </svg>
                          </div>
                          <div className={`flex flex-col transition-all duration-500 ${isScrolled ? 'opacity-0 -translate-x-4 w-0 scale-75 overflow-hidden' : 'opacity-100 translate-x-0 w-auto scale-100'}`}>
                            <span className="font-heading text-2xl font-black text-slate-900 leading-none tracking-tight whitespace-nowrap">Artisana</span>
                            <span className="text-[10px] text-[#00B4D8] font-bold uppercase tracking-[0.2em] whitespace-nowrap">Marketplace</span>
                          </div>
                        </Link>

                        <nav className="hidden lg:flex gap-8 items-center h-full">
                            {/* Mega Menu Category Link */}
                            <div 
                                className="relative h-full py-4 cursor-pointer group"
                                onMouseEnter={enterCategoryMenu}
                                onMouseLeave={leaveCategoryMenu}
                            >
                                <span className={`flex items-center gap-1.5 font-bold text-sm transition-colors ${isCategoryMenuOpen ? 'text-[#00B4D8]' : 'text-slate-900 group-hover:text-[#00B4D8]'}`}>
                                    {t.categories} <ChevronDown size={14} className={`transition-transform duration-300 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
                                </span>
                            </div>

                            {navLinks.map((link) => (
                                <NavLink 
                                    key={link.name} 
                                    to={link.path}
                                    className={({ isActive }) => `
                                        font-bold text-sm transition-colors hover:text-[#00B4D8]
                                        ${isActive ? 'text-[#00B4D8]' : 'text-slate-900'}
                                    `}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    {/* Highly Rounded Search (Dribbble center pill) */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-12">
                        <div className="relative w-full group">
                            <input 
                                type="text" 
                                placeholder={t.searchPlaceholder}
                                className="w-full bg-slate-50 border-2 border-transparent rounded-full py-2.5 px-6 pl-12 text-sm focus:ring-0 focus:border-[#00B4D8] focus:bg-white transition-all text-slate-800 placeholder-slate-400 font-medium shadow-inner"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00B4D8] transition-colors" size={18} />
                        </div>
                    </div>

                    {/* Right Utility Icons */}
                    <div className="flex items-center gap-4 lg:gap-8">
                        <div className="relative hidden lg:block">
                            <button 
                                onClick={() => setIsUserDropOpen(!isUserDropOpen)}
                                className="flex flex-col items-center group"
                            >
                                <User size={20} className="text-slate-800 group-hover:text-[#00B4D8] transition-colors" />
                                <span className="text-[10px] font-bold text-slate-500 group-hover:text-[#00B4D8] uppercase mt-1">{t.profile}</span>
                            </button>
                            {isUserDropOpen && (
                                <div className="absolute right-0 mt-4 w-56 bg-white rounded-3xl shadow-xl py-4 border border-slate-100 animate-fade-in z-50">
                                    <div className="px-6 py-3 border-b border-slate-50 mb-3">
                                        <p className="text-sm font-black text-slate-900 truncate">{user ? user.name : 'Welcome Friend'}</p>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{role || 'Anonymous'}</p>
                                    </div>
                                    {user ? (
                                        <button onClick={handleLogout} className="w-full text-left px-6 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors font-bold">
                                            <LogOut size={18} /> Sign Out
                                        </button>
                                    ) : (
                                        <Link to="/login" className="px-6 py-2.5 text-sm text-slate-900 hover:bg-slate-50 flex items-center gap-3 transition-colors font-bold">
                                            <User size={18} className="text-[#00B4D8]" /> Sign In / Log In
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>

                        <Link to="/panier" className="flex flex-col items-center group relative pt-1">
                            <ShoppingCart size={20} className="text-slate-800 group-hover:text-[#00B4D8] transition-colors" />
                            <span className="text-[10px] font-bold text-slate-500 group-hover:text-[#00B4D8] uppercase mt-1">{t.cart}</span>
                            {cartItemCount > 0 && (
                                <span className="absolute top-0 right-0 bg-[#00B4D8] text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button 
                            className="lg:hidden text-slate-900 p-2 hover:bg-slate-50 rounded-2xl transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── MEGA MENU (Categories Overlay) ── */}
            <div 
                className={`absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-50 transition-all duration-500 z-40 overflow-hidden ${isCategoryMenuOpen ? 'h-[420px] opacity-100 pointer-events-auto' : 'h-0 opacity-0 pointer-events-none'}`}
                onMouseEnter={enterCategoryMenu}
                onMouseLeave={leaveCategoryMenu}
            >
                {/* Zellige Background for Mega Menu */}
                <div className="absolute inset-0 bg-zellige opacity-5 pointer-events-none" />
                
                <div className="container mx-auto px-8 py-12 relative z-10 h-full">
                    <div className="grid grid-cols-5 gap-8 h-full">
                        {categories.map((cat) => {
                            const meta = categoryMetaData[cat.id];
                            return (
                                <Link 
                                    key={cat.id} 
                                    to={`/catalog?category=${cat.id}`}
                                    onClick={() => setIsCategoryMenuOpen(false)}
                                    className={`group flex flex-col items-center text-center p-8 rounded-[40px] transition-all duration-500 border border-transparent hover:border-[#00B4D8]/20 hover:shadow-xl ${meta?.bg || 'bg-slate-50'}`}
                                >
                                    <div className={`w-20 h-20 rounded-3xl mb-6 flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${meta?.color || 'text-slate-800'} bg-white`}>
                                        {meta?.icon || <LayoutGrid size={24} />}
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">{cat.name}</h3>
                                    <p className="text-xs text-slate-500 font-bold max-w-[120px] leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">{meta?.desc}</p>
                                    
                                    <div className="mt-auto opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        <div className="w-10 h-10 bg-[#00B4D8] rounded-full flex items-center justify-center text-white">
                                            <ChevronDown size={18} className="-rotate-90" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile Menu (Overlay-style) */}
            <div className={`lg:hidden fixed inset-0 flex flex-col pt-24 pb-12 px-8 bg-white transition-transform duration-500 ease-in-out z-[45] ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col gap-8 overflow-y-auto">
                    <div className="space-y-4">
                        <p className="text-[10px] font-black text-[#00B4D8] uppercase tracking-[0.3em] mb-4">Our Categories</p>
                        <div className="grid grid-cols-1 gap-3">
                            {categories.map((cat) => (
                                <Link 
                                    key={cat.id} 
                                    to={`/catalog?category=${cat.id}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl group shadow-sm active:bg-[#CAF0F8]"
                                >
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                        {categoryMetaData[cat.id]?.icon || <LayoutGrid size={20} />}
                                    </div>
                                    <span className="font-bold text-slate-900">{cat.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-slate-100" />
                    
                    <Link to="/artisans" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-slate-900 flex items-center justify-between">
                        Nos Artisans <ChevronDown size={20} className="-rotate-90 text-slate-300" />
                    </Link>

                    <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-slate-900 flex items-center justify-between">
                        About Us <ChevronDown size={20} className="-rotate-90 text-slate-300" />
                    </Link>

                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold flex items-center gap-4 text-slate-800 bg-slate-50 p-6 rounded-[32px]">
                        <User size={24} className="text-[#00B4D8]" /> 
                        <div className="flex flex-col">
                            <span>Sign In</span>
                            <span className="text-[10px] text-slate-400">Manage your profile</span>
                        </div>
                    </Link>

                    <div className="mt-auto space-y-6">
                        <div className="flex items-center gap-3 text-slate-500 font-bold text-xs"><MapPin size={16} /> Marrakech, Morocco</div>
                        <div className="flex items-center gap-3 text-slate-500 font-bold text-xs"><Phone size={16} /> +212 5XX-XXXXXX</div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
