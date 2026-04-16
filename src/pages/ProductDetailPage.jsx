import { useCurrency } from '../context/CurrencyContext';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import CategoryBadge from '../components/CategoryBadge';
import { Star, Minus, Plus, ShoppingCart, CreditCard, ChevronDown, ChevronUp, Truck, ShieldCheck, MapPin, MessageCircle, ExternalLink } from 'lucide-react';

const ProductDetailPage = () => {
  const { formatPrice, currency } = useCurrency();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [qty, setQty] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('description'); // 'description' or 'shipping'
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    // Find product
    const found = mockProducts.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setMainImage(found.images[0]);
      
      // Get similar products (same category, different ID)
      const similar = mockProducts
        .filter(p => p.category === found.category && p.id !== found.id)
        .slice(0, 4);
      
      // If not enough similar, pad with others
      if (similar.length < 4) {
        const padding = mockProducts
          .filter(p => p.id !== found.id && !similar.includes(p))
          .slice(0, 4 - similar.length);
        setSimilarProducts([...similar, ...padding]);
      } else {
        setSimilarProducts(similar);
      }
      window.scrollTo(0, 0);
    } else {
      navigate('/404'); // Product not found
    }
  }, [id, navigate]);

  if (!product) return <div className="min-h-screen"></div>;

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate('/checkout');
  };

  return (
    <div className="bg-[var(--color-bg)] min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Breadcrumb could go here */}
        <div className="text-sm text-gray-500 mb-8 font-body">
          Home / {product.category} / <span className="text-[var(--color-text)]">{product.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          
          {/* Image Gallery */}
          <div className="md:w-1/2 space-y-4">
            <div className="aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl bg-white shadow-warm">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 easy-out hover:scale-110 cursor-zoom-in"
                onError={(e) => {
                  e.target.onerror = null;
                  const map = {
                    pottery: 'photo-1594736797933-d0501ba2fe65',
                    leather: 'photo-1548036328-c9fa89d128fa',
                    clothing: 'photo-1558618666-fcd25c85cd64',
                    beauty: 'photo-1608248543803-ba4f8c70ae0b',
                    carpets: 'photo-1600166898405-da9535204843',
                    decoration: 'photo-1565193566173-7a0ee3dbe261'
                  };
                  const id = map[product.category] || 'photo-1594736797933-d0501ba2fe65';
                  e.target.src = `https://images.unsplash.com/${id}?w=400&q=80`;
                }}
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                    mainImage === img ? 'border-[var(--color-primary)] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Panel */}
          <div className="md:w-1/2 flex flex-col justify-center">
            
            <div className="mb-4">
               <CategoryBadge category={product.category} className="text-sm py-1.5 px-3" />
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] leading-tight mb-2">
              {product.name}
            </h1>
            {product.nameAr && (
              <h2 className="font-body text-xl md:text-2xl text-gray-400 mb-4 font-semibold w-full text-right" dir="rtl">
                {product.nameAr}
              </h2>
            )}

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center text-[var(--color-secondary)]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                ))}
                <span className="text-gray-600 font-body text-sm ml-2">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Artisan Info Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8 border-l-4 border-l-[var(--color-primary)]">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={product.artisan.avatar} 
                  alt={product.artisan.name} 
                  className="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-white" 
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-heading font-bold text-xl text-slate-900">{product.artisan.name}</h3>
                      <p className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-1">{product.artisan.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                      <Star size={14} className="text-amber-500" fill="currentColor" />
                      <span className="text-xs font-bold text-amber-700">{product.artisan.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1 font-medium">
                    <MapPin size={12} className="text-[var(--color-primary)]" /> {product.artisan.city}, Morocco
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-6 leading-relaxed bg-slate-50 p-3 rounded-xl italic">
                "{product.artisan.bio}"
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => navigate(`/artisans/${product.artisan.id}`)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-bold hover:bg-[var(--color-primary)] hover:text-white transition-all"
                >
                  <ExternalLink size={16} /> View Their Products
                </button>
                <a 
                  href={`https://wa.me/${product.artisan.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-bold hover:opacity-90 transition-all shadow-sm"
                >
                  <MessageCircle size={16} /> Contact WhatsApp
                </a>
              </div>
            </div>

            <div className="mb-10">
              <span className="font-heading text-5xl font-bold text-slate-900">
                {formatPrice(product.price)}
              </span>
              <p className="text-sm text-gray-500 mt-1">Taxes included. Available stock: <span className="font-medium text-green-600">{product.stock} units</span></p>
            </div>

            {/* Actions */}
            <div className="space-y-4 mb-10">
              <div className="flex gap-4">
                {/* Quantity */}
                <div className="flex items-center border-2 border-gray-200 rounded-lg bg-white overflow-hidden h-14">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 text-gray-500 hover:text-[var(--color-primary)] transition-colors h-full flex items-center">
                    <Minus size={20} />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{qty}</span>
                  <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-4 text-gray-500 hover:text-[var(--color-primary)] transition-colors h-full flex items-center">
                    <Plus size={20} />
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-[var(--color-primary)] text-white h-14 rounded-lg font-bold flex items-center justify-center gap-2 shadow-warm hover:opacity-90 transition-opacity"
                >
                  <ShoppingCart size={20} /> Add to Cart
                </button>
              </div>
              
              <button 
                onClick={handleBuyNow}
                className="w-full h-14 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[var(--color-primary)] hover:text-white transition-colors"
              >
                <CreditCard size={20} /> Buy Now
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              
              {/* Description */}
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'description' ? '' : 'description')}
                  className="w-full flex justify-between items-center p-4 font-bold text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span>Product Description</span>
                  {activeAccordion === 'description' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {activeAccordion === 'description' && (
                  <div className="p-4 bg-white font-body text-gray-600 leading-relaxed border-t border-gray-100 page-enter">
                    {product.description}
                  </div>
                )}
              </div>

              {/* Shipping */}
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')}
                  className="w-full flex justify-between items-center p-4 font-bold text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="flex items-center gap-2"><Truck size={18} /> Shipping & Returns</span>
                  {activeAccordion === 'shipping' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="p-4 bg-white space-y-4 border-t border-gray-100 page-enter">
                    <div className="flex gap-3">
                      <Truck size={20} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-sm">Shipping across Morocco (2-5 days)</p>
                        <p className="text-sm text-gray-600">Secure packaging to protect craftsmanship.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <ShieldCheck size={20} className="text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-sm">Authenticity Guaranteed</p>
                        <p className="text-sm text-gray-600">Product certified 100% handmade by the artisan.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-24">
          <div className="text-center mb-10">
            <h3 className="font-heading text-3xl font-bold text-[var(--color-text)] mb-4">Similar Products</h3>
            <div className="h-1 w-16 bg-[var(--color-secondary)] mx-auto rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;
