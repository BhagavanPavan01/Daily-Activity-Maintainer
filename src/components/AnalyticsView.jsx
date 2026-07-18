import React, { useMemo } from 'react';
import { FaChartBar, FaCheckCircle, FaListUl, FaFire, FaTrophy, FaCalendarDay } from 'react-icons/fa';

function AnalyticsView({ activities }) {
    // Analytics algorithms wrapped in useMemo for performance
    const stats = useMemo(() => {
        const activeDates = Object.keys(activities || {}).sort((a, b) => new Date(a) - new Date(b));

        let totalTasks = 0;
        let completedTasks = 0;
        const dayOfWeekStats = {
            'Sun': { total: 0, completed: 0 },
            'Mon': { total: 0, completed: 0 },
            'Tue': { total: 0, completed: 0 },
            'Wed': { total: 0, completed: 0 },
            'Thu': { total: 0, completed: 0 },
            'Fri': { total: 0, completed: 0 },
            'Sat': { total: 0, completed: 0 },
        };

        let currentStreak = 0;
        let maxStreak = 0;
        let lastDate = null;

        const last7DaysData = [];

        // Generate last 7 days array
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toDateString();
            const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

            const dayTasks = activities[dateStr] || [];
            const dayTotal = dayTasks.length;
            const dayCompleted = dayTasks.filter(t => t.completed).length;

            last7DaysData.push({
                dateStr,
                dayName,
                total: dayTotal,
                completed: dayCompleted,
                rate: dayTotal > 0 ? (dayCompleted / dayTotal) * 100 : 0
            });
        }

        activeDates.forEach(dateStr => {
            const dayTasks = activities[dateStr] || [];
            if (dayTasks.length === 0) return;

            // Tasks stats
            const dayTotal = dayTasks.length;
            const dayCompleted = dayTasks.filter(t => t.completed).length;

            totalTasks += dayTotal;
            completedTasks += dayCompleted;

            // Day of week stats
            const dateObj = new Date(dateStr);
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
            if (dayOfWeekStats[dayName]) {
                dayOfWeekStats[dayName].total += dayTotal;
                dayOfWeekStats[dayName].completed += dayCompleted;
            }

            // Streak calculation
            dateObj.setHours(0, 0, 0, 0);
            if (!lastDate) {
                currentStreak = 1;
            } else {
                const diffTime = Math.abs(dateObj - lastDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays === 1) {
                    currentStreak++;
                } else if (diffDays > 1) {
                    currentStreak = 1;
                }
            }
            if (currentStreak > maxStreak) maxStreak = currentStreak;
            lastDate = dateObj;
        });

        // Check if streak was broken today or yesterday
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (lastDate) {
            const daysSinceLastActive = Math.ceil(Math.abs(today - lastDate) / (1000 * 60 * 60 * 24));
            if (daysSinceLastActive > 1) {
                currentStreak = 0;
            }
        }

        // Most productive day
        let bestDay = 'None Yet';
        let highestRate = -1;
        Object.entries(dayOfWeekStats).forEach(([day, data]) => {
            if (data.total > 0) {
                const rate = data.completed / data.total;
                if (rate > highestRate) {
                    highestRate = rate;
                    bestDay = day;
                }
            }
        });

        return {
            totalDays: activeDates.length,
            totalTasks,
            completedTasks,
            completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
            currentStreak,
            maxStreak,
            bestDay,
            last7DaysData
        };
    }, [activities]);

    return (
        <div className="flex flex-col gap-8 w-full animate-fade-in mt-4">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Dynamic Analytics Dashboard</h2>

            {/* General Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <FaListUl className="text-4xl text-blue-400 mb-2 transform group-hover:scale-110 transition-transform" />
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{stats.totalTasks}</span>
                    <span className="text-slate-400 dark:text-slate-500 dark:text-slate-400 font-medium">Total Tasks Created</span>
                </div>

                <div className="bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <FaCheckCircle className="text-4xl text-green-400 mb-2 transform group-hover:scale-110 transition-transform" />
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{stats.completedTasks}</span>
                    <span className="text-slate-400 dark:text-slate-500 dark:text-slate-400 font-medium">Completed Tasks</span>
                </div>

                <div className="bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <FaChartBar className="text-4xl text-purple-400 mb-2 transform group-hover:scale-110 transition-transform" />
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{stats.completionRate}%</span>
                    <span className="text-slate-400 dark:text-slate-500 dark:text-slate-400 font-medium">Global Completion Rate</span>
                </div>

                <div className="bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <FaCalendarDay className="text-4xl text-orange-400 mb-2 transform group-hover:scale-110 transition-transform" />
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{stats.totalDays}</span>
                    <span className="text-slate-400 dark:text-slate-500 dark:text-slate-400 font-medium">Total Active Days</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Advanced Algorithm: Streaks and Productivity */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 p-6 rounded-2xl shadow-xl flex flex-col relative overflow-hidden group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-orange-500/20 rounded-xl">
                                <FaFire className="text-2xl text-orange-400 animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Current Streak</h3>
                                <p className="text-sm text-slate-400 dark:text-slate-500 dark:text-slate-400">Consecutive days active</p>
                            </div>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">{stats.currentStreak}</span>
                            <span className="text-xl text-slate-300 dark:text-slate-600 dark:text-slate-300 mb-1 leading-none font-semibold">Days</span>
                        </div>
                        <div className="mt-5 text-sm font-medium text-slate-400 dark:text-slate-500 dark:text-slate-400 border-t border-slate-200/ dark:border-slate-700/50 pt-3 flex justify-between">
                            <span>Highest Record</span>
                            <span className="text-slate-900 dark:text-white font-bold">{stats.maxStreak} Days</span>
                        </div>
                    </div>

                    <div className="bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 p-6 rounded-2xl shadow-xl flex flex-col relative overflow-hidden group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-indigo-500/20 rounded-xl">
                                <FaTrophy className="text-2xl text-indigo-400 transform group-hover:-rotate-12 transition-transform" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Most Productive Day</h3>
                                <p className="text-sm text-slate-400 dark:text-slate-500 dark:text-slate-400">Day with highest accuracy</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-slate-900 dark:text-white h-full mt-2">
                            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">{stats.bestDay}</span>
                        </div>
                    </div>
                </div>

                {/* CSS Based Interactive Bar Chart: Last 7 Days Activity */}
                <div className="lg:col-span-2 bg-slate-100/ dark:bg-slate-800/60 border border-slate-200/ dark:border-slate-700/50 p-6 rounded-2xl shadow-xl flex flex-col relative overflow-hidden">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                        <FaChartBar className="text-blue-400" /> Weekly Activity Overview
                    </h3>

                    <div className="flex-1 flex items-end justify-between gap-1 sm:gap-2 md:gap-4 mt-auto min-h-[260px] pb-6 px-2">
                        {stats.last7DaysData.map((day, idx) => {
                            const maxTotal = Math.max(...stats.last7DaysData.map(d => d.total), 1);
                            const totalHeightStr = `${(day.total / maxTotal) * 100}%`;
                            const completedScale = day.total > 0 ? (day.completed / day.total) : 0;

                            return (
                                <div key={idx} className="flex flex-col items-center gap-3 flex-1 h-full justify-end group cursor-pointer relative pt-8">
                                    {/* Tooltip Overlay */}
                                    <div className="absolute top-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap shadow-[0_4px_20px_rgba(0,0,0,0.5)] pointer-events-none transform -translate-x-1/2 left-1/2 flex flex-col items-center">
                                        <p className="font-bold text-blue-300 mb-1">{day.dateStr}</p>
                                        <div className="flex gap-4">
                                            <div className="flex flex-col items-center"><span className="text-slate-400 dark:text-slate-500 dark:text-slate-400">Tasks</span><span className="font-bold">{day.total}</span></div>
                                            <div className="flex flex-col items-center"><span className="text-slate-400 dark:text-slate-500 dark:text-slate-400">Done</span><span className="font-bold text-green-400">{day.completed}</span></div>
                                        </div>
                                    </div>

                                    {/* Bar Graphic */}
                                    <div className="w-full max-w-[48px] relative flex flex-col justify-end bg-slate-100 dark:bg-slate-800/50 rounded-xl transition-all duration-500 overflow-hidden" style={{ height: '100%', minHeight: '10px' }}>
                                        {/* Background Track (Total Tasks) */}
                                        <div
                                            className="absolute bottom-0 w-full bg-slate-200 dark:bg-slate-700/60 rounded-xl transition-all duration-700 group-hover:bg-slate-600/60"
                                            style={{ height: day.total > 0 ? totalHeightStr : '4px' }}
                                        ></div>
                                        {/* Highlight Track (Completed Tasks) */}
                                        <div
                                            className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-xl transition-all duration-700 shadow-[0_0_15px_rgba(56,189,248,0.3)] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.6)] group-hover:from-blue-500 group-hover:to-cyan-300"
                                            style={{ height: `calc(${totalHeightStr} * ${completedScale})` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:text-white transition-colors">{day.dayName}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnalyticsView;
