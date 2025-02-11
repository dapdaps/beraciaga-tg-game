import { useMemo, useState } from 'react';
import { useTelegram } from '@/hooks/useTelegram';
import { get } from '@/utils/http';
import useToast from '@/hooks/use-toast';
import { isAndroid } from 'react-device-detect';

export function useInvite(defaultInviterSource = 'okx_invite') {
  const toast = useToast();
  const { WebApp } = useTelegram();
  const userInfo = WebApp?.initDataUnsafe?.user;

  const [total, setTotal] = useState<any>(0);
  const [loading, setLoading] = useState<any>(false);

  const shareLink = useMemo(() => {
    if (!process.env.NEXT_PUBLIC_APP_LINK) {
      console.error('APP_LINK is not set');
      return {};
    }

    const startappValue = `inviterId%${userInfo?.id || ''}%inviterSource%${defaultInviterSource}`;
    const app_link = `${process.env.NEXT_PUBLIC_APP_LINK}?startapp=${encodeURIComponent(startappValue)}`;
    const tg_share_link = `https://t.me/share/url?url=${app_link}&text=DapDap %26 Beratown team is dropping sumting new 👀 %0A Idk what it is but just sign up to the TG mini app to stack up the BGOLD first`;
    console.log(app_link, '---shareLink---');
    return {
      app_link,
      tg_share_link,
    };
  }, [userInfo?.id, defaultInviterSource]);

  const getTotal = async () => {
    setLoading(true);
    try {
      const res = await get('/api/user/invite/total', {
        tg_user_id: userInfo?.id,
      });
      if (res.code !== 200) return;
      setTotal(res.data.total);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (!shareLink?.tg_share_link) return;
    WebApp?.openTelegramLink?.(shareLink.tg_share_link);
    if (isAndroid) {
      WebApp?.close();
    }
  };

  const handleCopy = () => {
    if (!shareLink?.app_link) return;

    toast.dismiss();
    try {
      navigator.clipboard.writeText(shareLink.app_link);
      toast.success({ title: 'Copied to clipboard' });
    } catch (err) {
      console.log(err);
      toast.fail({ title: 'Could not copy clipboard' });
    }
  };

  return {
    loading,
    total,
    getTotal,
    shareLink,
    handleShare,
    handleCopy,
  };
}
