'use client'

import { Suspense, useEffect } from 'react';
import "./globals.css";
import 'swiper/css';
import 'react-loading-skeleton/dist/skeleton.css';
import "react-toastify/dist/ReactToastify.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import TelegramProvider from '@/context/TelegramContext';
import { SkeletonTheme } from 'react-loading-skeleton';
import OkxTonProvider from '@/context/OkxContext';
import BitgetProvider from '@/context/BitgetContext';
import { ToastContainer } from "react-toastify";
import Congrats from '@/sections/home2/components/congrats';
import Invite from '@/sections/home2/components/invite';
import { useLayoutStore } from '@/stores/useLayoutStore';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    inviteModalVisible,
    congratsModalVisible,
    setInviteModalVisible,
    setCongratsModalVisible,
  } = useLayoutStore();

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
        <title>Beraciaga</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link
          rel="preload"
          as="document"
          href={process.env.NEXT_PUBLIC_GAME_URL}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <TonConnectUIProvider manifestUrl='https://bera-dapdap.vercel.app/tonconnect-manifest.json'>
          <TelegramProvider>
            <SkeletonTheme baseColor='#96D6FF' highlightColor='#FFF5A9'>
              <OkxTonProvider isTelegram>
                <BitgetProvider>
                  <Suspense fallback={<></>}>
                    {children}
                  </Suspense>
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
        <Congrats
          visible={congratsModalVisible}
          onClose={() => {
            setCongratsModalVisible(false);
          }}
        />
        <Invite
          visible={inviteModalVisible}
          onClose={() => {
            setInviteModalVisible(false);
          }}
        />
      </body>
    </html>
  );
}