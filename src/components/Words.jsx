import React, { useState } from 'react'
import '../index.css'

const Words = ({currentAttempt, grid, results, onWin, onGameOver}) => {
const columns = 5
const rows = 6

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col p-6'>
        {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-x-1">
              {row.map((letter, colIndex) => {
              let bgClass = "";
              if (results[rowIndex]) {
                if (results[rowIndex][colIndex] === "match") bgClass = "bg-green-500";
                else if (results[rowIndex][colIndex] === "present") bgClass = "bg-orange-300";
                else bgClass = "bg-gray-600";
              }
              // Animations
              let animClass = "";
              if (rowIndex === currentAttempt && letter !== "") animClass = "pop"; // typing
              if (results[rowIndex]) animClass = "flip"; // after submission
              
              const handleFlipEnd = () => {
                // Only trigger after the last letter in the row finishes flipping
                if (colIndex === row.length - 1) {
                  if (results[rowIndex].every((r) => r === "match")) {
                    onWin();
                  } else if (rowIndex + 1 === grid.length) {
                    onGameOver();
                  }
                }
              };

              return(
                <div
                  key={colIndex}
                  className={`h-15 w-15 border-white border-2 mb-4 text-white flex justify-center items-center ${bgClass} ${animClass}`}
                  onAnimationEnd={animClass === "flip" ? handleFlipEnd : undefined}
                >
                  {letter}
                </div>
              )})}
            </div>
          ))} 
      </div>    
    </div>
  )
}

export default Words
