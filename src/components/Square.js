const pokemonImages = {
  Bulbasaur: '/images/bs.jpg',
  Charmander: '/images/ch.jpg',
  Squirtle: '/images/sq.jpg',
  Chikorita: '/images/chk.jpg',
  Cyndaquil: '/images/cnd.jpg',
  Totodile: '/images/tt.jpg'
};

export default function Square({ value, onSquareClick}) {
  let content = null;

  if (value) {
    content = <img src={pokemonImages[value]} alt={value} />;
  } else {
    content = <span style={{ opacity: 0 }}>X</span>; 
  }

  return (
    <button className="square" onClick={onSquareClick}>
      {content}
    </button>
  );
}