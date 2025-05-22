import { useState, useEffect } from 'react';

export default function StarterPopup({ generation, options, onSelect }) {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setSelected('');
  }, [generation]);

  function handleChange(e) {
    setSelected(e.target.value);
    onSelect(e);
  }

  return (
    <div className="popup">
      <h2>Entrenador de {generation} Generación, escoja a su inicial:</h2>
      <select value={selected} onChange={handleChange}>
        <option value="" disabled>Seleccionar...</option>
        {options.map((poke) => (
          <option key={poke} value={poke}>{poke}</option>
        ))}
      </select>
    </div>
  );
}