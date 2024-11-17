import React, { useState } from 'react';
import { Users, Settings, BarChart } from 'lucide-react';
import { User } from '../types';

interface AdminPanelProps {
  users: User[];
  onUpdateUser: (userId: string, updates: Partial<User>) => void;
  onDeleteUser: (userId: string) => void;
}

export default function AdminPanel({ users, onUpdateUser, onDeleteUser }: AdminPanelProps) {
  const [selectedTab, setSelectedTab] = useState<'users' | 'stats'>('users');

  const stats = {
    totalUsers: users.length,
    muscleGoal: users.filter(u => u.goals.type === 'muscle').length,
    athleticGoal: users.filter(u => u.goals.type === 'athletic').length,
    gymUsers: users.filter(u => u.goals.location === 'gym').length,
    homeUsers: users.filter(u => u.goals.location === 'home').length,
  };

  return (
    <div className="bg-white rounded-3xl shadow-md">
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setSelectedTab('users')}
            className={`flex items-center space-x-2 px-6 py-4 ${
              selectedTab === 'users'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users size={20} />
            <span>Utilisateurs</span>
          </button>
          <button
            onClick={() => setSelectedTab('stats')}
            className={`flex items-center space-x-2 px-6 py-4 ${
              selectedTab === 'stats'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <BarChart size={20} />
            <span>Statistiques</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {selectedTab === 'users' ? (
          <div className="space-y-4">
            {users.map(user => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div>
                  <h3 className="font-medium">{user.firstName}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-500">
                    {user.goals.type === 'muscle' ? 'Musculation' : 'Athlétique'} -{' '}
                    {user.goals.location === 'gym' ? 'En salle' : 'À domicile'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <h3 className="font-medium text-blue-700">Total Utilisateurs</h3>
              <p className="text-2xl font-bold text-blue-800">{stats.totalUsers}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <h3 className="font-medium text-green-700">Objectif Musculation</h3>
              <p className="text-2xl font-bold text-green-800">{stats.muscleGoal}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <h3 className="font-medium text-purple-700">Objectif Athlétique</h3>
              <p className="text-2xl font-bold text-purple-800">{stats.athleticGoal}</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <h3 className="font-medium text-orange-700">Entraînement en Salle</h3>
              <p className="text-2xl font-bold text-orange-800">{stats.gymUsers}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}