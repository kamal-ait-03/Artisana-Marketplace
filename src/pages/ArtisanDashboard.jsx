import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Package, ShoppingBag, User, Plus, Edit, Trash2, X, Upload } from 'lucide-react';
import { mockProducts, categories } from '../data/mockData';

const ArtisanDashboard = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [artisanProducts, setArtisanProducts] = useState([]);

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
    { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
    { id: 'products', label: 'Mes Produits', icon: Package },
    { id: 'orders', label: 'Commandes', icon: ShoppingBag },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <div className="bg-[var(--color-bg)] min-h-screen pt-20">
      <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
        
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
                    ? 'bg-orange-50 text-[var(--color-primary)] border-r-4 border-[var(--color-primary)]' 
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
            <div className="page-enter">
              <h1 className="font-heading text-2xl font-bold mb-8">Vue d'ensemble</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Total Produits</p>
                      <h3 className="font-heading text-3xl font-bold text-[var(--color-text)] mt-1">{artisanProducts.length}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Package size={24} /></div>
                  </div>
                  <span className="text-sm text-green-600 font-medium">+2 ajoutés ce mois</span>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Commandes en attente</p>
                      <h3 className="font-heading text-3xl font-bold text-[var(--color-text)] mt-1">4</h3>
                    </div>
                    <div className="p-3 bg-orange-50 text-[var(--color-primary)] rounded-lg"><ShoppingBag size={24} /></div>
                  </div>
                  <span className="text-sm text-red-500 font-medium whitespace-nowrap">2 urgentes</span>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Revenus du mois</p>
                      <h3 className="font-heading text-3xl font-bold text-[var(--color-text)] mt-1">12 450 <span className="text-lg">MAD</span></h3>
                    </div>
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg"><span className="font-bold text-xl">DH</span></div>
                  </div>
                  <span className="text-sm text-green-600 font-medium">+15% par rapport au mois dernier</span>
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

              <div className="bg-white rounded-xl shadow-sm border border-orange-50 overflow-hidden">
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
                    <tbody className="divide-y divide-gray-100">
                      {artisanProducts.map(product => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="p-4 flex items-center gap-3">
                            <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded object-cover border border-gray-200" />
                            <span className="font-medium text-[var(--color-text)]">{product.name}</span>
                          </td>
                          <td className="p-4 text-gray-600 capitalize">{product.category}</td>
                          <td className="p-4 font-medium text-[var(--color-primary)]">{product.price}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${product.stock > 5 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {product.stock} unités
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button className="text-blue-500 hover:text-blue-700 p-2"><Edit size={18} /></button>
                            <button className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Placeholders for other tabs */}
          {(activeTab === 'orders' || activeTab === 'profile') && (
            <div className="page-enter flex flex-col items-center justify-center h-full text-center opacity-50">
               <h2 className="font-heading text-2xl font-bold mb-2">En cours de développement</h2>
               <p>Cette section sera disponible prochainement.</p>
            </div>
          )}

        </main>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto page-enter border border-orange-50">
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
