import FlagModal from '@components/flag-modal';
import LightingButton from '@components/Button/lighting-button';
import { useRouter } from 'next/navigation';
import { numberFormatter } from '@/utils/number-formatter';
import Loading from '@components/Loading';
import { ShopItem, useShop } from '@/sections/shop/hooks';
import { useMemo } from 'react';
import { ProductType } from '@/sections/shop/config';

const OutOfHoney = (props: any) => {
  const { visible, onClose } = props;

  const router = useRouter();
  const { listByCategory, buying, handleProductPay } = useShop();

  const recommendProduct = useMemo<ShopItem | null>(() => {
    const honeyProducts = listByCategory[ProductType.Spins];
    if (!honeyProducts?.length) return null;
    const recommend = honeyProducts.find((p) => p.recommend);
    return recommend || honeyProducts[0];
  }, [listByCategory]);

  if (!recommendProduct) return null;

  return (
    <FlagModal
      visible={visible}
      onClose={onClose}
      contentClassName="!h-[320px]"
      footer={(
        <LightingButton
          className=""
          onClick={() => {
            onClose?.();
            router.push("/shop?from=lucky-bera");
          }}
        >
          More
        </LightingButton>
      )}
    >
      <div className="flex flex-col items-center h-full w-full">
        <img src="/images/shop/out-of-honey.png" alt="" className="w-[233px] h-[39px] object-contain object-center shrink-0" />
        <div className="flex flex-col items-center flex-1 w-full relative mt-[10px]">
          <div className="relative p-[6px_6px_0_6px] flex justify-center items-center rounded-[20px] w-full h-[193px] shrink-0 border-[2px] border-[#634624] bg-[linear-gradient(180deg,_#FFB2DA_0%,_#F648A2_100%)] shadow-[8px_8px_0px_0px_rgba(0,_0,_0,_0.20)_inset] text-[#FFB7DC] text-[36px] text-stroke-2-4B371F font-cherryBomb uppercase font-[400]">
            <div className="w-full h-full flex justify-center items-center bg-[url('/images/lucky-bera/buy-bg.svg')] bg-no-repeat bg-center bg-contain">
              <img
                src={recommendProduct?.logo}
                alt=""
                className="w-[126px] object-contain object-center shrink-0"
              />
              <div
                className="absolute bottom-[50px] left-[50px] rotate-[-6deg]"
                style={{
                  color: recommendProduct?.color || '#FF7EC1',
                  textShadow: `0px 4px 0px ${recommendProduct?.shadowColor || '#B42647'}`,
                }}
              >
                {recommendProduct?.name}
              </div>
            </div>
          </div>
        </div>
        <LightingButton
          disabled={buying}
          outerClassName="!w-full shrink-0 !h-[57px] mb-[5px] shadow-[-1px_4px_0px_0px_#4B371F]"
          onClick={() => {
            if (!recommendProduct) return;
            handleProductPay(recommendProduct);
          }}
        >
          {
            buying && (
              <Loading size={14} />
            )
          }
          <div className="flex flex-col items-center justify-center gap-[5px] leading-[1]">
            <div className="text-[10px] text-stroke-1 line-through decoration-red-500">
              {numberFormatter(recommendProduct?.original_price, 2, true, { prefix: '$' })}
            </div>
            <div>
              {numberFormatter(recommendProduct?.discount_price, 2, true, { prefix: '$' })}
            </div>
          </div>
        </LightingButton>
      </div>
    </FlagModal>
  );
};

export default OutOfHoney;
