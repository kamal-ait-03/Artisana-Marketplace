import { useCurrency } from '../context/CurrencyContext';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const { formatPrice, currency } = useCurrency();
  const { cartItems, total, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-[var(--color-bg)] min-h-[70vh] flex items-center justify-center pt-20">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-orange-50 max-w-md w-full mx-4">
          <div className="w-24 h-24 bg-[var(--color-bg)] rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-[var(--color-primary)] opacity-50" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Discover our huge catalog of Moroccan handmade products.</p>
          <Link 
            to="/catalog" 
            className="block w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-medium hover:bg-[#6b3510] transition-colors"
          >
            Explore the shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-8">My Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-4">
            {cartItems.map(item => (
              <div key={item.product.id} className="bg-white p-4 rounded-xl shadow-sm border border-orange-50 flex flex-col sm:flex-row gap-4 sm:items-center page-enter">
                
                {/* Image */}
                <Link to={`/product/${item.product.id}`} className="shrink-0">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="w-24 h-24 object-cover rounded-md"
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
                      const id = map[item.product.category] || 'photo-1594736797933-d0501ba2fe65';
                      e.target.src = `https://images.unsplash.com/${id}?w=400&q=80`;
                    }}
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between h-full py-1">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <Link to={`/product/${item.product.id}`} className="font-heading text-lg font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors line-clamp-1">
                        {item.product.name}
                      </Link>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors ml-4 shrink-0"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 font-body mb-2">By {item.product.artisan.name}</p>
                  </div>

                  <div className="flex justify-between items-end">
                    <span className="font-bold text-[var(--color-primary)]">
                      {formatPrice(item.product.price * item.qty)}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-200 rounded shrink-0">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        disabled={item.qty <= 1}     
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-[var(--color-primary)] disabled:opacity-50 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                      <button 
                         onClick={() => updateQuantity(item.product.id, 1)}
                         disabled={item.qty >= item.product.stock}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-[var(--color-primary)] disabled:opacity-50 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-warm border border-orange-50 sticky top-28">
              <h2 className="font-heading text-xl font-bold border-b border-gray-100 pb-4 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6 font-body text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                  <span className="font-medium text-gray-800">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-gray-500 italic">Calculated at next step</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-heading text-2xl font-bold text-[#8B4513]">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1 text-right">Taxes included</p>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#6b3510] transition-colors shadow-warm mb-4"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <div className="text-center">
                <Link to="/catalog" className="text-sm font-medium text-gray-500 hover:text-[var(--color-primary)] transition-colors underline">
                  Or continue shopping
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;
