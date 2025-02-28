'use client';

import HomeBg from '@/sections/home/components/bg';
import { useRef, useState } from 'react';
import BearDressup from '../../components/BearDressup';
import Coin from '@/sections/home/components/Coin';
import ProgressBar from './components/ProgressBar';
import { SceneList } from '@/sections/home/components/types';
import { useRouter } from 'next/navigation';
import ConnectWallet from '@/sections/home/components/connect-wallet';
import { useCoins } from '@/sections/home2/hooks/use-coins';

const Home = () => {

  const bgRef = useRef<any>();
  const [testCount, setTestCount] = useState<any>(0);
  const [sceneIdx, setSceneIdx] = useState(1);
  const router = useRouter();
  const { coins, handleCollected, progress, handleProgressComplete } = useCoins();

  return (
    <HomeBg
      ref={bgRef}
      speed={3}
      onSceneComplete={(params: any) => {
        console.log('onSceneComplete... %o', params);
        setTestCount(testCount + 1);
      }}
    >
      {coins.map((coin) => (
        <Coin
          key={coin.id}
          id={coin.id}
          initialX={coin.x}
          onCollected={handleCollected}
        />
      ))}
      <div className='absolute bottom-[8rem] left-1/2 translate-x-[-50%]'>
        <BearDressup />
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <ProgressBar 
          progress={progress} 
          onComplete={handleProgressComplete}
        />
      </div>

      <div className="flex gap-2 justify-between p-[10px_10px]">
        <div className="flex flex-wrap gap-2 items-center">
          <button
            type="button"
            className="h-[32px] border border-[#4B371F] rounded-[10px] text-[16px] px-[20px] text-black bg-[#C7FF6E] flex justify-center items-center whitespace-nowrap"
            onClick={() => {
              const sceneList = Object.values(SceneList);
              bgRef.current?.handleNextScene(sceneList[sceneIdx]);
              let _sceneIdx = sceneIdx + 1;
              if (_sceneIdx > sceneList.length - 1) {
                _sceneIdx = 0;
              }
              setSceneIdx(_sceneIdx);
            }}
          >
            Next Scene
          </button>
          <button
            onClick={() => router.push('/boost')}
            type="button"
            className="h-[32px] border border-[#4B371F] rounded-[10px] text-[16px] px-[20px] text-black bg-[#C7FF6E] flex justify-center items-center whitespace-nowrap"
          >
            Shop Scene
          </button>
        </div>
        <ConnectWallet />
      </div>
    </HomeBg>
  );
}

export default Home;
