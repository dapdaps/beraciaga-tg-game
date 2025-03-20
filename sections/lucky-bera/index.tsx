"use client"
import React from 'react';
import Tiger from './components/tiger'
import AppHeader from '@components/header';
import { useLuckyBera } from '@/sections/lucky-bera/hooks';

const LuckyBeraView: React.FC<any> = () => {
  const {
    spinMultiplier,
    toggleSpinMultiplier,
    spinUserData,
    lastSpinResult,
    handleSpinResult,
  } = useLuckyBera();

  return (
    <div className="w-full h-full bg-[url('/images/lucky-bera/bg.svg')] bg-no-repeat bg-cover bg-top">
      <AppHeader className="absolute z-20 w-full left-0 top-0" />
      <Tiger
        spinMultiplier={spinMultiplier}
        toggleSpinMultiplier={toggleSpinMultiplier}
        spinUserData={spinUserData}
        lastSpinResult={lastSpinResult}
        handleSpinResult={handleSpinResult}
      />
    </div>
  );
};

export default LuckyBeraView;
