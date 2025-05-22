import { useState } from 'react';
import Board from './Board';
import StarterPopup from './StarterPopup';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [starter1, setStarter1] = useState(null);
  const [starter2, setStarter2] = useState(null);
  const [showFirstPopup, setShowFirstPopup] = useState(true);
  const [showSecondPopup, setShowSecondPopup] = useState(false);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

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

  if (showFirstPopup) {
    return (
      <StarterPopup
        generation="Primera"
        options={['Bulbasaur', 'Charmander', 'Squirtle']}
        onSelect={handleStarter1Select}
      />
    );
  }

  if (showSecondPopup) {
    return (
      <StarterPopup
        generation="Segunda"
        options={['Chikorita', 'Cyndaquil', 'Totodile']}
        onSelect={handleStarter2Select}
      />
    );
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          starter1={starter1}
          starter2={starter2}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
