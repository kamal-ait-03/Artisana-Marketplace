import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const zelligeFooter = (
        <div className="absolute right-0 top-0 h-full w-48 opacity-15 pointer-events-none overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 100 200" fill="none" stroke="#00B4D8">
                <path d="M50 0 L100 50 L50 100 L0 50 Z M50 100 L100 150 L50 200 L0 150 Z" strokeWidth="1" />
                <circle cx="50" cy="50" r="10" />
                <circle cx="50" cy="150" r="10" />
                <path d="M0 100 L25 75 L50 100 L25 125 Z M75 75 L100 100 L75 125 L50 100 Z" strokeWidth="1" />
            </svg>
        </div>
    );

    return (
        <footer className="bg-slate-50 pt-20 pb-10 relative overflow-hidden">
            {/* Zellige Decorative Background Overlay */}
            {zelligeFooter}

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 px-4 md:px-0">
                    
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-12 h-12 bg-[#00B4D8] rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105 duration-300">
                                <svg width="24" height="24" viewBox="0 0 60 60" fill="currentColor">
                                    <path d="M30 0l15 15-15 15-15-15L30 0z M30 30l15 15-15 15-15-15L30 30z M0 30l15-15 15 15-15 15L0 30z M60 30l-15-15-15 15 15 15 15-15z" />
                                </svg>
                            </div>
                            <span className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">Artisana</span>
                        </Link>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                            Connecting you directly with Morocco's most talented artisans. We celebrate craftsmanship, heritage, and the soul of hand-made treasures.
                        </p>
                        <div className="flex items-center gap-4">
                            {/* Custom Social Icons for Facebook, IG, X */}
                            <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-[#00B4D8] hover:border-[#00B4D8] transition-all">
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-[#00B4D8] hover:border-[#00B4D8] transition-all">
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4.162 4.162 0 110-8.324 4.162 4.162 0 010 8.324zM18.406 4.406a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-[#00B4D8] hover:border-[#00B4D8] transition-all">
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-[#00B4D8] hover:border-[#00B4D8] transition-all">
                                <MessageSquare size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-slate-900 relative">
                            Quick Links
                            <span className="absolute left-0 -bottom-1.5 w-8 h-1 bg-[#00B4D8] rounded-full" />
                        </h4>
                        <nav className="flex flex-col gap-4">
                            <Link to="/" className="text-slate-500 font-medium hover:text-[#00B4D8] transition-colors">Home</Link>
                            <Link to="/catalogue" className="text-slate-500 font-medium hover:text-[#00B4D8] transition-colors">Products</Link>
                            <Link to="/artisans" className="text-slate-500 font-medium hover:text-[#00B4D8] transition-colors">Artisans</Link>
                            <Link to="/about" className="text-slate-500 font-medium hover:text-[#00B4D8] transition-colors">Our Story</Link>
                        </nav>
                    </div>

                    {/* Shop Categories */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-slate-900 relative">
                            Shop All
                            <span className="absolute left-0 -bottom-1.5 w-8 h-1 bg-[#00B4D8] rounded-full" />
                        </h4>
                        <nav className="flex flex-col gap-4">
                            <Link to="/catalogue?category=carpets" className="text-slate-500 font-medium hover:text-[#00B4D8] transition-colors">Carpets</Link>
                            <Link to="/catalogue?category=pottery" className="text-slate-500 font-medium hover:text-[#00B4D8] transition-colors">Pottery</Link>
                            <Link to="/catalogue?category=leather" className="text-slate-500 font-medium hover:text-[#00B4D8] transition-colors">Leather Goods</Link>
                            <Link to="/catalogue?category=clothing" className="text-slate-500 font-medium hover:text-[#00B4D8] transition-colors">Clothing</Link>
                        </nav>
                    </div>

                    {/* Support / Contact */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-slate-900 relative">
                            Support
                            <span className="absolute left-0 -bottom-1.5 w-8 h-1 bg-[#00B4D8] rounded-full" />
                        </h4>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-[#CAF0F8] text-[#0077B6] rounded-xl flex-shrink-0 flex items-center justify-center"><MapPin size={20} /></div>
                                <div className="text-slate-500 font-medium text-sm pt-2">Marrakech Medina, Morocco</div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-[#CAF0F8] text-[#0077B6] rounded-xl flex-shrink-0 flex items-center justify-center"><Phone size={20} /></div>
                                <div className="text-slate-500 font-medium text-sm pt-2">+212 524 XXX-XXX</div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-[#CAF0F8] text-[#0077B6] rounded-xl flex-shrink-0 flex items-center justify-center"><Mail size={20} /></div>
                                <div className="text-slate-500 font-medium text-sm pt-2">hello@artisana.ma</div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-400 font-medium text-sm">© {currentYear} Artisana. Hand-crafted with passion in Morocco.</p>
                    <div className="flex items-center gap-6">
                        <Link to="/privacy" className="text-slate-400 font-medium text-sm hover:text-slate-600">Privacy Policy</Link>
                        <Link to="/terms" className="text-slate-400 font-medium text-sm hover:text-slate-600">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
