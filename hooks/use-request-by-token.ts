import type { Options, Plugin, Service } from 'ahooks/lib/useRequest/src/types';
import { useTelegram } from '@/hooks/useTelegram';
import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';

export function useRequestByToken<TData, TParams extends any[]>(service: Service<TData, TParams>, options?: Options<TData, TParams>, plugins?: Plugin<TData, TParams>[]) {
  const { WebApp } = useTelegram();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!WebApp?.initData) return;
    setReady(true);
  }, [WebApp?.initData]);

  return useRequest(service, {
    ...options,
    ready,
  }, plugins);
}
