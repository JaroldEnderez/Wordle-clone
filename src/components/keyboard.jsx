import React from 'react';

export default function WordleKeyboard({onKeyPress, onBackSpace, onEnter, randomWord, keyStatuses}) {
  const rows = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    ['Enter', ...'ZXCVBNM'.split(''), 'Delete'],
  ];

  for (const key in keyStatuses) {
    console.log(key, keyStatuses[key]);
  }

  return (
    <div className="w-full max-w-xl mx-auto select-none px-2">
      {rows.map((row, rowIdx) => {
        return (
          <div className='flex justify-center gap-1 sm:gap-2 mb-2' key={rowIdx}>
            {row.map((key, keyIdx) => {
              let onClickHandler

              if (key === 'Enter') {
                onClickHandler = onEnter
              } else if (key === 'Delete') {
                onClickHandler = onBackSpace
              } else onClickHandler = () => onKeyPress(key)

              const isActionKey = key.length > 1

              let bgClass = 'bg-white text-black'
              keyStatuses[key] === 'match' ? bgClass = 'bg-green-600 text-white' : null
              keyStatuses[key] === 'present' ? bgClass = 'bg-yellow-500 text-black' : null
              keyStatuses[key] === 'absent' ? bgClass = 'bg-gray-600 text-white' : null

              const sizeClass = isActionKey
                ? 'min-w-[3rem] sm:min-w-[3.5rem] md:min-w-[4rem]'
                : 'min-w-[2rem] sm:min-w-[2.25rem] md:min-w-[2.5rem]'

              return (
                <div
                  className={`border-2 border-black rounded-md px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 ${sizeClass} h-10 sm:h-12 flex items-center justify-center ${bgClass}`}
                  key={keyIdx}
                  onClick={onClickHandler}
                >
                  {key}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  );
}
