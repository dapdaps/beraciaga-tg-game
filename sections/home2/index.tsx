import { createContext, memo, useContext, useEffect, useState } from 'react';
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
    fetchUserProfile()
  };

  const mockUserLooksItem = () => {
      return new Array(10).fill(0).map((_, index) => ({
        category: 'category',
        level: index,
        look_id: `look_id_${index}`,
        use: index === 0,
      }))
  }

  const fetchUserProfile = async () => {
    const data = await getUserLookList({
        tg_user_id: tgUserId,
        use: true,
    })
    if (data.code === 200) {
      // setUserLooksItem(data.data); 
      console.log(mockUserLooksItem(), '---mock')
      setUserLooksItem(mockUserLooksItem());
    }
    return data;
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
      {
        (isInitTGUser || !startJourney) ? <InitScene /> : <MainScene />
      }
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




