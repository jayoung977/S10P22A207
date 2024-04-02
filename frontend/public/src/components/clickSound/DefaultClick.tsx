import { useEffect } from 'react';
import clickSound from '@/static/sounds/clickSound.wav'

const useClickSound = () => {
  useEffect(() => {
    const audio = new Audio(clickSound);
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [clickSound]);

  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  return playSound;
};

export default useClickSound;