import { useAuth } from '../context/AuthContext';
import { Package, MapPin, Clock, CheckCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
    const { user } = useAuth();

    // Mock orders data for demonstration
    const mockOrders = [
        {
            id: 'ORD-7392-MA',
            date: 'October 12, 2023',
            total: 245.00,
            status: 'Delivered',
            items: [
                { name: 'Safi Ceramic Plate', price: 45.00, qty: 1, image: '/categories/pottery.jpg' },
                { name: 'Beni Ouarain Rug', price: 200.00, qty: 1, image: '/categories/carpets.jpg' }
            ]
        },
        {
            id: 'ORD-8941-MA',
            date: 'November 05, 2023',
            total: 85.50,
            status: 'Processing',
            items: [
                { name: 'Argan Oil Set', price: 85.50, qty: 1, image: '/categories/beauty.jpg' }
            ]
        }
    ];

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <Package size={64} className="text-slate-300 mb-6" />
                <h2 className="text-2xl font-black text-slate-800 mb-2">Please Login</h2>
                <p className="text-slate-500 mb-6">You need to log in to view your orders.</p>
                <Link to="/login" className="bg-[#00B4D8] text-white px-8 py-3 rounded-full font-bold">Log In</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
            <div className="bg-[var(--color-card)] rounded-[40px] p-6 md:p-10 shadow-sm border border-slate-100">
                <h1 className="text-3xl font-black text-slate-900 mb-8">My Orders</h1>
                
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-100 pb-6 mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Order History</h2>
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" placeholder="Search orders..." className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:border-[#00B4D8] outline-none" />
                    </div>
                </div>

                <div className="space-y-6">
                    {mockOrders.map(order => (
                        <div key={order.id} className="border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 border-b border-slate-50 pb-4">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Order <span className="font-bold text-slate-900">{order.id}</span></p>
                                    <p className="text-xs text-slate-400">Placed on {order.date}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-lg font-black text-slate-900">${order.total.toFixed(2)}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                                        order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-[#00B4D8]'
                                    }`}>
                                        {order.status === 'Delivered' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                                            <p className="text-xs text-slate-500">Qty: {item.qty}</p>
                                        </div>
                                        <div className="font-bold text-slate-700 text-sm">
                                            ${item.price.toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
};

export default OrdersPage;