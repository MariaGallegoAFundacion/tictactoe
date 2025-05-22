import Square from './Square';

export default function Board({ xIsNext, squares, onPlay, pokemonX, pokemonO }) {

    function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
        }
    }
    return null;
    }


    function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? pokemonX : pokemonO;
    onPlay(nextSquares);
    }

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? pokemonX : pokemonO}`;
  
    return (
    <>
      <div className="status">{status}</div>
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