import Square from './Square';
import { calculateWinner } from '../utils'; 

export default function Board({ xIsNext, squares, onPlay, pokemonX, pokemonO, isDraw }) {

    function handleClick(i) {
    if (calculateWinner(squares) || squares[i] || isDraw) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? pokemonX : pokemonO;
    onPlay(nextSquares);
    }

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    :  isDraw
    ? "¡Empate!"
    : `Next player: ${xIsNext ? pokemonX : pokemonO}`;
  
    return (
    <>
      <div className={`status ${winner ? 'winner' : 'next-player'}`}>{status}</div>
      {[0, 3, 6].map((row) => (
        <div className="board-row" key={row}>
          {[0, 1, 2].map((col) => {
            const i = row + col;
            return (
              <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} 
              />
            );
          })}
        </div>
      ))}
    </>
  );
}