import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Smartphone, Edit3, Save, Camera, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const ProfilePage = () => {
    const { user, setUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [uploading, setUploading] = useState(false);
    
    const [profileData, setProfileData] = useState({
        name: user?.name || 'Anonymous User',
        email: user?.email || '',
        phone: user?.phone || '+212 600-000000',
        address: user?.address || '123 Artisana St, Marrakech, Morocco',
        avatar_url: user?.avatar_url || null
    });

    const uploadAvatar = async (event) => {
        try {
            setUploading(true);
            const file = event.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('avatar', file);

            const token = localStorage.getItem('access_token');
            const response = await fetch(`${API_BASE_URL}profile/avatar/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) throw new Error('Upload failed');
            const data = await response.json();
            
            const publicUrl = data.avatar_url; // Adjust based on your Django API response
            
            // Update the local state
            setProfileData({ ...profileData, avatar_url: publicUrl });
            if (setUser) setUser({ ...user, avatar_url: publicUrl });
            
            alert('Avatar uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image: ', error.message);
            alert(`Error uploading image: ${error.message}.`);
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        setIsEditing(false);
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${API_BASE_URL}profile/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    full_name: profileData.name,
                    phone: profileData.phone,
                    address: profileData.address
                })
            });
                
            if (!response.ok) throw new Error('Failed to update profile');
            alert("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to update profile: " + error.message);
        }
    };

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-32 text-center flex flex-col items-center justify-center min-h-[60vh]">
                <User size={64} className="text-slate-300 mb-6" />
                <h2 className="text-2xl font-black text-slate-800 mb-2">Please Login</h2>
                <p className="text-slate-500 mb-6">You need to log in to view your profile.</p>
                <Link to="/login" className="bg-[#00B4D8] text-white px-8 py-3 rounded-full font-bold">Log In</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
            <div className="bg-[var(--color-card)] rounded-[40px] p-6 md:p-10 shadow-sm border border-slate-100">
                <h1 className="text-3xl font-black text-slate-900 mb-8">My Profile</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Sidebar - Profile Summary */}
                <div className="col-span-1">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center flex flex-col items-center group relative">
                        <div className="relative mb-4 cursor-pointer" onClick={() => document.getElementById('avatar-upload').click()}>
                            {uploading ? (
                                <div className="w-24 h-24 bg-slate-100 text-slate-400 rounded-full flex flex-col items-center justify-center font-bold text-sm shadow-lg border-2 border-dashed border-[#00B4D8]">
                                    <Loader2 className="animate-spin text-[#00B4D8] mb-1" size={20} />
                                    Loading...
                                </div>
                            ) : profileData.avatar_url ? (
                                <img src={profileData.avatar_url} alt="Profile Avatar" className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-transparent group-hover:border-[#00B4D8] transition-all" />
                            ) : (
                                <div className="w-24 h-24 bg-[#00B4D8] text-white rounded-full flex items-center justify-center font-bold text-4xl shadow-lg border-2 border-transparent group-hover:border-[#CAF0F8] transition-all">
                                    {profileData.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                                <Camera size={24} className="text-white" />
                            </div>
                            <input 
                                id="avatar-upload"
                                type="file" 
                                accept="image/*" 
                                onChange={uploadAvatar} 
                                disabled={uploading}
                                className="hidden"
                            />
                        </div>
                        <h2 className="text-xl font-black text-slate-800 break-words max-w-full">{profileData.name}</h2>
                        <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mt-2 mb-6">{user.role || 'Client'}</p>
                        
                        <div className="w-full pt-6 border-t border-slate-50 flex flex-col gap-3">
                            <span className="flex items-center gap-2 text-sm text-slate-500 justify-center">
                                <Shield size={14} className="text-green-500" /> Verified Account
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Area - Profile Details Form */}
                <div className="col-span-1 md:col-span-2">
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 relative">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-50">
                            <h3 className="text-xl font-bold text-slate-800">Personal Information</h3>
                            <button 
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full transition-colors ${
                                    isEditing ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                {isEditing ? <><Save size={16} /> Save Changes</> : <><Edit3 size={16} /> Edit Profile</>}
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <User size={16} />
                                        </div>
                                        <input 
                                            type="text" 
                                            value={profileData.name}
                                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                            readOnly={!isEditing}
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                                                isEditing ? 'border-[#00B4D8]/30 focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8]/20 bg-white' : 'border-slate-50 bg-slate-50 text-slate-600 outline-none'
                                            }`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <Mail size={16} />
                                        </div>
                                        <input 
                                            type="email" 
                                            value={profileData.email}
                                            readOnly={true} // Usually email shouldn't be editable directly
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-50 bg-slate-50 text-slate-500 font-medium text-sm outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <Smartphone size={16} />
                                        </div>
                                        <input 
                                            type="tel" 
                                            value={profileData.phone}
                                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                                            readOnly={!isEditing}
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                                                isEditing ? 'border-[#00B4D8]/30 focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8]/20 bg-white' : 'border-slate-50 bg-slate-50 text-slate-600 outline-none'
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Shipping Address</label>
                                <textarea 
                                    value={profileData.address}
                                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                                    readOnly={!isEditing}
                                    rows="3"
                                    className={`w-full p-4 rounded-xl border text-sm font-medium transition-all resize-none ${
                                        isEditing ? 'border-[#00B4D8]/30 focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8]/20 bg-white' : 'border-slate-50 bg-slate-50 text-slate-600 outline-none'
                                    }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ProfilePage;