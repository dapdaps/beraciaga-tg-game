"use client"
import React from 'react';
import Tiger from './components/tiger'
import AppHeader from '@components/header';
import { useLuckyBera } from '@/sections/lucky-bera/hooks';
import OutOfHoney from '@/sections/lucky-bera/components/out-honey';
import { useBuyHoney } from '@/sections/lucky-bera/hooks/buy-honey';

const LuckyBeraView: React.FC<any> = () => {
  const {
    spinMultiplier,
    toggleSpinMultiplier,
    spinUserData,
    lastSpinResult,
    handleSpinResult,
  } = useLuckyBera();
  const { visible, toggleVisible } = useBuyHoney();

  return (
    <div className="w-full h-full bg-[url('/images/lucky-bera/bg.svg')] bg-no-repeat bg-cover bg-top">
      <AppHeader className="absolute z-20 w-full left-0 top-0" />
      <Tiger
        spinMultiplier={spinMultiplier}
        toggleSpinMultiplier={toggleSpinMultiplier}
        spinUserData={spinUserData}
        lastSpinResult={lastSpinResult}
        handleSpinResult={handleSpinResult}
        toggleOutHoneyVisible={toggleVisible}
      />
      <OutOfHoney
        visible={visible}
        onClose={() => {
          toggleVisible(false);
        }}
      />
    </div>
  );
};

export default LuckyBeraView;
