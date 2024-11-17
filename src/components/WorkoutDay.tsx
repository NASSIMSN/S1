import React from 'react';
import { Check, Circle } from 'lucide-react';

interface Exercise {
  name: string;
  sets: string;
  completed: boolean;
}

interface WorkoutDayProps {
  day: string;
  exercises: Exercise[];
  onToggleExercise: (day: string, index: number) => void;
}

export default function WorkoutDay({ day, exercises, onToggleExercise }: WorkoutDayProps) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4 min-w-[200px] h-full">
      <h3 className="text-lg font-bold mb-3 text-gray-800 pb-2 border-b border-gray-200">{day}</h3>
      <div className="space-y-2">
        {exercises.map((exercise, index) => (
          <div 
            key={index}
            className="flex items-start space-x-2 p-2 hover:bg-white rounded-xl transition-colors"
          >
            <button
              onClick={() => onToggleExercise(day, index)}
              className={`p-1 rounded-full transition-colors flex-shrink-0 mt-0.5 ${
                exercise.completed ? 'text-green-500' : 'text-gray-400'
              }`}
            >
              {exercise.completed ? <Check size={18} /> : <Circle size={18} />}
            </button>
            <div className="flex-1">
              <p className={`text-sm ${exercise.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {exercise.name}
              </p>
              <span className="text-xs text-gray-500">{exercise.sets}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}