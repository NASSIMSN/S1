import React, { useState, useEffect } from 'react';
import { Timer as TimerIcon, Play, Pause, RotateCcw } from 'lucide-react';

const PRESETS = [
  { label: '1:30', seconds: 90 },
  { label: '2:30', seconds: 150 },
  { label: '3:00', seconds: 180 },
];

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePresetClick = (seconds: number) => {
    setTimeLeft(seconds);
    setIsActive(false);
  };

  const toggleTimer = () => {
    if (timeLeft > 0) {
      setIsActive(!isActive);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
  };

  return (
    <div className="bg-white rounded-3xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <TimerIcon className="w-6 h-6 text-orange-500" />
        <h2 className="text-2xl font-bold text-gray-800">Chronomètre</h2>
      </div>

      <div className="text-center">
        <div className="text-5xl font-bold text-gray-800 mb-6">
          {formatTime(timeLeft)}
        </div>

        <div className="flex justify-center space-x-3 mb-6">
          {PRESETS.map((preset) => (
            <button
              key={preset.seconds}
              onClick={() => handlePresetClick(preset.seconds)}
              className={`px-4 py-2 rounded-2xl transition-colors ${
                timeLeft === preset.seconds
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className={`p-3 rounded-full ${
              isActive
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            } text-white transition-colors`}
            disabled={timeLeft === 0}
          >
            {isActive ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={resetTimer}
            className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}