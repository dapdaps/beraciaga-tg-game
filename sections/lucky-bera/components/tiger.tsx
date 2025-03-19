import { motion, useAnimate } from 'framer-motion';
import { memo } from "react";
import { SPIN_CATEGORIES, SpinMultiplier } from '@/sections/lucky-bera/config';
import LightingButton from '@components/Button/lighting-button';
import { numberFormatter } from '@/utils/number-formatter';

const WHEEL_SIZE = 500;
const WHEEL_DURATION = 20;
const WHEEL_AREA = 120;
const WHEEL_ICON_SIZE = 60;
const SPIN_PROGRESS_BASE = 10; // percent

const progress = 15;

export default memo(function Tiger() {
  const [leftWheel, leftWheelAnimate] = useAnimate();
  const [centerWheel, centerWheelAnimate] = useAnimate();
  const [rightWheel, rightWheelAnimate] = useAnimate();

  const SpinCategories = Object.values(SPIN_CATEGORIES);

  return (
    <div className="flex flex-col items-center justify-center pt-[88px]">
      <div className="relative w-[368px] h-[365px] bg-[url('/images/lucky-bera/bear-top.png')] bg-center bg-contain">
        <div className="absolute w-[266px] left-[52px] top-[18px]">
          <img src="/images/lucky-bera/title.png" alt="title" />
        </div>
        <div className="absolute top-[86px] left-0 right-0 flex flex-col items-center">
          <div className="flex items-center justify-center gap-[4px] w-[231px] h-[34px] bg-[url('/images/lucky-bera/amount-bg.svg')] bg-center bg-contain">
            <div className="w-[22px]">
              <img src="/images/lucky-bera/coin_1.svg" alt="coin_1" className="translate-y-0.5" />
            </div>
            <div className="text-[#FFF4C2] text-stroke-2 text-[24px] font-cherryBomb">8,000</div>
          </div>
          <div className="m-[6px_0_8px] relative pl-[4px] w-[200px] h-[25px] flex items-center  rounded-[10px] border-2 border-[#E49F63] bg-[#582911]">
            <div className="absolute -left-[15px] w-[32px] ">
              <img src="/images/lucky-bera/reward-bee.svg" alt="theme" className="w-[27px]" />
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

            <div className="absolute left-[6px] right-[6px] top-[5px] bottom-[5px] overflow-hidden">
              <motion.div
                ref={leftWheel}
                animate={{
                  rotate: [0, 360],
                  transition: {
                    duration: WHEEL_DURATION,
                    ease: 'linear',
                    repeat: Infinity,
                  }
                }}
                className="absolute left-0 top-1/2 rounded-full"
                style={{
                  y: "-50%",
                  width: WHEEL_SIZE,
                  height: WHEEL_SIZE,
                }}
              >
                {
                  new Array(360 / WHEEL_AREA).fill(null).map((_, index) => SpinCategories.map((item, idx) => (
                    <div
                      key={`${index}-${idx}`}
                      className="absolute left-0 right-0 top-1/2 px-[10px] w-full"
                      style={{
                        transform: "translateY(-50%) rotate(" + (index * WHEEL_AREA + idx * (WHEEL_AREA / SpinCategories.length)) + "deg)",
                        height: WHEEL_ICON_SIZE,
                      }}
                    >
                      <div
                        className=""
                        style={{
                          width: WHEEL_ICON_SIZE,
                        }}
                      >
                        <img src={item.icon} alt="" className="w-full" />
                      </div>
                    </div>
                  )))
                }
              </motion.div>
              <motion.div
                ref={centerWheel}
                className="absolute left-1/2 top-1/2 translate-x-[calc(-50%_+_5px)] -translate-y-1/2 [perspective:1000px]"
                style={{
                  width: WHEEL_SIZE,
                  height: WHEEL_SIZE,
                }}
              >
                <motion.div
                  className="w-full h-full relative [transform-style:preserve-3d]"
                  animate={{
                    transform: [
                      "rotateX(0deg)",
                      "rotateX(360deg)"
                    ],
                    transition: {
                      duration: WHEEL_DURATION,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                  }}
                >
                  {
                    new Array(360 / WHEEL_AREA).fill(null).map((_, index) => SpinCategories.map((item, idx) => (
                      <div
                        key={`${index}-${idx}`}
                        className="absolute rounded-full top-1/2 left-1/2 origin-center opacity-100 -mt-[30px] -ml-[30px] [backface-visibility:hidden]"
                        style={{
                          transform: `rotateX(${index * WHEEL_AREA + idx * (WHEEL_AREA / SpinCategories.length)}deg) translateZ(${WHEEL_SIZE * 0.7 / 2}px)`,
                          width: WHEEL_ICON_SIZE * 0.87,
                          height: WHEEL_ICON_SIZE * 0.87,
                        }}
                      >
                        <img src={item.icon} alt="" className="w-full" />
                      </div>
                    )))
                  }
                </motion.div>
              </motion.div>
              <motion.div
                ref={rightWheel}
                animate={{
                  rotate: [540, 180],
                  transition: {
                    duration: WHEEL_DURATION,
                    ease: 'linear',
                    repeat: Infinity,
                  }
                }}
                className="absolute right-0 top-1/2 rounded-full"
                style={{
                  y: "-50%",
                  width: WHEEL_SIZE,
                  height: WHEEL_SIZE,
                }}
              >
                {
                  new Array(360 / WHEEL_AREA).fill(null).map((_, index) => SpinCategories.map((item, idx) => (
                    <div
                      key={`${index}-${idx}`}
                      className="absolute left-0 right-0 top-1/2 w-full px-[10px]"
                      style={{
                        transform: "translateY(-50%) rotate(" + (index * WHEEL_AREA + idx * (WHEEL_AREA / SpinCategories.length)) + "deg)",
                        height: WHEEL_ICON_SIZE,
                      }}
                    >
                      <div
                        className="-rotate-180"
                        style={{
                          width: WHEEL_ICON_SIZE,
                        }}
                      >
                        <img src={item.icon} alt="" className="w-full" />
                      </div>
                    </div>
                  )))
                }
              </motion.div>
            </div>

            <div className="absolute left-[4.25px] top-[5px] right-[5.11px] bottom-[5px] z-10">
              <img src="/images/lucky-bera/turntable_masker.svg" alt="turntable_masker" />
            </div>
          </div>
        </div>
        <LightingButton
          outerClassName="absolute bottom-[18px] w-[146px] h-[36px] left-1/2 -translate-x-1/2"
          className="flex justify-center items-center gap-[3px]"
        >
          <div className="text-[18px]">
            BET X{numberFormatter(SpinMultiplier.X100, 0, true, { isShort: true, isShortUppercase: true })}
          </div>
          <img src="/images/lucky-bera/icon-flash.png" alt="" className="w-[16px] shrink-0 h-[25px] object-center object-contain bg-no-repeat" />
        </LightingButton>
      </div>
      <div className="relative flex flex-col items-center w-[437px] h-[234px] translate-x-[20px] translate-y-[-20px] bg-[url('/images/lucky-bera/bear-bottom.png')] bg-top bg-contain bg-no-repeat">
        <motion.button
          type="button"
          className="w-[143px] h-[76px] bg-[url('/images/lucky-bera/spin-button.svg')] bg-no-repeat bg-center bg-contain"
          whileTap={{
            scaleY: 0.9,
          }}
          style={{
            transformOrigin: "center bottom",
            x: -20,
            y: 30,
          }}
        />
        <div className="absolute flex pl-[35px] pr-[13px] items-center bottom-[25px] translate-x-[-20px] w-[241px] h-[64px] bg-[url('/images/lucky-bera/honey-progress.svg')] bg-no-repeat bg-center bg-contain">
          <img src="/images/lucky-bera/honey-progress-icon.svg" alt="" className="w-[77px] h-[68px] shrink-0 absolute z-[2] left-[-22px] top-[2px]" />
          <div
            className="h-[24px] relative border-[2px] overflow-hidden border-[#F8C200] bg-[#F8D61F] rounded-[12px] shadow-[0px_4px_0px_0px_rgba(255,255,255,0.50)_inset]"
            style={{
              width: `${SPIN_PROGRESS_BASE + (progress * (100 - SPIN_PROGRESS_BASE) / 100)}%`,
            }}
          >
            <div className="w-full h-full rounded-[8px] bg-[#f8d621] translate-y-[2px]"></div>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-[linear-gradient(180deg,_#926D48_0%,_#221911_100%)] bg-clip-text [-webkit-text-fill-color: transparent] text-[20px] font-cherryBomb text-stroke-1-FFF4C2 font-[400] leading-[100%] text-center">
            12 / 50
          </div>
        </div>
      </div>
    </div>
  )
});
