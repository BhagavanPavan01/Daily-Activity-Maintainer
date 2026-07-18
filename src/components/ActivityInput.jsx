import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

function ActivityInput({ onAddActivity, selectedDate }) {
    const [inputText, setInputText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim()) {
            onAddActivity(inputText.trim());
            setInputText('');
        }
    };

    const isToday = selectedDate && new Date().toDateString() === selectedDate.toDateString();
    const titleText = isToday ? "Today's Activities" : `Activities for ${selectedDate?.toLocaleDateString()}`;

    return (
        <div className="bg-slate-800/90 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl shadow-black/40 animate-fade-in">
            <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
                {titleText}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    placeholder="Enter a new activity..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-slate-700 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-slate-900/50 focus:bg-slate-800"
                />
                <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-black/40 hover:shadow-blue-900/40 flex items-center gap-2 whitespace-nowrap"
                >
                    <FaPlus /> Add
                </button>
            </form>
        </div>
    );
}

export default ActivityInput;