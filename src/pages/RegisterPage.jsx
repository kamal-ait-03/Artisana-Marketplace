import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Loader2, Store, Phone, MapPin, Briefcase, Camera, CreditCard, ChevronRight, ChevronLeft, ShoppingBag, Check } from 'lucide-react';

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const roleQuery = searchParams.get('role');
  
  const [activeTab, setActiveTab] = useState(roleQuery === 'seller' || roleQuery === 'artisan' ? 'artisan' : 'client');
  const [artisanStep, setArtisanStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, setUser } = useAuth();
  const navigate = useNavigate();

  const initialClientState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const initialArtisanState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: 'Marrakech',
    shopName: '',
    craftCategory: 'Poterie',
    shopDescription: '',
    yearsOfExperience: '',
    profilePhoto: null,
    profilePhotoName: '',
    paymentMethod: 'Bank Transfer',
    iban: '',
    bankName: '',
    certify: false
  };

  const [clientData, setClientData] = useState(initialClientState);
  const [artisanData, setArtisanData] = useState(initialArtisanState);

  // Sync search parameter role changes if user navigates back/forth via navbar
  useEffect(() => {
    if (roleQuery === 'seller' || roleQuery === 'artisan') {
      handleTabSwitch('artisan');
    } else if (roleQuery === 'client') {
      handleTabSwitch('client');
    }
  }, [roleQuery]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setClientData(initialClientState);
    setArtisanData(initialArtisanState);
    setArtisanStep(1);
    setError('');
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (clientData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (clientData.password !== clientData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name: clientData.name,
        email: clientData.email,
        password: clientData.password,
        role: 'client'
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleArtisanNext = () => {
    setError('');
    if (artisanStep === 1) {
      if (!artisanData.name || !artisanData.email || !artisanData.password || !artisanData.confirmPassword || !artisanData.phone || !artisanData.city) {
        setError('Please fill in all required fields.');
        return;
      }
      if (artisanData.password.length < 8) {
        setError('Password must be at least 8 characters.');
        return;
      }
      if (artisanData.password !== artisanData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      setArtisanStep(2);
    } else if (artisanStep === 2) {
      if (!artisanData.shopName || !artisanData.craftCategory || !artisanData.shopDescription || !artisanData.yearsOfExperience) {
        setError('Please fill in all required fields.');
        return;
      }
      setArtisanStep(3);
    }
  };

  const handleArtisanSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!artisanData.iban || !artisanData.bankName) {
      setError('Please fill in all billing fields.');
      return;
    }
    if (!artisanData.certify) {
      setError('You must certify that the provided details are accurate.');
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        name: artisanData.name,
        email: artisanData.email,
        password: artisanData.password,
        role: 'artisan',
        phone: artisanData.phone,
        city: artisanData.city,
        shopName: artisanData.shopName,
        craftCategory: artisanData.craftCategory,
        shopDescription: artisanData.shopDescription,
        yearsOfExperience: artisanData.yearsOfExperience,
        profilePhotoName: artisanData.profilePhotoName,
        paymentMethod: artisanData.paymentMethod,
        iban: artisanData.iban,
        bankName: artisanData.bankName
      };
      await register(payload);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      const googleUser = {
        name: "Google User",
        email: "user@gmail.com",
        avatar: "https://lh3.googleusercontent.com/a/default",
        role: "client"
      };
      localStorage.setItem('user', JSON.stringify(googleUser));
      if (setUser) setUser(googleUser);
      alert("Logged in with Google ✓");
      navigate('/');
    }, 1500);
  };

  return (
    <div className="bg-[var(--color-bg)] min-h-screen flex flex-col justify-center items-center py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zellige opacity-5 pointer-events-none rounded-full"></div>
      
      {/* Artisana Header logo */}
      <div className="mb-8 text-center relative z-10 page-enter">
        <Link to="/" className="inline-flex items-center gap-2 group">
           <svg width="32" height="32" viewBox="0 0 60 60" className="text-[var(--color-primary)]" fill="currentColor">
              <path d="M30 0l15 15-15 15-15-15L30 0z M30 30l15 15-15 15-15-15L30 30z M0 30l15-15 15 15-15 15L0 30z M60 30l-15-15-15 15 15 15 15-15z" />
           </svg>
           <div className="flex items-baseline">
              <span className="font-heading text-3xl font-bold text-[var(--color-text)]">Artisana</span>
              <span className="font-accent text-sm ml-1 text-[var(--color-secondary)] uppercase">Shop</span>
           </div>
        </Link>
        <p className="text-gray-500 mt-2 font-body">Join the Moroccan craftsmanship community.</p>
      </div>

      {/* Main Form Box */}
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-warm border border-orange-50 p-8 md:p-10 relative z-10 page-enter">
        <h2 className="font-heading text-3xl font-black text-center mb-6 text-slate-900">Create an Account</h2>
        
        {/* Toggle Client / Artisan */}
        <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-8 select-none">
          <button
            type="button"
            className={`flex-1 py-3 text-sm font-black rounded-xl flex justify-center items-center gap-2.5 transition-all duration-300 ${
              activeTab === 'client' ? 'bg-white text-[#00BCD4] shadow-md' : 'text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => handleTabSwitch('client')}
          >
            <ShoppingBag size={18} /> Client Account
          </button>
          <button
            type="button"
            className={`flex-1 py-3 text-sm font-black rounded-xl flex justify-center items-center gap-2.5 transition-all duration-300 ${
              activeTab === 'artisan' ? 'bg-white text-[#00BCD4] shadow-md' : 'text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => handleTabSwitch('artisan')}
          >
            <Store size={18} /> Seller Account
          </button>
        </div>

        {/* ── CLIENT FORM (TAB 1) ── */}
        {activeTab === 'client' && (
          <div>
            <form onSubmit={handleClientSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 text-red-600 text-xs font-bold p-3.5 rounded-xl border border-red-100 animate-fade-in">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={clientData.name}
                    onChange={(e) => setClientData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full pl-11 pr-4 py-3 border-2 border-slate-100 hover:border-slate-200 focus:border-[#00BCD4] rounded-xl focus:ring-0 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium" 
                    placeholder="Ahmed Benkirane" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={clientData.email}
                    onChange={(e) => setClientData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-11 pr-4 py-3 border-2 border-slate-100 hover:border-slate-200 focus:border-[#00BCD4] rounded-xl focus:ring-0 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium" 
                    placeholder="your@email.com" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Lock size={18} />
                    </div>
                    <input 
                      type="password" 
                      required
                      minLength={8}
                      value={clientData.password}
                      onChange={(e) => setClientData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full pl-11 pr-4 py-3 border-2 border-slate-100 hover:border-slate-200 focus:border-[#00BCD4] rounded-xl focus:ring-0 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium" 
                      placeholder="••••••••" 
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">At least 8 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Lock size={18} />
                    </div>
                    <input 
                      type="password" 
                      required
                      minLength={8}
                      value={clientData.confirmPassword}
                      onChange={(e) => setClientData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full pl-11 pr-4 py-3 border-2 border-slate-100 hover:border-slate-200 focus:border-[#00BCD4] rounded-xl focus:ring-0 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium" 
                      placeholder="••••••••" 
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#00BCD4] text-white py-3.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-md hover:bg-[#0097a7] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 mt-6"
              >
                {isLoading ? <Loader2 className="animate-spin inline-block mr-2" size={18} /> : 'Create my Account'}
              </button>
            </form>

            <div className="relative my-6 select-none">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-black">
                <span className="px-3 bg-white text-slate-400">Or continue with</span>
              </div>
            </div>

            <button 
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full border-2 border-slate-100 bg-white text-slate-700 py-3 rounded-xl font-bold flex items-center justify-center gap-3.5 hover:bg-slate-50 transition-all hover:border-slate-200 active:scale-95 disabled:opacity-70 shadow-sm"
            >
              {isGoogleLoading ? (
                <Loader2 className="animate-spin text-slate-400" size={18} />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              Google
            </button>
          </div>
        )}

        {/* ── ARTISAN/SELLER FORM (TAB 2) ── */}
        {activeTab === 'artisan' && (
          <div>
            {/* Dynamic Step Progress Indicator in Cyan */}
            <div className="mb-8 select-none">
              <div className="flex items-center justify-between relative px-2">
                {/* Gray Connecting Bar */}
                <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-slate-100 -z-10 rounded-full"></div>
                {/* Active Cyan Fill Bar */}
                <div 
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-1 bg-[#00BCD4] -z-10 rounded-full transition-all duration-500"
                  style={{ width: `${((artisanStep - 1) / 2) * 91}%` }}
                ></div>

                {/* Step 1 Node */}
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300 ${
                      artisanStep >= 1 ? 'bg-[#00BCD4] text-white ring-4 ring-cyan-100' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {artisanStep > 1 ? <Check size={16} strokeWidth={3} /> : '1'}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider mt-2.5 ${artisanStep >= 1 ? 'text-slate-800' : 'text-slate-400'}`}>Info</span>
                </div>

                {/* Step 2 Node */}
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300 ${
                      artisanStep >= 2 ? 'bg-[#00BCD4] text-white ring-4 ring-cyan-100' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {artisanStep > 2 ? <Check size={16} strokeWidth={3} /> : '2'}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider mt-2.5 ${artisanStep >= 2 ? 'text-slate-800' : 'text-slate-400'}`}>Shop</span>
                </div>

                {/* Step 3 Node */}
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300 ${
                      artisanStep >= 3 ? 'bg-[#00BCD4] text-white ring-4 ring-cyan-100' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    3
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider mt-2.5 ${artisanStep >= 3 ? 'text-slate-800' : 'text-slate-400'}`}>Payout</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs font-bold p-3.5 rounded-xl border border-red-100 mb-6 animate-fade-in">
                {error}
              </div>
            )}

            {/* ARTISAN STEP 1: Personal Info */}
            {artisanStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={artisanData.name}
                      onChange={(e) => setArtisanData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-11 pr-4 py-3 border-2 border-slate-100 hover:border-slate-200 focus:border-[#00BCD4] rounded-xl focus:ring-0 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium" 
                      placeholder="Amina Alaoui" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Mail size={18} />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={artisanData.email}
                      onChange={(e) => setArtisanData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-11 pr-4 py-3 border-2 border-slate-100 hover:border-slate-200 focus:border-[#00BCD4] rounded-xl focus:ring-0 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium" 
                      placeholder="amina@crafts.com" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Lock size={18} />
                      </div>
                      <input 
                        type="password" 
                        required
                        minLength={8}
                        value={artisanData.password}
                        onChange={(e) => setArtisanData(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full pl-11 pr-4 py-3 border-2 border-slate-100 hover:border-slate-200 focus:border-[#00BCD4] rounded-xl focus:ring-0 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium" 
                        placeholder="••••••••" 
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">Min 8 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Lock size={18} />
                      </div>
                      <input 
                        type="password" 
                        required
                        minLength={8}
                        value={artisanData.confirmPassword}
                        onChange={(e) => setArtisanData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full pl-11 pr-4 py-3 border-2 border-slate-100 hover:border-slate-200 focus:border-[#00BCD4] rounded-xl focus:ring-0 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium" 
                        placeholder="••••••••" 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Phone size={18} />
                      </div>
                      <input 
                        type="tel" 
                        required
                        value={artisanData.phone}
                        onChange={(e) => setArtisanData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full pl-11 pr-4 py-3 border-2 border-slate-100 hover:border-slate-200 focus:border-[#00BCD4] rounded-xl focus:ring-0 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium" 
                        placeholder="+212 600-000000" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">City</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <MapPin size={18} />
                      </div>
                      <select
                        value={artisanData.city}
                        onChange={(e) => setArtisanData(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full pl-11 pr-4 py-3 border-2 border-slate-100 focus:border-[#00BCD4] rounded-xl focus:ring-0 outline-none transition-all text-slate-800 font-bold bg-white cursor-pointer"
                      >
                        {['Marrakech', 'Fès', 'Casablanca', 'Rabat', 'Meknès', 'Tétouan', 'Essaouira', 'Other'].map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    type="button"
                    onClick={handleArtisanNext}
                    className="px-6 py-3 bg-[#00BCD4] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-md hover:bg-[#0097a7] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    Next Step <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ARTISAN STEP 2: Shop & Craft Info */}
            {artisanStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">Shop Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Briefcase size={18} />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={artisanData.shopName}
                      onChange={(e) => setArtisanData(prev => ({ ...prev, shopName: e.target.value }))}
                      className="w-full pl-11 pr-4 py-3 border-2 border-slate-100 hover:border-slate-200 focus:border-[#00BCD4] rounded-xl focus:ring-0 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium" 
                      placeholder="Atelier Berbère" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">Craft Category</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Store size={18} />
                      </div>
                      <select
                        value={artisanData.craftCategory}
                        onChange={(e) => setArtisanData(prev => ({ ...prev, craftCategory: e.target.value }))}
                        className="w-full pl-11 pr-4 py-3 border-2 border-slate-100 focus:border-[#00BCD4] rounded-xl focus:ring-0 outline-none transition-all text-slate-800 font-bold bg-white cursor-pointer"
                      >
                        {['Poterie', 'Textile & Tapis', 'Cuir', 'Métal', 'Bois', 'Bijoux', 'Autres'].map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">Years of Experience</label>
                    <input 
                      type="number" 
                      required
                      min={0}
                      value={artisanData.yearsOfExperience}
                      onChange={(e) => setArtisanData(prev => ({ ...prev, yearsOfExperience: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-slate-100 hover:border-slate-200 focus:border-[#00BCD4] rounded-xl focus:ring-0 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium" 
                      placeholder="5" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">Shop Description</label>
                  <textarea 
                    required
                    rows={3}
                    value={artisanData.shopDescription}
                    onChange={(e) => setArtisanData(prev => ({ ...prev, shopDescription: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-slate-100 hover:border-slate-200 focus:border-[#00BCD4] rounded-xl focus:ring-0 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium resize-none" 
                    placeholder="Describe your creations, artistic process, or workshop history..." 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">Upload Profile Photo</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 border-dashed rounded-2xl hover:border-[#00BCD4] transition-all relative cursor-pointer bg-slate-50/50">
                    <div className="space-y-1 text-center select-none">
                      <Camera className="mx-auto h-10 w-10 text-slate-400" />
                      <div className="flex text-xs text-slate-600 justify-center">
                        <span className="relative rounded-md font-black text-[#00BCD4] hover:text-[#0097a7] focus-within:outline-none">
                          {artisanData.profilePhotoName ? artisanData.profilePhotoName : 'Select image file'}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">PNG, JPG up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setArtisanData(prev => ({ 
                            ...prev, 
                            profilePhoto: file,
                            profilePhotoName: file.name
                          }));
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={() => { setError(''); setArtisanStep(1); }}
                    className="px-6 py-3 border-2 border-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={handleArtisanNext}
                    className="px-6 py-3 bg-[#00BCD4] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-md hover:bg-[#0097a7] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    Next Step <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ARTISAN STEP 3: Billing & Payout Info */}
            {artisanStep === 3 && (
              <form onSubmit={handleArtisanSubmit} className="space-y-5 animate-fade-in">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">Preferred Payment Method</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 select-none">
                    {['Bank Transfer', 'CIH', 'Barid Bank', 'Cash on Delivery'].map((method) => (
                      <label 
                        key={method}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          artisanData.paymentMethod === method 
                            ? 'border-[#00BCD4] bg-[#00BCD4]/5 font-black text-slate-900 shadow-sm' 
                            : 'border-slate-100 hover:border-slate-200 text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="paymentMethod"
                          value={method}
                          checked={artisanData.paymentMethod === method}
                          onChange={(e) => setArtisanData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                          className="accent-[#00BCD4] w-4.5 h-4.5"
                        />
                        <span className="text-sm">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">IBAN or Account Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <CreditCard size={18} />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={artisanData.iban}
                      onChange={(e) => setArtisanData(prev => ({ ...prev, iban: e.target.value }))}
                      className="w-full pl-11 pr-4 py-3 border-2 border-slate-100 hover:border-slate-200 focus:border-[#00BCD4] rounded-xl focus:ring-0 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium" 
                      placeholder="MA80 0000 0000 0000 0000 0000" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">Bank Name</label>
                  <input 
                    type="text" 
                    required
                    value={artisanData.bankName}
                    onChange={(e) => setArtisanData(prev => ({ ...prev, bankName: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-slate-100 hover:border-slate-200 focus:border-[#00BCD4] rounded-xl focus:ring-0 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium" 
                    placeholder="CIH Bank, Attijariwafa Bank, BCP..." 
                  />
                </div>

                <div className="pt-2 select-none">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      required
                      checked={artisanData.certify}
                      onChange={(e) => setArtisanData(prev => ({ ...prev, certify: e.target.checked }))}
                      className="accent-[#00BCD4] w-5 h-5 mt-0.5 rounded-lg border-2 border-slate-200"
                    />
                    <span className="text-xs text-slate-500 font-bold select-none leading-relaxed">
                      I certify that all information provided is accurate and my payout info is correct
                    </span>
                  </label>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={() => { setError(''); setArtisanStep(2); }}
                    className="px-6 py-3 border-2 border-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-[#00BCD4] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-md hover:bg-[#0097a7] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-70"
                  >
                    {isLoading ? <Loader2 className="animate-spin inline-block" size={16} /> : 'Create my Seller Account'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <p className="text-center text-sm font-bold text-slate-500 mt-8 select-none">
          Already have an account?{' '}
          <Link to="/login" className="font-black text-[#00BCD4] hover:underline uppercase tracking-wide text-xs">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
