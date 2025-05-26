import { useState } from 'react';
import Game from './components/Game';

export default function App() {
  const [audioEnabled, setAudioEnabled] = useState(false);

  const toggleAudio = () => {
    setAudioEnabled((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleAudio}>
        {audioEnabled ? 'Quiero jugar sin música' : 'Quiero jugar con música'}
      </button>
      <Game audioEnabled={audioEnabled} />
    </div>
  );
}
