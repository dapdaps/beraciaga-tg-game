import { create } from "zustand";

export type TabItem = {
  id: number;
  name: string;
  iconWidth: number;
  label: string;
  path: string;
  icon: string;
  isLock?: boolean;
  iconOffsetY?: number;
  labelOffsetY?: number;
};

export const TABS: TabItem[] = [
  { id: 1, name: 'Home', label: '/images/tabbar/home-text.svg', icon: '/images/tabbar/home.svg', iconWidth: 33, path: '/home', isLock: false },
  { id: 2, name: 'Shop', label: '/images/tabbar/shop-text.svg', labelOffsetY: 4, icon: '/images/tabbar/shop.svg', iconWidth: 37, path: '/shop', isLock: false },
  { id: 3, name: 'Game', label: '/images/tabbar/game-text.svg', icon: '/images/tabbar/game.svg', iconWidth: 37, path: '/game', isLock: false },
  { id: 4, name: 'Earn', label: '/images/tabbar/earn-text.svg', icon: '/images/tabbar/earn.svg', iconWidth: 37, iconOffsetY: -3, path: '/earn', isLock: false },
  { id: 5, name: 'Frenz', label: '/images/tabbar/frenz-text.svg', icon: '/images/tabbar/frenz.svg', iconWidth: 37, iconOffsetY: -2, path: '/frens', isLock: false },
];

type LayoutState = {
  showTabBar: boolean;
  setShowTabBar: (show: boolean) => void;
  activeTab: number;
  setActiveTab: (tab: number) => void;
  inviteModalVisible: boolean;
  setInviteModalVisible: (visible: boolean) => void;
  congratsModalVisible: boolean;
  setCongratsModalVisible: (visible: boolean) => void;
  gameVisible: boolean;
  setGameVisible: (visible: boolean) => void;
};

export const useLayoutStore = create<LayoutState>((set) => ({
  showTabBar: true,
  setShowTabBar: (show) => set({ showTabBar: show }),
  activeTab: TABS[3].id,
  setActiveTab: (tab) => set({ activeTab: tab }),
  inviteModalVisible: false,
  congratsModalVisible: false,
  gameVisible: false,
  setInviteModalVisible: (inviteModalVisible) => set({ inviteModalVisible }),
  setCongratsModalVisible: (congratsModalVisible) => set({ congratsModalVisible }),
  setGameVisible: (visible) => set({ gameVisible: visible }),
}));
