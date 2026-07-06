import React, { useEffect } from 'react';
import ActivityItem from './ActivityItem';
import confetti from 'canvas-confetti';

function ActivityList({ activities, onToggle, onDelete, onEdit, onClearCompleted }) {
    const completedCount = activities.filter(a => a.completed).length;
    const totalCount = activities.length;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    useEffect(() => {
        if (progress === 100 && totalCount > 0) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, [progress, totalCount]);

    if (activities.length === 0) {
        return (
            <div className="bg-slate-800/90 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl shadow-black/40 flex-1 animate-fade-in">
                <div className="text-center py-12">
                    <p className="text-slate-400 text-lg">No activities for this date</p>
                    <p className="text-slate-500 text-sm mt-1">Add your first activity above!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-800/90 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl shadow-black/40 flex-1 animate-fade-in">
            <div className="mb-5">
                <div className="flex justify-between items-center mb-2 text-sm text-slate-300">
                    <span className="font-medium">Progress</span>
                    <div className="flex items-center gap-4">
                        {completedCount > 0 && (
                            <button
                                onClick={onClearCompleted}
                                className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                            >
                                Clear Completed
                            </button>
                        )}
                        <span className="font-medium">{completedCount}/{totalCount}</span>
                    </div>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-500 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto scrollbar-thin">
                {activities.map(activity => (
                    <ActivityItem
                        key={activity.id}
                        activity={activity}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        </div>
    );
}

export default ActivityList;