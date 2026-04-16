import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Package, ShoppingBag, DollarSign, Settings, LogOut, Plus, Edit, Trash2, Camera, Upload, CheckCircle } from 'lucide-react';

export default function SellerDashboard() {
  const { user, loading, logout, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Products
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', description: '', price: '', stock: '' });
  const fileRef = useRef(null);

  // Orders
  const [orders, setOrders] = useState([
    { id: 'ORD-001', product: 'Blue Ceramic Vase', client: 'Ahmed M.', amount: 450, date: '2026-04-10', status: 'Pending' },
    { id: 'ORD-002', product: 'Leather Bag', client: 'Salma T.', amount: 850, date: '2026-04-11', status: 'Shipped' },
    { id: 'ORD-003', product: 'Argan Oil', client: 'Nadia B.', amount: 250, date: '2026-04-11', status: 'Delivered' },
    { id: 'ORD-004', product: 'Azilal Carpet', client: 'Youssef K.', amount: 2800, date: '2026-04-12', status: 'Pending' }
  ]);

  // Settings
  const [settingsData, setSettingsData] = useState({
    name: '', shopName: '', bio: '', city: '', specialty: '', whatsapp: '', avatar: ''
  });
  const profileImageRef = useRef(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem('artisan_products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  useEffect(() => {
    if (user && !loading) {
      setSettingsData({
        name: user.name || '',
        shopName: user.shopName || '',
        bio: user.bio || '',
        city: user.city || '',
        specialty: user.specialty || '',
        whatsapp: user.whatsapp || '',
        avatar: user.avatar || ''
      });
    }
  }, [user, loading]);

  if (loading) return <div className="p-8 text-center text-[#00BCD4] font-bold text-xl">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  const handleLogout = () => logout();

  // Add Product Modal Logics
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock) {
      alert("Please fill all required fields");
      return;
    }
    const created = {
      id: Date.now(),
      ...newProduct,
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=200&q=80'
    };
    const updated = [created, ...products];
    setProducts(updated);
    localStorage.setItem('artisan_products', JSON.stringify(updated));
    setIsAddModalOpen(false);
    setNewProduct({ name: '', category: '', description: '', price: '', stock: '' });
  };
  
  const handleDeleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('artisan_products', JSON.stringify(updated));
  };

  // Settings Logics
  const handleSaveSettings = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...settingsData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    if (setUser) setUser(updatedUser);
    alert('Settings saved successfully!');
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setSettingsData({ ...settingsData, avatar: URL.createObjectURL(file) });
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'My Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'finances', label: 'Finances', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const totalRevenue = orders.reduce((acc, o) => acc + o.amount, 0);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-100 flex flex-col shrink-0 text-slate-800 shadow-sm z-10">
        <div className="p-8 text-center border-b border-slate-100 relative">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#00BCD4]/10 to-transparent"></div>
          <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full mb-4 overflow-hidden border-4 border-white shadow-lg relative z-10">
            {settingsData.avatar ? (
              <img src={settingsData.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#00BCD4] font-black text-2xl">
                {user.name && user.name[0]}
              </div>
            )}
          </div>
          <h2 className="font-heading text-lg font-black">{user.shopName || user.name || 'Shop Name'}</h2>
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#00BCD4] mt-1">{user.role}</p>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${
                activeTab === item.id 
                  ? 'bg-[#00BCD4] text-white shadow-md' 
                  : 'text-slate-500 hover:bg-cyan-50 hover:text-[#00BCD4]'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100 leading-none">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-bold text-xs uppercase tracking-widest"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto page-enter animate-fade-in">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black text-slate-900">Dashboard Overview</h1>
                <button onClick={() => setIsAddModalOpen(true)} className="bg-[#00BCD4] text-white px-5 py-2.5 rounded-full font-bold shadow-lg flex items-center gap-2 hover:bg-[#0097a7] transition-all">
                  <Plus size={18} /> Add Product
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { title: 'Total Products', value: products.length, icon: <Package size={20}/> },
                  { title: 'Pending Orders', value: orders.filter(o => o.status === 'Pending').length, icon: <ShoppingBag size={20}/> },
                  { title: 'Revenue (USD)', value: totalRevenue, icon: <DollarSign size={20}/> },
                  { title: 'Total Sales', value: orders.length, icon: <LayoutDashboard size={20}/> },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan-50 text-[#00BCD4] rounded-2xl flex items-center justify-center shrink-0">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.title}</p>
                      <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value.toLocaleString()}</h3>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8">
                <h3 className="font-heading text-lg font-black mb-6">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                      <tr className="text-[10px] font-black text-slate-400 uppercase border-b border-slate-100">
                        <th className="pb-4">Product</th>
                        <th className="pb-4">Client</th>
                        <th className="pb-4">Amount (USD)</th>
                        <th className="pb-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {orders.map(o => (
                        <tr key={o.id}>
                          <td className="py-4 font-bold text-slate-900">{o.product}</td>
                          <td className="py-4 text-slate-500">{o.client}</td>
                          <td className="py-4 font-black">{o.amount}</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                              o.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                              o.status === 'Shipped' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                            }`}>{o.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black text-slate-900">My Products</h1>
                <button onClick={() => setIsAddModalOpen(true)} className="bg-[#00BCD4] text-white px-5 py-2.5 rounded-full font-bold shadow-lg flex items-center gap-2 hover:bg-[#0097a7] transition-all">
                  <Plus size={18} /> Add Product
                </button>
              </div>

              <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8">
                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="mx-auto text-slate-300 mb-4" size={48} />
                    <p className="text-slate-500 font-medium">You don't have any products yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead>
                        <tr className="text-[10px] font-black text-slate-400 uppercase border-b border-slate-100">
                          <th className="pb-4">Product</th>
                          <th className="pb-4">Category</th>
                          <th className="pb-4">Price (USD)</th>
                          <th className="pb-4">Stock</th>
                          <th className="pb-4">Status</th>
                          <th className="pb-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {products.map(p => (
                          <tr key={p.id}>
                            <td className="py-4 flex items-center gap-3">
                              <img src={p.image} className="w-10 h-10 rounded-xl object-cover" alt="product"/>
                              <span className="font-bold text-slate-900">{p.name}</span>
                            </td>
                            <td className="py-4 text-[10px] font-bold uppercase">{p.category}</td>
                            <td className="py-4 font-black text-[#00BCD4]">{p.price}</td>
                            <td className="py-4 font-medium text-slate-500">{p.stock}</td>
                            <td className="py-4">
                              <span className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded-full text-[10px] font-black uppercase">
                                {p.status || 'Published'}
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button className="p-2 text-slate-400 hover:text-[#00BCD4] hover:bg-cyan-50 rounded-xl transition-all"><Edit size={16}/></button>
                                <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={16}/></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-8">
              <h1 className="text-3xl font-black text-slate-900">Manage Orders</h1>
              <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                      <tr className="text-[10px] font-black text-slate-400 uppercase border-b border-slate-100">
                        <th className="pb-4">Order ID</th>
                        <th className="pb-4">Product</th>
                        <th className="pb-4">Client</th>
                        <th className="pb-4">Amount (USD)</th>
                        <th className="pb-4">Date</th>
                        <th className="pb-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {orders.map(o => (
                        <tr key={o.id}>
                          <td className="py-4 text-[10px] font-black text-[#00BCD4]">{o.id}</td>
                          <td className="py-4 font-bold text-slate-900">{o.product}</td>
                          <td className="py-4 font-medium text-slate-500">{o.client}</td>
                          <td className="py-4 font-black">{o.amount}</td>
                          <td className="py-4 text-xs font-bold text-slate-400">{o.date}</td>
                          <td className="py-4">
                            <select 
                              value={o.status}
                              onChange={(e) => {
                                const newOrders = orders.map(ord => ord.id === o.id ? {...ord, status: e.target.value} : ord);
                                setOrders(newOrders);
                              }}
                              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border-2 outline-none cursor-pointer ${
                                o.status === 'Delivered' ? 'border-green-100 bg-green-50 text-green-600' :
                                o.status === 'Shipped' ? 'border-blue-100 bg-blue-50 text-blue-600' : 'border-amber-100 bg-amber-50 text-amber-600'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FINANCES */}
          {activeTab === 'finances' && (
            <div className="space-y-8">
              <h1 className="text-3xl font-black text-slate-900">Finances</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 flex flex-col justify-center items-center text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Total Earned</p>
                  <h2 className="text-6xl font-black text-[#00BCD4] mb-2">{totalRevenue} <span className="text-2xl">USD</span></h2>
                  <p className="text-sm font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full mt-2">+12.5% this month</p>
                </div>
                
                <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Revenue over 6 Months</h4>
                  <div className="h-40 flex items-end justify-between gap-4">
                    {[{m:'Nov',v:40},{m:'Dec',v:60},{m:'Jan',v:30},{m:'Feb',v:70},{m:'Mar',v:50},{m:'Apr',v:85}].map((d,i) => (
                      <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group">
                        <div className="w-full max-w-[40px] bg-cyan-100 group-hover:bg-[#00BCD4] rounded-t-lg transition-all relative" style={{height: `${d.v}%`}}>
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-[#00BCD4] opacity-0 group-hover:opacity-100">{d.v}00</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 mt-2">{d.m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8">
                  <h3 className="font-heading text-lg font-black mb-6">Payment Method</h3>
                  <div className="bg-slate-50 p-6 rounded-2xl space-y-2 mb-6">
                    <p className="text-xs font-bold text-slate-500">Current Method: <span className="text-slate-900 font-black">Bank Transfer</span></p>
                    <p className="text-xs font-bold text-slate-500">Bank: <span className="text-slate-900 font-black">Attijariwafa Bank</span></p>
                    <p className="text-xs font-bold text-slate-500">IBAN: <span className="text-slate-900 font-black">MA64 ************ 9482</span></p>
                  </div>
                  <button className="text-[10px] font-black text-[#00BCD4] uppercase tracking-widest hover:underline">Update payment info</button>
                </div>
                
                <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 flex flex-col justify-center">
                  <h3 className="font-heading text-lg font-black mb-6">Next Payout</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">Scheduled Date</p>
                      <p className="text-xs font-medium text-slate-500">15 April 2026</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-[#00BCD4]">1,200 USD</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Processing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-8 max-w-3xl">
              <h1 className="text-3xl font-black text-slate-900">Shop Settings</h1>
              <form onSubmit={handleSaveSettings} className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 space-y-6">
                
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                  <div className="w-24 h-24 rounded-full bg-slate-100 overflow-hidden relative border-4 border-white shadow-sm">
                    {settingsData.avatar ? (
                      <img src={settingsData.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-cyan-50 text-[#00BCD4]"><Camera size={24}/></div>
                    )}
                  </div>
                  <div>
                    <input type="file" ref={profileImageRef} accept="image/*" className="hidden" onChange={handleProfileImageUpload} />
                    <button type="button" onClick={() => profileImageRef.current?.click()} className="text-xs font-black uppercase tracking-widest bg-cyan-50 text-[#00BCD4] px-4 py-2 rounded-lg hover:bg-[#00BCD4] hover:text-white transition-all">
                      Change Photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                    <input value={settingsData.name} onChange={e => setSettingsData({...settingsData, name: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 px-6 text-sm font-bold focus:border-[#00BCD4] focus:bg-white outline-none transition-all"/>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Shop Name</label>
                    <input value={settingsData.shopName} onChange={e => setSettingsData({...settingsData, shopName: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 px-6 text-sm font-bold focus:border-[#00BCD4] focus:bg-white outline-none transition-all"/>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">City</label>
                    <input value={settingsData.city} onChange={e => setSettingsData({...settingsData, city: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 px-6 text-sm font-bold focus:border-[#00BCD4] focus:bg-white outline-none transition-all"/>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Specialty</label>
                    <input value={settingsData.specialty} onChange={e => setSettingsData({...settingsData, specialty: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 px-6 text-sm font-bold focus:border-[#00BCD4] focus:bg-white outline-none transition-all"/>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">WhatsApp Number</label>
                  <input value={settingsData.whatsapp} onChange={e => setSettingsData({...settingsData, whatsapp: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 px-6 text-sm font-bold focus:border-[#00BCD4] focus:bg-white outline-none transition-all"/>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Shop Bio</label>
                  <textarea value={settingsData.bio} onChange={e => setSettingsData({...settingsData, bio: e.target.value})} className="w-full h-32 resize-none bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 px-6 text-sm font-medium focus:border-[#00BCD4] focus:bg-white outline-none transition-all"/>
                </div>

                <button type="submit" className="w-full bg-[#00BCD4] text-white py-4 rounded-2xl font-black shadow-lg hover:bg-[#0097a7] transition-all flex justify-center items-center gap-2">
                  <CheckCircle size={18} /> Save Changes
                </button>
              </form>
            </div>
          )}
          
        </div>
      </main>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-8 relative">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Add New Product</h2>
            
            <form onSubmit={handleAddProduct} className="space-y-6">
              
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Product Photo</label>
                <input type="file" ref={fileRef} accept="image/*" multiple style={{display:'none'}} />
                <div onClick={() => fileRef.current?.click()} className="w-full border-2 border-dashed border-slate-200 hover:border-[#00BCD4] bg-slate-50 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400 hover:text-[#00BCD4] transition-colors cursor-pointer group">
                  <Upload size={32} className="mb-2" />
                  <p className="font-bold text-sm text-slate-600 group-hover:text-[#00BCD4]">Drag & drop or click to upload</p>
                  <p className="text-[10px] uppercase tracking-widest mt-1">Max 4 images • JPG, PNG</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Product Name *</label>
                  <input required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 text-sm font-bold focus:border-[#00BCD4] focus:bg-white outline-none"/>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Category *</label>
                  <select required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 text-sm font-bold focus:border-[#00BCD4] focus:bg-white outline-none appearance-none">
                    <option value="">Select</option>
                    <option value="Pottery">Pottery</option>
                    <option value="Leather">Leather</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Carpets">Carpets</option>
                    <option value="Beauty">Beauty</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Price (USD) *</label>
                  <input required type="number" min="0" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 text-sm font-bold focus:border-[#00BCD4] focus:bg-white outline-none"/>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Stock Quantity *</label>
                  <input required type="number" min="0" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 text-sm font-bold focus:border-[#00BCD4] focus:bg-white outline-none"/>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>
                <textarea value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full h-24 resize-none bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 text-sm font-medium focus:border-[#00BCD4] focus:bg-white outline-none"/>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" className="bg-[#00BCD4] text-white px-8 py-3 rounded-xl font-black shadow-lg hover:bg-[#0097a7] transition-all">Save Product</button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
