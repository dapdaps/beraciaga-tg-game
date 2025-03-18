import Level from '@components/User/Level';
import Name from '@components/User/Name';
import Reward from '@components/User/Reward';
import { numberFormatter } from '@/utils/number-formatter';

const ItemCard = (props: any) => {
  const { rank, avatar, level, username, gem } = props;

  return (
    <div className="border-[2px] border-[#D7C69D] bg-[#FFFAEA] rounded-[1rem] p-[0.625rem] flex justify-between items-center gap-[0.5rem]">
      <div
        className="w-[3.125rem] h-[3.125rem] border-[2px] border-[#8A8A8A] bg-[#C2D2FF] rounded-[0.625rem] shrink-0 bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: `url("${avatar}")`,
        }}
      />
      <Info
        name={`@${username}`}
        level={level}
        reward={gem}
      />
      <RankNumber>{rank}</RankNumber>
    </div>
  );
};

export default ItemCard;

export const RankNumber = (props: any) => {
  const { children, className } = props;

  return (
    <div className={`flex items-center justify-center shrink-0 p-[0.3125rem_0.625rem] rounded-[0.625rem] border-[2px] border-[#AF7026] bg-[#FFCF23] text-[#F7F9EA] font-cherryBomb text-[1rem] font-[400] leading-[100%] text-stroke-2 ${className}`}>
      {children}
    </div>
  );
};

export const Info = (props: any) => {
  const { className, name, level, reward } = props;

  return (
    <div className={`flex flex-col gap-[0.3125rem] flex-1 w-0 ${className}`}>
      <div className="flex items-center gap-[0.3125rem] max-w-full">
        <Name>{name}</Name>
        <Level>{level}</Level>
      </div>
      <Reward>{numberFormatter(reward, 2, true)}</Reward>
    </div>
  );
};
