import Back from '@components/Back';
import Card from '@components/Card';
import ItemCard from '@/sections/rank/components/item';
import RankFoot from '@/sections/rank/foot';

const RankView = () => {

  return (
    <div className="bg-black h-full">
      <div className="h-full bg-[linear-gradient(180deg,_#73431F_0%,_#4B1D00_100%)] rounded-[0.625rem]">
        <div className="h-full bg-[url('/images/rank/bg.svg')] bg-repeat">
          <div className="h-full flex flex-col items-stretch bg-[url('/images/rank/title-bg.svg')] bg-no-repeat bg-right-top bg-[13.875rem_auto]">
            <div className="flex items-start gap-[1.3rem] pl-[0.9375rem] pt-[0.9375rem] shrink-0">
              <Back className="!static" />
              <img src="/images/rank/title.png" alt="" className="w-[6.6875rem] h-[3.75rem]" />
            </div>
            <div className="w-full relative p-[0.875rem_0.625rem] h-0 flex-1">
              <img
                src="/images/rank/crown.svg"
                alt=""
                className="w-[10.8125rem] h-[6.75rem] absolute top-[-3.2rem] right-0 z-[1]"
              />
              <Card className="relative h-full overflow-x-hidden overflow-y-auto" innerClassName="pb-[2rem]">
                <div className="flex flex-col gap-[0.625rem] items-stretch">
                  <ItemCard no="1" />
                  <ItemCard no="2" />
                  <ItemCard no="3" />
                  <ItemCard no="4" />
                  <ItemCard no="5" />
                  <ItemCard no="6" />
                  <ItemCard no="7" />
                  <ItemCard no="8" />
                  <ItemCard no="9" />
                  <ItemCard no="10" />
                  <ItemCard no="11" />
                  <ItemCard no="12" />
                </div>
              </Card>
            </div>
            <RankFoot />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankView;
