import { Info, RankNumber } from '@/sections/rank/components/item';

const RankFoot = (props: any) => {
  const {} = props;

  return (
    <div className="relative shrink-0 left-0 bottom-0 w-full p-[1rem_1.25rem] flex justify-between items-center gap-[0.625rem] rounded-t-[1rem] border-[2px] border-[rgba(133,_91,_91,_0.50)] bg-[#F3C672] shadow-[0px_-6px_0px_0px_rgba(0,_0,_0,_0.25)]">
      <img src="/images/rank/your-rank.png" alt="" className="w-[14.0625rem] h-[3.6875rem] absolute left-[0.2rem] top-[-2.2rem]" />
      <div className="shrink-0 w-[3.875rem] h-[3.875rem] rounded-[1rem] border-[2px] border-[#4B371F] bg-[#947242]">
        <div className="shrink-0 w-full h-[3.25rem] rounded-[1rem] border-[2px] border-[#FFF5DB] bg-[#dcb988]">
          <div className="shrink-0 w-full h-full rounded-[1rem] border-[2px] border-[#dcb988] bg-[#edc4ba]">

          </div>
        </div>
      </div>
      <Info
        name="@AmendAAme"
        level="10"
        reward="123123121234"
      />
      <RankNumber>#{20}</RankNumber>
    </div>
  );
};

export default RankFoot;
