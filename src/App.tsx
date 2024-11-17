import React, { useState, useEffect } from 'react';
import { Dumbbell, Settings } from 'lucide-react';
import WorkoutDay from './components/WorkoutDay';
import Tips from './components/Tips';
import DailyGoals from './components/DailyGoals';
import Timer from './components/Timer';
import WorkoutEditor from './components/WorkoutEditor';
import Auth from './components/Auth';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import { User, Workouts } from './types';
import { generateWorkoutPlan } from './utils/workoutGenerator';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [workouts, setWorkouts] = useState<Workouts>({});
  const [isEditing, setIsEditing] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAdmin(parsedUser.email === 'admin@example.com');
      setShowLogin(false);
    }
    const savedWorkouts = localStorage.getItem('workouts');
    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    if (email === 'admin@example.com' && password === 'admin') {
      const adminUser: User = {
        id: 'admin',
        email,
        password,
        firstName: 'Admin',
        goals: {
          type: 'muscle',
          focusAreas: [],
          frequency: 3,
          location: 'gym',
          weightGoal: 'maintain'
        }
      };
      setUser(adminUser);
      setIsAdmin(true);
      localStorage.setItem('user', JSON.stringify(adminUser));
    } else {
      alert('Identifiants incorrects');
    }
    setShowLogin(false);
  };

  const handleRegister = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    setShowLogin(true);
    localStorage.removeItem('user');
  };

  const handleNewUser = (userData: User) => {
    setUser(userData);
    setAllUsers([...allUsers, userData]);
    localStorage.setItem('user', JSON.stringify(userData));
    const personalizedWorkouts = generateWorkoutPlan(userData.goals);
    setWorkouts(personalizedWorkouts);
    localStorage.setItem('workouts', JSON.stringify(personalizedWorkouts));
  };

  const handleUpdateWorkouts = (updatedWorkouts: Workouts) => {
    setWorkouts(updatedWorkouts);
    localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
    setIsEditing(false);
  };

  const handleToggleExercise = (day: string, index: number) => {
    setWorkouts(prev => {
      const updated = {
        ...prev,
        [day]: prev[day].map((exercise, i) => 
          i === index ? { ...exercise, completed: !exercise.completed } : exercise
        )
      };
      localStorage.setItem('workouts', JSON.stringify(updated));
      return updated;
    });
  };

  if (showLogin) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} />;
  }

  if (!user) {
    return <Auth onLogin={handleNewUser} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 md:py-8 rounded-b-3xl shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Dumbbell className="w-6 h-6 md:w-8 md:h-8" />
              <h1 className="text-xl md:text-3xl font-bold">FitPlanner</h1>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              {isAdmin && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-xl transition-colors text-sm md:text-base"
                >
                  <Settings size={16} className="md:w-5 md:h-5" />
                  <span className="hidden md:inline">Admin</span>
                </button>
              )}
              <span className="text-blue-100 text-sm md:text-base hidden sm:inline">
                Bonjour, {user.firstName}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 md:px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-xl transition-colors text-sm md:text-base"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {isAdmin && isEditing ? (
            <AdminPanel
              users={allUsers}
              onUpdateUser={(userId, updates) => {
                setAllUsers(users =>
                  users.map(u => (u.id === userId ? { ...u, ...updates } : u))
                );
              }}
              onDeleteUser={(userId) => {
                setAllUsers(users => users.filter(u => u.id !== userId));
              }}
            />
          ) : (
            <>
              <div className="bg-white rounded-3xl shadow-md p-4 md:p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">Planning Hebdomadaire</h2>
                    <p className="text-sm md:text-base text-gray-600">Focus: {user.goals.focusAreas.join(', ')}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-3 md:px-4 py-2 text-sm md:text-base bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    {isEditing ? 'Annuler' : 'Modifier'}
                  </button>
                </div>
                
                {isEditing ? (
                  <WorkoutEditor
                    workouts={workouts}
                    onSave={handleUpdateWorkouts}
                    onCancel={() => setIsEditing(false)}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4 overflow-x-auto pb-4">
                    {Object.entries(workouts).map(([day, exercises]) => (
                      <WorkoutDay
                        key={day}
                        day={day}
                        exercises={exercises}
                        onToggleExercise={handleToggleExercise}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="space-y-6">
                    <DailyGoals />
                    <Timer />
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <Tips />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;