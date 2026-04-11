import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Package, ArrowRight, Filter } from 'lucide-react';
import { artisans, mockProducts } from '../data/mockData';

const cities = ['All', 'Marrakech', 'Fez', 'Safi', 'Tetouan', 'Agadir', 'Chefchaouen'];

const ArtisansPage = () => {
  const [selectedCity, setSelectedCity] = useState('All');

  const processedArtisans = artisans.map(a => ({
    ...a,
    productCount: mockProducts.filter(p => p.artisan.id === a.id).length,
    // Add decorative details consistent with the original design
    coverColor: a.id === 'a1' ? 'from-amber-800 to-amber-600' : 
                a.id === 'a2' ? 'from-red-900 to-red-700' :
                a.id === 'a3' ? 'from-stone-800 to-stone-600' :
                a.id === 'a4' ? 'from-teal-800 to-teal-600' :
                'from-indigo-900 to-indigo-700',
    badge: a.rating >= 4.9 ? 'Master Artisan' : 'Qualified Artisan'
  }));

  const filtered = selectedCity === 'All'
    ? processedArtisans
    : processedArtisans.filter(a => a.city === selectedCity);

  return (
    <div className="bg-slate-50 min-h-screen pt-20">

      {/* Hero */}
      <section className="relative bg-[#00BCD4] text-white pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-zellige pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <span className="font-bold text-white/80 tracking-widest uppercase text-xs mb-4 block">
            The Guardians of Craftsmanship
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-black mb-6">
            Our Artisans
          </h1>
          <p className="font-body text-white/90 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Behind each creation, there is a story, a city, a family. Discover the master artisans who bring Moroccan culture to life.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-slate-100 py-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3 gap-6 text-center max-w-2xl mx-auto">
            {[
              { value: '500+', label: 'Active Artisans' },
              { value: '12', label: 'Citys du Morocco' },
              { value: '2 000+', label: 'Unique Creations' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-heading text-3xl font-black text-slate-900">{stat.value}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter by city */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-2 text-slate-400 mr-4">
              <Filter size={18} />
              <span className="text-sm font-bold uppercase tracking-widest">Filter by city:</span>
            </div>
            {cities.map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  selectedCity === city
                    ? 'bg-[#00BCD4] text-white shadow-lg scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-[#00BCD4] hover:text-[#00BCD4]'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Cards Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map(artisan => (
              <div
                key={artisan.id}
                className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border border-slate-100"
              >
                {/* Cover gradient */}
                <div className={`h-36 bg-gradient-to-br ${artisan.coverColor} relative`}>
                  <div className="absolute inset-0 opacity-20 bg-zellige" />
                  {/* Badge */}
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#00BCD4] text-[10px] font-black px-3 py-1.5 rounded-full tracking-wider uppercase shadow-sm">
                    {artisan.badge}
                  </span>
                </div>

                {/* Avatar */}
                <div className="px-8 -mt-12 relative z-10 text-center md:text-left">
                  <img
                    src={artisan.avatar}
                    alt={artisan.name}
                    className="w-24 h-24 rounded-[32px] object-cover border-4 border-white shadow-xl mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="px-8 pt-4 pb-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="font-heading text-2xl font-black text-slate-900 group-hover:text-[#00BCD4] transition-colors">{artisan.name}</h2>
                      <p className="text-[10px] text-[#00BCD4] font-black uppercase tracking-[0.2em] mt-1">{artisan.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold">{artisan.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-400 text-sm mb-4">
                    <MapPin size={14} className="text-[#00BCD4]" />
                    <span className="font-bold">{artisan.city}, Morocco</span>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 bg-slate-50 p-4 rounded-2xl italic">
                    "{artisan.bio}"
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-slate-900 font-black text-sm">{artisan.productCount}</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Products</span>
                      </div>
                      <div className="w-px h-6 bg-slate-100" />
                      <div className="flex flex-col">
                        <span className="text-slate-900 font-black text-sm">{artisan.sales}</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Sales</span>
                      </div>
                    </div>
                    <Link
                      to={`/artisans/${artisan.id}`}
                      className="bg-[#00BCD4] text-white p-3 rounded-2xl shadow-lg hover:shadow-cyan-200 transition-all flex items-center justify-center group-hover:translate-x-2"
                    >
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-32">
              <div className="text-6xl mb-6">🐪</div>
              <h3 className="text-2xl font-black text-slate-400">No artisans found in this city</h3>
            </div>
          )}
        </div>
      </section>

      {/* CTA — Rejoindre */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden mx-4 md:mx-8 rounded-[60px] mb-24">
        <div className="absolute inset-0 opacity-10 bg-zellige pointer-events-none invert" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-black mb-6">Are You an Artisan?</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto font-medium">
            Join Artisana Shop and showcase your expertise to the world. Benefit from personalized support and international visibility.
          </p>
          <Link
            to="/register"
            className="inline-block bg-[#00BCD4] text-white px-12 py-5 rounded-full font-black hover:bg-[#0097a7] transition-all shadow-xl hover:translate-y-[-4px]"
          >
            Become a Seller on Artisana
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ArtisansPage;
