import { useEffect, useRef } from 'react';

export default function AudioManager({ stage, audioEnabled }) {
  const openingAudio = useRef(null);
  const battleAudio = useRef(null);
  const winAudio = useRef(null);

  useEffect(() => {
    openingAudio.current = new Audio('/audio/pokeopening.mp3');
    openingAudio.current.loop = true;

    battleAudio.current = new Audio('/audio/pokebatalla.mp3');
    battleAudio.current.loop = true;

    winAudio.current = new Audio('/audio/pokewin.mp3');

    return () => {
      openingAudio.current?.pause();
      battleAudio.current?.pause();
      winAudio.current?.pause();
    };
  }, []);

  useEffect(() => {
      if (!audioEnabled) {
      openingAudio.current?.pause();
      battleAudio.current?.pause();
      winAudio.current?.pause();
      return;
    }
    const audios = [openingAudio.current, battleAudio.current, winAudio.current];
    audios.forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    if (stage === 'opening' && openingAudio.current) {
      openingAudio.current.play().catch(() => {});
    } else if (stage === 'battle' && battleAudio.current) {
      battleAudio.current.play().catch(() => {});
    } else if (stage === 'win' && winAudio.current) {
      winAudio.current.play().catch(() => {});
    }
  }, [stage, audioEnabled]);

  return null;
}
