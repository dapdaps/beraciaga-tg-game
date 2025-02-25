import React from 'react';
import clsx from 'clsx';
import Tag from '@/sections/shop/components/tag';
import { numberFormatter } from '@/utils/number-formatter';
import { ProductType } from '@/sections/shop/config';

const Product: React.FC<any> = (props) => {
  const { className, product } = props;

  return (
    <div className="p-[5px] relative">
      <div
        className={clsx('h-[160px] bg-[position:bottom_52px_center] bg-no-repeat rounded-[16px] border-2 border-[#D7C69D] bg-[#FFFAEA] relative flex flex-col items-center', className)}
        style={{
          backgroundImage: `url("${product?.image || '/images/shop/example-product.svg'}")`,
        }}
      >
        {
          product?.type === ProductType.Outfit ? (
            <div className="text-[#FFB254] text-center font-cherryBomb text-stroke-2 text-[15px] font-normal leading-none uppercase pt-[9px]">
              <div className="">
                Clothing
              </div>
              <div className="text-[12px] text-[#F7F9EA] mt-[3px]">
                {product?.name}
              </div>
            </div>
          ) : (
            <div
              className="relative rotate-[-6deg] text-center text-stroke-2 stroke-2 font-cherryBomb text-[24px] font-normal leading-[24px] uppercase"
              style={{
                color: product?.color || '#FF7EC1',
                textShadow: `0px 2px 0px ${product?.shadowColor || '#B42647'}`,
              }}
            >
              {numberFormatter(product?.value, 2, true, { isShort: true, isShortUppercase: true })}
              {
                product?.addPercent && (
                  <div
                    className="text-[#F7F9EA] text-stroke-2 text-[15px] tracking-[1.2px] absolute bottom-[-12px] right-[-12px]"
                    style={{
                      textShadow: 'none',
                      paintOrder: 'fill',
                    }}
                  >
                    {numberFormatter(product?.addPercent, 2, true, { prefix: '+' })}%
                  </div>
                )
              }
            </div>
          )
        }
        <button
          type="button"
          className="absolute left-0 bottom-0 rounded-[14px] border-2 border-[#4B371F] bg-[#FFB050] w-full h-[48px] flex-shrink-0 p-[2px]"
        >
          <div className="flex justify-center items-center flex-col gap-[2px] bg-[url('/images/shop/product-light.svg')] bg-no-repeat bg-[position:-3px_2px] bg-[length:52px_8.5px] rounded-[14px] border-2 border-[#AF7026] bg-[#FFCF23] w-full h-full text-[#F7F9EA] text-center text-stroke-2 stroke-[#4B371F] font-cherryBomb text-[12px] font-normal leading-none tracking-[1px] uppercase">
            {
              product?.type === ProductType.Outfit ? (
                <div className="text-[#F7F9EA] text-center font-cherryBomb text-stroke-2 text-[12px] font-normal leading-none">
                  5 only
                </div>
              ) : (
                <div className="line-through decoration-2 decoration-[#DF4040]">
                  {numberFormatter(product?.regularPrice, 2, true, { prefix: '$' })}
                </div>
              )
            }
            <div className="text-[16px]">
              {numberFormatter(product?.salePrice, 2, true, { prefix: '$' })}
            </div>
            {
              (product?.isHot && !product?.isSoldOut) && (
                <Tag className="!absolute top-[-19px] left-[-11px]" />
              )
            }
          </div>
        </button>
        {
          !!product?.rare && (
            <div className="w-[42px] h-[32px] absolute z-[1] right-[-5px] bottom-[40px]">
              <div className="flex flex-col justify-center items-center w-full h-full text-[#F7F9EA] text-right font-cherryBomb text-stroke-2 text-[12px] font-normal leading-none absolute bg-[url('/images/shop/product-discount-bg.svg')] bg-no-repeat bg-center bg-contain">
                <div className="">Rare</div>
                <div className="text-[#FF8DE3] font-cherryBomb">{product?.rare}%</div>
              </div>
            </div>
          )
        }
      </div>
      {
        product?.isSoldOut && (
          <div className="absolute z-10 left-0 top-0 w-full h-full bg-black bg-opacity-[0.5] rounded-[14px] cursor-not-allowed flex justify-center items-center">
            <div className="w-[110px] h-[27px] absolute bg-[url('/images/shop/sold-out.svg')] bg-no-repeat bg-center bg-contain" />
          </div>
        )
      }
    </div>
  );
};

export default Product;
