import { useEffect, useMemo, useState } from 'react';
import { get, post } from '@/utils/http';
import { useTelegram } from '@/hooks/useTelegram';
import type { UserData } from '@/hooks/useLogin';
import { useQuestStore } from '@/stores/useQuestStore';
import { useRequest } from 'ahooks';
import { useRequestByToken } from '@/hooks/use-request-by-token';
import useToast from '@/hooks/use-toast';

export function useQuest() {
  const { WebApp } = useTelegram();
  const userData: UserData = WebApp?.initDataUnsafe?.user;
  const toast = useToast();

  const setQuestVisited = useQuestStore((store) => store.setVisited);
  const questVisited = useQuestStore((store) => store.visited);
  const [list, setList] = useState<Quest[]>([]);
  const [pending, setPending] = useState<{[id: number]: boolean;}>({});
  const dailyList = useMemo(() => {
    return list.filter((it) => it.daily === 1);
  }, [list]);
  const socialList = useMemo(() => {
    return list.filter((it) => it.daily !== 1);
  }, [list]);

  const formatList = (_list?: Quest[]) => {
    _list = _list || list.slice();
    _list.forEach((it) => {
      const currBtn = QuestButton.find((_it) => {
        if (!_it.category) {
          return _it.reg.test(it.name);
        }
        return _it.reg.test(it.name) && it.category === _it.category;
      });
      it.buttonText = currBtn?.text || "Check";

      if (it.daily === 1) {
        return;
      }
      it.visited = questVisited[it.id];
    });
    setList(_list);
  };

  const { run: getList, loading } = useRequest(async () => {
    const res = await get('/api/quest/list', { tg_user_id: userData?.id });
    if (res.code !== 200) {
      return;
    }
    const _list: Quest[] = res.data || [];
    formatList(_list);
  }, {
    manual: true,
    debounceWait: 50,
  });

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

  const { run: handleVerify } = useRequestByToken<any, [params: Quest]>(async (params) => {
    if (pending[params.id]) return;
    setPending({ ...pending, [params.id]: true });
    const res: { code: number; data: { success: boolean; } } = await post('/api/quest/verify', {
      quest_id: params.id,
    });
    setPending({ ...pending, [params.id]: false });
    if (res.code !== 200 || !res.data.success) {
      toast.fail({ toast: 'Verify failed!' });
      return;
    }
    setRecord(params.id, { completed: true });
    toast.success({ title: 'Verify successfully!' });
  }, {
    manual: true,
  });

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
    socialList,
    pending,
    handleClick,
    handleVerify,
  };
}

export enum QuestCategory {
  Telegram = 'telegram',
  Twitter = 'twitter',
  Discord = 'discord',
  Checkin = 'checkin',
}

export interface Quest {
  id: number;
  name: string;
  description: string;
  daily: number;
  category: QuestCategory;
  url: string;
  coins: number;
  status: number;
  logo: string;
  completed: boolean;

  visited: boolean;
  buttonText: string;
}

export const QuestButton = [
  { reg: /^Daily/i, text: "CHECK" },
  { reg: /^GM/i, text: "GM" },
  { reg: /^Follow/i, text: "Follow" },
  { reg: /^Like/i, text: "Open X", category: QuestCategory.Twitter },
  { reg: /^Join/i, text: "Join" },
];
