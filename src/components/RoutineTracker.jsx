import React, { useState } from 'react';
import { FaLaptopCode, FaBookReader, FaBrain, FaGithub, FaBriefcase, FaPlus, FaCheckCircle, FaCalendarAlt, FaClock, FaListUl, FaTrash } from 'react-icons/fa';
import useLocalStorage from '../hooks/useLocalStorage';

const DEFAULT_CATEGORIES = [
    { id: 'leetcode', label: 'LeetCode Problem Solve', iconName: 'FaLaptopCode', color: 'text-yellow-500', bg: 'bg-yellow-500' },
    { id: 'interview', label: 'Software Interview Prep', iconName: 'FaBookReader', color: 'text-blue-500', bg: 'bg-blue-500' },
    { id: 'aptitude', label: 'Aptitude Tests Topic', iconName: 'FaBrain', color: 'text-purple-500', bg: 'bg-purple-500' },
    { id: 'project', label: 'Full Stack / Git Update', iconName: 'FaGithub', color: 'text-slate-100', bg: 'bg-gray-800' },
    { id: 'jobs', label: 'Apply for 3 Jobs', iconName: 'FaBriefcase', color: 'text-emerald-400', bg: 'bg-emerald-500' }
];

const iconMap = {
    FaLaptopCode: <FaLaptopCode />,
    FaBookReader: <FaBookReader />,
    FaBrain: <FaBrain />,
    FaGithub: <FaGithub />,
    FaBriefcase: <FaBriefcase />,
    FaListUl: <FaListUl />
};

function RoutineTracker({ selectedDate, routines, setRoutines }) {
    const [categories, setCategories] = useLocalStorage('daily_routine_categories_v2', DEFAULT_CATEGORIES);
    const [selectedCategory, setSelectedCategory] = useState(categories.length > 0 ? categories[0].id : '');
    const [notes, setNotes] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');

    const dateKey = selectedDate.toDateString();
    const currentDateRoutines = routines[dateKey] || [];

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        const newCategory = {
            id: `custom_${Date.now()}`,
            label: newCategoryName.trim(),
            iconName: 'FaListUl',
            color: 'text-blue-400',
            bg: 'bg-blue-500'
        };

        const updated = [...categories, newCategory];
        setCategories(updated);
        setSelectedCategory(newCategory.id);
        setNewCategoryName('');
    };

    const handleDeleteCategory = (e, idToRemove) => {
        e.stopPropagation();
        const updated = categories.filter(c => c.id !== idToRemove);
        setCategories(updated);
        if (selectedCategory === idToRemove) {
            setSelectedCategory(updated.length > 0 ? updated[0].id : '');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedCategory) return;

        // Preserve the selected date but with current time to show realistically when it was added
        const now = new Date();
        const timestampDate = new Date(selectedDate);
        timestampDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());

        const newRoutine = {
            id: Date.now(),
            categoryId: selectedCategory,
            notes: notes.trim(),
            timestamp: timestampDate.toISOString()
        };

        setRoutines(prev => ({
            ...prev,
            [dateKey]: [newRoutine, ...(prev[dateKey] || [])]
        }));
        setNotes('');
    };

    const getIcon = (iconName) => {
        return iconMap[iconName] || <FaListUl />;
    };

    return (
        <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full animate-fade-in">
            <div className="bg-slate-800/90 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-black/40">
                <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
                    <FaCheckCircle className="text-blue-400" /> Log Work for {selectedDate.toLocaleDateString()}
                </h2>

                <form onSubmit={handleAddCategory} className="mb-8 p-4 bg-slate-900/50 border border-slate-700 rounded-xl flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Add New Routine Category</label>
                        <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="E.g., Read 10 Pages, Workout..."
                            className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none text-slate-100"
                        />
                    </div>
                    <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-slate-700 hover:bg-blue-600 text-white rounded-xl font-bold transition-all text-sm flex justify-center items-center gap-2">
                        <FaPlus /> Add Option
                    </button>
                </form>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-100 mb-3">Select Activity</label>
                        {categories.length === 0 ? (
                            <p className="text-slate-400 italic">No categories available. Add one above!</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        type="button"
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`group relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 text-left ${selectedCategory === category.id
                                            ? `border-blue-500 bg-blue-900/30 shadow-xl shadow-black/30 transform scale-[1.02]`
                                            : 'border-slate-700 hover:border-blue-700 hover:bg-slate-900/50'
                                            }`}
                                    >
                                        <div className={`text-xl ${category.color}`}>
                                            {getIcon(category.iconName)}
                                        </div>
                                        <span className="font-medium text-slate-100 flex-1">{category.label}</span>
                                        <div
                                            onClick={(e) => handleDeleteCategory(e, category.id)}
                                            className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 transition-opacity bg-slate-800 rounded-full hover:bg-slate-700"
                                            title="Remove Routine Category"
                                        >
                                            <FaTrash size={12} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-100 mb-2">Details / Notes (Optional)</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add your notes here..."
                            className="w-full px-4 py-3 border-2 border-slate-700 rounded-xl transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-slate-900/50 focus:bg-slate-800 resize-none"
                            rows="3"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={!selectedCategory}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-900/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                    >
                        <FaPlus /> Save Record
                    </button>
                </form>
            </div>

            <div className="bg-slate-800/90 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-black/40">
                <h3 className="text-xl font-bold text-slate-100 mb-6 font-medium">Recent Activity Log</h3>
                {currentDateRoutines.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-slate-400 text-lg">No records yet.</p>
                        <p className="text-slate-500 text-sm mt-1">Consistency is key!</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto scrollbar-thin pr-2">
                        {currentDateRoutines.map(routine => {
                            // Find category from current categories, or fallback if it was deleted
                            const category = categories.find(c => c.id === routine.categoryId) || {
                                label: 'Unknown / Deleted Routine',
                                iconName: 'FaListUl',
                                bg: 'bg-slate-700',
                                color: 'text-slate-400'
                            };
                            const dateObj = new Date(routine.timestamp);
                            return (
                                <div key={routine.id} className="bg-slate-900/50 border border-slate-700 rounded-xl p-5 hover:shadow-xl shadow-black/30 transition-shadow duration-300 animate-slide-in-left">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-3 rounded-lg text-white ${category.bg} shadow-lg shadow-black/20`}>
                                                {getIcon(category.iconName)}
                                            </div>
                                            <span className="font-bold text-slate-100 text-lg">{category.label}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                                            <span className="flex items-center gap-1"><FaCalendarAlt /> {dateObj.toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1"><FaClock /> {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                    {routine.notes && (
                                        <div className="pl-14">
                                            <p className="text-slate-300 bg-slate-800 p-3 rounded-lg border border-slate-700 whitespace-pre-wrap">{routine.notes}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RoutineTracker;
