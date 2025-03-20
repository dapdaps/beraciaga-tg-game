import { useRequest } from 'ahooks';
import { get, post } from '@/utils/http';
import { useTelegram } from '@/hooks/useTelegram';
import { useEffect, useState } from 'react';
import { useRequestByToken } from '@/hooks/use-request-by-token';
import { SpinMultiplier, SpinResultData, SpinUserData } from '@/sections/lucky-bera/config';
import { useUser } from '@/hooks/useUser';
import useToast from '@/hooks/use-toast';
import { useLuckyBeraStore } from '@/sections/lucky-bera/store';

export function useLuckyBera() {
  const { WebApp } = useTelegram();
  const { getUserInfo } = useUser();
  const toast = useToast();
  const { setLastSpinResult, lastSpinResult } = useLuckyBeraStore();

  const tgUserId = WebApp?.initDataUnsafe?.user?.id;

  const [spinMultiplier, setSpinMultiplier] = useState<SpinMultiplier>(SpinMultiplier.X1);

  const { run: getSpinUserData, data: spinUserData, loading: spinUserDataLoading } = useRequest<SpinUserData, any>(async () => {
    const res = await get("/api/spin/user", {
      tg_user_id: tgUserId,
    });
    if (res.code !== 200) return {};
    return res.data;
  }, {
    manual: true,
  });

  const { runAsync: handleSpinResult, data: spinResultData, loading: spinResultDataLoading } = useRequestByToken<SpinResultData | boolean, any>(async () => {
    const res = await post("/api/spin", {
      spin: spinMultiplier,
    });
    if (res.code !== 200) {
      toast.fail({ title: `Spin failed: ${res.message || res.data}` });
      return false;
    }
    getUserInfo();
    getSpinUserData();
    setLastSpinResult(res.data);
    return res.data;
  }, {
    manual: true,
  });

  const toggleSpinMultiplier = () => {
    if (!spinUserData?.spin) return;
    const multipliers = Object.values(SpinMultiplier).filter(multiplier => typeof multiplier === "number");
    let currIndex = multipliers.indexOf(spinMultiplier);
    let nextIndex = currIndex + 1;
    if (nextIndex >= multipliers.length - 1) nextIndex = 0;
    if (multipliers[nextIndex] > spinUserData.spin) {
      nextIndex = 0;
    }
    setSpinMultiplier(multipliers[nextIndex]);
  };

  useEffect(() => {
    if (!tgUserId) return;
    getSpinUserData();
  }, [tgUserId]);

  return {
    spinUserData,
    spinUserDataLoading,
    spinMultiplier,
    handleSpinResult,
    spinResultData,
    spinResultDataLoading,
    toggleSpinMultiplier,
    lastSpinResult,
  };
}
