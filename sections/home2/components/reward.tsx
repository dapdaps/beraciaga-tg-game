import { numberFormatter } from '@/utils/number-formatter';
import { useGlobalUser } from '@/context/UserContext';

const Reward = () => {
  const { userInfo } = useGlobalUser();

  return userInfo?.bind_source === 'okx_invite' && (
    <div className="flex items-center justify-center">
      <div className="mt-[8px] mx-[auto] h-[25px] rounded-[55px] border border-black bg-[#FF79A4] pl-[4px] pr-[2px] flex items-center gap-[10px] justify-between">
        <div className="flex items-center gap-[2px]">
          <div className="w-[18px]">
            <img src="/images/beraciaga/coin.svg" alt="coin" />
          </div>
          <div className="text-[#F7F9EA] text-stroke-1 font-cherryBomb text-[14px]">
            +{numberFormatter(userInfo?.bind_okx_reward_coins, 0, true)}
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[14.4px]">
            <img src="/images/beraciaga/ticket.svg" alt="ticket" />
          </div>
          <div className="text-[#F7F9EA] text-stroke-1 font-cherryBomb text-[14px] pl-[4px] pr-[7px]">
            {numberFormatter(userInfo?.bind_okx_reward_coupons, 2, true, { prefix: '$', round: 0 })}
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
            <circle cx="10.5" cy="10.5" r="10.5" fill="black" fill-opacity="0.3" />
            <path d="M6 9.84211L9.10345 13L15 7" stroke="white" stroke-width="2" stroke-linecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Reward;
