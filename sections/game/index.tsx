'use client';

import { useEffect, useRef, useState } from 'react';
import { useTelegram } from '@/hooks/useTelegram';

const GameView = () => {
  const { WebApp } = useTelegram();

  const gameRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!gameRef.current || !WebApp || !loaded) return;
    const data = {
      type: 'Beraciaga',
      data: {
        initData: WebApp.initData,
        initDataUnsafe: WebApp.initDataUnsafe,
        version: WebApp.version,
        viewportHeight: WebApp.viewportHeight,
        viewportStableHeight: WebApp.viewportStableHeight,
        isExpanded: WebApp.isExpanded,
        platform: WebApp.platform,

        API: process.env.NEXT_PUBLIC_API,
        APP_LINK: process.env.NEXT_PUBLIC_APP_LINK,
        BERA_IMPORTED_URL: process.env.NEXT_PUBLIC_BERA_IMPORTED_URL,
      },
    };
    console.log('%cdata will be send: %o', 'background:#FFD335;color:#FFF;', data);
    try {
      console.log('%cgame content window: %o', 'background:#FFD335;color:#FFF;', gameRef.current.contentWindow);
      gameRef.current.contentWindow.postMessage(data, '*');
      console.log('%cpost message succeed: %o', 'background:#FFD335;color:#FFF;', data);
    } catch (err) {
      console.log('%cpost message failed: %o', 'background:#FFD335;color:#FFF;', err);
    }
  }, [loaded, WebApp]);

  return (
    <div className="w-full h-full">
      <iframe
        ref={gameRef}
        className="w-full h-full"
        src="https://core-game.beratown.app/"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default GameView;
