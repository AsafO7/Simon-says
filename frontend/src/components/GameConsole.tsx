import React, { MutableRefObject } from 'react'

type props = {
    setErrorMessage: React.Dispatch<React.SetStateAction<String>>,
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>,
    startGame: (score_div: MutableRefObject<null>) => void,
    score_div: React.MutableRefObject<null>,
    play: (button: String, score_div: MutableRefObject<null>) => void,
}

const GameConsole: React.FC<props> = ({ setErrorMessage, setGameOver, startGame, score_div, play}) => {
  return (
    <div className='container'>
      <span className='start-btn-container'>
          <button className='start-btn' onClick={() => {
            setErrorMessage(() => "")
            setGameOver(false)
            startGame(score_div)
          }}>Start</button>
      </span>
      <div className="game-container">
          <button className="btn btn-blue" id="blue" onClick={() => {
            play("blue", score_div)
            setErrorMessage(() => "")
          }}></button>
          <button className="btn btn-yellow" id="yellow"  onClick={() => {
            play("yellow", score_div)
            setErrorMessage(() => "")
          }}></button>
          <button className="btn btn-green" id="green"  onClick={() => {
            play("green", score_div)
            setErrorMessage(() => "")
          }}></button>
          <button className="btn btn-red" id="red"  onClick={() => {
            play("red", score_div)
            setErrorMessage(() => "")
          }}></button>
        </div>
      </div>
  )
}

export default GameConsole