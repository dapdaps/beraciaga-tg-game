import { createContext, memo, useEffect, useState } from 'react';
import Header from '@/sections/home2/components/header';
import Content from '@/sections/home2/components/content';
import { useCoins } from '@/sections/home2/hooks/use-coins';
import useLogin from '@/hooks/useLogin';
import { useUser } from '@/hooks/useUser';
import { useTelegram } from '@/hooks/useTelegram';
import DressUpGame from '../home/components/DressUpGame';
import clsx from 'clsx';
import { BaseButton, CapsuleButton } from '@/components/Button';
import Modal from '@/components/modal';

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
        <div className='bg-[url(/images/home/medal.png)] bg-contain bg-no-repeat w-[30px] h-[30px] absolute right-[-15px] top-[-4px] flex items-center justify-center font-cherryBomb text-[14px] text-stroke-1 text-white pb-1'>1</div>
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
      <CapsuleButton containerClass='w-[88px]' firstClass='bg-[#FFBABB]'>
        <div className='flex items-center px-2'>
          <img src="/images/home/gem.png" className='w-[30px] mr-1' alt="" />
          <span className='text-white text-stroke-2 font-cherryBomb font-[400]'>500</span>
        </div>
      </CapsuleButton>
    </div>
    <div className='flex mt-3 justify-between'>
      <img src="/images/home/lottery.png" className='w-[90px] h-[90px]' alt="" />
      <img src="/images/home/rank.png" className='w-[30px] h-[30px] mr-3' alt="" />
    </div>
    <LevelContainer className="mx-auto mt-3">
      <div className='flex items-center justify-between px-3 w-[260px] pl-4'>
          <span className='font-cherryBomb text-[26px] leading-[26px] text-stroke-2 text-white'>Lv.1</span>
          <span className='text-white font-cherryBomb text-[14px] leading-[14px] self-end'>72,000 / 100,000</span>
      </div>
      <div className='px-3 w-[260px] pl-4 mt-1'> 
        <ProgressBar />
      </div>
      <div className='absolute right-0 top-0'>
        <BaseButton>
          <div className='flex flex-col items-center'>
            <div className='font-cherryBomb text-white text-stroke-2 leading-[16px] text-[16px]'>12,100</div>
            <div className='font-cherryBomb text-white text-stroke-2 leading-[16px] text-[16px]'>update</div>
          </div>
        </BaseButton>
      </div>
    </LevelContainer>
    <BeraContainer></BeraContainer>

  </div>
  )
}

const LevelContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx('relative w-[367px] h-[74px]', className)}>
      <svg 
        className="absolute top-0 left-0 w-full h-full" 
        width="367" 
        height="74" 
        viewBox="0 0 367 74" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M366 30.5V58C366 66.2843 359.284 73 351 73H16C7.71573 73 1 66.2843 1 58V16C1 7.71573 7.71573 1 16 1H80.5355C84.6996 1 88.6763 2.73101 91.5139 5.77872L95.5223 10.0841C98.7382 13.5382 103.245 15.5 107.965 15.5H351C359.284 15.5 366 22.2157 366 30.5Z" 
          fill="#FFB050" 
          stroke="#4B371F" 
          stroke-width="2"
        />
        <path 
          d="M8.5 13C8.5 11 10 7 16 7C22 7 30.5 7 34 7M8.5 19.5V23" 
          stroke="white" 
          stroke-width="3" 
          stroke-linecap="round"
        />
      </svg>
      <div className="relative z-10 mt-3">
        {children}
      </div>
    </div>
  );
};

const ProgressBar = ({ value = 4, className = '' }) => {
  const segments = Array(7).fill(0);
  
  return (
    <div className={clsx('flex items-center gap-1 p-1 rounded-lg border-2 border-[#E49F63] bg-[#916830] w-fit', className)}>
      {segments.map((_, index) => (
        <div
          key={index}
          className={`w-[30px] h-[14px] rounded-md flex-shrink-0 ${
            index < value
              ? 'border-2 border-[#F8C200] bg-[#FFE380] shadow-[inset_0px_4px_0px_0px_rgba(255,255,255,0.50)]'
              : 'bg-[#B28A53]'
          }`}
        />
      ))}
    </div>
  );
};

const BeraContainer = () => {
  return (
    <Modal open={false} onClose={() => {}} closeIcon={<img src='/images/home/close.png' alt='close' className='w-[34px] h-[34px]' />} closeIconClassName='top-[-17px] right-[-17px]'>
      <div className='bg-[url(/images/home/modal-box.png)] bg-contain bg-no-repeat w-[370px] h-[552px] px-2 pt-2'>
        <GradientBorderBox>
          <p>内容区域</p>
        </GradientBorderBox>
      </div>
    </Modal>
  )
}

const GradientBorderBox = ({ children }) => {
  return (
    <div 
      className="relative rounded-lg"
      style={{
        padding: '2px',
        background: 'linear-gradient(to bottom, #E5C375 0%, #7F6C41 100%)'
      }}
    >
      <div className="relative rounded-lg bg-[#FFF1C7] p-4">
        {children}
      </div>
    </div>
  );
};
