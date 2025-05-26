import { useState, useEffect } from 'react';
import Board from './Board';
import StarterPopup from './StarterPopup';
import AudioManager from './AudioManager';
import { calculateWinner, isBoardFull } from '../utils';

export default function Game({ audioEnabled }) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [starter1, setStarter1] = useState(null);
  const [starter2, setStarter2] = useState(null);
  const [showFirstPopup, setShowFirstPopup] = useState(true);
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [audioStage, setAudioStage] = useState('opening');

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && isBoardFull(currentSquares);
  const gameStarted = !showFirstPopup && !showSecondPopup;

  useEffect(() => {
    if (winner) {
      setAudioStage('win');
    } else if (gameStarted) {
      setAudioStage('battle');
    } else {
      setAudioStage('opening');
    }
  }, [winner, gameStarted]);

  const handleStarter1Select = (e) => {
    setStarter1(e.target.value);
    setShowFirstPopup(false);
    setShowSecondPopup(true);
  };

  const handleStarter2Select = (e) => {
    setStarter2(e.target.value);
    setShowSecondPopup(false);
  };

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    const description = move > 0 ? 'Ir al movimiento #' + move : 'Ir al inicio del juego';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <AudioManager stage={audioStage} audioEnabled={audioEnabled} />

      {showFirstPopup && (
        <StarterPopup
          generation="Primera"
          options={['Bulbasaur', 'Charmander', 'Squirtle']}
          onSelect={handleStarter1Select}
        />
      )}

      {showSecondPopup && (
        <StarterPopup
          generation="Segunda"
          options={['Chikorita', 'Cyndaquil', 'Totodile']}
          onSelect={handleStarter2Select}
        />
      )}

      {!showFirstPopup && !showSecondPopup && (
        <div className="game">
          <div className="game-board">
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
              pokemonX={starter1}
              pokemonO={starter2}
              isDraw={isDraw}
            />
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </div>
      )}
    </>
  );
}
