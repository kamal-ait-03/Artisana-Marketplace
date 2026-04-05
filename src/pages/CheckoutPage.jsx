import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Check, ChevronLeft, CreditCard } from 'lucide-react';

const CheckoutPage = () => {
  const { cartItems, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Info, 2: Address, 3: Payment, 4: Success
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user ? user.email : '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });

  const shippingCost = 45; // Fixed shipping for simplicity
  const finalTotal = total + shippingCost;

  useEffect(() => {
    if (cartItems.length === 0 && step !== 4) {
      navigate('/panier');
    }
  }, [cartItems, navigate, step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      // Process payment (mock)
      setStep(4);
      clearCart();
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-between mb-8 relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
      <div 
        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[var(--color-primary)] transition-all duration-300 -z-10"
        style={{ width: `${((step - 1) / 2) * 100}%` }}
      ></div>

      {[1, 2, 3].map(item => (
        <div key={item} className="flex flex-col items-center group">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${
            step > item 
              ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' 
              : step === item 
                ? 'bg-white border-[var(--color-primary)] text-[var(--color-primary)]' 
                : 'bg-white border-gray-300 text-gray-400'
          }`}>
            {step > item ? <Check size={16} /> : item}
          </div>
          <span className={`text-xs mt-2 font-medium hidden sm:block ${step >= item ? 'text-[var(--color-primary)]' : 'text-gray-400'}`}>
            {item === 1 ? 'Contact' : item === 2 ? 'Livraison' : 'Paiement'}
          </span>
        </div>
      ))}
    </div>
  );

  if (step === 4) {
    return (
      <div className="bg-[var(--color-bg)] min-h-[80vh] flex items-center justify-center pt-20">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm max-w-md w-full mx-4 page-enter">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-[var(--color-text)] mb-2">Commande Confirmée !</h2>
          <p className="text-gray-500 mb-6">Merci pour votre achat. Votre numéro de commande est le <span className="font-bold text-[var(--color-text)]">ART-{Math.floor(Math.random() * 100000)}</span>.</p>
          <p className="text-sm text-gray-500 mb-8 border-t border-gray-100 pt-6">Un email de confirmation vous sera envoyé dans quelques instants.</p>
          <Link 
            to="/catalogue" 
            className="block w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-medium hover:bg-[#6b3510] transition-colors"
          >
            Retourner au catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Checkout Area */}
          <div className="lg:w-2/3">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 hover:text-[var(--color-primary)] transition-colors w-fit cursor-pointer" onClick={() => step > 1 ? setStep(step - 1) : navigate('/panier')}>
              <ChevronLeft size={16} /> {step === 1 ? 'Retour au panier' : 'Étape précédente'}
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-orange-50">
              <StepIndicator />

              <form onSubmit={handleNext} className="page-enter">
                
                {/* Step 1: Info */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-heading text-2xl font-bold mb-4">Vos informations</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                        <input type="text" required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <input type="text" required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" required name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                        <input type="tel" required name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Address */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="font-heading text-2xl font-bold mb-4">Adresse de livraison</h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adresse complète</label>
                      <input type="text" required name="address" value={formData.address} onChange={handleChange} placeholder="N° de rue, appartement, etc." className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                        <input type="text" required name="city" value={formData.city} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Code Postal</label>
                        <input type="text" required name="zip" value={formData.zip} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                       <input type="text" disabled value="Maroc" className="w-full border border-gray-300 bg-gray-50 text-gray-500 rounded-md py-2 px-3 cursor-not-allowed" />
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="font-heading text-2xl font-bold mb-4">Paiement</h2>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                       <div className="flex items-center gap-3 mb-4">
                          <input type="radio" checked readOnly className="accent-[var(--color-primary)] w-4 h-4" />
                          <label className="font-medium text-gray-800 flex items-center gap-2">
                             Carte Bancaire <CreditCard size={18} className="text-gray-500" />
                          </label>
                       </div>
                       
                       <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Numéro de carte</label>
                            <input type="text" required name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="1234 5678 9101 1121" maxLength="19" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all text-sm" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Date d'expiration</label>
                              <input type="text" required name="expDate" value={formData.expDate} onChange={handleChange} placeholder="MM/AA" maxLength="5" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all text-sm" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">CVV</label>
                              <input type="text" required name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" maxLength="4" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all text-sm" />
                            </div>
                          </div>
                       </div>
                    </div>
                    
                    <div className="bg-white border rounded-lg p-4 opacity-50 cursor-not-allowed">
                       <div className="flex items-center gap-3">
                          <input type="radio" disabled className="w-4 h-4" />
                          <label className="font-medium text-gray-500">PayPal (Indisponible)</label>
                       </div>
                    </div>

                  </div>
                )}

                <div className="mt-10">
                  <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[#6b3510] transition-colors float-right flex items-center justify-center gap-2">
                    {step === 3 ? 'Confirmer et Payer' : 'Étape Suivante'}
                  </button>
                  <div className="clear-both"></div>
                </div>
              </form>

            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-[var(--color-text)] text-white p-6 md:p-8 rounded-2xl shadow-warm sticky top-28 page-enter relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 bottom-0 opacity-5 bg-zellige pointer-events-none"></div>
              
              <div className="relative z-10">
                <h2 className="font-heading text-xl font-bold border-b border-gray-700 pb-4 mb-6">Récapitulatif</h2>
                
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map(item => (
                    <div key={item.product.id} className="flex gap-4 items-start">
                      <div className="relative w-16 h-16 rounded border border-gray-700 overflow-hidden shrink-0">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-2 -right-2 bg-gray-600 text-xs w-5 h-5 flex items-center justify-center rounded-full z-10">
                          {item.qty}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-2">{item.product.name}</p>
                        <p className="text-gray-400 text-xs mt-1">{item.product.price} MAD</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 pt-4 space-y-3 font-body text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span className="text-white">{total} MAD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison (Maroc)</span>
                    <span className="text-white">{shippingCost} MAD</span>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between items-end">
                    <span className="font-bold">Total</span>
                    <span className="font-heading text-2xl font-bold text-[var(--color-secondary)]">
                      {finalTotal} <span className="text-base font-normal text-gray-300">MAD</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
