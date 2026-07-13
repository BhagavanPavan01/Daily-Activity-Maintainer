import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { FaUserCircle, FaSave, FaUserEdit } from 'react-icons/fa';

function UserProfile() {
    const [userData, setUserData] = useLocalStorage('user_profile_data', {
        name: 'User',
        email: '',
        bio: '',
        joinDate: new Date().toISOString()
    });

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(userData);

    const handleSave = () => {
        setUserData(formData);
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col items-center max-w-2xl mx-auto w-full gap-8 animate-fade-in mt-10">
            <div className="bg-slate-100/ dark:bg-slate-800/80 border border-slate-200/ dark:border-slate-700/50 w-full p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-600/40 via-purple-600/40 to-indigo-600/40"></div>

                <div className="w-32 h-32 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-300 dark:border-slate-800 shadow-xl flex items-center justify-center relative z-10 overflow-hidden">
                    <FaUserCircle className="text-8xl text-slate-400 dark:text-slate-500 dark:text-slate-400" />
                </div>

                <div className="w-full relative z-10 flex flex-col gap-4">
                    {isEditing ? (
                        <div className="flex flex-col gap-4 w-full mt-4">
                            <div>
                                <label className="text-sm text-slate-400 dark:text-slate-500 dark:text-slate-400 px-1 mb-1 block">Display Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/ dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-slate-400 dark:text-slate-500 dark:text-slate-400 px-1 mb-1 block">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/ dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-slate-400 dark:text-slate-500 dark:text-slate-400 px-1 mb-1 block">Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                    className="w-full bg-white/ dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all min-h-[100px]"
                                ></textarea>
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-xl font-semibold text-slate-300 dark:text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white hover:bg-slate-200 dark:bg-slate-700 transition-all">Cancel</button>
                                <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-slate-900 dark:text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-600/30 transition-all">
                                    <FaSave /> Save Changes
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 w-full">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center pb-2">
                                {userData.name || 'User'}
                            </h2>
                            {userData.email && <p className="text-slate-400 dark:text-slate-500 dark:text-slate-400">{userData.email}</p>}
                            {userData.bio && <p className="text-slate-300 dark:text-slate-600 dark:text-slate-300 mt-2 text-center max-w-md">{userData.bio}</p>}

                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
                                Joined {new Date(userData.joinDate).toLocaleDateString()}
                            </p>

                            <button onClick={() => setIsEditing(true)} className="mt-6 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-blue-400 border border-blue-500/30 hover:bg-blue-500/10 transition-all w-1/2">
                                <FaUserEdit /> Edit Profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
