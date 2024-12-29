import IconOKX from "@public/svg/okx.svg";
import IconCoupon from "@public/svg/coupon.svg";
import Popover, { PopoverPlacement } from "@/components/popover";
import { useOkxUniversal } from "@/hooks/useOkxUniversal";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { get } from "@/utils/http";
import { useTelegram } from "@/hooks/useTelegram";
import useBindStore from "@/stores/useBindStore";
import { useBind } from "@/hooks/useBind";
import useLogin from "@/hooks/useLogin";
import { usePathname } from "next/navigation";

const BindView = () => {
  const router = useRouter();
  const { loading, fetchBindStatus, bind } = useBind();
  const { handleLogin } = useLogin();
  const {
    connected: okxConnected,
    onConnect: onOKXConnect,
    session: okxSession,
  } = useOkxUniversal();

  const getAccount = (account: string) => `${account.split(':')[2].slice(0, 7)}...${account.split(':')[2].slice(-4)}`

  useEffect(() => {
    const checkBind = async () => {
      const address = await fetchBindStatus();
      if (address) {
        router.push('/');
      }
    };
    checkBind();
  }, []);

  useEffect(() => {
    const handleBindStatus = async () => {
      if (okxConnected && okxSession?.namespaces?.eip155?.accounts[0]) {
        handleLogin('okx_invite');
        const bindStatus = await bind(getAccount(okxSession?.namespaces?.eip155?.accounts[0]));
        console.log('bindStatus', bindStatus);
        if (bindStatus) {
            router.push('/imported-equipments');
        }
      }
    };
    handleBindStatus();
  }, [okxConnected]);

  const handleConnect = () => {
    onOKXConnect?.();
  };

  return (
    <div className="bg-black h-screen relative w-full">
      <div className="p-[18px]">
        <h1 className="text-white w-full mt-[56px] font-montserrat font-[900] text-[52px] leading-[52px] text-center">
          BERACIAGA
        </h1>
        <img
          src="/images/box-bg.png"
          className="w-[326px] h-[388px] mx-auto mt-4 object-cover aspect-square"
          alt="box"
        />
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        {
            loading ? (<div className="w-full flex justify-between items-center p-[18px]">
                <Skeleton width={156} height={52} />
                <Skeleton width={156} height={52} />
            </div>) : (
                <div className="w-full flex justify-between items-center p-[18px]">
                <button
                  onClick={() => router.push("/")}
                  className="bg-[#FFD335] w-[146px] h-[52px] text-center leading-[52px] rounded-[16px] font-montserrat font-bold text-black"
                >
                  Sign in
                </button>
                <button
                  onClick={handleConnect}
                  className="bg-[#FFD335] p-[10px] flex items-center gap-[9px] relative rounded-[16px] text-black "
                >
                  <IconOKX />
                  <span className="font-montserrat font-bold">Sign in by OKX</span>
                  <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 border border-[#000000] bg-[#FF79A4] w-[94%] flex gap-2 items-center justify-center rounded-[55px]">
                    <Popover
                      placement={PopoverPlacement.Top}
                      contentClassName={`w-[200px] backdrop-blur-[10px]`}
                      content={
                        <div className="relative">
                          <div className="rounded-lg bg-[#423F4C] bg-opacity-80 p-3 font-montserrat text-sm text-left text-white">
                            Import your exsit account in BeraTown by OKX wallet, your
                            equipments in Bera cave will speed up mining. Meanwhile,
                            you will get extra 1,000,000 points and $9.99 store coupon
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#423F4C] opacity-80"></div>
                          </div>
                        </div>
                      }
                    >
                      <div className="p-1 flex gap-[10px] items-center relative">
                        <div className="flex items-center gap-[2px]">
                          <img
                            src="/images/coin.png"
                            className="w-[17.33px] h-[17.33px]"
                          />
                          <span className="text-white font-cherryBomb font-bold text-stroke-1 text-[14px]">
                            +1,000,000
                          </span>
                        </div>
                        <div className="flex items-center gap-[2px]">
                          <IconCoupon />
                          <span className="text-white font-cherryBomb font-bold text-stroke-1 text-[14px]">
                            $9.99
                          </span>
                        </div>
                      </div>
                    </Popover>
                  </div>
                </button>
              </div>
            )
        }

      </div>
    </div>
  );
};

export default BindView;
