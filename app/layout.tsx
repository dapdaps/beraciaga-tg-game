'use client'

import { useEffect } from "react";
import "./globals.css";
import 'swiper/css';
import 'react-loading-skeleton/dist/skeleton.css';
import "react-toastify/dist/ReactToastify.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { TabBarWrapper } from '@/components/Layout/TabBarWrapper';
import TelegramProvider from '@/context/TelegramContext';
import { SkeletonTheme } from 'react-loading-skeleton';
import OkxTonProvider from '@/context/OkxContext';
import BitgetProvider from '@/context/BitgetContext';
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  useEffect(() => {
    async function loadPlugin() {
      if (!process.env.NEXT_PUBLIC_APP_LINK?.includes?.('berachain_game_test_bot')) return;
      if (typeof window !== 'undefined') {
        const VConsole = await import('vconsole');
        new VConsole.default();
      }
    }
    loadPlugin();
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Beraciaga_Test</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <TonConnectUIProvider manifestUrl='https://bera-dapdap.vercel.app/tonconnect-manifest.json'>
          <TelegramProvider>
            <SkeletonTheme baseColor='#96D6FF' highlightColor='#FFF5A9'>
              <OkxTonProvider isTelegram>
                <BitgetProvider>
                  <TabBarWrapper showTabBar={!['/', '/imported-equipments', '/raffle', '/raffle-previous'].includes(path)}>
                    {children}
                  </TabBarWrapper>
                </BitgetProvider>
              </OkxTonProvider>
            </SkeletonTheme>
          </TelegramProvider>
        </TonConnectUIProvider>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          theme="light"
          toastStyle={{ backgroundColor: "transparent", boxShadow: "none" }}
          newestOnTop
          rtl={false}
          pauseOnFocusLoss
          closeButton={false}
        />
      </body>
    </html>
  );
}