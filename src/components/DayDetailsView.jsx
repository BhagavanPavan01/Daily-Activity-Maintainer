import React from 'react';
import { FaArrowLeft, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

function DayDetailsView({ date, activities, routines, onBack }) {
    const defaultDateKey = date ? date.toDateString() : new Date().toDateString();

    // Check old and new data structures
    const dayActivities = activities[defaultDateKey] || [];
    const dayRoutines = routines[defaultDateKey] || [];

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date ? date.toLocaleDateString(undefined, dateOptions) : '';

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Activities Section */}
                <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700/50">
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <span>📝</span> Tasks & Activities
                    </h3>
                    {dayActivities.length === 0 ? (
                        <p className="text-slate-500 dark:text-slate-400 text-center py-4">No tasks found for this day.</p>
                    ) : (
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
                                    <span className={`text-slate-700 dark:text-slate-200 ${activity.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                                        {activity.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Routines Section */}
                <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700/50">
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <span>🔄</span> Routines Tracked
                    </h3>
                    {dayRoutines.length === 0 ? (
                        <p className="text-slate-500 dark:text-slate-400 text-center py-4">No routines found for this day.</p>
                    ) : (
                        <ul className="space-y-3">
                            {dayRoutines.map(routine => (
                                <li key={routine.id} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <div className="mt-1">
                                        <FaCheckCircle className="text-violet-500 text-lg" />
                                    </div>
                                    <div>
                                        <span className="text-slate-700 dark:text-slate-200 font-medium block">
                                            {routine.categoryName || 'Completed Routine'}
                                        </span>
                                        {routine.details && (
                                            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
                                                {routine.details}
                                            </span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DayDetailsView;
