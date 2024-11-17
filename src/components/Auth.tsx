import React, { useState } from 'react';
import { User } from '../types';
import { Dumbbell, ChevronRight, Home, Building2, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

const calculateDailyCalories = (
  weightGoal: 'gain' | 'loss' | 'maintain',
  type: 'muscle' | 'athletic' | 'endurance' | 'strength'
): number => {
  // Base calories pour une personne moyenne
  const baseCalories = 2000;
  
  // Ajustement selon l'objectif de poids
  const weightMultiplier = weightGoal === 'gain' ? 1.2 : weightGoal === 'loss' ? 0.8 : 1;
  
  // Ajustement selon le type d'entraînement
  const typeMultiplier = type === 'muscle' ? 1.2 : type === 'athletic' ? 1.1 : 1;
  
  return Math.round(baseCalories * weightMultiplier * typeMultiplier);
};

export default function Auth({ onLogin }: AuthProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    goals: {
      type: 'muscle' as const,
      focusAreas: [] as string[],
      frequency: 3,
      location: 'gym' as const,
      weightGoal: 'maintain' as const,
      dailyCalories: 2000
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      const userData: User = {
        ...formData,
        id: Date.now().toString(),
        goals: {
          ...formData.goals,
          dailyCalories: calculateDailyCalories(formData.goals.weightGoal, formData.goals.type)
        }
      };
      onLogin(userData);
    }
  };

  const muscleGroups = [
    { id: 'chest', label: 'Pectoraux' },
    { id: 'back', label: 'Dos' },
    { id: 'legs', label: 'Jambes' },
    { id: 'shoulders', label: 'Épaules' },
    { id: 'arms', label: 'Bras' },
    { id: 'core', label: 'Abdominaux' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Dumbbell className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">FitPlanner</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Créez votre compte</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Quel est votre objectif ?</h2>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Type d'entraînement
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          goals: { ...formData.goals, type: 'muscle' }
                        })}
                        className={`p-4 border rounded-xl text-center transition-colors ${
                          formData.goals.type === 'muscle'
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <h3 className="font-semibold">Musclé</h3>
                        <p className="text-sm text-gray-600">Prise de masse</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          goals: { ...formData.goals, type: 'athletic' }
                        })}
                        className={`p-4 border rounded-xl text-center transition-colors ${
                          formData.goals.type === 'athletic'
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <h3 className="font-semibold">Athlétique</h3>
                        <p className="text-sm text-gray-600">Force et explosivité</p>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Lieu d'entraînement
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          goals: { ...formData.goals, location: 'home' }
                        })}
                        className={`p-4 border rounded-xl text-center transition-colors ${
                          formData.goals.location === 'home'
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Home className="w-6 h-6 mx-auto mb-2" />
                        <h3 className="font-semibold">À la maison</h3>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          goals: { ...formData.goals, location: 'gym' }
                        })}
                        className={`p-4 border rounded-xl text-center transition-colors ${
                          formData.goals.location === 'gym'
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Building2 className="w-6 h-6 mx-auto mb-2" />
                        <h3 className="font-semibold">En salle</h3>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Objectif de poids
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          goals: { ...formData.goals, weightGoal: 'gain' }
                        })}
                        className={`p-4 border rounded-xl text-center transition-colors ${
                          formData.goals.weightGoal === 'gain'
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                        <h3 className="font-semibold">Prise</h3>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          goals: { ...formData.goals, weightGoal: 'maintain' }
                        })}
                        className={`p-4 border rounded-xl text-center transition-colors ${
                          formData.goals.weightGoal === 'maintain'
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Minus className="w-6 h-6 mx-auto mb-2" />
                        <h3 className="font-semibold">Maintien</h3>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          goals: { ...formData.goals, weightGoal: 'loss' }
                        })}
                        className={`p-4 border rounded-xl text-center transition-colors ${
                          formData.goals.weightGoal === 'loss'
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <TrendingDown className="w-6 h-6 mx-auto mb-2" />
                        <h3 className="font-semibold">Perte</h3>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fréquence d'entraînement par semaine
                    </label>
                    <select
                      value={formData.goals.frequency}
                      onChange={(e) => setFormData({
                        ...formData,
                        goals: { ...formData.goals, frequency: parseInt(e.target.value) }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="2">2 fois par semaine</option>
                      <option value="3">3 fois par semaine</option>
                      <option value="4">4 fois par semaine</option>
                      <option value="5">5 fois par semaine</option>
                      <option value="6">6 fois par semaine</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Quelles zones souhaitez-vous travailler ?
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {muscleGroups.map((group) => (
                      <button
                        key={group.id}
                        type="button"
                        onClick={() => {
                          const areas = formData.goals.focusAreas.includes(group.id)
                            ? formData.goals.focusAreas.filter(area => area !== group.id)
                            : [...formData.goals.focusAreas, group.id];
                          setFormData({
                            ...formData,
                            goals: { ...formData.goals, focusAreas: areas }
                          });
                        }}
                        className={`p-4 border rounded-xl text-center transition-colors ${
                          formData.goals.focusAreas.includes(group.id)
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {group.label}
                      </button>
                    ))}
                  </div>
                  {formData.goals.focusAreas.length === 0 && (
                    <p className="text-sm text-red-500">
                      Sélectionnez au moins une zone musculaire
                    </p>
                  )}
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={step === 3 && formData.goals.focusAreas.length === 0}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              <span>{step === 3 ? 'Commencer' : 'Suivant'}</span>
              <ChevronRight size={20} />
            </button>
          </form>

          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-4 w-full px-6 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
            >
              Retour
            </button>
          )}
        </div>
      </div>
    </div>
  );
}