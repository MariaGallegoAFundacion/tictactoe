export default function StarterPopup({ generation, options, onSelect }) {
  return (
    <div className="popup">
      <h2>Entrenador de {generation} Generación, escoja a su inicial:</h2>
      <select onChange={onSelect} defaultValue="">
        <option value="" disabled>Seleccionar...</option>
        {options.map((poke) => (
          <option key={poke} value={poke}>{poke}</option>
        ))}
      </select>
    </div>
  );
}