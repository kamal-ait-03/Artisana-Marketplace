import { useCurrency } from '../context/CurrencyContext';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  const { formatPrice, currency } = useCurrency();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    const handleViewArtisan = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/artisans/${product.artisan.id}`);
    };

    return (
        <Link
            to={`/product/${product.id}`}
            className="group block bg-white rounded-[32px] overflow-hidden shadow-card transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px] border border-slate-50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container (Dribbble style: Rounded + Background) */}
            <div className="relative aspect-square m-4 rounded-[24px] overflow-hidden bg-slate-50 border border-slate-100 group-hover:bg-[#CAF0F8] transition-colors duration-500">
                <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover p-2 rounded-[24px] transition-transform duration-700 group-hover:scale-110"
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
                
                {/* Wishlist Button (Circle pill) */}
                <button 
                   onClick={handleWishlist}
                   className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
                    ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-slate-400 hover:text-red-500'}`}
                >
                    <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                </button>

                {/* Badge Overlay */}
                {product.isNew && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#00B4D8] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      New
                    </span>
                  </div>
                )}

                {/* Quick Add Overlay */}
                <div className={`absolute inset-x-0 bottom-4 px-4 transition-all duration-500 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <button 
                        onClick={handleAddToCart}
                        className="w-full bg-white text-slate-900 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:bg-slate-900 hover:text-white transition-all transform active:scale-95"
                    >
                        <ShoppingCart size={18} /> Add to Cart
                    </button>
                </div>
            </div>

            {/* Info Section */}
            <div className="px-6 pb-6 pt-2">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-[#00B4D8] transition-colors duration-300">
                        {product.name}
                    </h3>
                    <div className="flex items-center gap-1 font-bold text-slate-900 whitespace-nowrap">
                        {formatPrice(product.price)}
                    </div>
                </div>
                
                <div 
                    onClick={handleViewArtisan}
                    className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity cursor-pointer group/artisan"
                >
                    <img 
                        src={product.artisan.avatar} 
                        alt={product.artisan.name} 
                        className="w-6 h-6 rounded-full object-cover border border-slate-100"
                    />
                    <span className="text-xs font-bold text-slate-600 group-hover/artisan:text-[#00B4D8] transition-colors">
                        {product.artisan.name}
                    </span>
                    <span className="text-[10px] text-slate-300">•</span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        {product.category}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <Star size={14} className="text-[#00B4D8]" fill="currentColor" />
                        <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                        <span className="text-xs text-slate-400 font-medium">({product.reviews || 0})</span>
                    </div>
                    
                    <button 
                        onClick={handleViewArtisan}
                        className="text-[10px] font-bold text-[#00B4D8] hover:underline flex items-center gap-0.5"
                    >
                        View Artisan <span className="text-sm">→</span>       
                    </button>
                </div>
            </div>
        </Link>
    );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    isNew: PropTypes.bool,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    artisan: PropTypes.shape({
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired
};

export default ProductCard;
