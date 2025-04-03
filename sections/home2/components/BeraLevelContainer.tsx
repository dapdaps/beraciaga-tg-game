import { BaseButton } from "@/components/Button";
import clsx from "clsx";
import { useContext } from "react";
import { Level } from "@/stores/useUserStore";
import { numberFormatter } from "@/utils/number-formatter";
import Big from "big.js";
import { useGlobalUser } from "@/context/UserContext";
import { postUpgrade } from "@/apis/look";
import useToast from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const LevelContainer = ({
  children,
  className,
  level = 1
}: {
  children: React.ReactNode;
  className?: string;
  level?: number;
}) => {
  return (
    <div className={clsx("relative w-[367px] h-[74px]", className)}>
      <svg
        className="absolute top-0 left-0 w-full h-full"
        width="367"
        height="74"
        viewBox="0 0 367 74"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M366 30.5V58C366 66.2843 359.284 73 351 73H16C7.71573 73 1 66.2843 1 58V16C1 7.71573 7.71573 1 16 1H80.5355C84.6996 1 88.6763 2.73101 91.5139 5.77872L95.5223 10.0841C98.7382 13.5382 103.245 15.5 107.965 15.5H351C359.284 15.5 366 22.2157 366 30.5Z"
          fill={LevelBackgroundMappings[level].background}
          stroke="#4B371F"
          stroke-width="2"
        />
        <path
          d="M8.5 13C8.5 11 10 7 16 7C22 7 30.5 7 34 7M8.5 19.5V23"
          stroke="white"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
      <div className="relative z-10 mt-3">{children}</div>
    </div>
  );
};

const ProgressBar = ({ current, total, className = "", level = 1 }: { current: number; total: number; className?: string; level?: number }) => {
  const totalSegments = 7;
  
  const isMax = Big(current || 0).gte(total || 1);

  const ratio = Big(current || 0).div(total || 1);


  const progress = isMax 
    ? totalSegments 
    : (ratio.gt(0) && ratio.lt(Big(1).div(totalSegments))
      ? 1 
      : Math.min(ratio.times(totalSegments).toNumber(), totalSegments));

  const segments = Array(totalSegments).fill(0);

  return (
    <div
      className={clsx(
        "flex items-center gap-1 p-1 rounded-lg border-2 w-fit",
        LevelBackgroundMappings[level].progress.background,
        LevelBackgroundMappings[level].progress.stroke,
        className
      )}
    >
      {segments.map((_, index) => (
        <div
          key={index}
          className={`w-[30px] h-[14px] rounded-md flex-shrink-0 ${
            index <= progress
              ? `border-2 ${LevelBackgroundMappings[level].progress.barBorder} ${LevelBackgroundMappings[level].progress.barBg} shadow-[inset_0px_4px_0px_0px_rgba(255,255,255,0.50)]`
              : `${LevelBackgroundMappings[level].progress.defaultBg}`
          }`}
        />
      ))}
    </div>
  );
};

const BeraLevelContainer = () => {
  const {
    levels,
    userInfo,
    currentCoins,
    WebApp
  } = useGlobalUser();
  
  const router = useRouter();
  const toast = useToast();

  if (!userInfo) return null;

  const updateLevelData = levels.find((level: any) => level.level === userInfo.level) as Level;

  const canUpgrade = Big(currentCoins || 0).gte(updateLevelData?.upgrade_coins || 0);

  const handleUpdate = async () => {
    toast.dismiss();
    if (canUpgrade) {
      try {
        const data = await postUpgrade(WebApp.initData)
        if (data.code === 200) {
          toast.success({
            title: 'Bera Upgrade success!'
          });
        }
      } catch (error) {
        console.log('handleUpdate', error);
      }
    } else {
      router.push('/shop');
    }
  }

  return (
    <LevelContainer level={userInfo?.level} className="mx-auto pt-[0.5px]">
      <div className="flex items-center justify-between px-3 w-[260px] pl-4">
        <span className="font-cherryBomb text-[26px] leading-[26px] text-stroke-2 text-white">
          Lv.{userInfo?.level || 1}
        </span>
        <span className="text-white font-cherryBomb text-[14px] leading-[14px] self-end">
          {numberFormatter(currentCoins, Big(currentCoins || 0).gt(1e9) ? 6 : 3, true, { isShort: Big(currentCoins || 0).gt(1e9), isShortUppercase: true })} / {numberFormatter(updateLevelData?.upgrade_coins || 0, Big(updateLevelData.upgrade_coins || 0).gt(1e9) ? 6 : 3, true, { isShort: Big(updateLevelData.upgrade_coins || 0).gt(1e9), isShortUppercase: true })}
        </span>
      </div>
      <div className="px-3 w-[260px] pl-4 mt-1">
        <ProgressBar 
          current={currentCoins} 
          total={updateLevelData?.upgrade_coins || 0}
          level={userInfo?.level}
        />
      </div>
      <div className="absolute right-0 top-0">
        <BaseButton onClick={handleUpdate}>
          <div className="flex flex-col items-center">
            <div className="font-cherryBomb text-white text-stroke-2 leading-[16px] text-[16px]">
            {numberFormatter(updateLevelData?.upgrade_coins || 0, Big(updateLevelData?.upgrade_coins || 0).gt(1e9) ? 6 : 3, true, { isShort: Big(updateLevelData?.upgrade_coins || 0).gt(1e9), isShortUppercase: true })}
            </div>
            <div className="font-cherryBomb text-white text-stroke-2 leading-[16px] text-[16px]">
              update
            </div>
          </div>
        </BaseButton>
      </div>
      {/* <OutOfGoldModal visible={true}/> */}
    </LevelContainer>
  );
};

export default BeraLevelContainer;

const LevelBackgroundMappings: any = {
  1: {
    background: "#FFB050",
    progress: {
      stroke: "border-[#E49F63]",
      background: "bg-[#916830]",
      barBg: "bg-[#FFE380]",
      barBorder: "border-[#F8C200]",
      defaultBg: "bg-[#B28A53]",
    },
  },
  2: {
    background: "#7ADEC4",
    progress: {
      stroke: "border-[#6DEFCD]",
      background: "bg-[#34AD8E]",
      barBg: "bg-[#5EFFD5]",
      barBorder: "border-[#4BD3AF]",
      defaultBg: "bg-[#82D5BF]",
    },
  },
  3: {
    background: "#F9887A",
    progress: {
      stroke: "border-[#F7A3A8]",
      background: "bg-[#C0545B]",
      barBg: "bg-[#FFB2A7]",
      barBorder: "border-[#E95F4E]",
      defaultBg: "bg-[#EC7279]",
    },
  },
  4: {
    background: "#C69ED3",
    progress: {
      stroke: "border-[#DEA2F1]",
      background: "bg-[#8C4BA1]",
      barBg: "bg-[#D89AFF]",
      barBorder: "border-[#B944DF]",
      defaultBg: "bg-[#BF88D1]",
    },
  },
  5: {
    background: "#C4E29B",
    progress: {
      stroke: "border-[#C2E88F]",
      background: "bg-[#8DAB64]",
      barBg: "bg-[#C0FE6B]",
      barBorder: "border-[#A7C979]",
      defaultBg: "bg-[#B4D786]",
    },
  },
  6: {
    background: "#ED7E92",
    progress: {
      stroke: "border-[#F7869A]",
      background: "bg-[#C3445B]",
      barBg: "bg-[#F46881]",
      barBorder: "border-[#FF8DA1]",
      defaultBg: "bg-[#F48B9E]",
    },
  }
};
