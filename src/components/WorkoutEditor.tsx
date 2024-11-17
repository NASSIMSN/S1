import React, { useState } from 'react';
import { Plus, Trash2, Save, X } from 'lucide-react';

interface Exercise {
  name: string;
  sets: string;
  completed: boolean;
}

interface WorkoutEditorProps {
  workouts: Record<string, Exercise[]>;
  onSave: (workouts: Record<string, Exercise[]>) => void;
  onCancel: () => void;
}

export default function WorkoutEditor({ workouts, onSave, onCancel }: WorkoutEditorProps) {
  const [editedWorkouts, setEditedWorkouts] = useState<Record<string, Exercise[]>>(
    JSON.parse(JSON.stringify(workouts))
  );

  const handleAddExercise = (day: string) => {
    setEditedWorkouts(prev => ({
      ...prev,
      [day]: [...prev[day], { name: '', sets: '', completed: false }]
    }));
  };

  const handleRemoveExercise = (day: string, index: number) => {
    setEditedWorkouts(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index)
    }));
  };

  const handleExerciseChange = (day: string, index: number, field: keyof Exercise, value: string) => {
    setEditedWorkouts(prev => ({
      ...prev,
      [day]: prev[day].map((exercise, i) => 
        i === index ? { ...exercise, [field]: value } : exercise
      )
    }));
  };

  return (
    <div className="space-y-6">
      {Object.entries(editedWorkouts).map(([day, exercises]) => (
        <div key={day} className="bg-gray-50 rounded-2xl p-4">
          <h3 className="text-lg font-bold mb-4 text-gray-800">{day}</h3>
          <div className="space-y-3">
            {exercises.map((exercise, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={exercise.name}
                  onChange={(e) => handleExerciseChange(day, index, 'name', e.target.value)}
                  placeholder="Nom de l'exercice"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={exercise.sets}
                  onChange={(e) => handleExerciseChange(day, index, 'sets', e.target.value)}
                  placeholder="Séries x Répétitions"
                  className="w-40 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleRemoveExercise(day, index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddExercise(day)}
              className="flex items-center space-x-2 px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"
            >
              <Plus size={20} />
              <span>Ajouter un exercice</span>
            </button>
          </div>
        </div>
      ))}
      
      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="px-6 py-2 flex items-center space-x-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <X size={20} />
          <span>Annuler</span>
        </button>
        <button
          onClick={() => onSave(editedWorkouts)}
          className="px-6 py-2 flex items-center space-x-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
        >
          <Save size={20} />
          <span>Enregistrer</span>
        </button>
      </div>
    </div>
  );
}