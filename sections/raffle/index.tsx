const RaffleViews = () => {
    return (
        <div className="bg-[url('/images/raffle/raffle-bg.png')] bg-cover bg-center h-screen flex flex-col items-center">
            <div className="mt-4 w-full px-3 flex items-center justify-between">
                <img src="/images/raffle/back.png" className="w-[42px] object-contain" alt="" />
                <div className="font-cherryBomb text-stroke-2 text-white bg-[#FFB050] rounded-xl border-[2px] border-[#4B371F] w-[92px] h-[36px] flex items-center justify-center">Previous</div>
            </div>
            <div className="w-full mt-[-50px] bg-[url(/images/raffle/header-frame.png)] bg-cover bg-center h-[277px] flex flex-col items-center justify-center">
                <div className="text-[#FFDF77] font-cherryBomb text-stroke-3 text-[26px] leading-[26px] -mt-5">RAFFLES</div>
                <div className="text-[#F6AD0F] font-cherryBomb text-stroke-3 text-[26px] leading-[26px]">Round 2</div>
            </div>
            <div className="flex items-center gap-2 mx-auto mt-[-60px]">
                <img src="/images/raffle/timer.png" className="w-[32px]" alt="" />
                <div className="text-[#FDD35E] font-cherryBomb text-stroke-2 text-[18px]">2 Days 05 : 42 : 02</div>
            </div>
            <div className="bg-[url(/images/raffle/section-bg.png)] bg-cover bg-center h-[349px] w-[369px] mt-[46px] mx-auto relative flex flex-col items-center">
                <div className="bg-[url(/images/raffle/button-display-270.png)] bg-cover bg-center h-[75px] w-[270px] absolute top-[-30px] left-[1/2] translate-x-[1/2] flex items-center pl-4">
                    <div className="w-full flex items-center gap-3">
                        <img src="/images/raffle/coin.png" className="w-[46px] h-[46px]" alt="" />
                        <div className="flex flex-col gap-2">
                            <div className="text-[#FDD35E] text-stroke-2 font-cherryBomb text-[20px] leading-[20px]">10,000,000,000</div>
                            <div className="text-[#FFF4C2] text-stroke-2 font-cherryBomb text-[16px] leading-[16px]">100 Players</div>
                        </div>
                    </div>
                </div>
                <div className="mt-[60px] w-[205px] h-[58px] border-[2px] border-[#4B371F] bg-[#FFB050] flex flex-col items-center justify-center relative rounded-2xl">
                    <div className="font-cherryBomb text-base leading-[16px] text-[#F7F9EA] text-stroke-2 ml-[-4px]">Your have</div>
                    <div className="font-cherryBomb text-[20px] leading-[20px] text-[#F7F9EA] text-stroke-2">10 Tickets</div>
                    <img src="/images/raffle/raffle-logo.png" className="w-[98px] absolute top-[-10px] left-[-40px]" alt="" />
                    <img src="/images/raffle/info.png" className="w-[26px] h-[26px] absolute right-[-7px] top-[-4px]" alt="" />
                </div>
                <div className="font-cherryBomb text-stroke-2 text-[#F7F9EA] w-full text-center my-[14px]">Your will spend</div>
                <div className="flex mx-auto items-center gap-[22px]">
                    <img src="/images/raffle/mins.png" className="w-[44px] h-[44px]" alt="" />
                    <input type="text" className="text-[26px] font-cherryBomb text-black text-center w-[116px] h-[45px] bg-[#FFFAEA] border-[2px] rounded-2xl border-[#D7C69D] outline-none" />
                    <img src="/images/raffle/plus.png" className="w-[44px] h-[44px]" alt="" />
                </div>
            </div>
        </div>
    );
}

export default RaffleViews;





