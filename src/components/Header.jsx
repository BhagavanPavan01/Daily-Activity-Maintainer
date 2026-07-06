import React from 'react';
import { FaClipboardList } from 'react-icons/fa';

function Header() {
    return (
        <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl shadow-black/40 sticky top-0 z-50 w-full">
            <div className="absolute inset-0 bg-blue-500/5 animate-pulse-slow"></div>
            <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-start">
                <div className="flex items-center justify-start gap-4 py-4 w-full">
                    <div className="bg-blue-600/20 border border-blue-500/30 p-2.5 rounded-xl shadow-inner">
                        <FaClipboardList className="text-2xl text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight">
                            Daily Activity Maintainer
                        </h1>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;