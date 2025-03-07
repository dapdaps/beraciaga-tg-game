"use client"
import React from 'react';
import Tiger from './components/tiger'

const LuckyBeraView: React.FC<any> = () => {
  return (
    <div className="w-full h-full bg-[url('/images/lucky-bera/bg.svg')] bg-no-repeat bg-cover bg-top">
      <Tiger />
    </div>
  );
};

export default LuckyBeraView;
