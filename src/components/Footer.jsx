import React from 'react';
import { FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-8 px-4 md:px-8 border-t border-slate-200 dark:border-slate-700/50 transition-colors duration-300">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

                {/* Personal Details */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                        Bhagavan Pavan
                    </h3>
                    <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                        <FaMapMarkerAlt className="text-indigo-500 dark:text-indigo-400" /> Srikakulam, Andhra Pradesh, India
                    </p>
                </div>

                {/* Center / Social info */}
                <div className="flex flex-col items-center gap-4">
                    <p className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Crafted with <FaHeart className="text-pink-500 dark:text-pink-400 inline-block animate-pulse" /> by Bhagavan Pavan
                    </p>
                    <div className="flex gap-6">
                        <a href="mailto:bhagavanpavan01@gmail.com" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-all transform hover:scale-125" aria-label="Email">
                            <FaEnvelope className="text-xl" />
                        </a>
                        <a href="tel:+919542377685" className="text-slate-500 hover:text-green-600 dark:text-slate-400 dark:hover:text-green-400 transition-all transform hover:scale-125" aria-label="Phone">
                            <FaPhone className="text-xl" />
                        </a>
                        <a href="https://bhagavanpavan-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition-all transform hover:scale-125" aria-label="Portfolio">
                            <FaGlobe className="text-xl" />
                        </a>
                    </div>
                </div>

                {/* Copyright info */}
                <div className="flex flex-col items-center md:items-end gap-1 text-slate-600 dark:text-slate-400">
                    <p className="text-sm font-medium">
                        &copy; {currentYear} Daily Activity Maintainer
                    </p>
                    <p className="text-xs opacity-75">
                        All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;