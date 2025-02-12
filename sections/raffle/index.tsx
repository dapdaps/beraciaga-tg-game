"use client";
import Modal from "@/components/modal";
import { useRaffle } from "./hooks/useRaffle";
import { useCountDown } from "@/hooks/use-count-down";
import { addThousandSeparator } from "@/utils/number-formatter";
import { useState, useEffect, use } from "react";
import useToast from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useInvite } from "../home2/hooks/use-invite";
import Loading from "@/components/Loading";
import { useShowModalStore } from "./hooks/useShowModalStore";

const RaffleViews = () => {

  const { latestData, userInfo, updater, setUpdater, joinRaffle,joinLoading, getRaffleResult } = useRaffle();
  const [showInfo, setShowInfo] = useState(false);
  const [amount, setAmount] = useState(0);
  const toast = useToast();
  const router = useRouter();
  const { handleShare, handleCopy } = useInvite("raffles");
  const [result, setResult] = useState<number>();
  const [showResultModal, setShowResultModal] = useState(false);
  const { addShownResult, hasShownResult } = useShowModalStore();

  useEffect(() => {
    setAmount(userInfo?.available_ticket || 0);
  }, [userInfo?.available_ticket]);

  const handleMins = () => {
    if (!userInfo?.available_ticket) return;
    if (amount > 0) {
      setAmount((prev) => prev - 1);
    }
  };

  const handlePlus = () => {
    if (!userInfo?.available_ticket) return;
    if (amount < userInfo.available_ticket) {
      setAmount((prev) => prev + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userInfo?.available_ticket) return;
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    const numValue = parseInt(value || "0");
    if (numValue <= userInfo.available_ticket) {
      setAmount(numValue);
    }
  };

  const { countdown, isEnded } = useCountDown({
    targetTimestamp: (latestData?.end_time ?? 0) * 1000,
    padZero: true,
    onEnd: () => setUpdater(prev => prev + 1)
  });


  
  const fetchResult = async () => {
    try {
      const data = await getRaffleResult();
      setResult(data.coins || 0);
      if (data.coins > 0 && latestData?.round && !hasShownResult(Number(latestData.round))) {
        setShowResultModal(true);
        addShownResult(Number(latestData.round));
      }
    } catch (error) {
      console.log(error, 'fetchResult - error');
    }
  }

  useEffect(() => {
    fetchResult()
  }, [latestData, updater]);

  const isDisabled = !userInfo?.available_ticket || !(userInfo?.can_participate && Number(userInfo?.spend_ticket) === 0) || isEnded || latestData?.status === 'ended';
  const isMinDisabled = isDisabled || amount <= 0;
  const isPlusDisabled = isDisabled || amount >= (userInfo?.available_ticket || 0);

  const handleJoinFunc = async () => {
    if (!amount || joinLoading || isDisabled) return;
    try {
      const result = await joinRaffle(amount);
 
      result ? toast.success({
        title: "Join Success"
      }) : toast.fail({
        title: "Join Failed"
      })

      if (result) {
        fetchResult();
        setUpdater((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error, "handleJoinFunc - error");
    } 
  };

  return (
    <div className="bg-[url('/images/raffle/raffle-bg.png')] bg-cover bg-center h-screen flex flex-col items-center">
      <div className="mt-4 w-full px-3 flex items-center justify-between relative z-30">
        <img
          src="/images/raffle/back.png"
          className="w-[42px] object-contain"
          alt=""
          onClick={() => router.back()}
        />
        {
          Number(latestData?.round) > 1 && (
            <div
              onClick={() => router.push("/raffle-previous")}
              className="font-cherryBomb text-stroke1-shadow text-white bg-[#FFB050] rounded-xl border-[2px] border-[#4B371F] w-[92px] h-[36px] flex items-center justify-center"
            >
              Previous
            </div>
          )
        }
      </div>
      <div className="w-full mt-[-50px] bg-[url(/images/raffle/header-frame.png)] bg-cover bg-center h-[277px] flex flex-col items-center justify-center">
        <div className="text-[#FFDF77] font-cherryBomb text-stroke-3 text-[26px] leading-[26px] -mt-5" style={{
          textShadow: '0px 4px 0px #4B371F'
        }}>
          RAFFLES
        </div>
        <div style={{
          textShadow: '0px 4px 0px #4B371F'
        }} className="text-[#F6AD0F] font-cherryBomb text-stroke-3 text-[26px] leading-[26px]">
          Round {latestData?.round || "-"}
        </div>
      </div>
      <div className="flex items-center gap-2 mx-auto mt-[-60px]">
        <img src="/images/raffle/timer.png" className="w-[32px]" alt="" />
        <div className="text-[#FDD35E] font-cherryBomb text-stroke1-shadow text-[18px]">
          {isEnded || latestData?.status === 'ended' ? 'FINISHED' : countdown}
        </div>
      </div>
      <div className="bg-[url(/images/raffle/section-bg.png)] bg-cover bg-center h-[349px] w-[369px] mt-[46px] mx-auto relative flex flex-col items-center">
        <div className="bg-[url(/images/raffle/button-display-270.png)] bg-cover bg-center h-[75px] w-[270px] absolute top-[-30px] left-[1/2] translate-x-[1/2] flex items-center pl-4">
          <div className="w-full flex items-center gap-3">
            <img
              src="/images/raffle/coin.png"
              className="w-[46px] h-[46px]"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <div className="text-[#FDD35E] text-stroke1-shadow font-cherryBomb text-[20px] leading-[20px]">
                {addThousandSeparator(latestData?.coins) || "-"}
              </div>
              <div className="text-[#FFF4C2] text-stroke1-shadow font-cherryBomb text-[16px] leading-[16px]">
                {latestData?.player || "-"} Players
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[60px] w-[205px] h-[58px] border-[2px] border-[#4B371F] bg-[#FFB050] flex flex-col items-center justify-center relative rounded-2xl">
          <div className="font-cherryBomb text-base leading-[16px] text-[#F7F9EA] text-stroke1-shadow ml-[-4px]">
            Your have
          </div>
          <div className="font-cherryBomb text-[20px] leading-[20px] text-[#F7F9EA] text-stroke1-shadow">
            {userInfo?.available_ticket || 0} Tickets
          </div>
          <img
            src="/images/raffle/raffle-logo.png"
            className="w-[98px] absolute top-[-10px] left-[-40px]"
            alt=""
          />
          <img
            src="/images/raffle/info.png"
            onClick={() => setShowInfo(true)}
            className="w-[26px] h-[26px] absolute right-[-7px] top-[-4px]"
            alt=""
          />
        </div>
        <div className="font-cherryBomb text-stroke1-shadow text-[#F7F9EA] w-full text-center my-[14px]">
          Your will spend
        </div>
        <div className="flex mx-auto items-center gap-[22px] mb-[14px]">
          <img
            onClick={() => !isMinDisabled && handleMins()}
            src="/images/raffle/mins.png"
            className={`w-[44px] h-[44px] ${
              isMinDisabled
                ? "filter grayscale cursor-not-allowed"
                : "cursor-pointer"
            }`}
            alt=""
          />
          <input
            value={amount}
            onChange={handleInputChange}
            type="text"
            className="text-[26px] font-cherryBomb text-black text-center w-[116px] h-[45px] bg-[#FFFAEA] border-[2px] rounded-2xl border-[#D7C69D] outline-none"
          />
          <img
            onClick={() => !isPlusDisabled && handlePlus()}
            src="/images/raffle/plus.png"
            className={`w-[44px] h-[44px] ${
              isPlusDisabled
                ? "filter grayscale cursor-not-allowed"
                : "cursor-pointer"
            }`}
            alt=""
          />
        </div>
        <BaseButton isDisabled={isDisabled} onClick={handleJoinFunc}>
           <div className="flex items-center justify-center w-full gap-2">
           {
            joinLoading && <Loading circleColor="#4B371F" />
           }
            <span>Join This Round</span>
           </div>
        </BaseButton>
        <div className="mt-[10px] font-montserrat text-[14px] leading-[17px] text-center w-[294px] text-[#FFF4C2]">
          Don’t worry! The tickets will be refund if you didn’t win in this
          round.
        </div>
        <ModalInvite
          open={showInfo}
          onClose={() => setShowInfo(false)}
          share={handleShare}
          copy={handleCopy}
        />
        <ModalResult open={showResultModal} onClose={() => setShowResultModal(false)} result={result} />
      </div>
    </div>
  );
};

export default RaffleViews;

const BaseButton = ({
  children,
  onClick,
  isDisabled,
}: {
  children: React.ReactNode;
  interClassName?: string;
  onClick?: () => void;
  isDisabled?: boolean;
}) => {
  return (
    <div className="inline-block">
      <div
        className={`rounded-[30px] border-2 border-[#4B371F] bg-[#FFB050] p-[6px] inline-block w-[256px] h-[62px] ${
          isDisabled ? "filter grayscale cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <div
          onClick={onClick}
          className="border-2 border-[#AF7026] bg-[#FFCF23] flex items-center justify-center relative w-full h-full rounded-[30px] text-stroke1-shadow text-[#FFF4C2] text-[18px] font-cherryBomb"
        >
          <div className="absolute top-[4px] left-[4px]">
            <svg
              width="65"
              height="17"
              viewBox="0 0 65 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.1355 14.5751C2.1355 7.78535 3.89353 1.75 13.2697 1.75M20.8878 1.75H63.0805"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

const ModalInvite = ({
  open,
  onClose,
  share,
  copy,
}: {
  open: boolean;
  onClose: () => void;
  share: () => void;
  copy: () => void;
}) => {
  const inviteConfig = [
    { invites: 1, tickets: 1 },
    { invites: 5, tickets: 2 },
    { invites: 10, tickets: 4 },
    { invites: 20, tickets: 6 },
    { invites: 50, tickets: 10 },
    { invites: 100, tickets: 15 },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeIcon={
        <img src="/images/raffle/close.png" className="w-[34px] h-[34px]" />
      }
      closeIconClassName="top-[-17px] right-[-17px]"
    >
      <div
        className="w-[340px] h-[340px] border-[2px] border-[#7F6C41] rounded-[10px] p-[3px] relative"
        style={{
          background: "linear-gradient(180deg, #D4A20C 0%, #FFCC34 100%)",
        }}
      >
        <div className="rounded-[10px] border-[2px] border-[#7F6C41] bg-gradient-to-b from-[#D4A20C] to-[#FFCC34] p-[3px]">
          <div className="bg-[#FFF1C7] h-full rounded-[10px] border-[2px] border-[#E5C375] p-[3px]">
            <div className="h-[48px] w-[280px] mx-auto font-cherryBomb leading-6 mt-[20px] mb-4 text-[#4B371F] text-[20px]">
              Invite Frens, grab raffels! Big prize await, don’t wait!
            </div>
            <div className="px-5">
              <div className="min-h-[115px] border-[2px] border-[#D7C69D] bg-[#FFFAEA] rounded-2xl flex flex-col items-center justify-center py-2">
                {inviteConfig.map(({ invites, tickets }) => (
                  <div
                    key={invites}
                    className="font-cherryBomb leading-6 text-[#4B371F]"
                  >
                    {invites} {invites === 1 ? "invite" : "invites"} = {tickets}{" "}
                    {tickets === 1 ? "ticket" : "tickets"}
                  </div>
                ))}
              </div>
              <div className="flex items-center w-full gap-3 mt-5 mb-[40px]">
                <img
                  src="/images/raffle/button-invite.png"
                  onClick={share}
                  className="w-[233px] h-[51px]"
                  alt=""
                />
                <img
                  src="/images/raffle/button-copy.png"
                  onClick={copy}
                  className="w-[40px] h-[40px]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <img
          src="/images/raffle/raffle-header-1.png"
          className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[216px]"
          alt=""
        />
      </div>
    </Modal>
  );
};

const ModalResult = ({
  open,
  onClose,
  result,
}: {
  open: boolean;
  onClose: () => void;
  result?: number;
}) => {
  const router = useRouter();
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeIcon={
        <img src="/images/raffle/close.png" className="w-[34px] h-[34px]" />
      }
      closeIconClassName="top-[-17px] right-[-17px]"
    >
      <div className="relative bg-[url(/images/raffle/congrats.png)] w-[270px] h-[373px] bg-cover bg-center flex flex-col items-center">
        <img
          src="/images/raffle/raffle-header-1.png"
          className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[216px]"
          alt=""
        />
        <div className="relative bg-[url(/images/raffle/congrats-bg.png)] w-[248px] h-[255px] bg-cover bg-center mx-auto mt-[50px]">
          <div
            className="absolute bottom-[40px] -rotate-6 text-[#FFF549] font-cherryBomb text-[36px] text-stroke-3 left-1/2 -translate-x-1/2"
            style={{
              textShadow: "-1px 3px 0px #4B371F",
            }}
          >
            {addThousandSeparator(result) || '-'}
          </div>
        </div>
        <div
          onClick={() => router.push("/raffle-previous")}
          className={`rounded-[30px] border-2 border-[#4B371F] bg-[#FFB050] p-[4px] inline-block w-[182px] h-[50px]`}
        >
          <div className="border-2 border-[#AF7026] bg-[#FFCF23] flex items-center justify-center relative w-full h-full rounded-[30px] text-stroke1-shadow text-[#FFF4C2] text-[18px] font-cherryBomb">
            <div className="absolute top-[4px] left-[4px]">
              <svg
                width="65"
                height="17"
                viewBox="0 0 65 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.1355 14.5751C2.1355 7.78535 3.89353 1.75 13.2697 1.75M20.8878 1.75H63.0805"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            Check Now
          </div>
        </div>
      </div>
    </Modal>
  );
};
