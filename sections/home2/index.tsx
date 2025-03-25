import { memo, useEffect, useState, Suspense } from 'react';
import Header from '@/sections/home2/components/header';
import Content from '@/sections/home2/components/content';
import useLogin from '@/hooks/useLogin';
import { useTelegram } from '@/hooks/useTelegram';
import { useGlobalUser } from '@/context/UserContext';

const DEBUG_MODE = process.env.NODE_ENV === 'development';

import MainScene from './components/MainScene';
import Loading from '@/components/Loading';

export default memo(function Home() {
  const [isInitialized, setIsInitialized] = useState(false);
  const { handleLogin } = useLogin();
  const { WebApp } = useTelegram();
  const [isLoading, setIsLoading] = useState(true);

  const {
    user: { fetchLookUserProfile, getUserInfo, getLevels },
    userLooksItem,
    startJourney,
    updater,
  } = useGlobalUser();

  const tgUserId = WebApp?.initDataUnsafe?.user?.id;

  const init = async () => {
    try {
      setIsLoading(true);
      await fetchLookUserProfile();
      await getUserInfo();
      await getLevels();
    } catch (error) {
      console.log(error, '<===');
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    if (updater) {
      Promise.all([
        fetchLookUserProfile(),
        getUserInfo(),
        getLevels()
      ]);
    }
  }, [updater]);

  return (
    <Suspense fallback={<LoadingScene />}>
      {isLoading ? (
        <LoadingScene />
      ) : userLooksItem?.length > 0 ? (
        <MainScene />
      ) : (
        !startJourney ? <InitScene /> : <MainScene />
      )}
    </Suspense>
  );
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




