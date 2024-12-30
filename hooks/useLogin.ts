import { useState, useEffect } from 'react';
import { useTelegram } from '@/hooks/useTelegram';
import { post } from '@/utils/http';
import { useRouter, usePathname } from 'next/navigation';

export interface UserData {
  id: number;
  username?: string;
  is_premium?: boolean;
  photo_url?: string;
}

interface UseLoginResult {
  userData: UserData | null;
  isLoading: boolean;
  error: string | null;
  handleLogin: (args?: string) => Promise<void>;
}

const useLogin = (): UseLoginResult => {
  const { WebApp, isInitialized, error: sdkError } = useTelegram();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasProcessedInvite, setHasProcessedInvite] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogin = async (invite_source = '') => {
    try {
      if (!WebApp.initDataUnsafe?.user) {
        throw new Error('Telegram WebApp user data not available for Web site');
      }

      const tgUser = WebApp.initDataUnsafe.user as UserData;
      console.log(WebApp, 'handleLogin ===== WebApp')
      const inviterId = WebApp.initDataUnsafe.start_param && WebApp.initDataUnsafe.start_param.split('inviterId=')?.[1];

      const loginData = {
        tg_username: tgUser.username,
        tg_avatar: tgUser.photo_url,
        init_data: WebApp.initData,
        ...(invite_source && { invite_source: 'okx_invite' }), // only for okx invite
        ...(inviterId && Number(inviterId) !== Number(tgUser.id)  &&  { inviter_tg_user_id: inviterId })
      };
      
      await post('/api/login', loginData);
      setUserData(loginData);

      // if (inviterId && pathname === '/bind' && !hasProcessedInvite) {
      //   setHasProcessedInvite(true);
      //   await router.replace('/home');
      // }

      console.log('/api/login ---- Login successful', loginData);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Login error:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isInitialized || !WebApp) {
      setIsLoading(true);
      return;
    }
    handleLogin();
  }, [WebApp, isInitialized]);

  useEffect(() => {
    if (sdkError) {
      setError(sdkError);
      setIsLoading(false);
    }
  }, [sdkError]);

  return { userData, isLoading, error, handleLogin };
};

export default useLogin;