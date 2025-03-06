import { createContext, memo, useEffect, useState } from 'react';
import Header from '@/sections/home2/components/header';
import Content from '@/sections/home2/components/content';
import { useCoins } from '@/sections/home2/hooks/use-coins';
import useLogin from '@/hooks/useLogin';
import { useUser } from '@/hooks/useUser';
import { useTelegram } from '@/hooks/useTelegram';
import { useRouter } from 'next/navigation';

export const HomeContext = createContext<any>({});

export default memo(function Home() {
  const coins = useCoins();
  const [isInitialized, setIsInitialized] = useState(false);
  const { handleLogin } = useLogin();
  const user = useUser();
  const { WebApp } = useTelegram();
  const router = useRouter()


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
      <div className="relative h-full flex flex-col items-stretch bg-[#FFD335] rounded-[10px] rounded-b-[0]">
        <Header />
        <Content />
        {/* <img src="/images/raffle/entry-raffle.png" onClick={() => router.push('/raffle')} className='w-[90px] h-[90px] absolute bottom-0 right-0' alt="" /> */}
      </div>
    </HomeContext.Provider>
  )
});
