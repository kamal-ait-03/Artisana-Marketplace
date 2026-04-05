import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { categories, mockProducts, artisans } from '../data/mockData';
import { ArrowRight, Star, ShoppingBag, Truck, ShieldCheck, Heart } from 'lucide-react';

const HomePage = () => {
    const featuredProducts = mockProducts.filter(p => p.isFeatured).slice(0, 8);

    const categoryIcons = {
        pottery: '🏺',
        leather: '💼',
        clothing: '👕',
        beauty: '🌿',
        carpets: '🟤',
        decoration: '🏠',
    };

    const homeArtisans = artisans.slice(0, 3);

    const ZelligeBackground = ({ className = "" }) => (
        <div className={`absolute inset-0 bg-zellige opacity-10 pointer-events-none ${className}`} />
    );

    return (
        <div className="bg-white min-h-screen overflow-x-hidden pt-10">
            
            {/* ── HERO SECTION (Dribbble Layout) ── */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
                {/* Background Decor (Zellige & Circles) */}
                <ZelligeBackground className="bg-[length:200px_200px]" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-zellige opacity-10 pointer-events-none" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#CAF0F8] rounded-full blur-3xl opacity-30" />
                <div className="absolute top-1/2 -left-24 w-64 h-64 bg-[#00B4D8] rounded-full blur-3xl opacity-10" />

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        
                        {/* Left Content */}
                        <div className="w-full lg:w-1/2 space-y-8 animate-fade-in">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#CAF0F8] rounded-full text-[#0077B6] font-bold text-xs uppercase tracking-wider">
                                <Star size={14} fill="currentColor" /> Authentic Moroccan Marketplace
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
                                Handcrafted <span className="text-[#00B4D8]">Treasures</span> From Morocco.
                            </h1>
                            
                            <p className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed">
                                Join our community of artisans and discover unique, high-quality products from Poetry to premium Leather, delivered directly to your doorstep.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Link to="/catalog" className="btn-primary w-full sm:w-auto text-center shadow-lg hover:translate-y-[-2px]">
                                    Shop Now
                                </Link>
                                <Link to="/about" className="btn-outline w-full sm:w-auto text-center hover:translate-y-[-2px]">
                                    Learn More
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex items-center gap-8 pt-6 border-t border-slate-100">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-slate-900">24k+</span>
                                    <span className="text-xs text-slate-400 font-bold uppercase">Products Sold</span>
                                </div>
                                <div className="w-px h-10 bg-slate-100" />
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-slate-900">500+</span>
                                    <span className="text-xs text-slate-400 font-bold uppercase">Local Artisans</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Image (Musemind Style) */}
                        <div className="w-full lg:w-1/2 relative group">
                            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                                <img 
                                    src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80" 
                                    alt="Moroccan Artisanship" 
                                    className="w-full aspect-[4/5] object-cover"
                                />
                                {/* Overlay Card */}
                                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-[24px] shadow-lg flex items-center justify-between border border-white/50">
                                    <div>
                                        <p className="text-xs font-bold text-[#00B4D8] uppercase tracking-widest">Featured Collection</p>
                                        <h3 className="text-xl font-bold text-slate-900">Traditional Leather Fine Art</h3>
                                    </div>
                                    <div className="w-12 h-12 bg-[#00B4D8] rounded-full flex items-center justify-center text-white">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Geometric Elements */}
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#CAF0F8] rounded-full -z-10 animate-pulse" />
                            <div className="absolute top-20 -right-8 w-24 h-24 bg-[#90E0EF] rounded-[20px] rotate-12 -z-10 opacity-50" />
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#00B4D8]/10 rounded-full -z-10" />
                            
                            {/* Smaller Item Card */}
                            <div className="absolute -left-12 bottom-20 hidden xl:flex bg-white p-4 rounded-2xl shadow-xl items-center gap-4 border border-slate-50">
                                <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Popular</p>
                                    <p className="text-sm font-extrabold text-slate-800">Leather Travel Bag</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CATEGORIES (Musemind Style Icons/Cards) ── */}
            <section className="py-20 bg-slate-50/50 relative overflow-hidden">
                <div className="absolute left-0 bottom-0 w-32 h-64 bg-zellige opacity-5 pointer-events-none" />
                
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Focus Categories</h2>
                            <p className="text-slate-500 font-medium">From the soul of Poetry to the craftsmanship of Leather and Carpets.</p>
                        </div>
                        <Link to="/catalog" className="text-[#00B4D8] font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
                            See All Collections <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
                        {categories.map((cat) => (
                            <Link 
                                key={cat.id} 
                                to={`/catalog?category=${cat.id}`}
                                className="group relative bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#00B4D8]/20 transition-all duration-300 flex flex-col items-center text-center gap-4"
                            >
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl transition-colors group-hover:bg-[#CAF0F8]">
                                    {categoryIcons[cat.id]}
                                </div>
                                <h3 className="font-bold text-slate-800 text-lg">{cat.nameEn || cat.name}</h3>
                                <p className="text-xs text-slate-400 font-medium">Browse Collection</p>
                                
                                {/* Hover Indicator */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-8 h-8 bg-[#00B4D8] rounded-full flex items-center justify-center text-white">
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURED PRODUCTS (Dribbble Layout) ── */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <span className="text-[#00B4D8] font-bold text-xs uppercase tracking-widest">Our Selection</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Our Treasures</h2>
                        <p className="text-slate-500 font-medium leading-relaxed">Discover the most popular handcrafted pieces currently available in our marketplace.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    
                    <div className="mt-16 text-center">
                        <Link to="/catalogue" className="btn-outline hover:translate-y-[-2px] transition-transform">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── ARTISANS SECTION (New) ── */}
            <section className="py-24 bg-slate-50/50">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="max-w-xl">
                            <span className="text-[#00BCD4] font-bold text-xs uppercase tracking-widest">Les Gardiens du Savoir-Faire</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-4 tracking-tight">Rencontrez Nos Artisans</h2>
                            <p className="text-slate-500 font-medium leading-relaxed mt-4">Découvrez les visages et les histoires derrière chaque création unique de notre collection.</p>
                        </div>
                        <Link to="/artisans" className="bg-[#00BCD4] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-[#0097a7] transition-all shadow-lg">
                            Voir tous les artisans <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {homeArtisans.map((artisan) => (
                            <Link 
                                key={artisan.id} 
                                to={`/artisans/${artisan.id}`}
                                className="group bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-[#00BCD4]/20 transition-all duration-500 flex flex-col items-center text-center"
                            >
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-[#00BCD4] rounded-[32px] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20" />
                                    <img 
                                        src={artisan.avatar} 
                                        alt={artisan.name} 
                                        className="w-32 h-32 md:w-40 md:h-40 rounded-[32px] object-cover relative z-10 border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">{artisan.name}</h3>
                                <p className="text-[#00BCD4] font-bold text-xs uppercase tracking-widest mb-4">{artisan.specialty}</p>
                                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-6 font-medium bg-slate-50 p-4 rounded-2xl italic">
                                    "{artisan.bio}"
                                </p>
                                <div className="flex items-center gap-4 text-slate-400 text-xs font-bold">
                                    <span className="flex items-center gap-1"><Star size={14} className="text-amber-500" fill="currentColor" /> {artisan.rating}</span>
                                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                    <span>{artisan.city}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES / WHY US ── */}
            <section className="py-24 bg-[#00B4D8] rounded-[60px] mx-4 md:mx-8 mb-24 relative overflow-hidden">
                {/* Zellige Decorative BG */}
                <div className="absolute right-0 top-0 w-1/3 h-full bg-zellige opacity-10 pointer-events-none invert" />
                
                <div className="container mx-auto px-8 relative z-10">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center text-center text-white space-y-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-2">
                                <Truck size={32} />
                            </div>
                            <h3 className="text-xl font-bold">Fast Delivery</h3>
                            <p className="text-white/80 text-sm">Safe and reliable shipping to over 20 countries worldwide.</p>
                        </div>
                        <div className="flex flex-col items-center text-center text-white space-y-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-2">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-xl font-bold">Secure Payment</h3>
                            <p className="text-white/80 text-sm">Encrypted transactions via global leading payment providers.</p>
                        </div>
                        <div className="flex flex-col items-center text-center text-white space-y-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-2">
                                <ShoppingBag size={32} />
                            </div>
                            <h3 className="text-xl font-bold">Local Support</h3>
                            <p className="text-white/80 text-sm">Direct contribution to the wellbeing of Moroccan artisans.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── NEWSLETTER (Musemind Style) ── */}
            <section className="pb-32 bg-white relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-[#CAF0F8] rounded-full blur-3xl opacity-30 mt-20" />
                
                <div className="container mx-auto px-4 md:px-24">
                    <div className="bg-slate-900 rounded-[50px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
                        {/* Subtle Zellige Overlay */}
                        <div className="absolute left-0 bottom-0 w-32 h-full bg-zellige opacity-5 pointer-events-none invert" />
                        
                        <div className="max-w-md relative z-10 text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Stay Updated!</h2>
                            <p className="text-slate-400 font-medium">Join our newsletter to receive the latest updates, stories from our artisans, and exclusive deals.</p>
                        </div>
                        
                        <div className="w-full max-w-lg relative z-10">
                            <div className="bg-slate-800 p-2 rounded-full flex items-center">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email address" 
                                    className="bg-transparent border-none focus:ring-0 text-white px-6 w-full font-medium"
                                />
                                <button className="bg-[#00B4D8] text-white px-8 py-4 rounded-full font-bold hover:bg-[#0077B6] transition-colors whitespace-nowrap">
                                    Subscribe Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
