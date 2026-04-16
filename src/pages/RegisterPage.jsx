import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Loader2, Store } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client' // 'client' or 'artisan'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { register, setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(formData);
      navigate('/');
    } catch (error) {
      console.error(error);
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
        role: "client" // or formData.role, but user requested 'client' specifically in prompt
      };
      localStorage.setItem('user', JSON.stringify(googleUser));
      if (setUser) setUser(googleUser);
      alert("Logged in with Google ✓");
      navigate(googleUser.role === 'artisan' ? '/dashboard' : '/');
    }, 1500);
  };

  return (
    <div className="bg-[var(--color-bg)] min-h-screen flex flex-col justify-center items-center py-20 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zellige opacity-5 pointer-events-none rounded-full"></div>
      
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

      <div className="w-full max-w-md bg-white rounded-2xl shadow-warm border border-orange-50 p-8 relative z-10 page-enter">
        <h2 className="font-heading text-2xl font-bold text-center mb-6">Create an Account</h2>
        
        {/* Role Toggle */}
        <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-md flex justify-center items-center gap-2 transition-all ${
              formData.role === 'client' ? 'bg-white text-[var(--color-primary)] shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setFormData(prev => ({ ...prev, role: 'client' }))}
          >
            <User size={16} /> Client
          </button>
          <button
             type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-md flex justify-center items-center gap-2 transition-all ${
              formData.role === 'artisan' ? 'bg-white text-[var(--color-primary)] shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setFormData(prev => ({ ...prev, role: 'artisan' }))}
          >
            <Store size={16} /> Artisan
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User size={18} />
              </div>
              <input 
                type="text" 
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all" 
                placeholder="Ahmed Benkirane" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all" 
                placeholder="your@email.com" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required
                minLength={8}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all" 
                placeholder="••••••••" 
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">At least 8 characters.</p>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#6b3510] transition-colors shadow-sm disabled:opacity-70 mt-6"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Create my Account'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <button 
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="w-full border border-gray-300 bg-white text-gray-700 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors disabled:opacity-70"
        >
          {isGoogleLoading ? (
            <Loader2 className="animate-spin text-gray-400" size={20} />
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

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[var(--color-primary)] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
