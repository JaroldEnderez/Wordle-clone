import React from 'react';
import '../index.css';

const Words = ({ currentAttempt, grid, results, onWin, onGameOver }) => {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="flex flex-col gap-2">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((letter, colIndex) => {
              // Determine background color
              let bgClass = 'bg-gray-800';
              if (results[rowIndex]) {
                if (results[rowIndex][colIndex] === 'match') bgClass = 'bg-green-500';
                else if (results[rowIndex][colIndex] === 'present') bgClass = 'bg-orange-300';
                else bgClass = 'bg-gray-600';
              }

              // Animation classes
              let animClass = '';
              if (rowIndex === currentAttempt && letter !== '') animClass = 'pop';
              if (results[rowIndex]) animClass = 'flip';

              const handleFlipEnd = () => {
                if (colIndex === row.length - 1) {
                  if (results[rowIndex].every((r) => r === 'match')) onWin();
                  else if (rowIndex + 1 === grid.length) onGameOver();
                }
              };

              return (
                <div
                  key={colIndex}
                  className={`h-16 w-16 flex justify-center items-center text-2xl font-bold border-2 border-white text-white ${bgClass} ${animClass}`}
                  onAnimationEnd={animClass === 'flip' ? handleFlipEnd : undefined}
                >
                  {letter.toUpperCase()}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Words;
