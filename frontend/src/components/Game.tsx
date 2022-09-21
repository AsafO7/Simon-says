import React, { MutableRefObject, useCallback, useRef, useState } from 'react'
import BottomContent from './BottomContent';
import GameConsole from './GameConsole';

let sequence: String[] = [] /* array to hold the sequence of colors */
const COLORS = ["green", "yellow", "red", "blue"]
const FLASH_TIMEOUT = 500; /* time between flashes */
const SEQUENCE_TIMEOUT = 850 /* time between switching the buttons in the sequence */

// Flashes a button
const flashButton = (button: String) => {
  document.getElementById(`${button}`)?.classList.add('active')
  setTimeout(() => {
    document.getElementById(`${button}`)?.classList.remove('active')
  }, FLASH_TIMEOUT);
}

// Disables\enables the game buttons
const disableButtons = (state: boolean) => {
  COLORS.forEach((color) => {
    let button = document.getElementById(`${color}`) as HTMLButtonElement;
    button.disabled = state;
  })
}

/* generates a number between 1 and 4 */
const rndChoice = () => {
  return COLORS[Math.floor(Math.random() * 4)];
}

/************************************************* Component ***************************************************/


const Game: React.FC = () => {
  const score_div = useRef(null)
  const score = useRef(0) /* the user's current score */
  const lastScore = useRef(0)
  const cur_combo = useRef(0) /* how many right buttons were pressed in a row */
  const sequenceIndex = useRef(0) /* where the user is currently in the sequence */
  const [midOfSeq, setMidOfSeq] = useState(false) /* is the user in the middle of a game? */
  const [errorMessage, setErrorMessage] = useState<String>("")
  const [gameOver, setGameOver] = useState(false)

  // Starts a sequence
  const startGame = (score_div: MutableRefObject<null>) => {
    if(midOfSeq) { return }
    if(score_div.current) (score_div.current as HTMLDivElement).textContent = `Score: 0`
    flashSequence()
  }

  // Displays a sequence
  const flashSequence = useCallback(() => {
    if(!midOfSeq) setMidOfSeq(() => true)
    sequence.push(rndChoice())
    disableButtons(true)
    sequence.forEach((item, i) => {
      setTimeout(() => {
            flashButton(item)
            if(i === sequence.length - 1) disableButtons(false)
        }, SEQUENCE_TIMEOUT * (i + 1))
    })
  },[midOfSeq])
  
  // Progresses the game according to the users' choice
  const play = useCallback((button: String, score_div: MutableRefObject<null>) => {
    flashButton(button)
    if (sequence.length === 0) return
    if(sequence[sequenceIndex.current] === button) {
      cur_combo.current++
      sequenceIndex.current++
      if(sequenceIndex.current === sequence.length) {
        score.current++
        if(score_div.current) (score_div.current as HTMLDivElement).textContent = `Score: ${score.current}`
        cur_combo.current = 0
        sequenceIndex.current = 0
        flashSequence()
      }
    }
    else {
      setMidOfSeq(() => false)
      sequence = []
      sequenceIndex.current = 0
      cur_combo.current = 0
      lastScore.current = score.current
      score.current = 0
      setGameOver((prev) => !prev)
    }
  }, [flashSequence])

  return (
    <>
      <GameConsole setErrorMessage={setErrorMessage} setGameOver={setGameOver} startGame={startGame} score_div={score_div} play={play} />
      <BottomContent score={lastScore} score_div={score_div} midOfSeq={midOfSeq} setErrorMessage={setErrorMessage} gameOver={gameOver} errorMessage={errorMessage} />
    </>
  )
}

export default Game