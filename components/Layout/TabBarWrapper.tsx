'use client'

import { useEffect, type ReactNode } from 'react';
import { TABS, useLayoutStore } from '@/stores/useLayoutStore';
import TabBar from '../TabBar/TabBar';
import Invite from '@/sections/home2/components/invite';
import Congrats from '@/sections/home2/components/congrats';
import { usePathname, useRouter } from 'next/navigation';

interface TabBarWrapperProps {
  children: ReactNode;
}

export const TabBarWrapper = ({ 
  children
}: TabBarWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    activeTab,
    showTabBar,
    inviteModalVisible,
    congratsModalVisible,
    setInviteModalVisible,
    setCongratsModalVisible,
    setActiveTab,
    setShowTabBar,
  } = useLayoutStore();

  const handleTabClick = (tab: any) => {
    if (tab.id === 4) {
      const _tabs = TABS.filter((t) => ![4].includes(t.id));
      if (_tabs.some((t) => new RegExp(`^${t.path}`).test(pathname))) {
        router.push(tab.path);
      }
      setInviteModalVisible(true);
      return;
    }
    router.push(tab.path);
    console.log('tab: %o', tab, activeTab);
  };

  useEffect(() => {
    const tab = TABS.find(tab => tab.path === pathname);
    let _showTabBar = true;
    if (['/', '/imported-equipments'].includes(pathname)) {
      _showTabBar = false;
    }
    if (tab) {
      setActiveTab(tab.id);
      if (tab.id === 1) {
        _showTabBar = false;
      }
    }
    setShowTabBar(_showTabBar);
  }, [pathname]);

  return (
    <div className="h-full overflow-hidden">
      <main
        className={`h-full overflow-y-auto overflow-x-hidden`}
        style={{
          paddingBottom: showTabBar ? '5.375rem' : 0,
        }}
      >
        {children}
      </main>
      {showTabBar && <TabBar onTabClick={handleTabClick} />}
      <Congrats
        visible={congratsModalVisible}
        onClose={() => {
          setCongratsModalVisible(false);
        }}
      />
      <Invite
        visible={inviteModalVisible}
        onClose={() => {
          setInviteModalVisible(false);
        }}
      />
    </div>
  );
};