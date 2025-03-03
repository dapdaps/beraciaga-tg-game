import React, { createContext, useEffect, useState } from "react";

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
const mockWebApp = {
  initDataUnsafe: {
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
  ready: () => console.log("Mock WebApp ready called"),
  expand: () => console.log("Mock WebApp expand called"),
};

const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
          console.log(mockWebApp, '---Mock WebApp Data---');
        } else {
          const WebAppModule = await import("@twa-dev/sdk");
          WebAppModule.default.ready();
          WebAppModule.default.expand();
          setWebApp(WebAppModule.default);
          setIsInitialized(true);
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