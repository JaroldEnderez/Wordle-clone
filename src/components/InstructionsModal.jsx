import React from 'react';

const InstructionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="flex sm:fixed inset-0 flex justify-center items-center bg-black/70 z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-gray-400"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-center">How to Play</h2>

        {/* Instructions */}
        <ul className="space-y-2 text-gray-200 text-base">
          <li>1. Guess the <strong>5-letter word</strong> within 6 attempts.</li>
          <li>2. Click letters on the keyboard or type them.</li>
          <li>3. Press <strong>Enter</strong> to submit your guess.</li>
          <li>4. Press <strong>Backspace</strong> to delete a letter.</li>
          <li>5. Colors indicate:</li>
          <ul className="ml-4 list-disc">
            <li><span className="text-green-500 font-bold">Green</span>: Letter is correct and in the right spot.</li>
            <li><span className="text-orange-300 font-bold">Orange</span>: Letter is in the word but wrong spot.</li>
            <li><span className="text-gray-400 font-bold">Gray</span>: Letter is not in the word.</li>
          </ul>
          <li>6. Guess correctly to win, or see the word if you run out of attempts.</li>
        </ul>

        {/* Close Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
