import React from 'react';
import { Lightbulb, Clock, Droplets, Apple, Moon } from 'lucide-react';

export default function Tips() {
  const tips = [
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: "Régularité",
      content: "Maintenez un horaire d'entraînement régulier pour de meilleurs résultats"
    },
    {
      icon: <Droplets className="w-6 h-6 text-blue-500" />,
      title: "Hydratation",
      content: "Buvez au moins 2L d'eau par jour, plus pendant l'entraînement"
    },
    {
      icon: <Apple className="w-6 h-6 text-blue-500" />,
      title: "Nutrition",
      content: "Privilégiez les protéines et les glucides complexes"
    },
    {
      icon: <Moon className="w-6 h-6 text-blue-500" />,
      title: "Récupération",
      content: "Dormez 7-8h par nuit pour une récupération optimale"
    }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-800">Conseils Essentiels</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
            {tip.icon}
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">{tip.title}</h3>
              <p className="text-gray-600 text-sm">{tip.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}