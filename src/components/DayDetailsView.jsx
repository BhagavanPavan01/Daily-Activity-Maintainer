import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const DEFAULT_CATEGORIES = [
    { id: 'leetcode', label: 'LeetCode Problem Solve', iconName: 'FaLaptopCode', color: 'text-yellow-500', bg: 'bg-yellow-500' },
    { id: 'interview', label: 'Software Interview Prep', iconName: 'FaBookReader', color: 'text-blue-500', bg: 'bg-blue-500' },
    { id: 'aptitude', label: 'Aptitude Tests Topic', iconName: 'FaBrain', color: 'text-purple-500', bg: 'bg-purple-500' },
    { id: 'project', label: 'Full Stack / Git Update', iconName: 'FaGithub', color: 'text-slate-100', bg: 'bg-gray-800' },
    { id: 'jobs', label: 'Apply for 3 Jobs', iconName: 'FaBriefcase', color: 'text-emerald-400', bg: 'bg-emerald-500' }
];

function DayDetailsView({ date, activities, routines, onBack }) {
    const defaultDateKey = date ? date.toDateString() : new Date().toDateString();
    const dayActivities = activities[defaultDateKey] || [];
    const dayRoutines = routines[defaultDateKey] || [];
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date ? date.toLocaleDateString(undefined, dateOptions) : '';

    const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem('daily_routine_categories_v2');
            if (item) {
                setCategories(JSON.parse(item));
            }
        } catch (error) {
            console.error('Error reading categories:', error);
        }
    }, []);

    const hasActivities = dayActivities.length > 0;
    const hasRoutines = dayRoutines.length > 0;

    return (
        <div className="w-full bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800/60 p-4 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none mb-2 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <button
                    onClick={onBack}
                    className="p-2 sm:p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all duration-300 shadow-md shadow-black/10"
                    title="Go Back"
                >
                    <FaArrowLeft />
                </button>
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                        Day Overview
                    </h2>
                    <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">{formattedDate}</p>
                </div>
            </div>

            {(!hasActivities && !hasRoutines) ? (
                <div className="text-center py-12">
                    <p className="text-slate-500 dark:text-slate-400">No work logged on this day.</p>
                </div>
            ) : (
                <div className={`grid grid-cols-1 ${hasActivities && hasRoutines ? 'md:grid-cols-2' : ''} gap-6 w-full`}>
                    {/* Activities Section */}
                    {hasActivities && (
                        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700/50 h-fit">
                            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <span>📝</span> Daily Planner Tasks
                            </h3>
                            <ul className="space-y-3">
                                {dayActivities.map(activity => (
                                    <li key={activity.id} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                        <div className="mt-1">
                                            {activity.completed ? (
                                                <FaCheckCircle className="text-emerald-500 text-lg" />
                                            ) : (
                                                <FaRegCircle className="text-slate-400 text-lg" />
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={`text-slate-700 dark:text-slate-200 ${activity.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                                                {activity.text}
                                            </span>
                                            {activity.completed && (
                                                <span className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">Completed</span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Routines Section */}
                    {hasRoutines && (
                        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700/50 h-fit">
                            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <span>🔄</span> Tracked Routines
                            </h3>
                            <ul className="space-y-3">
                                {dayRoutines.map(routine => {
                                    const category = categories.find(c => c.id === routine.categoryId) || { label: 'Completed Routine' };
                                    return (
                                        <li key={routine.id} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                            <div className="mt-1">
                                                <FaCheckCircle className="text-violet-500 text-lg" />
                                            </div>
                                            <div>
                                                <span className="text-slate-700 dark:text-slate-200 font-medium block">
                                                    {category.label}
                                                </span>
                                                {routine.notes && (
                                                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block whitespace-pre-wrap">
                                                        {routine.notes}
                                                    </span>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default DayDetailsView;
