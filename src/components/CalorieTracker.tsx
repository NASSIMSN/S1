import React, { useState } from 'react';
import { Plus, Minus, Utensils, Dumbbell } from 'lucide-react';
import { CalorieLog } from '../types';

interface CalorieTrackerProps {
  dailyGoal: number;
  onAddEntry: (entry: Omit<CalorieLog, 'id' | 'date'>) => void;
  entries: CalorieLog[];
}

export default function CalorieTracker({ dailyGoal, onAddEntry, entries }: CalorieTrackerProps) {
  const [newEntry, setNewEntry] = useState({
    calories: '',
    description: '',
    type: 'food' as const
  });

  const todayEntries = entries.filter(
    entry => entry.date === new Date().toISOString().split('T')[0]
  );

  const totalCalories = todayEntries.reduce((sum, entry) => {
    return sum + (entry.type === 'food' ? entry.calories : -entry.calories);
  }, 0);

  const remainingCalories = dailyGoal - totalCalories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEntry.calories && newEntry.description) {
      onAddEntry({
        calories: parseInt(newEntry.calories),
        description: newEntry.description,
        type: newEntry.type
      });
      setNewEntry({ calories: '', description: '', type: 'food' });
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Suivi Calorique</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-2xl">
          <p className="text-sm text-blue-600 mb-1">Objectif</p>
          <p className="text-2xl font-bold text-blue-700">{dailyGoal} kcal</p>
        </div>
        <div className="bg-green-50 p-4 rounded-2xl">
          <p className="text-sm text-green-600 mb-1">Consommé</p>
          <p className="text-2xl font-bold text-green-700">{totalCalories} kcal</p>
        </div>
        <div className={`${remainingCalories >= 0 ? 'bg-purple-50' : 'bg-red-50'} p-4 rounded-2xl`}>
          <p className={`text-sm ${remainingCalories >= 0 ? 'text-purple-600' : 'text-red-600'} mb-1`}>
            Restant
          </p>
          <p className={`text-2xl font-bold ${remainingCalories >= 0 ? 'text-purple-700' : 'text-red-700'}`}>
            {Math.abs(remainingCalories)} kcal
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={() => setNewEntry(prev => ({ ...prev, type: 'food' }))}
            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors ${
              newEntry.type === 'food'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Utensils size={20} />
            <span>Nourriture</span>
          </button>
          <button
            type="button"
            onClick={() => setNewEntry(prev => ({ ...prev, type: 'exercise' }))}
            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors ${
              newEntry.type === 'exercise'
                ? 'bg-orange-100 text-orange-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Dumbbell size={20} />
            <span>Exercice</span>
          </button>
        </div>
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="Calories"
            value={newEntry.calories}
            onChange={e => setNewEntry(prev => ({ ...prev, calories: e.target.value }))}
            className="w-32 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={newEntry.description}
            onChange={e => setNewEntry(prev => ({ ...prev, description: e.target.value }))}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Ajouter
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {todayEntries.map(entry => (
          <div
            key={entry.id}
            className={`flex items-center justify-between p-3 rounded-xl ${
              entry.type === 'food' ? 'bg-green-50' : 'bg-orange-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              {entry.type === 'food' ? (
                <Plus className="w-5 h-5 text-green-600" />
              ) : (
                <Minus className="w-5 h-5 text-orange-600" />
              )}
              <span className="text-gray-700">{entry.description}</span>
            </div>
            <span className={`font-medium ${
              entry.type === 'food' ? 'text-green-600' : 'text-orange-600'
            }`}>
              {entry.type === 'food' ? '+' : '-'}{entry.calories} kcal
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}