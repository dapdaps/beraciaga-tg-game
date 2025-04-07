'use client';

import { useLayoutStore } from '@/stores/useLayoutStore';
import { useEffect } from 'react';
import GameFrame from '@/sections/game/game-frame';

const GameView = () => {
  const { gameVisible, gameFrameVisible, setGameFrameVisible } = useLayoutStore();

  useEffect(() => {
    if (!gameVisible) return;
    setGameFrameVisible(true);
  }, [gameVisible]);

  // Ensure the game iframe is only loaded once.
  return gameFrameVisible && (
    <GameFrame />
  );
};

export default GameView;
