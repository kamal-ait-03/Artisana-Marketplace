import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { artisans, mockProducts } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { MapPin, Star, Package, ShoppingBag, MessageCircle, ArrowLeft } from 'lucide-react';

const ArtisanProfilePage = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [artisanProducts, setArtisanProducts] = useState([]);

  useEffect(() => {
    const foundArtisan = artisans.find(a => a.id === id);
    if (foundArtisan) {
      setArtisan(foundArtisan);
      const products = mockProducts.filter(p => p.artisan.id === id);
      setArtisanProducts(products);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!artisan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Artisan non trouvé</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="relative h-64 md:h-80 bg-[#00BCD4] overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-zellige pointer-events-none" />
        <Link 
          to="/artisans" 
          className="absolute top-28 left-4 md:left-8 flex items-center gap-2 text-white font-bold bg-black/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/30 transition-all z-10"
        >
          <ArrowLeft size={18} /> Back
        </Link>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        {/* Profile Card */}
        <div className="relative -mt-32 bg-white rounded-[40px] shadow-xl p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <img 
              src={artisan.avatar} 
              alt={artisan.name} 
              className="w-32 h-32 md:w-48 md:h-48 rounded-[32px] object-cover border-8 border-white shadow-2xl"
            />
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="font-heading text-4xl md:text-5xl font-black text-slate-900">{artisan.name}</h1>
                <span className="bg-cyan-50 text-[#00BCD4] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-cyan-100">
                  {artisan.specialty}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-slate-500 font-bold mb-6">
                <div className="flex items-center gap-1.5">
                  <MapPin size={18} className="text-[#00BCD4]" />
                  <span>{artisan.city}, Maroc</span>
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Star size={18} fill="currentColor" />
                  <span className="text-slate-900">{artisan.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-50 px-6 py-4 rounded-3xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-[#00BCD4] shadow-sm">
                    <Package size={20} />
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900">{artisanProducts.length}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Products</p>
                  </div>
                </div>

                <div className="bg-slate-50 px-6 py-4 rounded-3xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-[#00BCD4] shadow-sm">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900">{artisan.sales}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ventes</p>
                  </div>
                </div>

                <a 
                  href={`https://wa.me/${artisan.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto bg-[#25D366] text-white px-8 py-4 rounded-3xl font-black flex items-center gap-3 shadow-lg hover:translate-y-[-4px] transition-all"
                >
                  <MessageCircle size={24} /> Contactez-moi
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-slate-100">
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Mon histoire</h2>
            <div className="max-w-3xl">
              <p className="text-slate-600 leading-relaxed text-lg italic border-l-4 border-[#00BCD4] pl-6 py-2">
                "{artisan.bio}"
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-3xl font-black text-slate-900">My Creations</h2>
            <div className="h-1 flex-1 bg-slate-100 mx-8 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {artisanProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfilePage;
