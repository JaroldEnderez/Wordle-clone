import { useEffect, useState } from 'react'
import Words from './components/Words'
import words from './words.json';
import './App.css'
import WordleKeyboard from './components/keyboard'
function App() {
  const [randomWord, setRandomWord] = useState('')
  const [currentGuess, setCurrentGuess] = useState('')
  const [currentAttempt, setCurrentAttempt] = useState(0)
  const rows = 6
  const columns = 5
  const [grid, setGrid] = useState(Array.from({length: rows}, () => Array(columns).fill('')))
  const [results, setResults] = useState([]);
  const [keyStatuses, setKeyStatuses] = useState({})
  const [isWinner, setIsWinner] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
 

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length)
    setRandomWord(words[randomIndex])
  }, [])

  useEffect(() => {
    if (randomWord) {
      console.log('Random word selected:', randomWord)
    }
  }, [randomWord])

  


  const handleKeyPress = (key) => {
    if (isWinner || isGameOver) return;
    if (key === 'Enter' || key === 'Backspace') return;

    if(currentGuess.length < 5){
      setCurrentGuess(prev => prev + key)

      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row => [...row])
        newGrid[currentAttempt][currentGuess.length] = key
        return newGrid
      })
    }
    
  }

  const handleEnter = () => {
    
    if (isWinner || isGameOver) return; // 🚨 stop typing if game ended
    if (currentAttempt === 6) return; // no more attempts
    if (currentGuess.length !== 5) return; // must be full word
    console.log("Current guess: ", currentGuess)
    // Build results for the current row
    const newResults = [...results]
    newResults[currentAttempt] = currentGuess.split('').map((letter, index) =>(
      randomWord[index].toLowerCase() === letter.toLowerCase() ? 
      "match" :
      randomWord.toLowerCase().includes(letter.toLowerCase()) ? 
      "present" :
      "absent"
    ))
    
    setResults(newResults);
    console.log("Resutls: ", results)
    // Update guess grid (optional, if you're storing guesses in the grid)
    const newGrid = [...grid];
    newGrid[currentAttempt] = currentGuess.split("");
    setGrid(newGrid);
  
    const updatedStatus = {...keyStatuses}
    currentGuess.split('').forEach((letter,i) => {
      const result = newResults[currentAttempt][i]
      console.log(letter," is ", result)
      if (result === 'match'){
        updatedStatus[letter] = 'match'
      } else if (result === 'present' && updatedStatus[letter] !== 'match'){
        updatedStatus[letter] = 'present'
      } else if (!updatedStatus[letter]){
        updatedStatus[letter] =  'absent'
      }

    })

    setKeyStatuses(updatedStatus)

    // Clear guess & move to next attempt
    setCurrentGuess("");
    setCurrentAttempt(prev => prev + 1);

   
  };
  const resetGame = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setRandomWord(words[randomIndex]);
    setIsGameOver(false)
    setIsWinner(false)
    setCurrentGuess('');
    setResults([]);
    setGrid(Array.from({length: rows}, () => Array(columns).fill('')))
    setKeyStatuses({})
    setCurrentAttempt(0)
  };
  

  const handleBackSpace = () => {
    setCurrentGuess(prev => prev.slice(0, -1))
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => [...row])
      const rowIndex = currentAttempt
      const columnIndex = currentGuess.length-1

      newGrid[rowIndex][columnIndex] = ''
      return newGrid
    })
    console.log(currentGuess)
  }

  useEffect(() => {
    console.log(currentGuess);
    grid.forEach((row, i) =>{
      console.log(`"Row: ${i}"`, row.join(' '))
    })
  }, [currentGuess]);

  return (
    <>
<div className='bg-gray-900 h-screen w-screen flex flex-col justify-center items-center relative'>
<Words className='max-h-[70vh]' results={results} currentAttempt={currentAttempt} grid={grid} randomWord={randomWord} onGameOver={()=>setIsGameOver(true)} onWin={() => setIsWinner(true)}></Words>
        
        <div className='mt-10'>
        <WordleKeyboard  className='max-h-[25vh]' onKeyPress={handleKeyPress} onBackSpace={handleBackSpace} onEnter={handleEnter} randomWord={randomWord} keyStatuses={keyStatuses}/>
        </div>
        
        {isWinner && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/50 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-black text-2xl font-bold">You win!</p>
              <button 
                onClick={resetGame} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Reset Game
              </button>
            </div>
          </div>
        )}

        {!isWinner && isGameOver && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/50 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-black text-2xl font-bold">You lost!</p>
              <p className="mt-2">Word was: {randomWord}</p>
              <button 
                onClick={resetGame} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Reset Game
              </button>

            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default App
