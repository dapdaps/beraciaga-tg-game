"use client";

import BearDressup from '@/components/BearDressup';
import { CapsuleButton } from '@components/Button';
import clsx from 'clsx';
import HeaderAvatar from '@components/header/avatar';
import Connect from './connect';
import { useContext, useMemo, useState } from 'react';
import Big from 'big.js';
import { numberFormatter } from '@/utils/number-formatter';
import { useGlobalUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const AppHeader = (props: any) => {
  const { className, isBack } = props;

  const { userInfo, currentCoins, addSpeed = 0 } = useGlobalUser();
  const router = useRouter();
  const [openSetting, setOpenSetting] = useState(false);

  const speed = useMemo(() => {
    const start = 1;

    return start + addSpeed;
  }, [addSpeed]);
  
  if (!userInfo) return null;
  
  return (
    <div className={clsx("flex items-center justify-between px-2 pt-2", className)}>
      {
        isBack ? (
          <motion.button
            type="button"
            className="w-[43px] h-[40px] shrink-0 origin-bottom"
            onClick={() => {
              router.back();
            }}
            whileTap={{
              scaleY: 0.9,
            }}
          >
            <img src="/images/icon-page-back.svg" alt="" className="w-full h-full object-center object-contain" />
          </motion.button>
          ) : (
          <HeaderAvatar onClick={() => setOpenSetting(true)} level={userInfo.level} size={54} bgColor="#FFF5A8" />
        )
      }
      <CapsuleButton>
        <div className='flex items-center justify-between px-[1px]'>
          <img src='/images/home/coin.png' alt='coin' className='w-6 h-6' />
          <span className='text-stroke-2 text-[16px] text-[#FFF4C2] font-cherryBomb'>
            {numberFormatter(currentCoins, Big(currentCoins || 0).gt(1e9) ? 6 : 3, true, { isShort: Big(currentCoins || 0).gt(1e9), isShortUppercase: true })}
          </span>
          <div className="flex-shrink-0 font-montserrat italic text-[#6376FF] text-[14px] font-[900] bg-[url(/images/bg-im.png)] bg-contain bg-no-repeat w-[28px] h-[28px] rounded-full flex items-center justify-center">
          {speed}X
          </div>
        </div>
      </CapsuleButton>
      <CapsuleButton containerClass='w-[88px]' firstClass='bg-[#FFBABB]'>
        <div className='flex items-center px-2'>
          <img src="/images/home/gem.png" className='w-[30px] mr-1' alt="" />
          <span className='text-white text-stroke-2 font-cherryBomb font-[400]'>{userInfo?.stats?.gem || 0}</span>
        </div>
      </CapsuleButton>
      <Connect open={openSetting} onClose={() => setOpenSetting(false)} />
    </div>
  );
};

export default AppHeader;
