import React, { useState } from 'react';
import { Target, Plus, Check, Circle, X } from 'lucide-react';

interface Goal {
  id: number;
  text: string;
  completed: boolean;
}

export default function DailyGoals() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, text: "Boire 2L d'eau", completed: false },
    { id: 2, text: "Préparer mes repas", completed: false },
  ]);
  const [newGoal, setNewGoal] = useState('');

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), text: newGoal.trim(), completed: false }]);
      setNewGoal('');
    }
  };

  const toggleGoal = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const removeGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="bg-white rounded-3xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="w-6 h-6 text-purple-500" />
        <h2 className="text-2xl font-bold text-gray-800">Objectifs du Jour</h2>
      </div>

      <form onSubmit={handleAddGoal} className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Ajouter un objectif..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-500 text-white rounded-2xl hover:bg-purple-600 transition-colors flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter</span>
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="flex items-center justify-between group p-2 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <div className="flex items-center space-x-3 flex-1">
              <button
                onClick={() => toggleGoal(goal.id)}
                className={`p-1 rounded-full transition-colors ${
                  goal.completed ? 'text-green-500' : 'text-gray-400'
                }`}
              >
                {goal.completed ? <Check size={20} /> : <Circle size={20} />}
              </button>
              <span className={`${goal.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {goal.text}
              </span>
            </div>
            <button
              onClick={() => removeGoal(goal.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}