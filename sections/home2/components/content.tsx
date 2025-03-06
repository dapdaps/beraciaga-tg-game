import DropCoins from '@/sections/home2/components/drop-coins';
import Reward from '@/sections/home2/components/reward';
import Speed from '@/sections/home2/components/speed';
import ComingSoon from '@components/ComingSoon';
import RingButton from '@components/Ring';
import { useContext, useEffect, useState } from 'react';
import { useTelegram } from '@/hooks/useTelegram';
import IconButtonGetBera from '@public/svg/button-get-bera.svg'
import { startLook } from '@/apis/look';
import { HomeContext } from '..';
import StartBeraModal from './StartBeraModal';


const calcScale = (viewportHeight: number) => {
  if (!viewportHeight) return 1;
  const realHeight = viewportHeight - 58 - 94 - 21 - 10;
  if (realHeight < 549) {
    return realHeight / 549;
  }
  return 1;
};

const Content = () => {
  const { WebApp } = useTelegram();

  const { setVisibleStartBera } = useContext(HomeContext);

  const tgUserId = WebApp?.initDataUnsafe?.user?.id;

  const [scale, setScale] = useState(calcScale(WebApp?.viewportHeight));

  useEffect(() => {
    if (!WebApp?.viewportHeight) {
      return;
    }
    setScale(calcScale(WebApp.viewportHeight));
  }, [WebApp]);

  const handleGetBera = async () => {
    try {
      const data = await startLook(tgUserId);
      console.log(data, '---data------data------data---');
      if (data.code === 200) { 
        setVisibleStartBera(true)
      }
    } catch (error) {
      console.error('handleGetBera ========>', error);
    }
  }

  return (
    <div className="overflow-y-auto h-0 flex-1">
      <div className="flex items-center justify-center w-[190px] h-[35px] mx-auto bg-[url('/images/beraciaga/luck_box.svg')] bg-no-repeat bg-center font-montserrat text-white text-[18px] font-bold italic uppercase">
        Lucky Box
      </div>
      <div
        style={{ transform: `scale(${scale})`, transformOrigin: 'top' }}
        className="relative -top-[17px] w-full px-[0.75rem] h-[549px] mx-auto bg-[url('/images/beraciaga/luck_box_bg.svg')] bg-no-repeat bg-center bg-[length:22.6875rem_34.3125rem]"
      >
        <RingButton className="absolute right-[15px] top-[15px] z-[2]" />
        <DropCoins />
        <IconButtonGetBera onClick={handleGetBera} className="absolute z-[2] left-1/2 -translate-x-1/2 top-[20rem]" />
        <div className="relative z-[1]">
          <div className="pt-[42px] text-center text-white font-montserrat text-[48px] font-bold tracking-[2.4px]">BERACIAGA</div>
          <div className="relative mt-[72px] mx-auto w-[245px] h-[245px] justify-center">
            <div className="relative w-[245px] h-[245px] bg-[url('/images/beraciaga/yellow_circle.svg')] bg-no-repeat bg-center blur-[50px]" />
            <div className="absolute left-0 top-0 right-0 bottom-0">
              <div className="absolute top-[31px] left-[58px] w-[150px]">
                <img src="/images/beraciaga/big_bear.svg" alt="big_bear" />
              </div>
            </div>
          </div>
          <Speed />
          <Reward />
          <StartBeraModal  />
        </div>
      </div>
    </div>
  );
};

export default Content;
