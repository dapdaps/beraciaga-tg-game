import { motion } from 'framer-motion';
import { memo } from "react";
export default memo(function tiger() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[368px] h-[365px] bg-[url('/images/lucky-bera/bear-top.png')] bg-center bg-contain">
        <div className="absolute w-[266px] left-[52px] top-[18px]">
          <img src="/images/lucky-bera/title.png" alt="title" />
        </div>
        <div className="absolute top-[86px] left-0 right-0 flex flex-col items-center">
          <div className="flex items-center justify-center gap-[4px] w-[231px] h-[34px] bg-[url('/images/lucky-bera/amount-bg.svg')] bg-center bg-contain">
            <div className="w-[22px]">
              <img src="/images/lucky-bera/coin_1.svg" alt="coin_1" />
            </div>
            <div className="text-[#FFF4C2] text-stroke-2 text-[24px] font-cherryBomb">8,000</div>
          </div>
          <div className="m-[6px_0_8px] relative pl-[4px] w-[200px] h-[25px] flex items-center  rounded-[10px] border-2 border-[#E49F63] bg-[#582911]">
            <div className="absolute -left-[22px] w-[32px] ">
              <img src="/images/lucky-bera/theme.svg" alt="theme" />
            </div>
            <div className="w-[130px] h-[18px] rounded-[6px] border-2 border-[#F8C200] bg-[#FFE380] shadow-[0px_4px_0px_0px_rgba(255, 255, 255, 0.50)_inset]" />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-cherryBomb text-[12px] text-stroke-1-FFF4C2 bg-gradient-to-b from-[#926D48] to-[#221911] bg-clip-text text-transparent">
              12,250 / 20,000
            </div>

            <div className="absolute -right-[9.4px] -top-[1.55px]">
              <div className="w-[26px]">
                <img src="/images/lucky-bera/coin_2.svg" alt="coin_2" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-[4px] font-cherryBomb text-[16px] text-[#FFE7A5] [text-shadow:0_2px_0_rgba(0,0,0,0.5)] [-webkit-text-stroke:1px_#4B371F] leading-none">100K</div>
            </div>
          </div>

          <div className="relative flex items-center w-[266px] h-[141px] bg-[url('/images/lucky-bera/turntable_bg.svg')] bg-center bg-contain bg-no-repeat">
            <div className="absolute -] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[42px]">
              <img src="/images/lucky-bera/pointer.svg" alt="pointer" />
            </div>
            <div className="absolute rotate-180 -right-[2px] top-1/2 translate-x-1/2 -translate-y-1/2 w-[42px]">
              <img src="/images/lucky-bera/pointer.svg" alt="pointer" />
            </div>

            <div className='absolute left-[6px] right-[6px] top-[5px] bottom-[5px] overflow-hidden'>
              <motion.div animate={{
                transform: [
                  "translate3d(0, -50%, 0) rotate(0deg)", "translate3d(0, -50%, 0) rotate(360deg)"
                ],
                transition: {
                  duration: 2,
                  ease: 'linear',
                  repeat: Infinity,
                }

              }} className="absolute left-0 top-1/2 w-[400px] h-[400px] rounded-full">
                {
                  new Array(15).fill(null).map((_, index) => (
                    <div className="absolute left-0 right-0 top-1/2 h-[60px] px-[10px]" style={{ transform: "translateY(-50%) rotate(" + (index * 24) + "deg)" }} key={index}>
                      <div className="w-[60px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="62" height="61" viewBox="0 0 62 61" fill="none">
                          <path d="M47.9386 26.562C50.7966 39.5385 43.7015 51.9277 32.3698 54.4235C21.0382 56.9192 9.39472 48.657 6.53674 35.6805C3.67875 22.704 10.7738 10.3147 22.1055 7.81896C33.4372 5.32324 45.0806 13.5855 47.9386 26.562Z" fill="#CF7200" stroke="#4B371F" stroke-width="2" />
                          <path d="M55.0417 24.7856C57.8996 37.7621 50.8046 50.1514 39.4729 52.6471C28.1412 55.1428 16.4977 46.8806 13.6398 33.9041C10.7818 20.9276 17.8769 8.53832 29.2085 6.0426C40.5402 3.54687 52.1837 11.8091 55.0417 24.7856Z" fill="#FFF549" stroke="#4B371F" stroke-width="2" />
                          <path d="M48.7136 26.18C50.7095 35.2424 45.7487 43.8346 37.9118 45.5606C30.0749 47.2866 21.9634 41.5735 19.9675 32.5112C17.9716 23.4489 22.9324 14.8566 30.7693 13.1306C38.6062 11.4046 46.7177 17.1177 48.7136 26.18Z" fill="#FFCF23" stroke="#AF7026" stroke-width="2" />
                          <path d="M26.8785 27.5765L26.0657 28.159C25.6542 27.5848 25.3494 26.9294 25.168 26.2373C24.9867 25.5451 24.9311 24.8248 25.0086 24.1231C25.086 23.4215 25.2958 22.7473 25.6345 22.1504C25.9735 21.5528 26.4354 21.0445 26.9976 20.6732C27.5609 20.3011 28.2025 20.0818 28.8745 20.0343C29.5456 19.9869 30.2172 20.1129 30.8418 20.389C31.2409 20.5654 31.6147 20.8002 31.9551 21.083C32.4336 20.8945 32.9307 20.7613 33.4393 20.6853C33.637 20.1493 33.9228 19.6554 34.2916 19.2319C34.8229 18.622 35.506 18.183 36.2787 17.9765L26.8785 27.5765ZM26.8785 27.5765L26.0657 28.159C26.3593 28.5687 26.7048 28.9334 27.092 29.238C27.1147 30.5006 27.3641 31.7664 27.8246 32.9555C28.3523 34.3182 29.1461 35.5505 30.1471 36.5447C31.1482 37.5391 32.3341 38.2724 33.6126 38.6642C34.8931 39.0566 36.2237 39.0925 37.4854 38.7544C38.7471 38.4164 39.8814 37.72 40.7942 36.7399C41.7056 35.7614 42.3659 34.5333 42.7357 33.1716C43.1055 31.8101 43.1767 30.346 42.9524 28.902C42.7567 27.642 42.3397 26.4211 41.7282 25.3164C42.0161 24.5973 42.1391 23.8037 42.0967 23.0049C42.0434 22.002 41.731 21.0147 41.1968 20.1696C40.6629 19.3248 39.9196 18.6427 39.0454 18.239C38.1676 17.8336 37.1996 17.73 36.2794 17.9763M26.8785 27.5765L36.2794 17.9763M36.2794 17.9763C36.2793 17.9763 36.2791 17.9764 36.279 17.9764L36.2794 17.9763Z" fill="#FFF549" stroke="#AF7026" stroke-width="2" />
                          <path d="M17.8454 29.8486C17.8458 27.0316 17.8456 15.7668 26.2938 12.9505" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </div>
                    </div>
                  ))
                }
              </motion.div>


              <motion.div animate={{
                transform: [
                  "translate3d(0, -50%, 0) rotate(360deg)", "translate3d(0, -50%, 0) rotate(0)"
                ],
                transition: {
                  duration: 2,
                  ease: 'linear',
                  repeat: Infinity,
                }

              }} className="absolute right-0 top-1/2 w-[400px] h-[400px] rounded-full">
                {
                  new Array(15).fill(null).map((_, index) => (
                    <div className="absolute left-0 right-0 top-1/2 h-[60px] px-[10px]" style={{ transform: "translateY(-50%) rotate(" + (index * 24) + "deg)" }} key={index}>
                      <div className="w-[60px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="62" height="61" viewBox="0 0 62 61" fill="none">
                          <path d="M47.9386 26.562C50.7966 39.5385 43.7015 51.9277 32.3698 54.4235C21.0382 56.9192 9.39472 48.657 6.53674 35.6805C3.67875 22.704 10.7738 10.3147 22.1055 7.81896C33.4372 5.32324 45.0806 13.5855 47.9386 26.562Z" fill="#CF7200" stroke="#4B371F" stroke-width="2" />
                          <path d="M55.0417 24.7856C57.8996 37.7621 50.8046 50.1514 39.4729 52.6471C28.1412 55.1428 16.4977 46.8806 13.6398 33.9041C10.7818 20.9276 17.8769 8.53832 29.2085 6.0426C40.5402 3.54687 52.1837 11.8091 55.0417 24.7856Z" fill="#FFF549" stroke="#4B371F" stroke-width="2" />
                          <path d="M48.7136 26.18C50.7095 35.2424 45.7487 43.8346 37.9118 45.5606C30.0749 47.2866 21.9634 41.5735 19.9675 32.5112C17.9716 23.4489 22.9324 14.8566 30.7693 13.1306C38.6062 11.4046 46.7177 17.1177 48.7136 26.18Z" fill="#FFCF23" stroke="#AF7026" stroke-width="2" />
                          <path d="M26.8785 27.5765L26.0657 28.159C25.6542 27.5848 25.3494 26.9294 25.168 26.2373C24.9867 25.5451 24.9311 24.8248 25.0086 24.1231C25.086 23.4215 25.2958 22.7473 25.6345 22.1504C25.9735 21.5528 26.4354 21.0445 26.9976 20.6732C27.5609 20.3011 28.2025 20.0818 28.8745 20.0343C29.5456 19.9869 30.2172 20.1129 30.8418 20.389C31.2409 20.5654 31.6147 20.8002 31.9551 21.083C32.4336 20.8945 32.9307 20.7613 33.4393 20.6853C33.637 20.1493 33.9228 19.6554 34.2916 19.2319C34.8229 18.622 35.506 18.183 36.2787 17.9765L26.8785 27.5765ZM26.8785 27.5765L26.0657 28.159C26.3593 28.5687 26.7048 28.9334 27.092 29.238C27.1147 30.5006 27.3641 31.7664 27.8246 32.9555C28.3523 34.3182 29.1461 35.5505 30.1471 36.5447C31.1482 37.5391 32.3341 38.2724 33.6126 38.6642C34.8931 39.0566 36.2237 39.0925 37.4854 38.7544C38.7471 38.4164 39.8814 37.72 40.7942 36.7399C41.7056 35.7614 42.3659 34.5333 42.7357 33.1716C43.1055 31.8101 43.1767 30.346 42.9524 28.902C42.7567 27.642 42.3397 26.4211 41.7282 25.3164C42.0161 24.5973 42.1391 23.8037 42.0967 23.0049C42.0434 22.002 41.731 21.0147 41.1968 20.1696C40.6629 19.3248 39.9196 18.6427 39.0454 18.239C38.1676 17.8336 37.1996 17.73 36.2794 17.9763M26.8785 27.5765L36.2794 17.9763M36.2794 17.9763C36.2793 17.9763 36.2791 17.9764 36.279 17.9764L36.2794 17.9763Z" fill="#FFF549" stroke="#AF7026" stroke-width="2" />
                          <path d="M17.8454 29.8486C17.8458 27.0316 17.8456 15.7668 26.2938 12.9505" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </div>
                    </div>
                  ))
                }
              </motion.div>
            </div>


            <div className="absolute left-[4.25px] top-[5px] right-[5.11px] bottom-[5px] z-10">
              <img src="/images/lucky-bera/turntable_masker.svg" alt="turntable_masker" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
