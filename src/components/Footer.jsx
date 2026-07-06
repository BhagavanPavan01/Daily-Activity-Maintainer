import React from 'react';
import { FaHeart } from 'react-icons/fa';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900/50 backdrop-blur-sm py-5 px-8 text-center text-slate-400 border-t border-slate-700/50">
            <div className="flex flex-col gap-1">
                <p className="flex items-center justify-center gap-2">
                    Made with <FaHeart className="text-pink-400 inline-block animate-pulse-slow" /> by Your Name
                </p>
                <p className="text-sm opacity-75">
                    &copy; {currentYear} Daily Activity Maintainer. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;