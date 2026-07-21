import React, { useState, useEffect } from 'react';
import { FaChartLine } from 'react-icons/fa';
import Header from './components/Header';
import Footer from './components/Footer';
import ActivityInput from './components/ActivityInput';
import ActivityList from './components/ActivityList';
import Calendar from './components/Calendar';
import RoutineTracker from './components/RoutineTracker';
import AnalyticsView from './components/AnalyticsView';
import UserProfile from './components/UserProfile';
import GithubGraph from './components/GithubGraph';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [activities, setActivities] = useLocalStorage('activities', {});
  const [routines, setRoutines] = useLocalStorage('prep_routines_v2', {});
  const getInitialDate = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const dateParam = params.get('date');
      if (dateParam) {
        const parsed = new Date(dateParam);
        // Correct for local timezone timezone offset if it was ISO string date only
        if (!isNaN(parsed.getTime())) {
          // we parse it as local time to avoid timezone shifts
          return new Date(parsed.getTime() + parsed.getTimezoneOffset() * 60000);
        }
      }
    }
    return new Date();
  };

  const [selectedDate, setSelectedDate] = useState(getInitialDate());
  const [currentMonth, setCurrentMonth] = useState(getInitialDate());
  const [activeTab, setActiveTab] = useState('planner'); // 'planner' or 'routine'
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'analytics', 'user'
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  const [userData, setUserData] = useLocalStorage('user_profile_data', {
    name: 'User',
    email: '',
    bio: '',
    joinDate: new Date().toISOString(),
    photo: null
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Data migration for old array-based activities
  React.useEffect(() => {
    if (Array.isArray(activities)) {
      const migratedActivities = {};
      activities.forEach(activity => {
        const activityDate = new Date(activity.createdAt || Date.now());
        const key = activityDate.toDateString();
        if (!migratedActivities[key]) migratedActivities[key] = [];
        migratedActivities[key].push(activity);
      });
      setActivities(migratedActivities);
    }
  }, [activities, setActivities]);

  // Data migration for routines
  React.useEffect(() => {
    let needsMigration = false;
    let migrated = null;

    if (Array.isArray(routines)) {
      migrated = {};
      routines.forEach(routine => {
        const date = new Date(routine.timestamp || Date.now());
        const key = date.toDateString();
        if (!migrated[key]) migrated[key] = [];
        migrated[key].push(routine);
      });
      needsMigration = true;
    }

    try {
      const legacyItem = localStorage.getItem('prep_routines');
      if (legacyItem) {
        const legacyData = JSON.parse(legacyItem);
        if (Array.isArray(legacyData)) {
          migrated = migrated || (Array.isArray(routines) ? {} : { ...routines });
          legacyData.forEach(routine => {
            const date = new Date(routine.timestamp || Date.now());
            const key = date.toDateString();
            if (!migrated[key]) migrated[key] = [];
            if (!migrated[key].some(r => r.id === routine.id)) {
              migrated[key].push(routine);
            }
          });
          needsMigration = true;
          localStorage.setItem('prep_routines_archived', legacyItem);
          localStorage.removeItem('prep_routines');
        }
      }
    } catch (e) {
      console.error('Migration error:', e);
    }

    if (needsMigration && migrated) {
      setRoutines(migrated);
    }
  }, [routines, setRoutines]);


  const dateKey = selectedDate.toDateString();

  const addActivity = (activityText) => {
    const newActivity = {
      id: Date.now(),
      text: activityText,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setActivities(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newActivity]
    }));
  };

  const toggleActivity = (activityId) => {
    setActivities(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].map(activity =>
        activity.id === activityId
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    }));
  };

  const deleteActivity = (activityId) => {
    setActivities(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(activity => activity.id !== activityId)
    }));
  };

  const editActivity = (activityId, newText) => {
    setActivities(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].map(activity =>
        activity.id === activityId
          ? { ...activity, text: newText }
          : activity
      )
    }));
  };

  const clearCompleted = () => {
    setActivities(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(activity => !activity.completed)
    }));
  };

  const getDateStatus = (date) => {
    const key = date.toDateString();
    const dayActivities = activities[key] || [];
    const dayRoutines = routines[key] || [];

    if (dayActivities.length === 0 && dayRoutines.length === 0) return 'neutral';

    if (dayActivities.length === 0 && dayRoutines.length > 0) return 'completed';

    const allCompleted = dayActivities.every(a => a.completed);
    return allCompleted ? 'completed' : 'incomplete';
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header currentView={currentView} setCurrentView={setCurrentView} theme={theme} setTheme={setTheme} userData={userData} />
      <main className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto flex flex-col gap-8">

        {currentView === 'dashboard' && (
          <>
            <div className="flex justify-center w-full mt-2">
              <div className="bg-slate-800/40 border border-slate-700/50 p-2 sm:p-1.5 rounded-2xl backdrop-blur-md flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto max-w-full justify-center shadow-2xl shadow-black/20">
                <button
                  onClick={() => setActiveTab('planner')}
                  className={`w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-2.5 rounded-xl font-semibold transition-all duration-300 flex justify-center items-center gap-2 ${activeTab === 'planner'
                    ? 'bg-slate-800 text-blue-400 shadow-xl shadow-black/30 scale-100'
                    : 'text-slate-300 hover:bg-slate-800/40 border border-slate-700/50'
                    }`}
                >
                  Day Planner
                </button>
                <button
                  onClick={() => setActiveTab('routine')}
                  className={`w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-2.5 rounded-xl font-semibold transition-all duration-300 flex justify-center items-center gap-2 ${activeTab === 'routine'
                    ? 'bg-slate-800 text-violet-400 shadow-xl shadow-black/30 scale-100'
                    : 'text-slate-300 hover:bg-slate-800/40 border border-slate-700/50'
                    }`}
                >
                  Daily Routine
                </button>
                <button
                  onClick={() => setCurrentView('analytics')}
                  className={`w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-2.5 rounded-xl font-semibold transition-all duration-300 flex justify-center items-center gap-2 text-slate-300 hover:bg-slate-800/40 border border-slate-700/50`}
                >
                  <FaChartLine className="text-purple-400" /> Analytics
                </button>
              </div>
            </div>

            {activeTab === 'planner' ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
                <div className="flex flex-col gap-6 lg:col-span-3">
                  <ActivityInput onAddActivity={addActivity} selectedDate={selectedDate} />
                  <ActivityList
                    activities={activities[dateKey] || []}
                    onToggle={toggleActivity}
                    onDelete={deleteActivity}
                    onEdit={editActivity}
                    onClearCompleted={clearCompleted}
                  />
                </div>
                <div className="flex justify-center overflow-x-auto pb-4 lg:col-span-1 w-full h-fit lg:sticky lg:top-24">
                  <Calendar
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    currentMonth={currentMonth}
                    setCurrentMonth={setCurrentMonth}
                    getDateStatus={getDateStatus}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
                <div className="lg:col-span-3">
                  <RoutineTracker selectedDate={selectedDate} routines={routines} setRoutines={setRoutines} />
                </div>
                <div className="flex justify-center overflow-x-auto pb-4 lg:col-span-1 w-full h-fit lg:sticky lg:top-24">
                  <Calendar
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    currentMonth={currentMonth}
                    setCurrentMonth={setCurrentMonth}
                    getDateStatus={getDateStatus}
                  />
                </div>
              </div>
            )}

            <div className="w-full pt-4">
              <GithubGraph activities={activities} routines={routines} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            </div>
          </>
        )}

        {currentView === 'analytics' && <AnalyticsView activities={activities} />}
        {currentView === 'user' && <UserProfile userData={userData} setUserData={setUserData} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;