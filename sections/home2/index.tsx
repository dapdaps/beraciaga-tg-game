import { createContext, memo, useContext, useEffect, useState, Suspense } from 'react';
import Header from '@/sections/home2/components/header';
import Content from '@/sections/home2/components/content';
import { useCoins } from '@/sections/home2/hooks/use-coins';
import useLogin from '@/hooks/useLogin';
import { useUser } from '@/hooks/useUser';
import { useTelegram } from '@/hooks/useTelegram';

import { getUserLookList, UserLookItem } from '@/apis/look';

// 是否开启调试模式
const DEBUG_MODE = process.env.NODE_ENV === 'development';
import { useRouter } from 'next/navigation';

import MainScene from './components/MainScene';
import Loading from '@/components/Loading';

export const HomeContext = createContext<any>({});

export default memo(function Home() {
  const { coins,currentCoins, handleCollected, addSpeed } = useCoins({ debug: DEBUG_MODE });
  const [isInitialized, setIsInitialized] = useState(false);
  const { handleLogin } = useLogin();
  const user = useUser();
  const { WebApp } = useTelegram();
  const [userLooksItem, setUserLooksItem] = useState<UserLookItem[]>([]);
  const router = useRouter()
  const [updater, setUpdater] = useState(0);
  const [visibleStartBera, setVisibleStartBera] = useState(false);
  const [startJourney, setStartJourney] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 添加加载状态

  const tgUserId = WebApp?.initDataUnsafe?.user?.id;

  const {
    getEquipmentList,
    getLevels,
    getUserEquipmentList,
    getUserInfo,
  } = user;

  const init = async () => {
     try {
        setIsLoading(true);
        await fetchUserProfile();
     } catch (error) {
        console.log(error, '<===')
     } finally {
        setIsLoading(false);
     }
  };

  const fetchUserProfile = async () => {
    try {
      const data = await getUserLookList({
        tg_user_id: tgUserId,
        use: true,
      })
      if (data.code === 200) {
        setUserLooksItem(data.data); 
      }
      return data;
    } catch (error) {
      console.log(error, '<===')
    }
  }

  useEffect(() => {
    if (!isInitialized && !DEBUG_MODE) {
      handleLogin();
      setIsInitialized(true);
      return;
    }
  }, [isInitialized]);

  useEffect(() => {
    if (!tgUserId) return;
    init();
  }, [tgUserId]);

  const isInitTGUser = userLooksItem.length === 0;

  return (
    <HomeContext.Provider value={{ 
      coins, 
      user, 
      userLooksItem, 
      addSpeed, 
      handleCollected, 
      currentCoins, 
      updater, 
      setUpdater,
      visibleStartBera,
      setVisibleStartBera,
      startJourney,
      setStartJourney,
    }}>
      <Suspense fallback={<LoadingScene />}>
        {isLoading ? (
          <LoadingScene />
        ) : (
          (isInitTGUser && !startJourney) ? <InitScene /> : <MainScene />
        )}
      </Suspense>
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

const LoadingScene = () => {
  return (
    <div className="relative h-full flex flex-col items-center justify-center bg-[#FFD335] rounded-[10px] rounded-b-[0] text-white  ">
      <Loading size={48} />
    </div>
  )
}




