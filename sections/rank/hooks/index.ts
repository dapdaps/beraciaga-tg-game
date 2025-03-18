import { useRequest } from 'ahooks';
import { get } from '@/utils/http';
import { useTelegram } from '@/hooks/useTelegram';
import { UserData } from '@/hooks/useLogin';
import { testData } from '@/data/test';

export function useRank() {
  const { WebApp } = useTelegram();

  const userData: UserData = WebApp?.initDataUnsafe?.user || testData;

  const listRequest = useRequest<RankItem[], any>(async () => {
    const res = await get("/api/rank/tops");
    if (res.code !== 200) return [];
    return res.data;
  }, {});

  const userRankRequest = useRequest<UserRankData, any>(async () => {
    const res = await get("/api/rank/user", { tg_user_id: userData.id });
    if (res.code !== 200) return {};
    return res.data;
  }, {});

  return {
    list: listRequest.data,
    loading: listRequest.loading,
    userRank: userRankRequest.data,
    userRankLoading: userRankRequest.loading,
  };
}

export interface RankItem {
  avatar: string;
  gem: number;
  id: number;
  level: number;
  rank: number;
  tg_user_id: string;
  username: string;
}

export interface UserRankData {
  id: number;
  tg_user_id: string;
  rank: number;
  level: number;
  gem: number;
  username: string;
  avatar: string;
}
