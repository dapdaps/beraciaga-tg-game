import AppHeader from "@/components/header";
import DropCoins from "./drop-coins";
import BearDressup from "@/components/BearDressup";
import BeraLevelContainer from "./BeraLevelContainer";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

const MainScene = () => {
  const router = useRouter();
    return (
      <div className='w-[100vw] relative h-[100dvh] bg-[url(/images/role/TG-phone.png)] bg-no-repeat bg-cover bg-center'>
        <AppHeader />
        <div className='flex mt-3 justify-between relative z-30'>
          <img src="/images/home/lottery.png" onClick={() => router.push('/lucky-bera')} className='w-[90px] h-[90px]' alt="" />
          <img src="/images/home/rank.png" onClick={() => router.push('/rank')} className='w-[30px] h-[30px] mr-3' alt="" />
        </div>
        <DropCoins />
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

export default MainScene;