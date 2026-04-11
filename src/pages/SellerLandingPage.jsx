import { Link } from 'react-router-dom';
import { Globe, Layout, Headset, ArrowRight, UserPlus, Package, Check } from 'lucide-react';
import { artisans } from '../data/mockData';

const SellerLandingPage = () => {
  const stats = [
    { label: "Artisans", value: "500+" },
    { label: "Sales", value: "24k+" },
    { label: "Cities", value: "12" },
    { label: "Fee 1st month", value: "0%" }
  ];

  const steps = [
    { number: 1, title: "Create your profile", desc: "Share your story and showcase your craftsmanship." },
    { number: 2, title: "List your products", desc: "Add photos and details of your unique creations." },
    { number: 3, title: "Receive orders", desc: "Manage sales and ship your art to global customers." }
  ];

  const benefits = [
    { 
      title: "Global Reach", 
      icon: <Globe className="text-[#00BCD4]" size={32} />, 
      desc: "Connect with art lovers from around the world looking for authentic Moroccan crafts." 
    },
    { 
      title: "Simple Dashboard", 
      icon: <Layout className="text-[#00BCD4]" size={32} />, 
      desc: "An intuitive interface designed for artisans to manage products and track sales easily." 
    },
    { 
      title: "Dedicated Support", 
      icon: <Headset className="text-[#00BCD4]" size={32} />, 
      desc: "Our team is here to help you every step of the way, from setup to scaling your shop." 
    }
  ];

  const featuredTestimonials = artisans.slice(0, 3).map(artisan => ({
    ...artisan,
    quote: artisan.id === 'a1' ? "Artisana has transformed my small workshop in Safi into a global brand." : 
           artisan.id === 'a2' ? "The platform makes it so easy to focus on my weaving while handle the sales." :
           "I can finally share our family's leather traditions with the world directly."
  }));

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-32 bg-gradient-to-br from-[#E0F7FA] via-white to-[#E0F7FA] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-zellige pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Sell Your <span className="text-[#00BCD4]">Craft</span> to the World
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium">
            Join 500+ Moroccan artisans already selling on Artisana and turn your passion into a global business.
          </p>
          <Link 
            to="/seller-register"
            className="inline-flex items-center gap-3 bg-[#00BCD4] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#0097a7] transition-all hover:scale-105 active:scale-95"
          >
            Start Selling <ArrowRight size={20} />
          </Link>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-3xl font-black text-[#00BCD4]">{stat.value}</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">How it works</h2>
            <div className="w-20 h-1.5 bg-[#00BCD4] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center text-[#00BCD4] text-2xl font-black mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-[70%] w-[60%] h-0.5 bg-slate-200 border-dashed" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Why Artisana?</h2>
            <p className="text-slate-500 font-medium">We provide everything you need to grow your artisanal business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 hover:border-[#00BCD4]/30 hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-8 transition-transform group-hover:rotate-6 group-hover:scale-110">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{benefit.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-full w-32 opacity-10 bg-zellige pointer-events-none" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Voice of Artisans</h2>
            <p className="text-slate-500 font-medium underline decoration-[#00BCD4] decoration-2 underline-offset-4">Join our community of masters</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredTestimonials.map((artisan, i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <img 
                  src={artisan.avatar} 
                  alt={artisan.name} 
                  className="w-24 h-24 rounded-[32px] object-cover mb-6 border-4 border-slate-50 shadow-md"
                />
                <p className="text-slate-600 font-medium italic mb-6 leading-relaxed">"{artisan.quote}"</p>
                <div className="mt-auto">
                  <h4 className="font-bold text-slate-900 text-lg">{artisan.name}</h4>
                  <p className="text-xs font-black text-[#00BCD4] uppercase tracking-widest">{artisan.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-zellige pointer-events-none invert" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to share your art with the world?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Take the first step today and join the most authentic Moroccan marketplace.
          </p>
          <Link 
            to="/seller-register"
            className="inline-flex items-center gap-3 bg-[#00BCD4] text-white px-10 py-5 rounded-full font-black text-lg shadow-xl hover:bg-[#0097a7] transition-all hover:translate-y-[-4px]"
          >
            Create Seller Account <UserPlus size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SellerLandingPage;
