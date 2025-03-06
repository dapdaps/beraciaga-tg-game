import { useEffect, useRef, useState, useCallback } from 'react';
import { useAudio } from '@/hooks/useAudio';
import Big from 'big.js';
import { Equipment, useUserStore } from '@/stores/useUserStore';
import { getRandomNumber } from '@/utils/utils';
import { useRingStore } from '@/stores/useRingStore';

// seconds
const coins_duration = 2;

// 限制最大同时显示的金币数量
const MAX_COINS = 5;

// 添加本地调试用的模拟数据
const mockUserData = {
  creat_timestamp: Date.now() - 3600000, // 1小时前创建
  level: 1,
  coins_per_hour: 100,
  mock: true
};


const createNewCoin = (latestAmount: Big.Big, coinsPerSecond: Big.Big) => {
  return {
    id: Math.random(),
    latestAmount,
    amount: Big(coinsPerSecond).times(coins_duration),
    x: getRandomNumber(15, 295),
    y: 0,
  };
};

const mockCalcLatestCoins = () => {
  const coinsPerHour = mockUserData.coins_per_hour;
  const timeElapsed = (Date.now() - mockUserData.creat_timestamp) / 1000; // 秒
  const totalCoins = Big(coinsPerHour).div(3600).times(timeElapsed);
  
  const coinsPerSecond = Big(coinsPerHour).div(3600);
  
  return {
    value: totalCoins,
    coinsPerSecond
  };
};

const calcLatestCoins = (props: { coins_per_hour: number; creat_timestamp: number; userEquipmentCategoryList?: Record<string, Equipment[]>; addSpeed: number; }) => {
  const { coins_per_hour, creat_timestamp, userEquipmentCategoryList, addSpeed } = props;

  const currentTimestamp = new Date().getTime();
  // const currentTimestamp = 1735650107000;
  const currentCoinsPerHour = Big(coins_per_hour);

  const calc = (perH: Big.Big, start: Big.Big | number, end: Big.Big | number) => {
    const coinCountPerSecond = Big(perH).div(Big(60).times(60));
    const diffHours = Big(Big(end).minus(start)).div(Big(1000).times(60).times(60)).toFixed(0, Big.roundDown);
    const lastSeconds = Big(Big(end).minus(start)).mod(Big(1000).times(60).times(60)).div(1000).toFixed(0, Big.roundDown);
    const lastCoins = Big(lastSeconds).times(coinCountPerSecond);

    return {
      value: Big(lastCoins).plus(Big(diffHours).times(perH)),
    };
  };

  const baseResult = calc(currentCoinsPerHour, creat_timestamp, currentTimestamp);

  const results: any = [];
  Object.values(userEquipmentCategoryList ?? {}).forEach((equipments, index) => {
    let validEquipments = equipments.filter((equipment) => Big(equipment.obtained_at).gt(creat_timestamp));
    if (!validEquipments.length) {
      validEquipments = [equipments[equipments.length - 1]];
    } else {
      if (validEquipments.length !== equipments.length) {
        validEquipments = [equipments[equipments.length - 1 - validEquipments.length], ...validEquipments];
      }
    }

    validEquipments.forEach((equipment, idx) => {
      const nextEquipment = validEquipments[idx + 1];
      const currPer = Big(currentCoinsPerHour).times(Big(equipment.bonus_percentage).div(100));
      let startTime = equipment.obtained_at;
      if (Big(equipment.obtained_at).lte(creat_timestamp)) {
        startTime = creat_timestamp;
      }

      let res: any;
      if (nextEquipment) {
        res = calc(currPer, startTime, nextEquipment.obtained_at);
      } else {
        res = calc(currPer, startTime, currentTimestamp);
      }

      results.push(res);
    });

  });

  const total = [baseResult, ...results].map((it: any) => it.value).reduce((a, b) => Big(a).plus(b), Big(0));

  return {
    value: total,
    coinsPerSecond: Big(currentCoinsPerHour).div(Big(60).times(60)).times(Big(1).plus(addSpeed)),
  };
};

