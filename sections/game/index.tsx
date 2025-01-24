'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTelegram } from '@/hooks/useTelegram';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { motion } from 'framer-motion';

const GameView = () => {
  const { WebApp } = useTelegram();
  const {
    gameVisible,
    setGameVisible,
  } = useLayoutStore();

  const gameRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  const gameSource = useMemo(() => {
    if (!WebApp) return null;
    const url = new URL(process.env.NEXT_PUBLIC_GAME_URL || '');
    url.searchParams.set('initData', btoa(WebApp.initData));
    url.searchParams.set('api', btoa(process.env.NEXT_PUBLIC_API || ''));

    url.hash = gameVisible ? '#activated' : '#paused';

    return url.toString();
  }, [WebApp, gameVisible]);

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
    <motion.div
      className="w-full h-full"
      variants={{
        visible: {
          display: 'block',
          opacity: 1,
        },
        invisible: {
          display: 'none',
          opacity: 0,
        },
      }}
      animate={gameVisible ? 'visible' : 'invisible'}
    >
      {
        gameSource && (
          <motion.iframe
            ref={gameRef}
            className="w-full h-full"
            variants={{
              visible: {
                display: 'block',
                opacity: 1,
              },
              invisible: {
                display: 'none',
                opacity: 0,
              },
            }}
            animate={gameVisible ? 'visible' : 'invisible'}
            src={gameSource}
            onLoad={() => setLoaded(true)}
          />
        )
      }
    </motion.div>
  );
};

export default GameView;
