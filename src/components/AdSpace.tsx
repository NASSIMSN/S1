import React from 'react';

interface AdSpaceProps {
  position: 'left' | 'right';
}

export default function AdSpace({ position }: AdSpaceProps) {
  return (
    <div className={`hidden lg:block w-64 ${position === 'left' ? 'mr-8' : 'ml-8'}`}>
      <div className="sticky top-8">
        <div className="bg-white rounded-3xl shadow-md p-4 mb-4">
          <div className="aspect-[4/5] bg-gray-100 rounded-2xl flex items-center justify-center">
            <p className="text-gray-400 text-sm">Espace publicitaire</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-md p-4">
          <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
            <p className="text-gray-400 text-sm">Espace publicitaire</p>
          </div>
        </div>
      </div>
    </div>
  );
}