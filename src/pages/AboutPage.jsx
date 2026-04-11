import { Link } from 'react-router-dom';
import { Heart, Globe, Shield, Award, ArrowRight, MapPin, Mail, Phone } from 'lucide-react';

const values = [
  {
    icon: <Heart size={28} className="text-[var(--color-primary)]" />,
    title: 'Authenticity',
    desc: 'Every product sold on Artisana Shop is certified authentic and handmade by real Moroccan artisans.',
  },
  {
    icon: <Globe size={28} className="text-[var(--color-primary)]" />,
    title: 'Global Visibility',
    desc: "We offer an international showcase for local artisans, allowing them to reach customers all over the world.",
  },
  {
    icon: <Shield size={28} className="text-[var(--color-primary)]" />,
    title: 'Fair Trade',
    desc: "We guarantee fair compensation for artisans. 85% of the selling price goes directly to the creator.",
  },
  {
    icon: <Award size={28} className="text-[var(--color-primary)]" />,
    title: 'Artisan Excellence',
    desc: "Each artisan is selected and evaluated by our team to guarantee the quality and sustainability of traditional craftsmanship.",
  },
];

const team = [
  {
    name: 'Karim El Mansouri',
    role: 'Co-founder & CEO',
    city: 'Casablanca',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    quote: "Our mission is to put Moroccan craftsmanship at the heart of modern commerce.",
  },
  {
    name: 'Salma Benali',
    role: 'Co-founder & Design Lead',
    city: 'Marrakech',
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf78c?q=80&w=300&auto=format&fit=crop',
    quote: "Every interface we create must reflect the beauty and warmth of our culture.",
  },
  {
    name: 'Amine Tazi',
    role: 'Artisan Director',
    city: 'Fez',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    quote: "I ensure every day that our artisans are supported, valued, and respected.",
  },
];

const milestones = [
  { year: '2022', event: 'Foundation of Artisana Shop in Casablanca' },
  { year: '2023', event: 'Launch with 50 pioneer artisans and 500 products' },
  { year: '2024', event: '1,000 active artisans, first international deliveries' },
  { year: '2025', event: 'Expansion to 12 Moroccan cities, 2,000+ creations online' },
  { year: '2026', event: 'Official partnership FIFA World Cup 2030 — Artisana Morocco' },
];

const AboutPage = () => {
  return (
    <div className="bg-[var(--color-bg)] min-h-screen pt-20">

      {/* Hero */}
      <section className="relative bg-[var(--color-primary)] text-white pt-8 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-zellige pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="font-accent text-[var(--color-secondary)] tracking-widest uppercase text-sm mb-4 block">
              Our Story
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Artisana Shop,<br />
              <span className="text-[var(--color-secondary)]">The Soul of Morocco Online</span>
            </h1>
            <p className="font-body text-white/80 text-lg leading-relaxed max-w-2xl">
              Artisana Shop was born from a simple observation: the wonders of Moroccan craftsmanship deserve to be shared with the world. Founded in 2022, our platform connects master artisans from Marrakech, Fez, Safi and all over Morocco with customers who appreciate the beauty of "handmade".
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/catalog" className="bg-[var(--color-secondary)] text-white px-8 py-3 rounded font-medium hover:bg-[#b88c3a] transition-colors shadow-lg">
                View Catalog
              </Link>
              <Link to="/artisans" className="border-2 border-white/50 text-white px-8 py-3 rounded font-medium hover:bg-white/10 transition-colors">
                Our Artisans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-white py-10 border-b border-orange-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { n: '500+', l: 'Artisans' },
              { n: '12', l: 'Cities' },
              { n: '2 000+', l: 'Products' },
              { n: '15 000+', l: 'Happy Clients' },
            ].map(s => (
              <div key={s.l}>
                <p className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-primary)]">{s.n}</p>
                <p className="font-accent text-xs text-gray-500 uppercase tracking-wider mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-[var(--color-bg)]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-accent text-[var(--color-secondary)] tracking-widest uppercase text-sm mb-3 block">Why we exist</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-6 leading-tight">
                Digitizing Craftsmanship,<br />Preserving Heritage
              </h2>
              <p className="font-body text-gray-600 text-lg leading-relaxed mb-6">
                In anticipation of the FIFA World Cup 2030, Morocco is preparing to welcome the world. Artisana Shop is committed to making this historic moment an opportunity for our artisans to shine on an international scale.
              </p>
              <p className="font-body text-gray-600 leading-relaxed">
                We believe that tradition and technology can coexist for the benefit of future generations. Every purchase on our platform directly contributes to maintaining these ancient skills.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop"
                alt="Moroccan artisan at work"
                className="rounded-2xl object-cover w-full h-80 md:h-[420px] shadow-warm-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-[var(--color-secondary)] text-white p-6 rounded-xl shadow-lg hidden md:block">
                <p className="font-heading text-3xl font-bold">85%</p>
                <p className="font-body text-sm text-white/90 mt-1">of the price goes<br/>to the artisan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">Our Values</h2>
            <div className="h-1 w-24 bg-[var(--color-secondary)] mx-auto rounded" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(v => (
              <div key={v.title} className="bg-[var(--color-bg)] rounded-2xl p-8 shadow-sm hover:shadow-warm transition-shadow">
                <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-5">
                  {v.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-3">{v.title}</h3>
                <p className="font-body text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[var(--color-bg)]">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">Our Journey</h2>
            <div className="h-1 w-24 bg-[var(--color-secondary)] mx-auto rounded" />
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-orange-200" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-8 items-start relative">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-heading font-bold text-sm flex-shrink-0 shadow-warm z-10">
                    {m.year}
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm flex-1 mt-2">
                    <p className="font-body text-gray-700">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">Our Team</h2>
            <div className="h-1 w-24 bg-[var(--color-secondary)] mx-auto rounded" />
          </div>
          <div className="grid sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {team.map(member => (
              <div key={member.name} className="text-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover mx-auto shadow-warm border-4 border-orange-50"
                />
                <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mt-4">{member.name}</h3>
                <p className="font-accent text-xs text-[var(--color-primary)] uppercase tracking-wider mt-1">{member.role}</p>
                <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mt-1">
                  <MapPin size={11} /><span>{member.city}</span>
                </div>
                <p className="font-body text-gray-500 text-sm italic mt-3 leading-relaxed">"{member.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-[var(--color-primary)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-zellige pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
            <p className="font-body text-white/80 mb-10">A question? A partnership idea? We are here for you.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl">
                <Mail size={20} />
                <span className="font-body">contact@artisana.ma</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl">
                <Phone size={20} />
                <span className="font-body">+212 522 123 456</span>
              </div>
            </div>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-[var(--color-secondary)] text-white px-10 py-4 rounded font-medium hover:bg-[#b88c3a] transition-colors shadow-lg"
            >
              Join the Platform <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
