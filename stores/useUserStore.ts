import { UserLookItem } from "@/apis/look";
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';

type UserState = {
  equipmentList: Equipment[];
  equipmentListLoading: boolean;
  setEquipmentList: (list: Equipment[]) => void;
  setEquipmentListLoading: (loading: boolean) => void;

  userEquipmentList: Equipment[];
  userEquipmentSingleList: Equipment[];
  userEquipmentListLoading: boolean;
  userEquipmentCategoryList: Record<string, Equipment[]>;
  setUserEquipmentList: (list: Equipment[]) => void;
  setUserEquipmentSingleList: (list: Equipment[]) => void;
  setUserEquipmentListLoading: (loading: boolean) => void;
  setUserEquipmentCategoryList: (list: Record<string, Equipment[]>) => void;

  levels: Level[];
  levelsLoading: boolean;
  setLevels: (list: Level[]) => void;
  setLevelsLoading: (loading: boolean) => void;

  userInfo?: Partial<UserInfo>;
  userInfoLoading: boolean;
  setUserInfo: (user?: Partial<UserInfo>) => void;
  setUserInfoLoading: (loading: boolean) => void;

  addSpeed: number;
  setAddSpeed: (speed: number) => void;

  userLooksItem: UserLookItem[];
  setUserLooksItem: (list: UserLookItem[]) => void;

  visibleStartBera: boolean;
  setVisibleStartBera: (visible: boolean) => void;

  startJourney: boolean;
  setStartJourney: (start: boolean) => void;

  initData: string;
  setInitData: (data: string) => void;
};

export const useUserStore = create(
  persist<UserState>((set) => ({
    equipmentList: [],
    equipmentListLoading: false,
    setEquipmentList: (list) => set({ equipmentList: list }),
    setEquipmentListLoading: (loading) => set({ equipmentListLoading: loading }),

    userEquipmentList: [],
    userEquipmentSingleList: [],
    userEquipmentListLoading: false,
    userEquipmentCategoryList: {},
    setUserEquipmentList: (list) => set({ userEquipmentList: list }),
    setUserEquipmentSingleList: (list) => set({ userEquipmentSingleList: list }),
    setUserEquipmentListLoading: (loading) => set({ userEquipmentListLoading: loading }),
    setUserEquipmentCategoryList: (list) => set({ userEquipmentCategoryList: list }),

    levels: [],
    levelsLoading: false,
    setLevels: (list) => set({ levels: list }),
    setLevelsLoading: (loading) => set({ levelsLoading: loading }),

    userInfo: {
      level: 1,
      bind_okx_reward_coins: 100000000,
      bind_okx_reward_coupons: 9.99,
    },
    userInfoLoading: false,
    setUserInfo: (user) => set((state) => ({ userInfo: { ...state.userInfo, ...user } })),
    setUserInfoLoading: (loading) => set({ userInfoLoading: loading }),

    addSpeed: 0,
    setAddSpeed: (addSpeed) => set({ addSpeed }),

    userLooksItem: [],
    setUserLooksItem: (list) => set({ userLooksItem: list }),

    visibleStartBera: false,
    setVisibleStartBera: (visible) => set({ visibleStartBera: visible }),

    startJourney: false,
    setStartJourney: (start) => set({ startJourney: start }),

    initData: "",
    setInitData: (data) => set({ initData: data }),
  }), {
    name: '_user_information',
    version: 0.1,
    storage: createJSONStorage(() => sessionStorage),
    partialize: (state) => {
      return ({ 
        initData: state.initData,
        startJourney: state.startJourney,
        visibleStartBera: state.visibleStartBera,
      } as any);
    }
  })
);

export interface UserInfo {
  creat_timestamp: number;
  address: string;
  bind_source: string | 'okx_invite';
  bind_okx_reward_coins: number;
  bind_okx_reward_coupons: number;
  level: number;
  stats: {
    coins: string;
    gem: number;
    level: number;
    upgrade_time: number;
  };
}

export interface Equipment {
  id: number;
  game_id: number;
  name: string;
  description: string;
  price: number;
  invoice_link: string;
  category: string;
  chain_id: number;
  template: string;
  action_type: string;
  sub_type: string;
  trading_volume: string;
  trading_volume_single: string;
  transactions: number;
  token: string;
  amount: string;
  bonus_percentage: number;
  created_at: string;
  level: number;
  tg_item: boolean;
  pc_item: boolean;
  obtained_at: number;
}

export interface Level {
  id: number;
  level: number;
  coins_per_hour: number;
  upgrade_reward: number;
  upgrade_coins: number;
}
