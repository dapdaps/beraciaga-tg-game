import { useEffect, useMemo, useState } from 'react';
import { get, post } from '@/utils/http';
import { useTelegram } from '@/hooks/useTelegram';
import type { UserData } from '@/hooks/useLogin';
import Big from 'big.js';
import { useQuestStore } from '@/stores/useQuestStore';
import { useDebounceFn } from 'ahooks';

// FIXME
const testData = {
  allows_write_to_pm: true,
  first_name: 'gu',
  id: 7150006688,
  language_code: 'zh-hans',
  last_name: 'jimmy',
  photo_url: 'https://t.me/i/userpic/320/i2-BRTWcSQoXawvpUSVv78kuH2IMkVBXItH61uWUjHYGATen0Zf2m-qRI1i7HXIr.svg',
  username: 'jimmyguu',
};

export function useQuest() {
  const { WebApp, isInitialized } = useTelegram();
  const userData: UserData = WebApp?.initDataUnsafe?.user || testData;

  const setQuestVisited = useQuestStore((store) => store.setVisited);
  const questVisited = useQuestStore((store) => store.visited);
  const [list, setList] = useState<Quest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pending, setPending] = useState<{[id: number]: boolean;}>({});
  const dailyList = useMemo(() => {
    return list.filter((it) => it.category === QuestCategory.Checkin);
  }, [list]);
  const viewList = useMemo(() => {
    return list.filter((it) => it.category === QuestCategory.View);
  }, [list]);
  const socialList = useMemo(() => {
    return list.filter((it) => it.category === QuestCategory.Social);
  }, [list]);

  const formatList = (_list?: Quest[]) => {
    _list = _list || list.slice();
    _list.forEach((it) => {
      // When complete_times = 1
      // the user cannot sign in again
      // when it is 0, the user can sign in.
      if (it.category === QuestCategory.Checkin) {
        it.finished = Big(it.complete_times).gte(1);
        return;
      }
      it.visited = questVisited[it.id];
      if (Big(it.times).gt(0)) {
        it.finished = Big(it.complete_times).gte(it.times);
      }
    });
    setList(_list);
  };

  const { run: getList } = useDebounceFn(async () => {
    setLoading(true);
    const res = await get('/api/quest/list', { tg_user_id: userData?.id });
    if (res.code !== 200) {
      setLoading(false);
      return;
    }
    const _list: Quest[] = res.data || [];
    formatList(_list);
    setLoading(false);
  }, { wait: 50 });

  const setRecord = (id: number, params: Partial<Quest>) => {
    const _list = list.slice();
    const curr = _list.find((it) => it.id === id);
    if (curr) {
      for (const key in params) {
        if (key === 'id') continue;
        // @ts-ignore
        curr[key] = params[key];
      }
      formatList(_list);
    }
  };

  const handleVerify = async (params: Quest) => {
    if (pending[params.id]) return;
    setPending({ ...pending, [params.id]: true });
    const res: {code: number; data: { completed_times: number; } } = await post('/api/quest/verify', {
      quest_id: params.id,
      tg_user_id: userData?.id + '',
    });
    setPending({ ...pending, [params.id]: false });
    if (res.code !== 200) {
      WebApp?.showAlert?.('Verify failed!');
      return;
    }
    setRecord(params.id, { complete_times: res.data.completed_times });
    WebApp?.showAlert?.('Verify successfully!');
  };

  const handleClick = (params: Quest) => {
    if (params.category === QuestCategory.Checkin) {
      handleVerify(params);
      return;
    }
    const visited = questVisited[params.id];
    if (visited) {
      handleVerify(params);
      return;
    }
    setQuestVisited({ id: params.id, visited: true });
    if (params.url) {
      WebApp?.openLink?.(params.url);
    }
  };

  useEffect(() => {
    if (!userData) return;
    getList();
  }, [userData]);

  useEffect(() => {
    formatList();
  }, [questVisited]);

  return {
    loading,
    userData,
    list,
    getList,
    dailyList,
    viewList,
    socialList,
    pending,
    handleClick,
    handleVerify,
  };
}

export enum QuestCategory {
  Social = 'social',
  View = 'view',
  Checkin = 'checkin',
}

export interface Quest {
  id: number;
  name: string;
  description?: string;
  category: QuestCategory;
  url?: string;
  coins: number;
  // times = 0 indicates infinite completion times
  // otherwise， it specifies the allowed number of completions
  times: number;
  start_time: number;
  end_time: number;
  // Number of times the user has already completed
  complete_times: number;
  finished?: boolean;
  visited?: boolean;
}
