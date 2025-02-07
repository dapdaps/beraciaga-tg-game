import { createContext, memo, useEffect, useState } from 'react';
import Header from '@/sections/home2/components/header';
import Content from '@/sections/home2/components/content';
import { useCoins } from '@/sections/home2/hooks/use-coins';
import useLogin from '@/hooks/useLogin';
import { useUser } from '@/hooks/useUser';
import { useTelegram } from '@/hooks/useTelegram';
import IconFlash from "@/public/svg/flash.svg";
import Bear from '../home/components/DressUpGame/Bear';
import { useGameState } from '../home/components/DressUpGame/useGameState';
import DressUpGame from '../home/components/DressUpGame';

export const HomeContext = createContext<any>({});

export default memo(function Home() {
  const coins = useCoins();
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
const { bearState } = useGameState();
  return (
    <HomeContext.Provider value={{ ...coins, ...user }}>

      <div className='relative h-full flex flex-col items-stretch'>
        <div className='flex items-center justify-between px-2 pt-2'>
          <div className='bg-[url(/images/home/avtar-area.png)] bg-contain bg-no-repeat w-[50px] h-[50px] flex items-center justify-center relative'>
            <div className='w-full h-full'
              style={{
                transform: 'scale(0.16) translate(-220%, -286%)',
              }}
            >
              <DressUpGame />
            </div>
          </div>
          <CapsuleButton>
            <div className='flex items-center justify-between px-[1px]'>
              <img src='/images/home/coin.png' alt='coin' className='w-6 h-6' />
              <span className='text-stroke-2 text-[16px] text-[#FFF4C2] font-cherryBomb'>1,004,400</span>
              <div className="flex-shrink-0 font-montserrat italic text-[#6376FF] text-[14px] font-[900] bg-[url(/images/bg-im.png)] bg-contain bg-no-repeat w-[28px] h-[28px] rounded-full flex items-center justify-center">
                4X
              </div>
            </div>
          </CapsuleButton>
        </div>
      </div>

      <div className="relative h-full flex flex-col items-stretch bg-[#FFD335] rounded-[10px] rounded-b-[0]">
        <Header />
        <Content />
      </div>
    </HomeContext.Provider>
  )
});


const CapsuleButton = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative w-44 h-10">
      <div className="absolute bottom-0 w-full h-8 bg-[#4B371F] rounded-[25px]" />
      <div 
        className="absolute top-0 w-full h-8 rounded-[25px] border-2 border-[#855B5B]/30 bg-[#F7F9EA]"
      >
        {children}
      </div>
    </div>
  );
};