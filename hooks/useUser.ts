import { get } from '@/utils/http';
import { useTelegram } from '@/hooks/useTelegram';
import { Equipment, Level, useUserStore } from '@/stores/useUserStore';
import Big from 'big.js';
import { useEffect } from 'react';
import { orderBy } from 'lodash-es';
import { getUserLookList } from '@/apis/look';

export function useUser() {
  const { WebApp } = useTelegram();
  const {
    equipmentList,
    setEquipmentList,
    equipmentListLoading,
    setEquipmentListLoading,
    userEquipmentList,
    userEquipmentSingleList,
    userEquipmentCategoryList,
    setUserEquipmentList,
    setUserEquipmentSingleList,
    userEquipmentListLoading,
    setUserEquipmentListLoading,
    setUserEquipmentCategoryList,
    levels,
    setLevels,
    levelsLoading,
    setLevelsLoading,
    userInfo,
    setUserInfo,
    userInfoLoading,
    setUserInfoLoading,
    addSpeed,
    setAddSpeed,
    userLooksItem,
    setUserLooksItem,
  } = useUserStore();

  const tgUserId = WebApp?.initDataUnsafe?.user?.id;

  const getEquipmentList = async () => {
    setEquipmentListLoading(true);
    try {
      const res = await get('/api/game/items', { tg_user_id: tgUserId });
      if (res.code !== 200) {
        setEquipmentListLoading(false);
        return;
      }
      setEquipmentList(res.data || []);
    } catch (err) {
      console.log(err);
    }
    setEquipmentListLoading(false);
  };

  const getUserEquipmentList = async () => {
    setUserEquipmentListLoading(true);
    try {
      const res = await get('/api/game/items/user', { tg_user_id: tgUserId });
      if (res.code !== 200) {
        setUserEquipmentListLoading(false);
        return;
      }
      const _list: Equipment[] = res.data || [];
      const _userEquipmentSingleList: Equipment[] = [];
      const _userEquipmentCategoryList: Record<string, Equipment[]> = {};
      _list.forEach((it) => {
        it.obtained_at = it.obtained_at * 1000;

        if (_userEquipmentCategoryList[it.category]) {
          _userEquipmentCategoryList[it.category].push(it);
          _userEquipmentCategoryList[it.category] = orderBy(_userEquipmentCategoryList[it.category], ['obtained_at']);
        } else {
          _userEquipmentCategoryList[it.category] = [it];
        }

        const idx = _userEquipmentSingleList.findIndex((_it) => _it.category === it.category);
        if (idx < 0) {
          _userEquipmentSingleList.push(it);
          return;
        }
        if (Big(it.bonus_percentage).gt(_userEquipmentSingleList[idx].bonus_percentage)) {
          _userEquipmentSingleList[idx] = it;
        }
      });
      setUserEquipmentList(orderBy(_list, ['obtained_at']));
      setUserEquipmentSingleList(orderBy(_userEquipmentSingleList, ['obtained_at']));
      setUserEquipmentCategoryList(_userEquipmentCategoryList);
    } catch (err) {
      console.log(err);
    }
    setUserEquipmentListLoading(false);
  };

  const getLevels = async () => {
    setLevelsLoading(true);
    try {
      const res = await get('/api/game/levels');
      if (res.code !== 200) {
        setLevelsLoading(false);
        return;
      }
      const _list: Level[] = res.data || [];
      setLevels(_list);
    } catch (err) {
      console.log(err);
    }
    setLevelsLoading(false);
  };

  const getUserInfo = async () => {
    setUserInfoLoading(true);
    try {
      const res = await get('/api/user', { tg_user_id: tgUserId });
      if (res.code !== 200) {
        setUserInfoLoading(false);
        return;
      }
      setUserInfo({
        ...res.data,
        creat_timestamp: res.data.creat_timestamp * 1000,
      });
    } catch (err) {
      console.log(err);
    }
    setUserInfoLoading(false);
  };


  const fetchLookUserProfile = async () => {
    try {
      const data = await getUserLookList({
        tg_user_id: tgUserId,
        use: true,
      })
      if (data.code === 200) {
        setUserLooksItem(data.data); 
      }
      return data;
    } catch (error) {
      console.log(error, '<===')
    }
  }

  useEffect(() => {
    const add = userEquipmentSingleList?.map?.((it: Equipment) => it.bonus_percentage / 100)?.reduce?.((a: number, b: number) => a + b, 0) ?? 0;
    setAddSpeed(add);
  }, [userEquipmentSingleList]);

  return {
    equipmentList,
    equipmentListLoading,
    getEquipmentList,
    userEquipmentList,
    userEquipmentSingleList,
    userEquipmentCategoryList,
    userEquipmentListLoading,
    getUserEquipmentList,
    levels,
    levelsLoading,
    getLevels,
    userInfo,
    userInfoLoading,
    getUserInfo,
    addSpeed,
    userLooksItem,
    setUserLooksItem,
  };
}
