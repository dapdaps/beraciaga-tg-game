"use client";

import { addThousandSeparator } from "@/utils/number-formatter";
import { testData, useRaffle } from "../hooks/useRaffle";
import { get } from "@/utils/http";
import { useEffect, useState } from "react";
import Empty from "@/components/Empty";
import { useTelegram } from "@/hooks/useTelegram";
import { UserData } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

interface IRewardList {
  avatar: string;
  coins: number;
  spend_ticket: number;
  tg_user_id: string;
  username: string;
}

const RafflePreviousView = () => {
  const { WebApp } = useTelegram();
  const userData: UserData = WebApp?.initDataUnsafe?.user || testData;
  const { latestData, updater, setUpdater } = useRaffle();
  const [rewardList, setRewardList] = useState<IRewardList[]>([]);
  const router = useRouter();

  const getRewardList = async () => {
    if (!latestData) return;
    try {
      const res = await get(
        `/api/raffle/reward/list?round=${latestData.round}`
      );
      if (res.code === 200) {
        setRewardList((res.data as IRewardList[]) || []);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getRewardList();
  }, [latestData, updater]);

  const selectorUser =
    rewardList.length > 0
      ? rewardList.find((item) => Number(item.tg_user_id) === userData.id)
      : null;

  return (
    <div className="bg-[url('/images/raffle/raffle-bg.png')] bg-cover bg-center h-screen flex flex-col items-center">
      <div className="mt-4 w-full px-3 flex items-center justify-between">
        <img
          src="/images/raffle/back.png"
          className="w-[42px] object-contain"
          alt=""
          onClick={() => router.back()}
        />
        <img
          src="/images/raffle/text-previous.png"
          className="w-[152px] object-contain"
          alt=""
        />
        <div />
      </div>
      <div className="w-full px-2.5 mt-[18px]">
        <div className="relative rounded-[10px] border-[2px] border-[#7F6C41] bg-gradient-to-b from-[#D4A20C] to-[#FFCC34] p-[6px]">
          <div className="bg-[#FFF1C7] rounded-[10px] border-[2px] border-[#E5C375] pt-[2px] px-3 h-[516px] overflow-y-scroll">
            <div
              style={{
                background: "linear-gradient(180deg, #FFDF77 0%, #F6AD0F 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="text-stroke-3 font-cherryBomb text-[20px]"
            >
              Round{latestData?.round || "1"}
            </div>
            <div className="w-full mt-[14px]">
              {rewardList.length === 0 ? (
                <Empty mt={"50px"} desc="No more data" />
              ) : (
                rewardList.map((item, index) => (
                  <div key={index} className="rounded-2xl border-[2px] border-[#D7C69D] bg-[#FFFAEA] p-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        className="rounded-[10px] w-[50px] h-[50px] border-[2px] border-[#8A8A8A]"
                        src={item.avatar}
                      />
                      <div className="flex flex-col gap-[6px]">
                        <div className="font-cherryBomb leading-4 text-[#F7F9EA] text-stroke1-shadow">
                          @{item.username}
                        </div>
                        <div className="flex items-center gap-1">
                          <img
                            src="/images/raffle/coin.png"
                            className="w-6 h-6"
                            alt=""
                          />
                          <div className="text-stroke1-shadow text-[#FFF549] font-cherryBomb leading-4">
                            {addThousandSeparator(item.coins) || "-"}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="w-[34px] h-[31px] border-[2px] border-[#AF7026] bg-[#FFCF23] rounded-xl flex items-center justify-center font-cherryBomb text-[#F7F9EA]">1</div> */}
                  </div>
                ))
              )}
            </div>
          </div>
          {selectorUser && (
            <div className="rounded-2xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-[58px] h-[58px]">
                  <div className="absolute top-[2px] left-[2px] z-10 rounded-[10px] w-[54px] h-[50px] border-[2px] border-[#FFF5DB]"></div>
                  <div className="absolute z-[5] rounded-[10px] w-[58px] h-[58px] border-[2px] border-[#4B371F] bg-[#947242] p-[4px]">
                    <img
                      src={selectorUser?.avatar}
                      className="w-full h-full object-contain rounded-[10px]"
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <div className="font-cherryBomb leading-4 text-[#F7F9EA] text-stroke1-shadow">
                    @{selectorUser?.username}
                  </div>
                  <div className="flex items-center">
                    <img
                      src="/images/raffle/coin.png"
                      className="w-6 h-6"
                      alt=""
                    />
                    <div className="text-stroke1-shadow text-[#FFF549] font-cherryBomb leading-4">
                      {addThousandSeparator(selectorUser?.coins) || "-"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#FFB050] w-[66px] h-[30px] border-[2px] border-[#4B371F] rounded-2xl flex items-center justify-center relative">
                <img
                  src="/images/raffle/user-reward.png"
                  className="w-[43px] absolute left-[-20px]"
                  alt=""
                />
                <span className="font-cherryBomb text-[16px] text-stroke1-shadow ml-2">
                  -{selectorUser?.spend_ticket}
                </span>
              </div>
            </div>
          )}

          <div className="bg-[url(/images/raffle/button-display-216.png)] bg-cover bg-center h-[58px] w-[219px] absolute top-[-10px] right-[10px] flex items-center pl-4">
            <div className="w-full flex items-center gap-[10px]">
              <img
                src="/images/raffle/coin.png"
                className="w-[33px] h-[33px]"
                alt=""
              />
              <div className="flex flex-col gap-1 mt-[-10px]">
                <div className="text-[#FDD35E] text-stroke1-shadow font-cherryBomb text-[16px] leading-[16px]">
                  {addThousandSeparator(latestData?.coins) || "-"}
                </div>
                <div className="text-[#FFF4C2] text-stroke1-shadow font-cherryBomb text-[16px] leading-[16px]">
                  {latestData?.player || "-"} Players
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RafflePreviousView;
