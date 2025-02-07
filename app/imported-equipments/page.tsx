'use client';

import ImportedEquipments from '@/sections/importedEquipments'
import { Suspense } from 'react';
import { TabBarWrapper } from '@components/Layout/TabBarWrapper';

const ImportedEquipmentsPage = () => {
  return (
    <TabBarWrapper tabbar={false}>
      <Suspense fallback={<></>}>
        <ImportedEquipments />
      </Suspense>
    </TabBarWrapper>
  );
}

export default ImportedEquipmentsPage;