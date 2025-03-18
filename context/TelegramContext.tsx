import React, { createContext, useEffect, useState } from "react";
import { useUserStore } from '@/stores/useUserStore';

interface TelegramContext {
  WebApp: any | null;
  isInitialized: boolean;
  error: string | null;
}

export const TelegramContext = createContext<TelegramContext>({
  WebApp: null,
  isInitialized: false,
  error: null,
});

const DEBUG_MODE = process.env.NODE_ENV === 'development';

// Mock Telegram WebApp user data for debug mode
const initDataUnsafeList: any = {
  user1: {
    user: {
      "id": 5514282060,
      "first_name": "Yyy",
      "last_name": "",
      "username": "snwyzqaq",
      "language_code": "en",
      "allows_write_to_pm": true,
      "photo_url": "https://t.me/i/userpic/320/h-0lS_Nn4BYHsYy7RKakB04QRcZ-PIeXB7CcQIXQWhCjvLH4o7PQVTw80qMcXSoZ.svg"
    }
  },
  user2: {
    auth_date: "1742292191",
    chat_instance: "4289839181445299053",
    chat_type: "private",
    hash: "e8edd7f6ab0c5a960aa44ea0805b8b5be1aa58888da9be33e9c40dd9b3f88d9b",
    signature: "TFDe0tn0qMj9lBn3GZhoXS4gwTzvf1P5RAxx_baXO0twOPGCvfKzflUryrkjhUYVU9wrSBePMOE1nPLmlAsbCw",
    user: {
      allows_write_to_pm: true,
      first_name: "gu",
      id: 7150006688,
      language_code: "zh-hans",
      last_name: "jimmy",
      photo_url: "https://t.me/i/userpic/320/i2-BRTWcSQoXawvpUSVv78kuH2IMkVBXItH61uWUjHYGATen0Zf2m-qRI1i7HXIr.svg",
      username: "jimmyguu"
    }
  },
};

const mockWebApp = {
  initData: JSON.stringify(initDataUnsafeList[process.env.NEXT_PUBLIC_MOCK_TG_USER || 'user1']),
  initDataUnsafe: initDataUnsafeList[process.env.NEXT_PUBLIC_MOCK_TG_USER || 'user1'],
  ready: () => console.log("Mock WebApp ready called"),
  expand: () => console.log("Mock WebApp expand called"),
};

const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setInitData } = useUserStore();

  const [WebApp, setWebApp] = useState<any | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initWebApp = async () => {
      try {
        if (DEBUG_MODE) {
          console.log("DEBUG MODE: Using mock Telegram WebApp data");
          setWebApp(mockWebApp);
          setIsInitialized(true);
          setInitData(mockWebApp.initData);
          console.log(mockWebApp, '---Mock WebApp Data---');
        } else {
          const WebAppModule = await import("@twa-dev/sdk");
          WebAppModule.default.ready();
          WebAppModule.default.expand();
          setWebApp(WebAppModule.default);
          setIsInitialized(true);
          setInitData(WebAppModule.default.initData);
          console.log(WebAppModule.default, '---WebAppModule.default---');
        }
      } catch (err) {
        console.error("Failed to load Telegram WebApp SDK");
        setError("Failed to initialize Telegram WebApp");
      }
    };

    initWebApp();
  }, []);

  return (
    <TelegramContext.Provider value={{ WebApp, isInitialized, error }}>
      {children}
    </TelegramContext.Provider>
  );
};

export default TelegramProvider;