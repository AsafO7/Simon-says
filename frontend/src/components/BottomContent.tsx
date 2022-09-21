import React from 'react'
import { Link } from 'react-router-dom'

type props = {
    score: React.MutableRefObject<number>,
    score_div: React.MutableRefObject<null>,
    midOfSeq: boolean,
    setErrorMessage: React.Dispatch<React.SetStateAction<String>>,
    gameOver: boolean,
    errorMessage: String,
}

const BottomContent: React.FC<props> = ({ score, score_div, midOfSeq, setErrorMessage, gameOver, errorMessage }) => {
  return (
    <>
        <aside className='bottom-menu'>
            <div className="score" ref={score_div}>Score: 0</div>
            <Link to={midOfSeq || gameOver ? '' : '/leaderboard'} className='leaderboard-btn' onClick={() => {
                if(midOfSeq) {
                    setErrorMessage(() => "Not in the middle of a game")
                    return
                }
                if(gameOver) {
                    setErrorMessage(() => "Please record your score first")
                    return
                }
                setErrorMessage(() => "")
            }}>Leaderboard</Link>
        </aside>
        {errorMessage && <div className='err-msg'>{errorMessage}</div>}
        {gameOver &&
        <form action="/leaderboard" method='POST' className='score-record-form'>
            <div className='end-game-div'>Game over</div>
            <label className='score-record-label'>Name:</label>
            <input type="text" name="player" className='score-record-input' required maxLength={20} />
            <input type="hidden" name="score" value={score.current} />
            <button type='submit' className='score-record-btn'>Confirm</button>
        </form>}
    </>
  )
}

export default BottomContent