import { create } from "zustand";

export type TabItem = {
  id: number;
  label: string;
  path: string;
  icon: string;
  inactiveIcon: string;
  isLock?: boolean;
};

export const TABS: TabItem[] = [
  { id: 1, label: 'Game', icon: '/images/tabbar/game.svg', inactiveIcon: '/images/tabbar/inactive-game.svg', path: '/game', isLock: false },
  { id: 2, label: 'Shop', icon: '/images/tabbar/shop.svg', inactiveIcon: '/images/tabbar/inactive-shop.svg', path: '/shop', isLock: true },
  { id: 3, label: 'Earn', icon: '/images/tabbar/earn.svg', inactiveIcon: '/images/tabbar/inactive-earn.svg', path: '/earn', isLock: true },
  { id: 4, label: 'Frens', icon: '/images/tabbar/frens.svg', inactiveIcon: '/images/tabbar/inactive-frens.svg', path: '/home', isLock: false },
  { id: 5, label: 'Spin', icon: '/images/tabbar/spin.svg', inactiveIcon: '/images/tabbar/inactive-spin.svg', path: '/spin', isLock: true },
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
};

export const useLayoutStore = create<LayoutState>((set) => ({
  showTabBar: true,
  setShowTabBar: (show) => set({ showTabBar: show }),
  activeTab: TABS[3].id,
  setActiveTab: (tab) => set({ activeTab: tab }),
  inviteModalVisible: false,
  congratsModalVisible: false,
  setInviteModalVisible: (inviteModalVisible) => set({ inviteModalVisible }),
  setCongratsModalVisible: (congratsModalVisible) => set({ congratsModalVisible }),
}));
