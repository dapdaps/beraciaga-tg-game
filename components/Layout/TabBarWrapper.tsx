'use client'

import { useEffect, type ReactNode } from 'react';
import { TABS, useLayoutStore } from '@/stores/useLayoutStore';
import TabBar from '../TabBar/TabBar';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import GameView from '@/sections/game';

interface TabBarWrapperProps {
  children: ReactNode;
  tabbar?: boolean;
}

export const TabBarWrapper = ({ 
  children,
  tabbar = true
}: TabBarWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const {
    showTabBar,
    setShowTabBar,
    gameVisible,
    setInviteModalVisible,
    setGameVisible,
    setActiveTab,
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
      const _tabs = TABS.filter((t) => !['Home'].includes(t.name));
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
    if (tab) {
      setActiveTab(tab.id);
    }
    if (search.has('game') && gameTab?.id) {
      setActiveTab(gameTab.id);
      setGameVisible(true);
      setShowTabBar(false);
      return;
    }
    setShowTabBar(true);
  }, [pathname, search]);

  return (
    <div className="h-full overflow-hidden">
      <main
        className="h-full overflow-y-auto overflow-x-hidden"
      >
        <div className={gameVisible ? 'hidden' : ''}>
          {children}
        </div>
        <GameView />
      </main>
      {(tabbar && showTabBar) && <TabBar onTabClick={handleTabClick} />}
    </div>
  );
};
