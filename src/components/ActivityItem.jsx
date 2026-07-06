import React, { useState, useRef, useEffect } from 'react';
import { FaCheck, FaTrash, FaEdit, FaSave } from 'react-icons/fa';

function ActivityItem({ activity, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(activity.text);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (editText.trim().length > 0) {
            onEdit(activity.id, editText.trim());
        } else {
            setEditText(activity.text);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setEditText(activity.text);
            setIsEditing(false);
        }
    };

    return (
        <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 animate-slide-in-left ${activity.completed
            ? 'bg-emerald-900/20 opacity-80'
            : 'bg-slate-900/50 hover:bg-slate-700/50'
            } hover:translate-x-1`}>
            <button
                onClick={() => onToggle(activity.id)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${activity.completed
                    ? 'bg-emerald-500 border-emerald-500 text-white hover:scale-110'
                    : 'border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white hover:scale-110'
                    }`}
            >
                <FaCheck />
            </button>

            {isEditing ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleSave}
                    className="flex-1 px-2 py-1 bg-slate-800 border-2 border-blue-500 rounded-lg outline-none"
                />
            ) : (
                <span className={`flex-1 text-base text-slate-100 ${activity.completed ? 'line-through text-slate-400' : ''
                    }`}>
                    {activity.text}
                </span>
            )}

            {!activity.completed && (
                <button
                    onClick={() => {
                        if (isEditing) {
                            handleSave();
                        } else {
                            setIsEditing(true);
                        }
                    }}
                    className={`w-8 h-8 border-none bg-transparent cursor-pointer flex items-center justify-center rounded-full transition-all duration-300 flex-shrink-0 ${isEditing ? 'text-emerald-400 hover:bg-emerald-500' : 'text-blue-400 hover:bg-blue-500'} hover:text-white hover:scale-110`}
                >
                    {isEditing ? <FaSave /> : <FaEdit />}
                </button>
            )}

            <button
                onClick={() => onDelete(activity.id)}
                className="w-8 h-8 border-none bg-transparent text-red-400 cursor-pointer flex items-center justify-center rounded-full transition-all duration-300 flex-shrink-0 hover:bg-red-400 hover:text-white hover:scale-110"
            >
                <FaTrash />
            </button>
        </div>
    );
}

export default ActivityItem;