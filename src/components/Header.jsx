import React, { useState } from 'react';
import { FaLayerGroup, FaUserCircle, FaBars, FaTimes, FaCalendarCheck, FaSun, FaMoon } from 'react-icons/fa';

function Header({ currentView, setCurrentView, theme, setTheme, userData }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (view) => {
        setCurrentView(view);
        setIsMenuOpen(false);
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="bg-slate-900/90 backdrop-blur-2xl border-b border-slate-700/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)] sticky top-0 z-50 w-full transition-all duration-300">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Background removed as requested */}
            </div>

            <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between h-20">
                {/* Logo Section - Left Aligned */}
                <div
                    className="flex items-center gap-3 md:gap-4 cursor-pointer whitespace-nowrap"
                    onClick={() => setCurrentView('dashboard')}
                >
                    <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 overflow-hidden">
                        <FaCalendarCheck className="text-xl md:text-2xl text-white drop-shadow-md z-10" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-slate-800 dark:text-white tracking-wide">
                            Daily Activity
                        </h1>
                        <span className="text-[10px] md:text-xs text-blue-500 dark:text-blue-400 font-semibold tracking-widest uppercase mt-[1px]">Maintainer</span>
                    </div>
                </div>

                {/* Desktop Right Navigation / Profile */}
                <div className="hidden md:flex justify-end items-center gap-6">
                    <nav className="flex items-center gap-3">
                        <button
                            onClick={() => handleNavClick('dashboard')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${currentView === 'dashboard' ? 'text-white bg-gradient-to-r from-slate-700/80 to-slate-800 shadow-md border border-slate-600/50' : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'}`}
                        >
                            <FaLayerGroup className={`${currentView === 'dashboard' ? 'text-blue-400' : 'text-slate-400'} transition-colors`} /> Dashboard
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/80 border border-slate-700/50 transition-all duration-300"
                            title="Toggle Theme"
                        >
                            {theme === 'dark' ? <FaSun className="text-amber-400 text-lg" /> : <FaMoon className="text-indigo-500 text-lg" />}
                        </button>
                    </nav>

                    {/* Profile Section */}
                    <div
                        className="flex items-center gap-3 cursor-pointer group pl-6 border-l border-slate-700/50 transition-all hover:bg-slate-800/20 py-1 rounded-l-full"
                        onClick={() => handleNavClick('user')}
                    >
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">User Profile</span>
                            <span className="text-xs text-slate-500 font-medium">Settings</span>
                        </div>
                        <div className={`w-11 h-11 rounded-full bg-gradient-to-r p-[2px] ${currentView === 'user' ? 'from-green-400 to-blue-500 shadow-lg shadow-blue-500/30' : 'from-purple-500 to-indigo-500'}`}>
                            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden relative">
                                {userData?.photo ? (
                                    <img src={userData.photo} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <FaUserCircle className={`text-4xl absolute top-0.5 ${currentView === 'user' ? 'text-white' : 'text-slate-300 group-hover:text-white transition-colors duration-300'}`} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Area */}
                <div className="md:hidden flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center p-2 rounded-xl text-slate-400 hover:bg-slate-800 transition-colors"
                    >
                        {theme === 'dark' ? <FaSun className="text-amber-400 text-xl" /> : <FaMoon className="text-indigo-500 text-xl" />}
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center justify-center p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                        {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-auto left-0 w-full border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/50 z-50">
                    <nav className="flex flex-col px-4 py-6 gap-4">
                        <button
                            onClick={() => handleNavClick('dashboard')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold shadow-sm w-full text-left ${currentView === 'dashboard' ? 'text-white bg-slate-800/80 border border-slate-700/50' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}
                        >
                            <FaLayerGroup className={`${currentView === 'dashboard' ? 'text-blue-400' : 'text-slate-400'} text-lg`} /> Dashboard
                        </button>

                        <div className="h-px w-full bg-slate-800 my-2"></div>

                        <button
                            onClick={() => handleNavClick('user')}
                            className={`flex items-center gap-4 px-2 py-3 rounded-xl w-full text-left ${currentView === 'user' ? 'bg-slate-800/50' : 'hover:bg-slate-800/30'}`}
                        >
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-r p-[2px] ${currentView === 'user' ? 'from-green-400 to-blue-500' : 'from-purple-500 to-blue-500'}`}>
                                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden relative">
                                    {userData?.photo ? (
                                        <img src={userData.photo} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <FaUserCircle className="text-3xl text-slate-400 absolute scale-110 top-0.5" />
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-slate-200">User Profile</span>
                                <span className="text-sm text-slate-500">Manage Account</span>
                            </div>
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;