import React from 'react';

const ButtonGroup = ({ onGenerateRandom, onSolve, onNewProblem }) => {
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="flex gap-4">
        <button
          onClick={onNewProblem}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Get New Problem
        </button>
        <button
          onClick={onGenerateRandom}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Generate Random
        </button>
      </div>
      <button
        onClick={onSolve}
        className="px-8 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        Solve
      </button>
    </div>
  );
};

export default ButtonGroup; 