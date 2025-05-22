export default function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value ?? <span style={{ opacity: 0 }}>X</span>}
    </button>
  );
}