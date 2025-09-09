import React from 'react';

export default function WordleKeyboard({onKeyPress, onBackSpace, onEnter, randomWord, keyStatuses}) {
  const rows = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    ['Enter', ...'ZXCVBNM'.split(''), 'Backspace'],
  ];

  for (const key in keyStatuses) {
    console.log(key, keyStatuses[key]);
  }

  return (
    <div className="w-full max-w-xl mx-auto select-none">
      {rows.map((row, rowIdx) => {
        return (
            <div className='flex justify-center gap-2 mb-2 ' key={rowIdx}>
                {row.map((key, keyIdx) =>{
                    let onClickHandler
                    
                    if (key === 'Enter'){
                        onClickHandler = onEnter
                    } else if (key === 'Backspace'){
                        onClickHandler = onBackSpace
                    } else onClickHandler = () => onKeyPress(key)
                    
                    let bgClass = 'bg-white '
                    keyStatuses[key] === 'match' ? bgClass="bg-green-500" : ''
                    keyStatuses[key] === 'present' ? bgClass="bg-yellow-500" : ''
                    keyStatuses[key] === 'absent' ? bgClass="bg-gray-600" : ''
                    
                    return <div className={`border-2 border-black rounded-md p-4 text-black ${bgClass}`} key={keyIdx} onClick={onClickHandler}>{key}</div>
                })}
            </div>
        )
      })}
    </div>
  );
}
