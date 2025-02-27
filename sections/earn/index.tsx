'use client';

import { useQuest } from '@/hooks/useQuest';
import Skeleton from 'react-loading-skeleton';
import AppHeader from '@components/header';
import PaperclipCard from '@components/paperclip-card';
import Item from '@/sections/earn/components/item';
import React from 'react';

const EarnView = () => {
  const {
    loading,
    socialList,
    viewList,
    dailyList,
    pending,
    handleVerify,
    handleClick,
  } = useQuest();

  return (
    <>
      <div className="relative w-full h-full bg-[#7E6E52] bg-[url('/images/earn/bg.svg')] bg-repeat bg-[length:93px_92px] bg-left-top">
        <AppHeader className="absolute z-20 w-full left-0 top-0" />
        <div className="p-[96px_10px_94px] w-full h-full overflow-y-auto">
          <PaperclipCard
            title="Daily"
            innerClassName="pr-[50px] pl-[15px]"
            titleClassName="!left-[18px] !translate-x-[unset]"
            contentClassName="!grid-cols-1"
          >
            {
              loading ? (
                <Skeleton width="100%" height="68px" borderRadius="16px" />
              ) : dailyList?.map?.((quest, index) => (
                <Item
                  quest={quest}
                  key={index}
                  pending={pending}
                  disabled={quest.finished}
                  onClick={handleClick}
                  onVerify={handleVerify}
                />
              ))
            }
          </PaperclipCard>
          <PaperclipCard
            title="Social"
            className="mt-[35px]"
            innerClassName="pr-[50px] pl-[15px]"
            titleClassName="!left-[18px] !translate-x-[unset]"
            contentClassName="!grid-cols-1"
          >
            {
              loading ? (
                <>
                  <Skeleton width="100%" height="68px" borderRadius="16px" />
                  <Skeleton width="100%" height="68px" borderRadius="16px" />
                  <Skeleton width="100%" height="68px" borderRadius="16px" />
                </>
              ) : socialList?.map?.((quest, index) => (
                <Item
                  quest={quest}
                  key={index}
                  pending={pending}
                  onClick={handleClick}
                  onVerify={handleVerify}
                />
              ))
            }
          </PaperclipCard>
          <PaperclipCard
            title="View"
            className="mt-[35px]"
            innerClassName="pr-[50px] pl-[15px]"
            titleClassName="!left-[18px] !translate-x-[unset]"
            contentClassName="!grid-cols-1"
          >
            {
              loading ? (
                <>
                  <Skeleton width="100%" height="68px" borderRadius="16px" />
                  <Skeleton width="100%" height="68px" borderRadius="16px" />
                  <Skeleton width="100%" height="68px" borderRadius="16px" />
                </>
              ) : viewList?.map?.((quest, index) => (
                <Item
                  quest={quest}
                  key={index}
                  pending={pending}
                  onClick={handleClick}
                  onVerify={handleVerify}
                />
              ))
            }
          </PaperclipCard>
        </div>
      </div>
    </>
  );
};

export default EarnView;
