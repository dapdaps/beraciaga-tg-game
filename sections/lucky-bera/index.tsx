"use client"
import React from 'react';
import Tiger from './components/tiger'
import AppHeader from '@components/header';

const LuckyBeraView: React.FC<any> = () => {
  return (
    <div className="w-full h-full bg-[url('/images/lucky-bera/bg.svg')] bg-no-repeat bg-cover bg-top">
      <AppHeader className="absolute z-20 w-full left-0 top-0" />
      <Tiger />
    </div>
  );
};

export default LuckyBeraView;
