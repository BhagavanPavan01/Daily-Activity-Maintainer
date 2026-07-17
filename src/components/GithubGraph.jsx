import React, { useMemo, useRef, useEffect } from 'react';

function GithubGraph({ activities, routines, selectedDate, onSelectDate }) {
    const scrollContainerRef = useRef(null);

    // Generate dates for the last 365 days
    const dates = useMemo(() => {
        const result = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0); // normalize today
        for (let i = 364; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            result.push(d);
        }
        return result;
    }, []);

    const getDateStatus = (date) => {
        const key = date.toDateString();
        const dayActivities = activities[key] || [];
        const dayRoutines = routines[key] || [];

        if (dayActivities.length === 0 && dayRoutines.length === 0) return 0; // none

        const activitiesCompleted = dayActivities.filter(a => a.completed).length;
        const totalActivities = dayActivities.length;

        const routinesCompleted = dayRoutines.length;

        let score = 0;
        score += activitiesCompleted;
        score += routinesCompleted;

        if (score === 0 && totalActivities > 0) return 0;
        if (score === 0) return 0;
        if (score >= 1 && score <= 2) return 1;
        if (score >= 3 && score <= 4) return 2;
        if (score >= 5 && score <= 6) return 3;
        return 4;
    };

    // organize dates into weeks (Sunday to Saturday)
    const weeks = useMemo(() => {
        const weeksArray = [];
        let currentWeek = [];

        const firstDayOfWeek = dates[0].getDay();
        for (let i = 0; i < firstDayOfWeek; i++) {
            currentWeek.push(null);
        }

        dates.forEach(date => {
            currentWeek.push({
                date,
                level: getDateStatus(date)
            });
            if (currentWeek.length === 7) {
                weeksArray.push(currentWeek);
                currentWeek = [];
            }
        });

        if (currentWeek.length > 0) {
            while (currentWeek.length < 7) {
                currentWeek.push(null);
            }
            weeksArray.push(currentWeek);
        }

        return weeksArray;
    }, [dates, activities, routines]);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    }, [weeks]);

    // Colors mapping 
    const getLevelColor = (level) => {
        switch (level) {
            case 1: return 'bg-emerald-200 dark:bg-emerald-900/60 outline outline-1 outline-emerald-300 dark:outline-emerald-800/10 cursor-pointer hover:ring-2 ring-emerald-500';
            case 2: return 'bg-emerald-400 dark:bg-emerald-700/80 outline outline-1 outline-emerald-500 dark:outline-emerald-600/20 cursor-pointer hover:ring-2 ring-emerald-400';
            case 3: return 'bg-emerald-500 dark:bg-emerald-500/90 outline outline-1 outline-emerald-600 dark:outline-emerald-400/30 cursor-pointer hover:ring-2 ring-emerald-300';
            case 4: return 'bg-emerald-700 dark:bg-emerald-400 outline outline-1 outline-emerald-800 dark:outline-emerald-300/40 shadow-[0_0_8px_rgba(16,185,129,0.3)] dark:shadow-[0_0_8px_rgba(52,211,153,0.5)] cursor-pointer hover:ring-2 ring-emerald-200';
            default: return 'bg-slate-100 dark:bg-slate-800/60 dark:outline-slate-700/30 outline outline-1 outline-slate-200 cursor-pointer hover:ring-2 ring-slate-400';
        }
    };

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return (
        <div className="w-full bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800/60 p-5 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none mb-2 hover:shadow-2xl transition-shadow duration-500">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                    <span className="relative flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                    </span>
                    Activity Overview
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700/50">
                    <span>Less</span>
                    <div className="w-3 h-3 rounded-[3px] bg-slate-100 dark:bg-slate-800/60 outline outline-1 outline-slate-200 dark:outline-slate-700/30"></div>
                    <div className="w-3 h-3 rounded-[3px] bg-emerald-200 dark:bg-emerald-900/60 outline outline-1 outline-emerald-300 dark:outline-emerald-800/10"></div>
                    <div className="w-3 h-3 rounded-[3px] bg-emerald-400 dark:bg-emerald-700/80 outline outline-1 outline-emerald-500 dark:outline-emerald-600/20"></div>
                    <div className="w-3 h-3 rounded-[3px] bg-emerald-500 dark:bg-emerald-500/90 outline outline-1 outline-emerald-600 dark:outline-emerald-400/30"></div>
                    <div className="w-3 h-3 rounded-[3px] bg-emerald-700 dark:bg-emerald-400 outline outline-1 outline-emerald-800 dark:outline-emerald-300/40"></div>
                    <span>More</span>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="overflow-x-auto overflow-y-hidden pb-6 pt-6 -mx-2 px-2 custom-scrollbar smooth-scroll relative masks-edges"
            >
                <div className="inline-flex gap-[5px] sm:gap-2 p-1 min-w-max relative mt-2">
                    {weeks.map((week, weekIndex) => {
                        const firstDayOfMonth = week.find(day => day?.date.getDate() <= 7 && day?.date.getDay() === 0);
                        return (
                            <div key={weekIndex} className="flex flex-col gap-[5px] sm:gap-2 relative">
                                {firstDayOfMonth && (
                                    <span className="absolute -top-7 text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest pl-1">
                                        {monthNames[firstDayOfMonth.date.getMonth()]}
                                    </span>
                                )}
                                {week.map((day, dayIndex) => {
                                    const isSelected = selectedDate && day && day.date.toDateString() === selectedDate.toDateString();
                                    return (
                                        <div
                                            key={dayIndex}
                                            onClick={() => {
                                                if (day) {
                                                    const year = day.date.getFullYear();
                                                    const month = String(day.date.getMonth() + 1).padStart(2, '0');
                                                    const dateNum = String(day.date.getDate()).padStart(2, '0');
                                                    const dateStr = `${year}-${month}-${dateNum}`;

                                                    // Open new tab targeting this date precisely
                                                    window.open(`${window.location.origin}${window.location.pathname}?date=${dateStr}`, '_blank');

                                                    if (onSelectDate) onSelectDate(day.date);
                                                }
                                            }}
                                            className={`w-[12px] h-[12px] sm:w-[15px] sm:h-[15px] rounded-[3px] sm:rounded p-0 transition-all duration-200 hover:scale-125 hover:z-10 ${day ? getLevelColor(day.level) : 'bg-transparent'} ${isSelected ? 'ring-2 ring-offset-1 ring-offset-white dark:ring-offset-slate-900 ring-slate-800 dark:ring-white scale-125 z-10' : ''}`}
                                            title={day ? `${day.date.toDateString()}: ${day.level * 2} activities approx` : ''}
                                        ></div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default GithubGraph;
