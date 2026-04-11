import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2, ArrowLeft, ArrowRight, Camera, Upload,
  Store, User, Mail, Lock, Phone, MessageSquare, Link as LinkIcon,
  CheckIcon, AlertCircle, Loader2, Package, MapPin,
  CreditCard, Banknote, Building2, Plus, Trash2, Tag, DollarSign, Image, ShoppingBag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/* ─────────────────────────────────────────────
   STEP CONFIGURATION
───────────────────────────────────────────── */
const STEPS = [
  { id: 1, label: 'Account' },
  { id: 2, label: 'Profile' },
  { id: 3, label: 'Shop Setup' },
  { id: 4, label: 'Payment' },
  { id: 5, label: 'Products' },
  { id: 6, label: 'Review' },
];

const TOTAL_STEPS = STEPS.length;

/* ─────────────────────────────────────────────
   EMPTY PRODUCT TEMPLATE
───────────────────────────────────────────── */
const emptyProduct = () => ({
  id: Date.now(),
  name: '',
  category: '',
  price: '',
  stock: '',
  description: '',
  image: null,
  imagePreview: null,
});

const SellerRegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [shopStatus, setShopStatus] = useState(null); // 'checking' | 'available' | 'taken'

  /* ── Main form data ── */
  const [formData, setFormData] = useState({
    // Step 1 – Account
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    terms: false,
    // Step 2 – Profile
    shopName: '',
    specialty: '',
    city: '',
    experience: '',
    bio: '',
    whatsapp: '',
    instagram: '',
    facebook: '',
    profilePhoto: null,
    coverPhoto: null,
    // Step 4 – Payment / Billing
    paymentMethod: 'bank',          // 'bank' | 'cmi' | 'cash'
    bankName: '',
    iban: '',
    accountHolder: '',
    billingAddress: '',
    billingCity: '',
    billingPostal: '',
    billingCountry: 'Morocco',
    cmiPhone: '',
  });

  const [previews, setPreviews] = useState({ profile: null, cover: null });

  /* ── Products list (Step 5) ── */
  const [products, setProducts] = useState([emptyProduct()]);

  /* ── Static options ── */
  const specialties = ['Pottery', 'Carpets', 'Leather', 'Clothing', 'Beauty', 'Decoration', 'Other'];
  const cities = ['Safi', 'Marrakech', 'Fès', 'Meknès', 'Rabat', 'Other'];
  const experiences = ['<1yr', '1-3yrs', '3-10yrs', '10+yrs'];
  const productCategories = ['Pottery', 'Carpets', 'Leather', 'Clothing', 'Beauty', 'Decoration', 'Other'];

  /* ─────────────────────────────────────────────
     VALIDATION
  ───────────────────────────────────────────── */
  const validateStep = (currentStep) => {
    const e = {};

    if (currentStep === 1) {
      if (!formData.firstName) e.firstName = 'Required';
      if (!formData.lastName) e.lastName = 'Required';
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email';
      if (formData.password.length < 8) e.password = 'Min 8 characters';
      if (formData.password !== formData.confirmPassword) e.confirmPassword = "Passwords don't match";
      if (!formData.phone || !formData.phone.includes('+212')) e.phone = 'Include +212';
      if (!formData.terms) e.terms = 'Please accept terms';
    }

    if (currentStep === 2) {
      if (!formData.shopName) e.shopName = 'Required';
      if (!formData.specialty) e.specialty = 'Required';
      if (!formData.city) e.city = 'Required';
      if (!formData.experience) e.experience = 'Required';
      if (!formData.bio || formData.bio.length < 20) e.bio = 'Minimum 20 characters';
    }

    if (currentStep === 3) {
      if (!formData.profilePhoto) e.profilePhoto = 'Profile photo is required';
    }

    if (currentStep === 4) {
      if (!formData.billingAddress) e.billingAddress = 'Required';
      if (!formData.billingCity) e.billingCity = 'Required';
      if (!formData.billingPostal) e.billingPostal = 'Required';
      if (formData.paymentMethod === 'bank') {
        if (!formData.bankName) e.bankName = 'Required';
        if (!formData.iban) e.iban = 'Required';
        if (!formData.accountHolder) e.accountHolder = 'Required';
      }
      if (formData.paymentMethod === 'cmi') {
        if (!formData.cmiPhone) e.cmiPhone = 'Required';
      }
    }

    if (currentStep === 5) {
      const productErrors = {};
      products.forEach((p, i) => {
        if (!p.name) productErrors[`${i}_name`] = 'Required';
        if (!p.category) productErrors[`${i}_category`] = 'Required';
        if (!p.price || isNaN(p.price) || Number(p.price) <= 0) productErrors[`${i}_price`] = 'Valid price required';
        if (!p.stock || isNaN(p.stock) || Number(p.stock) < 0) productErrors[`${i}_stock`] = 'Valid stock required';
      });
      Object.assign(e, productErrors);
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ─────────────────────────────────────────────
     NAVIGATION
  ───────────────────────────────────────────── */
  const nextStep = () => { if (validateStep(step)) setStep(p => p + 1); };
  const prevStep = () => setStep(p => p - 1);

  /* ─────────────────────────────────────────────
     INPUT HANDLERS
  ───────────────────────────────────────────── */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));

    if (name === 'phone' && step === 1) setFormData(prev => ({ ...prev, whatsapp: value }));

    if (name === 'shopName') {
      setShopStatus('checking');
      setTimeout(() => {
        setShopStatus(value.toLowerCase().includes('moroc') ? 'taken' : 'available');
      }, 500);
    }
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [type + 'Photo']: file }));
      setPreviews(prev => ({ ...prev, [type]: URL.createObjectURL(file) }));
      if (errors[type + 'Photo']) setErrors(prev => ({ ...prev, [type + 'Photo']: null }));
    }
  };

  /* ─────────────────────────────────────────────
     PRODUCT HANDLERS
  ───────────────────────────────────────────── */
  const addProduct = () => setProducts(prev => [...prev, emptyProduct()]);

  const removeProduct = (id) => {
    if (products.length === 1) return; // keep at least one
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateProduct = (id, field, value) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
    const idx = products.findIndex(p => p.id === id);
    const key = `${idx}_${field}`;
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: null }));
  };

  const handleProductImage = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      setProducts(prev => prev.map(p =>
        p.id === id ? { ...p, image: file, imagePreview: URL.createObjectURL(file) } : p
      ));
    }
  };

  /* ─────────────────────────────────────────────
     SUBMIT
  ───────────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await register({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      role: 'artisan',
    });
    setTimeout(() => { setIsSubmitting(false); setIsSubmitted(true); }, 1500);
  };

  /* ─────────────────────────────────────────────
     SUCCESS SCREEN
  ───────────────────────────────────────────── */
  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 pb-20 bg-slate-50 flex items-center justify-center">
        <div className="bg-white p-12 rounded-[40px] shadow-xl text-center max-w-lg w-full mx-4 animate-fade-in border border-slate-100">
          <div className="w-24 h-24 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 size={64} className="text-[#00BCD4]" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4">Application Submitted!</h1>
          <p className="text-slate-500 font-medium mb-10">
            Thank you for sharing your craft. Our team will review your application within 24-48h. Welcome to the Artisana family!
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-[#00BCD4] text-white px-10 py-4 rounded-full font-black shadow-lg hover:bg-[#0097a7] transition-all"
          >
            Go to Your Dashboard <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────
     MAIN RENDER
  ───────────────────────────────────────────── */
  return (
    <div className="min-h-screen pt-20 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-2xl">

        {/* ── Progress Bar ── */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-black text-slate-900 mb-6">Become a Verified Seller</h1>
          <div className="relative w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-4">
            <div
              className="absolute top-0 left-0 h-full bg-[#00BCD4] transition-all duration-500 ease-out"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
            {STEPS.map(s => (
              <span key={s.id} className={step >= s.id ? 'text-[#00BCD4]' : ''}>{s.label}</span>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[40px] shadow-xl p-8 md:p-12 border border-slate-100">

          {/* ══════════════════════════════════════
              STEP 1 – Account
          ══════════════════════════════════════ */}
          {step === 1 && (
            <div className="animate-fade-in space-y-6">
              <StepHeader icon={<User size={20} />} title="Create Your Account" subtitle="Set up your seller credentials" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="First Name" name="firstName" icon={<User size={18} />} value={formData.firstName} onChange={handleInputChange} error={errors.firstName} />
                <InputGroup label="Last Name" name="lastName" icon={<User size={18} />} value={formData.lastName} onChange={handleInputChange} error={errors.lastName} />
              </div>
              <InputGroup label="Email Address" name="email" type="email" icon={<Mail size={18} />} value={formData.email} onChange={handleInputChange} error={errors.email} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Password" name="password" type="password" icon={<Lock size={18} />} value={formData.password} onChange={handleInputChange} error={errors.password} />
                <InputGroup label="Confirm Password" name="confirmPassword" type="password" icon={<Lock size={18} />} value={formData.confirmPassword} onChange={handleInputChange} error={errors.confirmPassword} />
              </div>
              <InputGroup label="Phone Number" name="phone" placeholder="+212 6..." icon={<Phone size={18} />} value={formData.phone} onChange={handleInputChange} error={errors.phone} />
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" name="terms" checked={formData.terms} onChange={handleInputChange}
                  className="mt-1 w-5 h-5 rounded border-slate-300 text-[#00BCD4] focus:ring-[#00BCD4]" />
                <div className="flex-1">
                  <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors">
                    I agree to the <Link to="/terms" className="text-[#00BCD4] hover:underline">Terms & Conditions</Link> and the Seller Privacy Policy.
                  </span>
                  {errors.terms && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors.terms}</p>}
                </div>
              </label>
            </div>
          )}

          {/* ══════════════════════════════════════
              STEP 2 – Artisan Profile
          ══════════════════════════════════════ */}
          {step === 2 && (
            <div className="animate-fade-in space-y-6">
              <StepHeader icon={<Store size={20} />} title="Your Artisan Profile" subtitle="Tell us about your craft and shop" />
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Shop Name</label>
                <div className="relative">
                  <input name="shopName" value={formData.shopName} onChange={handleInputChange}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 px-12 text-sm font-bold focus:border-[#00BCD4] focus:bg-white outline-none transition-all pr-28" />
                  <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    {shopStatus === 'checking' && <Loader2 className="animate-spin text-slate-400" size={16} />}
                    {shopStatus === 'available' && <span className="text-green-500 text-[10px] font-bold px-2 py-1 bg-green-50 rounded-lg">✓ Available</span>}
                    {shopStatus === 'taken' && <span className="text-red-500 text-[10px] font-bold px-2 py-1 bg-red-50 rounded-lg">✗ Taken</span>}
                  </div>
                </div>
                {errors.shopName && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors.shopName}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectGroup label="Specialty" name="specialty" options={specialties} value={formData.specialty} onChange={handleInputChange} error={errors.specialty} />
                <SelectGroup label="City" name="city" options={cities} value={formData.city} onChange={handleInputChange} error={errors.city} />
              </div>
              <SelectGroup label="Experience Level" name="experience" options={experiences} value={formData.experience} onChange={handleInputChange} error={errors.experience} />
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Artisan Bio / Shop Story</label>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${formData.bio.length > 300 ? 'text-red-500' : 'text-slate-400'}`}>{formData.bio.length}/300</span>
                </div>
                <textarea name="bio" value={formData.bio} onChange={handleInputChange} maxLength={300}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 px-6 text-sm font-medium focus:border-[#00BCD4] focus:bg-white outline-none transition-all h-32 resize-none"
                  placeholder="Tell us about your background and your art..." />
                {errors.bio && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors.bio}</p>}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              STEP 3 – Shop Setup (Photos + Social)
          ══════════════════════════════════════ */}
          {step === 3 && (
            <div className="animate-fade-in space-y-8">
              <StepHeader icon={<Camera size={20} />} title="Shop Setup" subtitle="Add your photos and social links" />

              {/* Profile Photo */}
              <div className="text-center">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Profile Photo (Logo or Portrait)</label>
                <div className="relative group mx-auto w-32 h-32">
                  <div className="w-full h-full rounded-[40px] bg-slate-100 overflow-hidden border-2 border-dashed border-slate-300 group-hover:border-[#00BCD4] transition-colors relative">
                    {previews.profile
                      ? <img src={previews.profile} className="w-full h-full object-cover" alt="profile preview" />
                      : <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 group-hover:text-[#00BCD4]"><Camera size={32} /></div>
                    }
                    <input type="file" onChange={(e) => handleFileUpload(e, 'profile')} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-[#00BCD4] text-white p-2 rounded-xl shadow-lg"><Upload size={16} /></div>
                </div>
                {errors.profilePhoto && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase">{errors.profilePhoto}</p>}
              </div>

              {/* Cover Photo */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Cover Banner Photo</label>
                <div className="w-full h-40 bg-slate-100 rounded-[32px] overflow-hidden border-2 border-dashed border-slate-300 hover:border-[#00BCD4] transition-colors relative group">
                  {previews.cover
                    ? <img src={previews.cover} className="w-full h-full object-cover" alt="cover preview" />
                    : <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 group-hover:text-[#00BCD4]">
                      <Upload size={32} className="mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Click to upload shop banner</span>
                    </div>
                  }
                  <input type="file" onChange={(e) => handleFileUpload(e, 'cover')} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connect with customers</h4>
                <InputGroup label="WhatsApp Number" name="whatsapp" value={formData.whatsapp} icon={<MessageSquare size={18} />} onChange={handleInputChange} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup label="Instagram URL (Optional)" name="instagram" value={formData.instagram} icon={<Camera size={18} />} onChange={handleInputChange} />
                  <InputGroup label="Facebook URL (Optional)" name="facebook" value={formData.facebook} icon={<LinkIcon size={18} />} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              STEP 4 – Payment Setup & Billing
          ══════════════════════════════════════ */}
          {step === 4 && (
            <div className="animate-fade-in space-y-8">
              <StepHeader icon={<CreditCard size={20} />} title="Payment Setup" subtitle="How would you like to receive your earnings?" />

              {/* Payment Method Selector */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Payment Method</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'bank', icon: <Building2 size={24} />, label: 'Bank Transfer', desc: 'Direct to your account' },
                    { id: 'cmi', icon: <Phone size={24} />, label: 'CMI / Mobile', desc: 'Via mobile payment' },
                    { id: 'cash', icon: <Banknote size={24} />, label: 'Cash on Pickup', desc: 'Collect in person' },
                  ].map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => { setFormData(p => ({ ...p, paymentMethod: method.id })); setErrors({}); }}
                      className={`flex flex-col items-center gap-3 p-5 rounded-3xl border-2 transition-all font-bold text-sm
                        ${formData.paymentMethod === method.id
                          ? 'border-[#00BCD4] bg-cyan-50 text-[#00BCD4] shadow-md'
                          : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-300'}`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${formData.paymentMethod === method.id ? 'bg-[#00BCD4] text-white' : 'bg-white text-slate-400'}`}>
                        {method.icon}
                      </div>
                      <span className="font-black text-xs uppercase tracking-wider">{method.label}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{method.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bank Transfer Fields */}
              {formData.paymentMethod === 'bank' && (
                <div className="space-y-5 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Building2 size={14} /> Bank Account Details
                  </h4>
                  <InputGroup label="Bank Name" name="bankName" icon={<Building2 size={18} />} value={formData.bankName} onChange={handleInputChange} error={errors.bankName} placeholder="e.g. Attijariwafa Bank" />
                  <InputGroup label="IBAN / RIB Number" name="iban" icon={<CreditCard size={18} />} value={formData.iban} onChange={handleInputChange} error={errors.iban} placeholder="MA00 0000 0000 0000 0000 0000" />
                  <InputGroup label="Account Holder Name" name="accountHolder" icon={<User size={18} />} value={formData.accountHolder} onChange={handleInputChange} error={errors.accountHolder} />
                </div>
              )}

              {/* CMI / Mobile Fields */}
              {formData.paymentMethod === 'cmi' && (
                <div className="space-y-5 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Phone size={14} /> Mobile Payment Details
                  </h4>
                  <InputGroup label="Mobile Payment Number" name="cmiPhone" icon={<Phone size={18} />} value={formData.cmiPhone} onChange={handleInputChange} error={errors.cmiPhone} placeholder="+212 6..." />
                  <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-2xl border border-cyan-100">
                    <AlertCircle size={16} className="text-[#00BCD4] shrink-0 mt-0.5" />
                    <p className="text-xs text-cyan-800 font-medium">Payments will be sent to this number via CMI or Orange Money. Make sure it's registered with your mobile wallet.</p>
                  </div>
                </div>
              )}

              {/* Cash on Pickup Info */}
              {formData.paymentMethod === 'cash' && (
                <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4 items-start">
                  <Banknote size={20} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-black text-amber-800 mb-1">Cash on Pickup Selected</p>
                    <p className="text-xs text-amber-700 font-medium leading-relaxed">
                      You'll collect payment directly from customers or our local pickup partners. Our team will coordinate the logistics with you after approval.
                    </p>
                  </div>
                </div>
              )}

              {/* Billing Address */}
              <div className="space-y-5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={14} /> Billing Address
                </h4>
                <InputGroup label="Street Address" name="billingAddress" icon={<MapPin size={18} />} value={formData.billingAddress} onChange={handleInputChange} error={errors.billingAddress} placeholder="123 Rue des Artisans" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <InputGroup label="Postal Code" name="billingPostal" icon={<Tag size={18} />} value={formData.billingPostal} onChange={handleInputChange} error={errors.billingPostal} placeholder="10000" />
                  </div>
                  <div className="md:col-span-2">
                    <InputGroup label="City" name="billingCity" icon={<MapPin size={18} />} value={formData.billingCity} onChange={handleInputChange} error={errors.billingCity} placeholder="Marrakech" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Country</label>
                  <select name="billingCountry" value={formData.billingCountry} onChange={handleInputChange}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 px-6 text-sm font-bold focus:border-[#00BCD4] focus:bg-white outline-none appearance-none transition-all">
                    <option value="Morocco">Morocco</option>
                    <option value="France">France</option>
                    <option value="Spain">Spain</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              STEP 5 – Product / Stock Management
          ══════════════════════════════════════ */}
          {step === 5 && (
            <div className="animate-fade-in space-y-6">
              <StepHeader icon={<ShoppingBag size={20} />} title="Add Your Products" subtitle="List the items you want to sell in your shop" />

              {products.map((product, idx) => (
                <div key={product.id} className="bg-slate-50 rounded-3xl border border-slate-100 p-6 space-y-5 relative">
                  {/* Product header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-[#00BCD4] uppercase tracking-widest flex items-center gap-2">
                      <Package size={14} /> Product {idx + 1}
                    </span>
                    {products.length > 1 && (
                      <button type="button" onClick={() => removeProduct(product.id)}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  {/* Product Image */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Product Photo</label>
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-2xl bg-white border-2 border-dashed border-slate-300 hover:border-[#00BCD4] transition-colors overflow-hidden flex-shrink-0 group">
                        {product.imagePreview
                          ? <img src={product.imagePreview} className="w-full h-full object-cover" alt="product" />
                          : <div className="w-full h-full flex items-center justify-center text-slate-300 group-hover:text-[#00BCD4]"><Image size={24} /></div>
                        }
                        <input type="file" accept="image/*" onChange={(e) => handleProductImage(e, product.id)} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        <p className="font-bold text-slate-600 mb-1">Upload product photo</p>
                        <p>JPG, PNG or WEBP · Max 5MB</p>
                        <p>Recommended: 800×800px</p>
                      </div>
                    </div>
                  </div>

                  {/* Name & Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Product Name</label>
                      <div className="relative">
                        <input
                          value={product.name}
                          onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                          placeholder="e.g. Hand-painted Tagine"
                          className={`w-full bg-white border-2 ${errors[`${idx}_name`] ? 'border-red-100' : 'border-slate-100'} rounded-2xl py-3 px-12 text-sm font-bold focus:border-[#00BCD4] focus:bg-white outline-none transition-all`}
                        />
                        <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      </div>
                      {errors[`${idx}_name`] && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors[`${idx}_name`]}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Category</label>
                      <select
                        value={product.category}
                        onChange={(e) => updateProduct(product.id, 'category', e.target.value)}
                        className={`w-full bg-white border-2 ${errors[`${idx}_category`] ? 'border-red-100' : 'border-slate-100'} rounded-2xl py-3 px-6 text-sm font-bold focus:border-[#00BCD4] outline-none appearance-none transition-all`}
                      >
                        <option value="">Select Category</option>
                        {productCategories.map(c => <option key={c} value={c.toLowerCase()}>{c}</option>)}
                      </select>
                      {errors[`${idx}_category`] && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors[`${idx}_category`]}</p>}
                    </div>
                  </div>

                  {/* Price & Stock */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Price (USD)</label>
                      <div className="relative">
                        <input
                          type="number" min="0" step="0.01"
                          value={product.price}
                          onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                          placeholder="0.00"
                          className={`w-full bg-white border-2 ${errors[`${idx}_price`] ? 'border-red-100' : 'border-slate-100'} rounded-2xl py-3 px-12 text-sm font-bold focus:border-[#00BCD4] outline-none transition-all`}
                        />
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      </div>
                      {errors[`${idx}_price`] && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors[`${idx}_price`]}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Stock Quantity</label>
                      <div className="relative">
                        <input
                          type="number" min="0"
                          value={product.stock}
                          onChange={(e) => updateProduct(product.id, 'stock', e.target.value)}
                          placeholder="0"
                          className={`w-full bg-white border-2 ${errors[`${idx}_stock`] ? 'border-red-100' : 'border-slate-100'} rounded-2xl py-3 px-12 text-sm font-bold focus:border-[#00BCD4] outline-none transition-all`}
                        />
                        <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      </div>
                      {errors[`${idx}_stock`] && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors[`${idx}_stock`]}</p>}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Description (Optional)</label>
                    <textarea
                      value={product.description}
                      onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                      placeholder="Describe your product, materials used, dimensions..."
                      maxLength={200}
                      className="w-full bg-white border-2 border-slate-100 rounded-2xl py-3 px-6 text-sm font-medium focus:border-[#00BCD4] outline-none transition-all h-24 resize-none"
                    />
                  </div>
                </div>
              ))}

              {/* Add Product Button */}
              <button
                type="button"
                onClick={addProduct}
                className="w-full flex items-center justify-center gap-3 py-4 border-2 border-dashed border-[#00BCD4] rounded-3xl text-[#00BCD4] font-black text-sm uppercase tracking-widest hover:bg-cyan-50 transition-all"
              >
                <Plus size={18} /> Add Another Product
              </button>

              <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-2xl border border-cyan-100">
                <AlertCircle size={16} className="text-[#00BCD4] shrink-0 mt-0.5" />
                <p className="text-xs text-cyan-800 font-medium">You can add more products and manage your full inventory from your seller dashboard after approval.</p>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              STEP 6 – Review & Submit
          ══════════════════════════════════════ */}
          {step === 6 && (
            <div className="animate-fade-in space-y-8">
              <StepHeader icon={<CheckCircle2 size={20} />} title="Review Your Application" subtitle="Everything look good? Submit when ready." />

              {/* Shop Preview Card */}
              <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100">
                <div className="flex gap-6 items-center mb-8 border-b border-slate-200 pb-8">
                  {previews.profile
                    ? <img src={previews.profile} className="w-24 h-24 rounded-[32px] object-cover shadow-lg border-4 border-white" alt="shop" />
                    : <div className="w-24 h-24 rounded-[32px] bg-slate-200 flex items-center justify-center"><Store size={32} className="text-slate-400" /></div>
                  }
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">{formData.shopName || '—'}</h3>
                    <p className="text-[#00BCD4] font-black text-xs uppercase tracking-widest">{formData.specialty}</p>
                    <p className="text-slate-400 font-bold text-sm mt-1">{formData.firstName} {formData.lastName}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <ReviewRow label="City" value={formData.city} />
                  <ReviewRow label="Experience" value={formData.experience} />
                  <ReviewRow label="Payment" value={formData.paymentMethod === 'bank' ? `Bank Transfer – ${formData.bankName}` : formData.paymentMethod === 'cmi' ? `Mobile – ${formData.cmiPhone}` : 'Cash on Pickup'} />
                  <ReviewRow label="Products" value={`${products.length} product${products.length !== 1 ? 's' : ''} listed`} />
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px] block mb-2">Short Bio</span>
                    <p className="text-slate-600 font-medium text-sm italic">"{formData.bio}"</p>
                  </div>
                </div>
              </div>

              {/* Products Summary */}
              {products.some(p => p.name) && (
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Products to be listed</h4>
                  {products.filter(p => p.name).map((p, i) => (
                    <div key={p.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      {p.imagePreview
                        ? <img src={p.imagePreview} className="w-12 h-12 rounded-xl object-cover" alt={p.name} />
                        : <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center"><Package size={18} className="text-slate-400" /></div>
                      }
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-slate-900 text-sm truncate">{p.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{p.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-[#00BCD4] text-sm">{p.price ? `${Number(p.price).toLocaleString()} USD` : '—'}</p>
                        <p className="text-[10px] text-slate-400 font-bold">Stock: {p.stock || 0}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-cyan-50 border border-cyan-100 p-6 rounded-3xl flex gap-4 items-start">
                <AlertCircle className="text-[#00BCD4] shrink-0" />
                <p className="text-sm text-cyan-800 font-medium leading-relaxed">
                  Your account will be reviewed within 24-48h by our verification team to ensure the authenticity of your craft.
                </p>
              </div>
            </div>
          )}

          {/* ── Navigation Buttons ── */}
          <div className="mt-12 flex items-center justify-between gap-4">
            {step > 1 && !isSubmitting && (
              <button type="button" onClick={prevStep}
                className="flex items-center gap-2 text-slate-900 font-black uppercase text-xs tracking-widest px-6 py-2 hover:bg-slate-50 rounded-xl transition-all">
                <ArrowLeft size={16} /> Back
              </button>
            )}
            <div className="flex-1" />
            {step < TOTAL_STEPS ? (
              <button type="button" onClick={nextStep}
                className="bg-[#00BCD4] text-white px-10 py-4 rounded-full font-black flex items-center gap-2 shadow-lg hover:bg-[#0097a7] transition-all">
                Continue <ArrowRight size={18} />
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting}
                className="bg-[#00BCD4] text-white px-10 py-4 rounded-full font-black flex items-center gap-2 shadow-lg hover:bg-[#0097a7] transition-all disabled:opacity-50">
                {isSubmitting
                  ? <><span>Processing</span> <Loader2 size={18} className="animate-spin" /></>
                  : <><span>Submit Application</span> <CheckIcon size={18} /></>
                }
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   REUSABLE SUB-COMPONENTS
───────────────────────────────────────────── */
const StepHeader = ({ icon, title, subtitle }) => (
  <div className="flex items-center gap-4 mb-2 pb-6 border-b border-slate-100">
    <div className="w-10 h-10 rounded-2xl bg-cyan-50 flex items-center justify-center text-[#00BCD4] flex-shrink-0">
      {icon}
    </div>
    <div>
      <h2 className="text-lg font-black text-slate-900 leading-tight">{title}</h2>
      <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
    </div>
  </div>
);

const ReviewRow = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-slate-400 font-bold uppercase text-[10px]">{label}</span>
    <span className="text-slate-900 font-black">{value || '—'}</span>
  </div>
);

const InputGroup = ({ label, name, type = 'text', icon, value, onChange, error, placeholder }) => (
  <div>
    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</label>
    <div className="relative">
      <input
        name={name} type={type} value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full bg-slate-50 border-2 ${error ? 'border-red-100' : 'border-slate-100'} rounded-2xl py-3 px-12 text-sm font-bold focus:border-[#00BCD4] focus:bg-white outline-none transition-all`}
      />
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${error ? 'text-red-400' : 'text-slate-400'}`}>{icon}</div>
    </div>
    {error && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{error}</p>}
  </div>
);

const SelectGroup = ({ label, name, options, value, onChange, error }) => (
  <div>
    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</label>
    <select
      name={name} value={value} onChange={onChange}
      className={`w-full bg-slate-50 border-2 ${error ? 'border-red-100' : 'border-slate-100'} rounded-2xl py-3 px-6 text-sm font-bold focus:border-[#00BCD4] focus:bg-white outline-none appearance-none transition-all`}
    >
      <option value="">Select Option</option>
      {options.map(opt => <option key={opt} value={opt.toLowerCase()}>{opt}</option>)}
    </select>
    {error && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{error}</p>}
  </div>
);

export default SellerRegisterPage;
