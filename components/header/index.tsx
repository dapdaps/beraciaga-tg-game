import BearDressup from '@/components/BearDressup';
import { CapsuleButton } from '@components/Button';
import clsx from 'clsx';
import HeaderAvatar from '@components/header/avatar';
import Connect from './connect';

const AppHeader = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx("flex items-center justify-between px-2 pt-2", className)}>
      <HeaderAvatar size={54} bgColor="#FFF5A8" />
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
      <Connect />
    </div>
  );
};

export default AppHeader;
