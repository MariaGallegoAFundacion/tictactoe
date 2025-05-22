import { useState } from 'react';

function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    if (value === null) {
      setValue('X');
    }
  }

  return (
    <button className="square" onClick={handleClick}>
      {value ?? <span style={{ opacity: 0 }}>X</span>}
    </button>
  );
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
