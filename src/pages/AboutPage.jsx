import { Link } from 'react-router-dom';
import { Heart, Globe, Shield, Award, ArrowRight, MapPin, Mail, Phone } from 'lucide-react';

const values = [
  {
    icon: <Heart size={28} className="text-[var(--color-primary)]" />,
    title: 'Authenticité',
    desc: 'Chaque produit vendu sur Artisana Shop est certifié authentique et fabriqué à la main par de véritables artisans marocains.',
  },
  {
    icon: <Globe size={28} className="text-[var(--color-primary)]" />,
    title: 'Visibilité Mondiale',
    desc: "Nous offrons une vitrine internationale aux artisans locaux, leur permettant d'atteindre des clients aux quatre coins du monde.",
  },
  {
    icon: <Shield size={28} className="text-[var(--color-primary)]" />,
    title: 'Commerce Équitable',
    desc: "Nous garantissons une rémunération juste pour les artisans. 85% du prix de vente revient directement au créateur.",
  },
  {
    icon: <Award size={28} className="text-[var(--color-primary)]" />,
    title: 'Excellence Artisanale',
    desc: "Chaque artisan est sélectionné et évalué par notre équipe pour garantir la qualité et la pérennité des savoir-faire traditionnels.",
  },
];

const team = [
  {
    name: 'Karim El Mansouri',
    role: 'Co-fondateur & CEO',
    city: 'Casablanca',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    quote: "Notre mission est de mettre l'artisanat marocain au cœur du commerce moderne.",
  },
  {
    name: 'Salma Benali',
    role: 'Co-fondatrice & Design Lead',
    city: 'Marrakech',
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf78c?q=80&w=300&auto=format&fit=crop',
    quote: 'Chaque interface que nous créons doit refléter la beauté et la chaleur de notre culture.',
  },
  {
    name: 'Amine Tazi',
    role: 'Directeur Artisans',
    city: 'Fès',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    quote: 'Je veille chaque jour à ce que nos artisans soient accompagnés, valorisés et respectés.',
  },
];

const milestones = [
  { year: '2022', event: 'Fondation d\'Artisana Shop à Casablanca' },
  { year: '2023', event: 'Lancement avec 50 artisans pionniers et 500 produits' },
  { year: '2024', event: '1 000 artisans actifs, premières livraisons internationales' },
  { year: '2025', event: 'Extension à 12 villes marocaines, 2 000+ créations en ligne' },
  { year: '2026', event: 'Partenariat officiel FIFA World Cup 2030 — Artisana Maroc' },
];

const AboutPage = () => {
  return (
    <div className="bg-[var(--color-bg)] min-h-screen">

      {/* Hero */}
      <section className="relative bg-[var(--color-primary)] text-white pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-zellige pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="font-accent text-[var(--color-secondary)] tracking-widest uppercase text-sm mb-4 block">
              Notre Histoire
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Artisana Shop,<br />
              <span className="text-[var(--color-secondary)]">L'Âme du Maroc en Ligne</span>
            </h1>
            <p className="font-body text-white/80 text-lg leading-relaxed max-w-2xl">
              Artisana Shop est née d'un constat simple : les merveilles de l'artisanat marocain méritent d'être partagées avec le monde. Fondée en 2022, notre plateforme connecte les maîtres artisans de Marrakech, Fès, Safi et de tout le Maroc avec des clients qui apprécient la beauté du "fait main".
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/catalogue" className="bg-[var(--color-secondary)] text-white px-8 py-3 rounded font-medium hover:bg-[#b88c3a] transition-colors shadow-lg">
                Voir le Catalogue
              </Link>
              <Link to="/artisans" className="border-2 border-white/50 text-white px-8 py-3 rounded font-medium hover:bg-white/10 transition-colors">
                Nos Artisans
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
              { n: '12', l: 'Villes' },
              { n: '2 000+', l: 'Produits' },
              { n: '15 000+', l: 'Clients Satisfaits' },
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
              <span className="font-accent text-[var(--color-secondary)] tracking-widest uppercase text-sm mb-3 block">Pourquoi nous existons</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-6 leading-tight">
                Numériser l'Artisanat,<br />Préserver le Patrimoine
              </h2>
              <p className="font-body text-gray-600 text-lg leading-relaxed mb-6">
                En perspective de la Coupe du Monde FIFA 2030, le Maroc s'apprête à accueillir le monde entier. Artisana Shop s'engage à faire de ce moment historique une opportunité pour nos artisans de rayonner à une échelle internationale.
              </p>
              <p className="font-body text-gray-600 leading-relaxed">
                Nous croyons que la tradition et la technologie peuvent coexister pour le bien des générations futures. Chaque achat sur notre plateforme contribue directement au maintien de ces savoir-faire millénaires.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop"
                alt="Artisan marocain au travail"
                className="rounded-2xl object-cover w-full h-80 md:h-[420px] shadow-warm-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-[var(--color-secondary)] text-white p-6 rounded-xl shadow-lg hidden md:block">
                <p className="font-heading text-3xl font-bold">85%</p>
                <p className="font-body text-sm text-white/90 mt-1">du prix revient<br/>à l'artisan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">Nos Valeurs</h2>
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">Notre Parcours</h2>
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">Notre Équipe</h2>
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Contactez-nous</h2>
            <p className="font-body text-white/80 mb-10">Une question ? Une idée de partenariat ? Nous sommes là pour vous.</p>
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
              Rejoindre la Plateforme <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