export function useCoins(options?: { debug?: boolean }) {
  const debug = options?.debug || false;
  const coinTimer = useRef<any>();
  const {
    addSpeed,
    levels,
    userInfo,
    userEquipmentListLoading,
    userInfoLoading,
    levelsLoading,
    userEquipmentCategoryList,
  } = useUserStore();
  const ringStore = useRingStore();

  const [coins, setCoins] = useState<any[]>([]);
  const [collectedCoins, setCollectedCoins] = useState(0);
  const [latestCoins, setLatestCoins] = useState(Big(0));
  const [currentCoins, setCurrentCoins] = useState(Big(0));
  const TARGET_COINS = 10;

  const { play: playSound } = useAudio({
    src: '/audios/coin.mp3',
    volume: 0.5
  });

  const handleCollected = useCallback((id: number) => {
    setCoins((prevCoins) => prevCoins.filter((coin) => coin.id !== id));
    setCollectedCoins(prev => prev + 1);
    if (ringStore.open) {
      playSound();
    }
    const curr = coins.find((it: any) => it.id === id);
    curr && setCurrentCoins(() => curr.latestAmount);
  }, [coins, ringStore.open, playSound]);

  const progress = (collectedCoins / TARGET_COINS) * 100;

  const handleProgressComplete = () => {
    console.log('Progress complete!');
    setCollectedCoins(0);
  };

  useEffect(() => {
    console.log(debug, 'debugdebugdebugdebugdebug')
    if (!debug) return;
    
    console.log('Running in debug mode with mock data');
    
    const { value: _latestCoins } = mockCalcLatestCoins();
    setLatestCoins(_latestCoins);
    setCurrentCoins(_latestCoins);

    const createInterval = () => {
      if (coins.length >= MAX_COINS) return;

      const { value: _latestCoins, coinsPerSecond } = mockCalcLatestCoins();
      
      setLatestCoins(_latestCoins);
      setCoins((prevCoins: any) => {
        if (prevCoins.length >= MAX_COINS) {
          return prevCoins;
        }
        return [...prevCoins, createNewCoin(_latestCoins, coinsPerSecond)];
      });
    };

    if (coinTimer.current) {
      clearInterval(coinTimer.current);
    }

    coinTimer.current = setInterval(createInterval, coins_duration * 1000);

    createInterval();

    const visibilityEvent = () => {
      const isHidden = document.hidden || document.visibilityState === 'hidden';
      if (coinTimer.current) {
        clearInterval(coinTimer.current);
      }
      
      if (!isHidden) {
        coinTimer.current = setInterval(createInterval, coins_duration * 1000);
        createInterval();
      }
    };
    
    document.addEventListener('visibilitychange', visibilityEvent);

    return () => {
      if (coinTimer.current) {
        clearInterval(coinTimer.current);
      }
      document.removeEventListener('visibilitychange', visibilityEvent);
    };
  }, [debug, coins.length]);

  useEffect(() => {
    if (debug) return; 
    
    if (!userInfo || !userInfo.creat_timestamp || !userInfo.level || userEquipmentListLoading || userInfoLoading || levelsLoading) return;

    const creatTimestamp = userInfo?.creat_timestamp;
    const coinsPerHour = levels?.find((l) => l.level === userInfo?.level)?.coins_per_hour ?? 0;

    const { value: _latestCoins } = calcLatestCoins({
      coins_per_hour: coinsPerHour,
      creat_timestamp: creatTimestamp,
      userEquipmentCategoryList,
      addSpeed,
    });
    setLatestCoins(_latestCoins);
    setCurrentCoins(_latestCoins);

    const createInterval = () => {
      if (coins.length >= MAX_COINS) return;

      const { value: _latestCoins, coinsPerSecond } = calcLatestCoins({
        coins_per_hour: coinsPerHour,
        creat_timestamp: creatTimestamp,
        userEquipmentCategoryList,
        addSpeed,
      });
      
      setLatestCoins(_latestCoins);
      setCoins((prevCoins: any) => {
        if (prevCoins.length >= MAX_COINS) {
          return prevCoins;
        }
        return [...prevCoins, createNewCoin(_latestCoins, coinsPerSecond)];
      });
    };

    if (coinTimer.current) {
      clearInterval(coinTimer.current);
    }

    coinTimer.current = setInterval(createInterval, coins_duration * 1000);

    const visibilityEvent = () => {
      const isHidden = document.hidden || document.visibilityState === 'hidden';
      if (coinTimer.current) {
        clearInterval(coinTimer.current);
      }
      
      if (!isHidden) {
        coinTimer.current = setInterval(createInterval, coins_duration * 1000);
        createInterval();
      }
    };
    
    document.addEventListener('visibilitychange', visibilityEvent);

    return () => {
      if (coinTimer.current) {
        clearInterval(coinTimer.current);
      }
      document.removeEventListener('visibilitychange', visibilityEvent);
    };
  }, [userInfo, userEquipmentListLoading, userInfoLoading, levelsLoading, userEquipmentCategoryList, coins.length, debug]);

  return {
    coins,
    progress,
    handleCollected,
    handleProgressComplete,
    latestCoins,
    currentCoins,
  };
}
