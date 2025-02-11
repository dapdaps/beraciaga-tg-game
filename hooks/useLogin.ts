import { useState, useEffect } from 'react';
import { useTelegram } from '@/hooks/useTelegram';
import { post } from '@/utils/http';
import useLoginStore from '@/stores/useLoginStore';

export interface UserData {
  id?: number;
  username?: string;
  is_premium?: boolean;
  photo_url?: string;
  invite_source?: string;
  inviter_tg_user_id?: string;
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
  const setLoginData = useLoginStore(state => state.setLoginData);

  const handleLogin = async () => {
    try {
      if (!WebApp.initDataUnsafe?.user) {
        throw new Error('Telegram WebApp user data not available for Web site');
      }

      const tgUser = WebApp.initDataUnsafe.user as UserData;
      
      const startParam = WebApp.initDataUnsafe.start_param || '';
      const paramPairs = startParam.split('<');
      let inviterId = null;
      let parsedInviteSource = null;

      for (let i = 0; i < paramPairs.length - 1; i++) {
        if (paramPairs[i] === 'inviterId') {
          inviterId = paramPairs[i + 1];
        }
        if (paramPairs[i] === 'inviterSource') {
          parsedInviteSource = paramPairs[i + 1];
        }
      }

      console.log(startParam, inviterId, parsedInviteSource, '<------startParam, inviterId, parsedInviteSource');

      const loginData = {
        tg_username: tgUser.username,
        tg_avatar: tgUser.photo_url,
        init_data: WebApp.initData,
        ...(parsedInviteSource && { invite_source: parsedInviteSource }),
        ...(inviterId && Number(inviterId) !== Number(tgUser.id) && { inviter_tg_user_id: inviterId })
      };
      const response = await post('/api/login', loginData);
      if (response.code === 200) {
        setLoginData(loginData);
        setUserData(loginData);
        console.log('/api/login ---- Login successful', loginData);
      } else {
        console.error('/api/login ---- Login failed:', response);
      }
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