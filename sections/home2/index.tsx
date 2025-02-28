import { createContext, memo, useEffect, useState } from 'react';
import Header from '@/sections/home2/components/header';
import Content from '@/sections/home2/components/content';
import { useCoins } from '@/sections/home2/hooks/use-coins';
import useLogin from '@/hooks/useLogin';
import { useUser } from '@/hooks/useUser';
import { useTelegram } from '@/hooks/useTelegram';
import AppHeader from '@components/header';

import BearControlModal from './components/BearControlModal';
import PlayerEquipmentChoiceModal from './components/PlayerEquipmentChoiceModal';
import BeraLevelContainer from './components/BeraLevelContainer';
import Coin from '../home/components/Coin';
import BearDressup from '../../components/BearDressup';

// 是否开启调试模式
const DEBUG_MODE = process.env.NODE_ENV === 'development';

export const HomeContext = createContext<any>({});

export default memo(function Home() {
  // 根据环境启用调试模式
  const { coins, handleCollected } = useCoins({ debug: DEBUG_MODE });
  const [isInitialized, setIsInitialized] = useState(false);
  const { handleLogin } = useLogin();
  const user = useUser();
  const { WebApp } = useTelegram();

  const tgUserId = WebApp?.initDataUnsafe?.user?.id;

  const {
    getEquipmentList,
    getLevels,
    getUserEquipmentList,
    getUserInfo,
  } = user;

  const init = () => {
    getEquipmentList();
    getLevels();
    getUserEquipmentList();
    getUserInfo();
  };

  useEffect(() => {
    if (!isInitialized) {
      handleLogin();
      setIsInitialized(true);
      return;
    }
  }, [isInitialized]);

  useEffect(() => {
    if (!tgUserId) return;
    init();
  }, [tgUserId]);

  return (
    <HomeContext.Provider value={{ ...coins, ...user }}>
      <MainScene />
      {/* <InitScene /> */}
    </HomeContext.Provider>
  )
});

const InitScene = () => {
  return (
    <div className="relative h-full flex flex-col items-stretch bg-[#FFD335] rounded-[10px] rounded-b-[0]">
      <Header />
      <Content />
    </div>
  )
}

const MainScene = () => {
  return (
    <div className='w-[100vw] relative h-[100dvh] bg-[url(/images/role/TG-phone.png)] bg-no-repeat bg-cover bg-center'>
      <AppHeader />
      <div className='flex mt-3 justify-between'>
        <img src="/images/home/lottery.png" className='w-[90px] h-[90px]' alt="" />
        <img src="/images/home/rank.png" className='w-[30px] h-[30px] mr-3' alt="" />
      </div>
      <DropCoinsContainer />
      <div className='absolute left-[15%] bottom-[20%]'>
          <BearDressup />
      </div>
      <div className='w-full mx-auto absolute bottom-[90px]'>
        <BeraLevelContainer />
      </div>
      {/* <BearControlModal /> */}
      {/* <PlayerEquipmentChoiceModal /> */}
  </div>
  )
}

const DropCoinsContainer = () => {
  const { coins, handleCollected } = useCoins({ debug: DEBUG_MODE });
  return (
    <div className='absolute w-screen h-screen top-0 left-0'>
    {coins.map((coin) => (
      <Coin
        key={coin.id}
        id={coin.id}
        initialX={coin.x}
        onCollected={handleCollected}
      />
    ))}
    </div>
  )
}



