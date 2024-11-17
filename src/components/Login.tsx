import React, { useState } from 'react';
import { LogIn } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onRegister: () => void;
}

export default function Login({ onLogin, onRegister }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <LogIn className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Connexion</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Pas encore de compte ?{' '}
              <button
                onClick={onRegister}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Créer un compte
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}