import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { categories, mockProducts, artisans } from '../data/mockData';
import { ArrowRight, Star, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';

import potteryImg from '../assets/categories/pottery.jpg';
import leatherImg from '../assets/categories/leather.jpg';

import img1 from '../assets/craftsmen/pottery-painter.jpg';
import img2 from '../assets/craftsmen/carpet-weaver.jpg';
import img3 from '../assets/craftsmen/metal-engraver.jpg';
import img4 from '../assets/craftsmen/wood-carver.jpg';
import img5 from '../assets/craftsmen/pottery-wheel.jpg';

const slides = [
  { src: img1, caption: 'Traditional Pottery of Safi' },
  { src: img2, caption: 'Hand-Woven Berber Carpet' },
  { src: img3, caption: 'Moroccan Metal Engraving' },
  { src: img4, caption: 'Artisanal Wood Carving' },
  { src: img5, caption: 'Moroccan Ceramics' },
];

const HomePage = () => {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [kenKey, setKenKey] = useState(0);

    const featuredProducts = mockProducts.filter(p => p.isFeatured).slice(0, 8);
    const homeArtisans = artisans.slice(0, 3);

    const categoryImages = {
        pottery:    potteryImg,
        leather:    leatherImg,
        clothing:   'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=80',
        beauty:     'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&q=80',
        carpets:    'https://images.unsplash.com/photo-1600166898405-da9535204843?w=200&q=80',
        decoration: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=200&q=80',
    };

    const ZelligeBackground = ({ className = '' }) => (
        <div className={`absolute inset-0 bg-zellige opacity-10 pointer-events-none ${className}`} />
    );

    // ── Auto-advance every 3.5 seconds, pause on hover ──
    useEffect(() => {
        if (paused) return;
        const interval = setInterval(() => {
            setActive(prev => (prev + 1) % slides.length);
            setKenKey(k => k + 1);
        }, 3500);
        return () => clearInterval(interval);
    }, [paused]);

    const goTo = (idx) => {
        setActive(idx);
        setKenKey(k => k + 1);
    };

    return (
        <div className="bg-white min-h-screen overflow-x-hidden pt-20">

            {/* ══ HERO ══ */}
            <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden bg-white">
                <ZelligeBackground className="bg-[length:200px_200px]" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-zellige opacity-10 pointer-events-none" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#CAF0F8] rounded-full blur-3xl opacity-30" />
                <div className="absolute top-1/2 -left-24 w-64 h-64 bg-[#00B4D8] rounded-full blur-3xl opacity-10" />

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                        {/* ── Left text ── */}
                        <div className="w-full lg:w-1/2 space-y-8 animate-fade-in">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#CAF0F8] rounded-full text-[#0077B6] font-bold text-xs uppercase tracking-wider">
                                <Star size={14} fill="currentColor" /> Authentic Moroccan Marketplace
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
                                Handcrafted <span className="text-[#00B4D8]">Treasures</span> From Morocco.
                            </h1>

                            <p className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed">
                                Join our community of artisans and discover unique, high-quality products from Pottery to premium Leather, delivered directly to your doorstep.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Link to="/catalog" className="btn-primary w-full sm:w-auto text-center shadow-lg hover:translate-y-[-2px]">
                                    Shop Now
                                </Link>
                                <Link to="/about" className="btn-outline w-full sm:w-auto text-center hover:translate-y-[-2px]">
                                    Learn More
                                </Link>
                            </div>

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

                        {/* ── Right: Cinematic Carousel ── */}
                        <div className="w-full lg:w-1/2 relative">

                            {/* Carousel frame */}
                            <div
                                className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl"
                                style={{ aspectRatio: '4/5' }}
                                onMouseEnter={() => setPaused(true)}
                                onMouseLeave={() => setPaused(false)}
                            >
                                {/* All slides stacked — crossfade via opacity */}
                                {slides.map((slide, i) => (
                                    <div
                                        key={i}
                                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                            i === active ? 'opacity-100' : 'opacity-0'
                                        }`}
                                        style={{ zIndex: i === active ? 2 : 1 }}
                                    >
                                        {/* Ken Burns zoom — re-keyed on every slide change */}
                                        <img
                                            key={`img-${i}-${kenKey}`}
                                            src={slide.src}
                                            alt={slide.caption}
                                            className="w-full h-full object-cover animate-kenburns"
                                        />
                                        {/* Cinematic dark-bottom gradient */}
                                        <div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.12) 45%, transparent 100%)',
                                            }}
                                        />
                                    </div>
                                ))}

                                {/* ── Bottom caption card ── */}
                                <div className="absolute bottom-6 left-6 right-6 z-10 bg-white/90 backdrop-blur-md p-5 rounded-[20px] shadow-lg flex items-center justify-between border border-white/50">
                                    <div>
                                        <p className="text-xs font-bold text-[#00B4D8] uppercase tracking-widest mb-0.5">
                                            Featured Collection
                                        </p>
                                        <h3 className="text-lg font-bold text-slate-900 leading-tight">
                                            {slides[active].caption}
                                        </h3>
                                    </div>
                                    <div className="w-10 h-10 bg-[#00B4D8] rounded-full flex items-center justify-center text-white shrink-0 ml-4">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>

                                {/* ── Slide counter ── */}
                                <div className="absolute top-5 right-5 z-10 bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {active + 1} / {slides.length}
                                </div>
                            </div>

                            {/* ── Navigation dots ── */}
                            <div className="flex items-center justify-center gap-2 mt-5">
                                {slides.map((_, i) => (
                                    <button
                                        key={i}
                                        id={`hero-dot-${i}`}
                                        onClick={() => goTo(i)}
                                        aria-label={`Go to slide ${i + 1}`}
                                        style={{
                                            width: i === active ? '32px' : '8px',
                                            height: '8px',
                                            borderRadius: '9999px',
                                            backgroundColor: i === active ? '#00BCD4' : '#cbd5e1',
                                            transition: 'all 0.35s ease',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: 0,
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Floating geometric decor */}
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#CAF0F8] rounded-full -z-10 animate-pulse" />
                            <div className="absolute top-20 -right-8 w-24 h-24 bg-[#90E0EF] rounded-[20px] rotate-12 -z-10 opacity-50" />
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#00B4D8]/10 rounded-full -z-10" />


                        </div>
                    </div>
                </div>
            </section>

            {/* ══ CATEGORIES ══ */}
            <section className="py-20 bg-slate-50/50 relative overflow-hidden">
                <div className="absolute left-0 bottom-0 w-32 h-64 bg-zellige opacity-5 pointer-events-none" />
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Focus Categories</h2>
                            <p className="text-slate-500 font-medium">From the soul of Pottery to the craftsmanship of Leather and Carpets.</p>
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
                                <div className="w-20 h-20 rounded-2xl shadow-sm overflow-hidden shrink-0">
                                    <img src={categoryImages[cat.id]} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <h3 className="font-bold text-slate-800 text-lg">{cat.nameEn || cat.name}</h3>
                                <p className="text-xs text-slate-400 font-medium">Browse Collection</p>
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

            {/* ══ FEATURED PRODUCTS ══ */}
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
                        <Link to="/catalog" className="btn-outline hover:translate-y-[-2px] transition-transform">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* ══ ARTISANS ══ */}
            <section className="py-24 bg-slate-50/50">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="max-w-xl">
                            <span className="text-[#00BCD4] font-bold text-xs uppercase tracking-widest">The Guardians of Craftsmanship</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-4 tracking-tight">Meet Our Artisans</h2>
                            <p className="text-slate-500 font-medium leading-relaxed mt-4">Discover the faces and stories behind each unique creation of our collection.</p>
                        </div>
                        <Link to="/artisans" className="bg-[#00BCD4] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-[#0097a7] transition-all shadow-lg">
                            See all artisans <ArrowRight size={18} />
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
                                    <span className="flex items-center gap-1">
                                        <Star size={14} className="text-amber-500" fill="currentColor" /> {artisan.rating}
                                    </span>
                                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                    <span>{artisan.city}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ WHY US ══ */}
            <section className="py-24 bg-[#00B4D8] rounded-[60px] mx-4 md:mx-8 mb-24 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-zellige opacity-10 pointer-events-none invert" />
                <div className="container mx-auto px-8 relative z-10">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { Icon: Truck,        title: 'Fast Delivery',   body: 'Safe and reliable shipping to over 20 countries worldwide.' },
                            { Icon: ShieldCheck,  title: 'Secure Payment',  body: 'Encrypted transactions via global leading payment providers.' },
                            { Icon: ShoppingBag,  title: 'Local Support',   body: 'Direct contribution to the wellbeing of Moroccan artisans.' },
                        ].map(({ Icon, title, body }) => (
                            <div key={title} className="flex flex-col items-center text-center text-white space-y-4">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-2">
                                    <Icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold">{title}</h3>
                                <p className="text-white/80 text-sm">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ NEWSLETTER ══ */}
            <section className="pb-32 bg-white relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-[#CAF0F8] rounded-full blur-3xl opacity-30 mt-20" />
                <div className="container mx-auto px-4 md:px-24">
                    <div className="bg-slate-900 rounded-[50px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
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
