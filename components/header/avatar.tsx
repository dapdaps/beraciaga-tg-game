import React from 'react';
import clsx from 'clsx';
import BearDressup from '@/components/BearDressup';

const HeaderAvatar: React.FC<any> = (props) => {
  const { className, isLevel = true, size = 54, bgColor = '#ECC4BA' } = props;

  const level = 1;

  return (
    <div
      className={clsx("relative rounded-[16px] border-[2px] border-[#4B371F] bg-[#947242] p-[0_0_5px]", className)}
      style={{
        width: size,
        height: size,
      }}
    >
      <div className="w-full h-full rounded-[14px] border-[2px] border-[#FFF5DB] bg-[#dcb988] p-[2px]">
        <div
          className="w-full h-full rounded-[12px] flex justify-center items-center"
          style={{
            backgroundColor: bgColor,
          }}
        >
          <BearDressup
            className=""
            style={{
              transform: `scale(${0.72 * size / 340}) translateX(${(0.074 * size) / (0.72 * size / 340)}px)`,
            }}
          />
        </div>
      </div>
      {
        isLevel && (
          <div className="bg-[url(/images/home/medal.png)] bg-contain bg-no-repeat w-[30px] h-[30px] absolute right-[-15px] top-[-4px] flex items-center justify-center font-cherryBomb text-[14px] text-stroke-1 text-white pb-1">
            {level}
          </div>
        )
      }
    </div>
  );
};

export default HeaderAvatar;
