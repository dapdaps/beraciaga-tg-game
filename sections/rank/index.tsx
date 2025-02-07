import Back from '@components/Back';

const RankView = () => {

  return (
    <div className="bg-black h-full">
      <div className="h-full bg-[linear-gradient(180deg,_#73431F_0%,_#4B1D00_100%)] rounded-[10px]">
        <div className="h-full bg-[url('/images/rank/bg.svg')] bg-repeat">
          <div className="h-full bg-[url('/images/rank/title-bg.svg')] bg-no-repeat bg-right-top bg-[13.875rem_auto]">
            <div className="flex items-start gap-[1.3rem] pl-[0.9375rem] pt-[0.9375rem]">
              <Back className="!static" />
              <img src="/images/rank/title.png" alt="" className="w-[6.6875rem] h-[3.75rem]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankView;
