import { motion, useAnimate } from 'framer-motion';
import { memo, useRef, useState } from 'react';
import { SPIN_CATEGORIES, SpinMultiplier } from '@/sections/lucky-bera/config';
import LightingButton from '@components/Button/lighting-button';
import { numberFormatter } from '@/utils/number-formatter';

const WHEEL_SIZE = 500;
const WHEEL_DURATION = 20;
const WHEEL_AREA = 120;
const WHEEL_ICON_SIZE = 60;
const SPIN_PROGRESS_BASE = 10; // percent

const progress = 15;

const SpinCategories = Object.values(SPIN_CATEGORIES);

export default memo(function Tiger() {
  const [leftWheel, leftWheelAnimate] = useAnimate();
  const [centerWheel, centerWheelAnimate] = useAnimate();
  const [rightWheel, rightWheelAnimate] = useAnimate();
  const progressScope = useRef<any>();

  const createCoin = (x: number, y: number) => {
    const coin = document.createElement('div');
    // Set basic styles for coin element
    coin.style.position = 'fixed';
    coin.style.left = `${x}px`;
    coin.style.top = `${y}px`;
    coin.style.width = '100px';
    coin.style.height = '100px';
    coin.style.backgroundImage = "url('/images/lucky-bera/reward-coin.svg')";
    coin.style.backgroundSize = 'contain';
    coin.style.backgroundRepeat = 'no-repeat';
    coin.style.pointerEvents = 'none';
    coin.style.zIndex = '9999';
    coin.style.transformStyle = 'preserve-3d';
    coin.style.backfaceVisibility = 'visible';
    coin.style.opacity = '0';

    document.body.appendChild(coin);
    return coin;
  };

  const animateCoin = (coin: HTMLDivElement, startX: number, startY: number) => {
    const horizontalDistance = (Math.random() - 0.5) * 400;
    const maxHeight = -(Math.random() * 400 + 300);

    // Movement and rotation animation keyframes
    const moveKeyframes = [
      // Initial position
      {
        transform: 'translate(0, 50px) rotate3d(1, 1, 1, 0deg)',
        offset: 0
      },
      // First rapid ascent phase
      {
        transform: `translate(${horizontalDistance * 0.2}px, ${maxHeight * 0.3}px) rotate3d(1, 1, 1, ${Math.random() * 180}deg)`,
        offset: 0.15
      },
      // Second rapid ascent phase
      {
        transform: `translate(${horizontalDistance * 0.4}px, ${maxHeight * 0.7}px) rotate3d(1, 1, 1, ${Math.random() * 360}deg)`,
        offset: 0.3
      },
      // Peak point
      {
        transform: `translate(${horizontalDistance * 0.6}px, ${maxHeight}px) rotate3d(1, 1, 1, ${Math.random() * 540}deg)`,
        offset: 0.4
      },
      // Start slow descent
      {
        transform: `translate(${horizontalDistance * 0.8}px, ${maxHeight * 0.6}px) rotate3d(1, 1, 1, ${Math.random() * 720}deg)`,
        offset: 0.7
      },
      // Accelerated descent
      {
        transform: `translate(${horizontalDistance}px, ${Math.abs(maxHeight * 0.5)}px) rotate3d(1, 1, 1, ${Math.random() * 1080}deg)`,
        offset: 1
      }
    ];

    // Opacity animation keyframes
    const opacityKeyframes = [
      { opacity: 0, offset: 0 },     // Initially invisible
      { opacity: 1, offset: 0.1 },  // Brief invisibility period
      { opacity: 1, offset: 0.2 },  // Quick fade in
      { opacity: 0, offset: 0.8 },   // Maintain visibility
      { opacity: 0, offset: 1 }      // Fade out
    ];

    // Create animations with adjusted duration
    const moveAnimation = coin.animate(moveKeyframes, {
      duration: 4000,
      easing: 'cubic-bezier(0.2, 1, 0.3, 1)', // Adjusted easing for smoother motion
      fill: 'forwards'
    });

    const opacityAnimation = coin.animate(opacityKeyframes, {
      duration: 3000, // Match movement animation duration
      easing: 'linear',
      fill: 'forwards'
    });

    // Cleanup function to remove element when animations complete
    const removeElement = () => {
      if (moveAnimation.playState === 'finished' && opacityAnimation.playState === 'finished') {
        coin.remove();
      }
    };

    moveAnimation.onfinish = removeElement;
    opacityAnimation.onfinish = removeElement;
  };

  const createCoinsExplosion = (centerX: number, centerY: number) => {
    const numberOfCoins = 15;
    const delayBetweenCoins = 100; // Delay between each coin's animation

    // Create multiple waves of coins with different delays and parameters
    const createWave = (delay: number, count: number) => {
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const coin = createCoin(centerX, centerY);
          animateCoin(coin, centerX, centerY);
        }, i * delayBetweenCoins + delay);
      }
    };

    // Create waves with adjusted intervals
    createWave(0, numberOfCoins);      // First wave
    createWave(120, numberOfCoins);    // Second wave with delay
    createWave(240, numberOfCoins);    // Third wave with delay
  };

  const handleSpin = () => {
    // Find and validate spin button
    const button = document.querySelector('.spin-button');
    if (!button) return;

    // Calculate center position for coin explosion
    const rect = button.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    createCoinsExplosion(startX, startY);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pt-[88px]">
      <div className="relative w-[368px] h-[365px] max-w-full bg-[url('/images/lucky-bera/bear-top.png')] bg-center bg-contain">
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
          <div
            ref={progressScope}
            className="m-[6px_0_8px] relative pl-[4px] w-[200px] h-[25px] flex items-center  rounded-[10px] border-2 border-[#E49F63] bg-[#582911]"
          >
            <div className="absolute -left-[15px] w-[32px] ">
              <img src="/images/lucky-bera/reward-bee.svg" alt="theme" className="w-[27px]" />
            </div>
            <div
              className="h-[18px] rounded-[6px] border-2 border-[#F8C200] bg-[#FFE380] shadow-[0px_4px_0px_0px_rgba(255, 255, 255, 0.50)_inset]"
              style={{
                width: "50%"
              }}
            />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-cherryBomb text-[12px] text-stroke-1-FFF4C2 bg-gradient-to-b from-[#926D48] to-[#221911] bg-clip-text text-transparent [-webkit-text-fill-color: transparent]">
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
      <div className="relative flex justify-center w-full h-[216px] translate-y-[-5px] overflow-hidden">
        <img src="/images/lucky-bera/bear-bottom-coins-left.svg" alt="" className="absolute translate-x-[-140px] z-[1]" />
        <img src="/images/lucky-bera/bear-bottom-coins-right.svg" alt="" className="absolute translate-x-[160px] z-[1]" />
        <div className="relative z-[2] flex flex-col items-center w-[338px] max-w-full h-full bg-[url('/images/lucky-bera/bear-bottom.png')] bg-top bg-contain bg-no-repeat">
          <motion.button
            type="button"
            className="spin-button w-[143px] h-[76px] bg-[url('/images/lucky-bera/spin-button.svg')] bg-no-repeat bg-center bg-contain"
            whileTap={{
              scaleY: 0.9,
            }}
            style={{
              transformOrigin: "center bottom",
              y: 15,
            }}
            onClick={handleSpin}
          />
          <div className="absolute flex pl-[35px] pr-[13px] items-center bottom-[25px] w-[241px] h-[64px] bg-[url('/images/lucky-bera/honey-progress.svg')] bg-no-repeat bg-center bg-contain">
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
    </div>
  )
});
