import DressUpGame from '@/sections/home/components/DressUpGame';
import { CapsuleButton } from '@components/Button';
import clsx from 'clsx';

const AppHeader = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx("flex items-center justify-between px-2 pt-2", className)}>
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
  );
};

export default AppHeader;
