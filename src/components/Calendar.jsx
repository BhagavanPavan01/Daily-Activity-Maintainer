import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Calendar({ selectedDate, onSelectDate, currentMonth, setCurrentMonth, getDateStatus }) {
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const changeMonth = (increment) => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + increment, 1));
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDay = getFirstDayOfMonth(currentMonth);
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="aspect-square" />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const isSelected = date.toDateString() === selectedDate.toDateString();
            const status = getDateStatus(date);

            let className = 'aspect-square flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 text-sm hover:scale-110';

            if (isSelected) {
                className += ' bg-blue-600 text-white scale-110 shadow-2xl shadow-black/40';
            } else if (status === 'completed') {
                className += ' bg-emerald-500 text-white';
            } else if (status === 'incomplete') {
                className += ' bg-red-500 text-white';
            } else {
                className += ' hover:bg-blue-600/10';
            }

            days.push(
                <div
                    key={day}
                    className={className}
                    onClick={() => onSelectDate(date)}
                >
                    <span>{day}</span>
                </div>
            );
        }

        return days;
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <div className="bg-slate-800/90 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl shadow-black/40 w-full max-w-md animate-fade-in">
            <div className="flex justify-between items-center mb-5">
                <button
                    onClick={() => changeMonth(-1)}
                    className="w-9 h-9 bg-slate-700/50 border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-slate-300 hover:bg-blue-600 hover:text-white hover:scale-110"
                >
                    <FaChevronLeft />
                </button>
                <h3 className="text-lg font-semibold text-slate-100">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button
                    onClick={() => changeMonth(1)}
                    className="w-9 h-9 bg-slate-700/50 border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-slate-300 hover:bg-blue-600 hover:text-white hover:scale-110"
                >
                    <FaChevronRight />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-xs font-semibold text-slate-400 py-2">
                        {day}
                    </div>
                ))}
                {renderCalendarDays()}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-5 pt-5 border-t border-slate-700">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="w-4 h-4 rounded-full bg-emerald-500 inline-block"></span>
                    <span>All tasks completed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="w-4 h-4 rounded-full bg-red-500 inline-block"></span>
                    <span>Tasks pending</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="w-4 h-4 rounded-full bg-slate-700 inline-block"></span>
                    <span>No tasks</span>
                </div>
            </div>
        </div>
    );
}

export default Calendar;