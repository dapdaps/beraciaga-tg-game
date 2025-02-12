import { UserData } from "@/hooks/useLogin";
import { useTelegram } from "@/hooks/useTelegram";
import { get, post } from "@/utils/http";
import { useEffect, useState } from "react";

export const testData = {
  allows_write_to_pm: true,
  first_name: "gu",
  id: 5514282060,
  language_code: "zh-hans",
  last_name: "jimmy",
  photo_url:
    "https://t.me/i/userpic/320/i2-BRTWcSQoXawvpUSVv78kuH2IMkVBXItH61uWUjHYGATen0Zf2m-qRI1i7HXIr.svg",
  username: "jimmyguu",
};

interface RaffleLatest {
  round: string;
  coins: string;
  player: string;
  start_time: string;
  end_time: number;
  status: "un_start" | "ongoing" | "ended";
}

interface RaffleUserInfo {
  available_ticket: number;
  can_participate: boolean;
  spend_ticket: number;
  total_ticket: number;
}

export const useRaffle = () => {
  const { WebApp, isInitialized } = useTelegram();
  const userData: UserData = WebApp?.initDataUnsafe?.user || testData;
  const [latestLoading, setLatestLoading] = useState(false);
  const [latestData, setLatestData] = useState<RaffleLatest>();
  const [userInfo, setUserInfo] = useState<RaffleUserInfo>();
  const [joinLoading, setJoinLoading] = useState(false);
  const [updater, setUpdater] = useState(0);

  const getRaffleLatest = async () => {
    setLatestLoading(true);
    try {
      const res = await get("/api/raffle/latest");
      if (res.code === 200) {
        setLatestData(res.data as RaffleLatest);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLatestLoading(false);
    }
  };

  const getRaffleUserInfo = async () => {
    if (!latestData) return;
    try {
      const res = await get("/api/raffle/user", {
        round: latestData.round,
        tg_user_id: userData.id,
      });
      if (res.code === 200) {
        setUserInfo(res.data as RaffleUserInfo);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const joinRaffle = async (ticket: number) => {
    if (!latestData) return;
    try {
      setJoinLoading(true);
      const res = await post("/api/raffle/join", {
        round: latestData.round,
        tg_user_id: `${userData.id}`,
        ticket,
      });
      if (res.code === 200) {
        return res.data.success;
      }
    } catch (error) {
      console.log(error, 'joinRaffle - error')
      return false;
    } finally {
      setJoinLoading(false);
    }
  };

  const getRaffleResult = async () => {
    if (!latestData) return;
    try {
      const res = await get("/api/raffle/reward/user", {
        round: latestData.round,
        tg_user_id: userData.id,
      });
      if (res.code === 200) {
        return res.data;
      }
    } catch (error) {
      console.log("error", error);
    }
  }


  useEffect(() => {
    // if (!isInitialized) return;
    getRaffleLatest();
  }, [updater]);

  useEffect(() => {
    if (latestData) {
      getRaffleUserInfo();
    }
  }, [latestData, updater]);

  return {
    latestLoading,
    latestData,
    userInfo,
    joinLoading,
    joinRaffle,
    updater,
    setUpdater,
    getRaffleResult
  };
};
