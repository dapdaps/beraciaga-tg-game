'use client'

import Home from '@/sections/home/index';
import { TabBarWrapper } from '@components/Layout/TabBarWrapper';

export default function Index() {

  return (
    <TabBarWrapper>
      <Home />
    </TabBarWrapper>
  );
}
