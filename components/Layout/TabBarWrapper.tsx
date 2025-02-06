'use client'

import { useEffect, type ReactNode } from 'react';
import { TABS, useLayoutStore } from '@/stores/useLayoutStore';
import TabBar from '../TabBar/TabBar';
import Invite from '@/sections/home2/components/invite';
import Congrats from '@/sections/home2/components/congrats';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import GameView from '@/sections/game';

interface TabBarWrapperProps {
  children: ReactNode;
}

export const TabBarWrapper = ({ 
  children
}: TabBarWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const {
    activeTab,
    showTabBar,
    inviteModalVisible,
    congratsModalVisible,
    gameVisible,
    setInviteModalVisible,
    setCongratsModalVisible,
    setGameVisible,
    setActiveTab,
    setShowTabBar,
  } = useLayoutStore();

  const handleTabClick = (tab: any) => {
    const _url = new URL(location.href);

    if (tab.name === 'Game') {
      setGameVisible(true);
      _url.searchParams.set('game', '1');
      router.replace(_url.toString());
      return;
    }

    _url.searchParams.delete('game');
    router.replace(_url.toString());
    setGameVisible(false);

    if (tab.name === 'Home') {
      const _tabs = TABS.filter((t) => ![4].includes(t.id));
      if (_tabs.some((t) => new RegExp(`^${t.path}`).test(pathname))) {
        router.push(tab.path);
        return;
      }
      if (!gameVisible) {
        setInviteModalVisible(true);
      }
      return;
    }
    router.push(tab.path);
  };

  useEffect(() => {
    const tab = TABS.find(tab => tab.path === pathname);
    const gameTab = TABS.find(tab => tab.name === 'Game');
    let _showTabBar = true;
    if (['/', '/imported-equipments'].includes(pathname)) {
      _showTabBar = false;
    }
    if (tab) {
      setActiveTab(tab.id);
    }
    if (search.has('game') && gameTab?.id) {
      setActiveTab(gameTab.id);
      setGameVisible(true);
    }
    setShowTabBar(_showTabBar);
  }, [pathname, search]);

  return (
    <div className="h-full overflow-hidden">
      <main
        className="h-full overflow-y-auto overflow-x-hidden"
      >
        {!gameVisible && children}
        <GameView />
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