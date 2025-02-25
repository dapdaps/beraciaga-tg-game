import React from 'react';
import clsx from 'clsx';

interface ProductCardTitleProps {
  className?: string;
  innerClassName?: string;
  children?: React.ReactNode;
  icon?: string;
  iconX?: number;
  iconY?: number;
}

const ProductCardTitle: React.FC<ProductCardTitleProps> = ({ icon, className, children, innerClassName, iconY, iconX }) => {
  return (
    <div className={clsx("h-[56px] absolute top-[-28px] rotate-[-5deg] left-1/2 -translate-x-1/2 flex justify-center items-center text-[#F7F9EA] text-center text-stroke-2 font-cherryBomb text-[26px] font-normal leading-none uppercase", className)}>
      <div className="w-[52px] translate-x-[2px] h-full shrink-0 bg-[url('/images/shop/card-title-bg-left.svg')] bg-no-repeat bg-right bg-contain" />
      <div className="flex-1 pt-[16px] h-full scale-y-[0.985]">
        <div className={clsx("w-full h-full border-[2px] pl-[2px] pr-[10px] border-[#4B371F] border-l-0 border-r-0 bg-[#FFB050] flex justify-center items-center", innerClassName)}>
          {children}
        </div>
      </div>
      <div className="w-[14px] translate-x-[-2px] h-full shrink-0 bg-[url('/images/shop/card-title-bg-right.svg')] bg-no-repeat bg-left bg-contain" />
      {
        !!icon && (
          <img
            src={icon}
            alt=""
            className="absolute"
            style={{
              right: iconX,
              bottom: iconY,
            }}
          />
        )
      }
    </div>
  );
};

export default ProductCardTitle;