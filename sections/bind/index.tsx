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
import useLoginStore from '@/stores/useLoginStore';
import ComingSoon from '@components/ComingSoon';

const BindView = () => {
  const router = useRouter();
  const [hasCheckedBind, setHasCheckedBind] = useState(false);
  const { loading, fetchBindStatus, bind, bindAddress } = useBind();
  const isLoggedIn = useLoginStore(state => state.isLoggedIn);
  const hasBound = useBindStore(state => state.hasBound);
  const setHasBound = useBindStore(state => state.setHasBound);
  const {
    connected: okxConnected,
    onConnect: onOKXConnect,
    onDisconnect: onOKXDisconnect,
  } = useOkxUniversal();

  const getAccount = (account: string) => `${account.split(':')[2]}`
  
  useEffect(() => {
    console.log('bindAddress-isLoggedIn-hasCheckedBind', bindAddress, isLoggedIn, hasCheckedBind);
    const checkBind = async () => {
      if (!isLoggedIn) return;
      
      if (hasBound) {
        router.replace('/');
        return;
      }

      const address = await fetchBindStatus();
      console.log('address', address);
      setHasCheckedBind(true);
      
      if (address) {
        setHasBound(true);
        router.replace('/imported-equipments');
      }
    };
    checkBind();
  }, [isLoggedIn]);

  const handleConnect = async () => {
    try {
      const session = await onOKXConnect?.();
      if (session?.namespaces?.eip155?.accounts[0]) {
        const bindStatus = await bind(getAccount(session?.namespaces?.eip155?.accounts[0]));
        console.log('bindStatus', bindStatus);
        if (bindStatus) {
          setHasBound(true);
          router.push('/imported-equipments');
        }
      }
    } catch (error) {
      console.error('Error initializing OKX Connect UI:', error);
    }
  };

  return (
    <div className="bg-black h-screen relative w-full">
      <div className="p-[18px]">
        <h1 className="relative flex flex-col items-center text-white w-full mt-[56px] font-montserrat font-[900] text-[52px] leading-[52px] text-center">
          <div>BERACIAGA</div>
          <ComingSoon className="absolute top-[-30px] z-[1]" />
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
                <div className="w-full flex justify-between items-center p-[18px] gap-[0.8125rem]">
                  {
                    okxConnected && (
                      <button
                        className="absolute text-white top-[-80px]"
                        onClick={onOKXDisconnect}
                      >
                        onOKXDisconnect
                      </button>
                    )
                  }
                  <button
                    onClick={() => router.push("/home")}
                  className="bg-[#FFD335] w-[146px] h-[52px] text-center rounded-[16px] font-montserrat font-bold text-black leading-[1]"
                >
                  Sign in
                </button>
                <button
                  onClick={handleConnect}
                  className="bg-[#FFD335] p-[10px] flex items-center gap-[9px] relative rounded-[16px] text-black "
                >
                  <IconOKX className="w-[30px] h-[30px]" />
                  <span className="font-montserrat font-bold flex-1 leading-[1] text-left">Sign in with OKX wallet</span>
                  <div onClick={e => e.stopPropagation()} className="absolute top-[-24px] left-1/2 -translate-x-1/2 border border-[#000000] bg-[#FF79A4] w-[94%] flex gap-2 items-center justify-center rounded-[55px]">
                    <Popover
                      show={true}
                      placement={PopoverPlacement.Top}
                      contentClassName={`w-[200px] backdrop-blur-[10px]`}
                      content={
                        <div className="relative">
                          <div className="rounded-lg bg-[#423F4C] bg-opacity-80 p-3 font-montserrat text-sm text-left text-white">
                          Connect with OKX wallet to earn extra <img src="/images/coin.png" className="w-[14px] h-[14px] inline-block" /> and coupons! At the same time, boost your mining speed if your wallet has obtained Beratown's cave items!
                          Meanwhile, you will get extra <br /> <img src="/images/coin.png" className="w-[14px] h-[14px] inline-block" /> 100,000,000 and $9.99 store coupon
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
                            +100,000,000
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
