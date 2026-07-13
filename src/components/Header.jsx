import React, { useState } from 'react';
import { FaLayerGroup, FaUserCircle, FaBars, FaTimes, FaCalendarCheck, FaSun, FaMoon } from 'react-icons/fa';

function Header({ currentView, setCurrentView, theme, setTheme }) {
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
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute top-0 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
            </div>

            <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between h-20">
                {/* Logo Section */}
                <div
                    className="flex items-center gap-4 cursor-pointer group"
                    onClick={() => setCurrentView('dashboard')}
                >
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 overflow-hidden transform transition-transform group-hover:scale-105 group-hover:rotate-3">
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-700 ease-in-out"></div>
                        <FaCalendarCheck className="text-2xl text-white drop-shadow-md z-10" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-slate-300 tracking-tight leading-none group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">
                            Daily Activity
                        </h1>
                        <span className="text-xs md:text-sm text-blue-400 font-medium tracking-widest uppercase mt-0.5">Maintainer</span>
                    </div>
                </div>

                {/* Desktop Navigation Section */}
                <nav className="hidden md:flex items-center gap-2 bg-slate-800/60 p-1.5 rounded-full border border-slate-700/50 shadow-inner">
                    <button
                        onClick={() => handleNavClick('dashboard')}
                        className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${currentView === 'dashboard' ? 'text-white bg-slate-700/80 shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
                    >
                        <FaLayerGroup className={`${currentView === 'dashboard' ? 'text-blue-400' : 'text-slate-400'} transition-colors`} /> Dashboard
                    </button>
                    {/* Theme Toggle Button Inside Nav */}
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center w-9 h-9 rounded-full text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
                        title="Toggle Theme"
                    >
                        {theme === 'dark' ? <FaSun className="text-amber-400 text-lg" /> : <FaMoon className="text-indigo-500 text-lg" />}
                    </button>
                </nav>

                {/* Right Side / Profile */}
                <div className="hidden md:flex items-center gap-4">
                    <div
                        className="flex items-center gap-3 cursor-pointer group pl-2 border-l border-slate-700/50 transition-all hover:bg-slate-800/50 p-2 rounded-xl"
                        onClick={() => handleNavClick('user')}
                    >
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">User Profile</span>
                            <span className="text-xs text-slate-500">Settings</span>
                        </div>
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r p-[2px] ${currentView === 'user' ? 'from-green-400 to-blue-500 shadow-lg shadow-blue-500/30' : 'from-purple-500 to-blue-500'}`}>
                            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden relative">
                                <FaUserCircle className={`text-3xl absolute scale-110 top-0.5 ${currentView === 'user' ? 'text-white' : 'text-slate-400'}`} />
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
                <div className="md:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
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
                                    <FaUserCircle className="text-3xl text-slate-400 absolute scale-110 top-0.5" />
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