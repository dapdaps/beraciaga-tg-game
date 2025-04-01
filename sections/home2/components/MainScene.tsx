import AppHeader from "@/components/header";
import DropCoins from "./drop-coins";
import BearDressup from "@/components/BearDressup";
import BeraLevelContainer from "./BeraLevelContainer";
import { useRouter } from "next/navigation";
import BearControlModal from "./BearControlModal";
import { useState, useRef, useEffect } from "react";
import PlayerEquipmentChoiceModal from "./PlayerEquipmentChoiceModal";
import HomeBg from '@/sections/home/components/bg';
import { useGlobalUser } from "@/context/UserContext";

const MainScene = () => {
  const router = useRouter();
  const [openBearControlModal, setOpenBearControlModal] = useState(false);
  const [changeLook, setChangeLook] = useState(false);
  const { userInfo } = useGlobalUser();
  const bgRef = useRef(null);

  const [bearScale, setBearScale] = useState(0.8);
  const [bearPosition, setBearPosition] = useState({ left: '15%', bottom: '20%' });
  
  const userLevel = userInfo?.level || 1;

  useEffect(() => {
    const updateBearDisplay = () => {
      const screenWidth = window.innerWidth;
      
      // 处理缩放
      const newScale = 0.8 * (screenWidth / 390);
      const clampedScale = Math.min(Math.max(newScale, 0.5), 0.8);
      setBearScale(clampedScale);
      
      let newLeftPercent = 15;
      let newBottomPercent = 20;
      
      if (screenWidth <= 375) {
        const adjustment = (390 - screenWidth) / 20; 
        newLeftPercent = 8 + adjustment; 
        newBottomPercent = 15 - adjustment / 2; 
      } 

      else if (screenWidth < 390) {
        newLeftPercent = 15 + (390 - screenWidth) / 20;
      } 

      else if (screenWidth > 450) {
        newLeftPercent = 15 - (screenWidth - 450) / 40; 
        newBottomPercent = 20 + (screenWidth - 450) / 50; 
      }
      
      setBearPosition({
        left: `${newLeftPercent}%`,
        bottom: `${newBottomPercent}%`
      });
    };
    
    updateBearDisplay();
    window.addEventListener('resize', updateBearDisplay);
    
    return () => window.removeEventListener('resize', updateBearDisplay);
  }, []);
  
  const contentElement = (
    <>
      <AppHeader />
      <div className='flex mt-3 justify-between relative z-30'>
        <img src="/images/home/lottery.png" onClick={() => router.push('/lucky-bera')} className='w-[90px] h-[90px]' alt="" />
        <img src="/images/home/rank.png" onClick={() => router.push('/rank')} className='w-[30px] h-[30px] mr-3' alt="" />
      </div>
      <DropCoins />
      <img src="/images/raffle/entry-raffle.png" onClick={() => router.push('/raffle')} className='w-[90px] h-[90px] absolute top-[25%] left-0' alt="" />
      <div className='absolute' style={{
        left: bearPosition.left,
        bottom: bearPosition.bottom,
        transform: `scale(${bearScale})`
      }}>
        <BearDressup onClick={() => setOpenBearControlModal(true)} />
      </div>
      <div className='w-full mx-auto absolute bottom-[90px]'>
        <BeraLevelContainer />
      </div>
      <BearControlModal onChangeLook={() => setChangeLook(true)} show={openBearControlModal} onClose={() => setOpenBearControlModal(false)} />
      <PlayerEquipmentChoiceModal onClose={() => setChangeLook(false)} show={changeLook} />
    </>
  );
  
  if (userLevel <= 1) {
    return (
      <div className='w-[100vw] relative h-[100dvh] bg-[url(/images/role/TG-phone.png)] bg-no-repeat bg-cover bg-center'>
        {contentElement}
      </div>
    );
  }
  
  return (
    <HomeBg ref={bgRef} onSceneComplete={() => {}} speed={1}>
      <div className='relative h-full w-full'>
        {contentElement}
      </div>
    </HomeBg>
  );
};

export default MainScene;