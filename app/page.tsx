'use client'

// okx version 1.0.0
// import BindView from '@/sections/bind'
// import useLogin from '@/hooks/useLogin';

// export default function Index() {
//   useLogin();
//   return (
//     <BindView />
//   );
// }

import Home from '@/sections/home2/index';
import { TabBarWrapper } from '@components/Layout/TabBarWrapper';

export default function Index() {

  return (
    <TabBarWrapper>
      <Home />
    </TabBarWrapper>
  );
}


