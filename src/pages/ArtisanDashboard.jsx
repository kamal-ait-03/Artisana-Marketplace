import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Package, ShoppingBag, User, Plus, Edit, Trash2, X, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { mockProducts, categories, mockOrders } from '../data/mockData';

const StatCard = ({ title, value, icon, trend, color }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    sky: 'bg-sky-50 text-sky-600',
    cyan: 'bg-cyan-50 text-[#00B4D8]'
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-soft border border-slate-50 transition-all hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{title}</p>
          <h3 className="font-heading text-2xl font-black text-slate-900">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${colors[color] || colors.blue}`}>
          {icon}
        </div>
      </div>
      <p className="text-[10px] font-bold text-slate-500 bg-slate-50 inline-block px-2 py-1 rounded-md">
        {trend}
      </p>
    </div>
  );
};

const DashboardInput = ({ label, value, onChange, placeholder = "", type = "text" }) => (
  <div>
    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</label>
    <input 
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-3 px-6 text-sm font-bold focus:border-[#00B4D8] focus:bg-white outline-none transition-all"
    />
  </div>
);

const ArtisanDashboard = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [artisanProducts, setArtisanProducts] = useState([]);
  
  // Payment & Billing State
  const [paymentInfo, setPaymentInfo] = useState({
    accountHolder: '',
    iban: '',
    provider: 'stripe',
    status: 'pending'
  });
  
  const [billingInfo, setBillingInfo] = useState({
    businessName: '',
    address: '',
    phone: '',
    taxId: ''
  });

  useEffect(() => {
    // Protected route check
    if (!user || role !== 'artisan') {
      navigate('/login');
      return;
    }

    // Mock filtering products by this artisan (using Hassan Safi as mock if user.name matches partially)
    const myProducts = mockProducts.filter(p => p.artisan.name.includes(user.name.split(' ')[0]) || true).slice(0, 5); // Just grab 5 as a mock
    setArtisanProducts(myProducts);
  }, [user, role, navigate]);

  if (!user || role !== 'artisan') return null;

  const handleAddProduct = (e) => {
    e.preventDefault();
    // In a real app, this would append to the database
    setIsAddModalOpen(false);
    alert('Produit ajouté avec succès !');
  };

  const navItems = [
    { id: 'dashboard', label: 'Vue d\'ensemble', icon: LayoutDashboard },
    { id: 'products', label: 'Mes Produits', icon: Package },
    { id: 'orders', label: 'Commandes', icon: ShoppingBag },
    { id: 'finances', label: 'Finances & Paiements', icon: ShoppingBag }, // Reusing icon or change to DollarSign if available
    { id: 'settings', label: 'Configuration', icon: User },
  ];

  return (
    <div className="bg-[var(--color-bg)] min-h-screen pt-20">
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 shrink-0 overflow-y-auto">
          <div className="p-6">
            <h2 className="font-heading text-xl font-bold text-[var(--color-text)] mb-1">Espace Artisan</h2>
            <p className="text-sm text-gray-500 font-body">Bonjour, {user.name}</p>
          </div>
          
          <nav className="mt-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 font-medium transition-colors ${
                  activeTab === item.id 
                    ? 'bg-cyan-50 text-[#00B4D8] border-r-4 border-[#00B4D8]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[var(--color-text)]'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="page-enter animate-fade-in">
              <div className="flex justify-between items-center mb-8">
                <h1 className="font-heading text-2xl font-bold">Performance du Magasin</h1>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Derniers 30 jours</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Produits" value={artisanProducts.length} icon={<Package size={20}/>} trend="+2 ce mois" color="blue" />
                <StatCard title="Ventes Totales" value="156" icon={<ShoppingBag size={20}/>} trend="+12% vs mois dernier" color="emerald" />
                <StatCard title="Revenu Net" value="12 450 MAD" icon={<span className="font-bold">DH</span>} trend="+15%" color="sky" />
                <StatCard title="Commandes" value="48" icon={<LayoutDashboard size={20}/>} trend="4 en attente" color="cyan" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[32px] shadow-soft border border-slate-100">
                  <h3 className="font-heading text-lg font-bold mb-6">Produits les plus vendus</h3>
                  <div className="space-y-4">
                    {artisanProducts.slice(0, 3).map(p => (
                      <div key={p.id} className="flex items-center justify-between border-b border-slate-50 pb-4">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} className="w-10 h-10 rounded-xl object-cover" />
                          <span className="text-sm font-bold text-slate-700">{p.name}</span>
                        </div>
                        <span className="text-sm font-black text-[#00B4D8]">{p.price} MAD</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-8 rounded-[32px] shadow-soft border border-slate-100">
                  <h3 className="font-heading text-lg font-bold mb-6">Statut de vérification</h3>
                  <div className={`p-6 rounded-2xl border flex items-center gap-4 ${paymentInfo.status === 'verified' ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${paymentInfo.status === 'verified' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}>
                      {paymentInfo.status === 'verified' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
                    </div>
                    <div>
                      <h4 className={`font-bold ${paymentInfo.status === 'verified' ? 'text-green-900' : 'text-amber-900'}`}>
                        {paymentInfo.status === 'verified' ? 'Compte Vérifié' : 'Vérification en cours'}
                      </h4>
                      <p className="text-xs font-medium opacity-70">
                        {paymentInfo.status === 'verified' ? 'Vous pouvez retirer vos gains à tout moment.' : 'Vos informations de paiement sont en cours de revue.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === 'products' && (
            <div className="page-enter">
              <div className="flex justify-between items-center mb-8">
                <h1 className="font-heading text-2xl font-bold">Mes Produits</h1>
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-[#6b3510] transition-colors"
                >
                  <Plus size={18} /> Ajouter un produit
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-cyan-50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
                        <th className="p-4 font-medium">Produit</th>
                        <th className="p-4 font-medium">Catégorie</th>
                        <th className="p-4 font-medium">Prix (MAD)</th>
                        <th className="p-4 font-medium">Stock</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {artisanProducts.map(product => (
                        <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="p-4 flex items-center gap-3">
                            <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm" />
                            <div>
                              <p className="font-bold text-slate-900">{product.name}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase">{product.id}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-xs font-bold text-slate-600 capitalize px-2 py-1 bg-slate-100 rounded-lg">{product.category}</span>
                          </td>
                          <td className="p-4 font-black text-slate-900">{product.price} MAD</td>
                          <td className="p-4">
                            <div className="flex flex-col gap-1">
                              <span className={`text-[10px] font-black uppercase ${product.stock > 5 ? 'text-green-600' : 'text-amber-600'}`}>
                                {product.stock} en stock
                              </span>
                              <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full ${product.stock > 5 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${Math.min(product.stock * 5, 100)}%` }} />
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                              product.status === 'published' ? 'bg-cyan-50 text-cyan-600 border-cyan-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                            }`}>
                              {product.status || 'Draft'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-1">
                              <button className="text-slate-400 hover:text-[#00B4D8] p-2 hover:bg-cyan-50 rounded-xl transition-all"><Edit size={18} /></button>
                              <button className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="page-enter animate-fade-in">
              <h1 className="font-heading text-2xl font-bold mb-8">Commandes Entrantes</h1>
              <div className="bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="p-6">Commande</th>
                      <th className="p-6">Client</th>
                      <th className="p-6">Total</th>
                      <th className="p-6">Statut</th>
                      <th className="p-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {mockOrders.map((order, i) => (
                      <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="p-6">
                          <p className="text-sm font-black text-slate-900">#{order.id}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{order.date}</p>
                        </td>
                        <td className="p-6">
                          <p className="text-sm font-bold text-slate-700">{order.customer}</p>
                        </td>
                        <td className="p-6">
                          <p className="text-sm font-black text-[#00B4D8]">{order.total} MAD</p>
                        </td>
                        <td className="p-6">
                          <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full border ${
                            order.status === 'delivered' ? 'bg-green-50 text-green-600 border-green-100' :
                            order.status === 'shipped' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                            'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <button className="text-[10px] font-black uppercase text-[#00B4D8] hover:underline">Gérer</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FINANCES TAB */}
          {activeTab === 'finances' && (
            <div className="page-enter animate-fade-in space-y-8">
              <h1 className="font-heading text-2xl font-bold mb-8">Configuration des Paiements</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[40px] shadow-soft border border-slate-100">
                  <h3 className="font-heading text-xl font-bold mb-6">Informations Bancaires</h3>
                  <div className="space-y-4">
                    <DashboardInput label="Nom du titulaire" value={paymentInfo.accountHolder} onChange={(val) => setPaymentInfo({...paymentInfo, accountHolder: val})} />
                    <DashboardInput label="IBAN / Compte Bancaire" placeholder="MA96..." value={paymentInfo.iban} onChange={(val) => setPaymentInfo({...paymentInfo, iban: val})} />
                    <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-xs font-bold text-slate-500">Devise:</span>
                      <span className="text-xs font-black text-slate-900">Dirham Marocain (MAD)</span>
                    </div>
                    <button className="w-full bg-[#00B4D8] text-white py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-[#0097a7] transition-all">
                      Enregistrer les détails
                    </button>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[40px] shadow-soft border border-slate-100">
                  <h3 className="font-heading text-xl font-bold mb-6">Historique des Gains</h3>
                  <div className="space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div>
                          <p className="text-sm font-black text-slate-900">Virement #{i}482</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Payé le 2{i} Mars</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-green-600">+4 200 MAD</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Vérifié ✓</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS TAB (Billing) */}
          {activeTab === 'settings' && (
            <div className="page-enter animate-fade-in">
              <h1 className="font-heading text-2xl font-bold mb-8">Détails de Facturation</h1>
              <div className="max-w-2xl bg-white p-10 rounded-[40px] shadow-soft border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <DashboardInput label="Nom de l'entreprise" value={billingInfo.businessName} onChange={(val) => setBillingInfo({...billingInfo, businessName: val})} />
                  <DashboardInput label="N° de téléphone" value={billingInfo.phone} onChange={(val) => setBillingInfo({...billingInfo, phone: val})} />
                </div>
                <div className="space-y-6">
                  <DashboardInput label="Adresse complète" value={billingInfo.address} onChange={(val) => setBillingInfo({...billingInfo, address: val})} />
                  <DashboardInput label="Identifiant Fiscal (Optionnel)" value={billingInfo.taxId} onChange={(val) => setBillingInfo({...billingInfo, taxId: val})} />
                  <button className="w-full bg-slate-900 text-white py-4 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all">
                    Mettre à jour les informations
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto page-enter border border-cyan-50">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="font-heading text-xl font-bold">Ajouter un nouveau produit</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="p-6 space-y-6 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Titre du produit</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-[var(--color-primary)] outline-none" placeholder="Ex: Tapis Berbère..." />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Catégorie</label>
                  <select required className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-[var(--color-primary)] outline-none bg-white">
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Description complète</label>
                <textarea required rows="4" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-[var(--color-primary)] outline-none resize-none" placeholder="Décrivez votre produit, les matériaux utilisés, l'histoire..."></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                  <label className="block font-medium text-gray-700 mb-1">Prix (MAD)</label>
                  <input type="number" min="0" required className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-[var(--color-primary)] outline-none" placeholder="0.00" />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Quantité (Stock)</label>
                  <input type="number" min="1" required className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-[var(--color-primary)] outline-none" placeholder="1" />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Photos du produit</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <Upload size={32} className="text-gray-400 mb-3" />
                  <p className="font-medium text-gray-600">Cliquez pour uploader ou glissez vos images ici</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG jusqu'à 5MB (Max 4 images)</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50">
                  Annuler
                </button>
                <button type="submit" className="px-5 py-2 bg-[var(--color-primary)] text-white rounded-md font-medium hover:bg-[#6b3510]">
                  Enregistrer le produit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ArtisanDashboard;
