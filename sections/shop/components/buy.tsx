import LightingButton from '@components/Button/lighting-button';
import FlagModal from '@components/flag-modal';
import { numberFormatter } from '@/utils/number-formatter';
import Drawer from '@components/Drawer';
import { useEffect, useMemo, useState } from 'react';
import { useRequest } from 'ahooks';
import { get } from '@/utils/http';
import { useTelegram } from '@/hooks/useTelegram';
import type { UserData } from '@/hooks/useLogin';
import Skeleton from 'react-loading-skeleton';
import { CouponItem } from '@/sections/shop/config';
import Loading from '@components/Loading';
import Big from 'big.js';
import Modal from '@components/modal';
import Coupon from '@/sections/shop/components/coupon';
import Empty from '@components/Empty';

const Buy = (props: any) => {
  const {
    visible,
    onClose,
    buyProduct,
    buying,
    handleProductPay,
  } = props;

  const { WebApp } = useTelegram();
  const userData: UserData = WebApp?.initDataUnsafe?.user;

  const [coupon, setCoupon] = useState<CouponItem>();

  const { data: couponList, loading: couponLoading, run: getCouponList } = useRequest<CouponItem[], any>(async () => {
    const res = await get("/api/coupon/user", {
      tg_user_id: userData?.id,
    });
    if (res.code !== 200) {
      return [];
    }
    return res.data;
  }, {
    manual: true,
  });

  const payPrice = useMemo(() => {
    if (!buyProduct) {
      return 0;
    }
    if (!coupon) {
      return buyProduct.discount_price;
    }
    let _price = Big(buyProduct.discount_price).minus(coupon?.discount_value ?? 0);
    if (Big(_price).lt(0)) {
      return 0;
    }
    return _price;
  }, [buyProduct, coupon]);

  useEffect(() => {
    if (!buyProduct || !visible) {
      return;
    }
    getCouponList();
  }, [buyProduct, visible]);

  return (
    <Modal
      open={visible}
      onClose={onClose}
      closeIcon={(
        <img src="/images/raffle/close.png" className="w-[34px] h-[34px]" />
      )}
      closeIconClassName="top-[-17px] right-[-17px]"
    >
      <div className="w-[340px] rounded-[10px] border-[2px] border-[#7F6C41] bg-[linear-gradient(180deg,_#D4A20C_0%,_#FFCC34_100%)] p-[3px]">
        <div className="w-full rounded-[8px] border-[2px] border-[#E5C375] bg-[#FFF1C7] p-[22px_25px_30px] flex flex-col items-center">
          <div className="relative shrink-0 w-[100px] h-[106px] rounded-[16px] border-[2px] border-[#D7C69D] bg-[#FFFAEA] flex items-center flex-col gap-[10px]">
            <div
              className="rotate-[-6deg] text-center text-stroke-2 stroke-2 font-cherryBomb text-[24px] font-normal leading-[1] uppercase"
              style={{
                color: buyProduct?.color || '#FF7EC1',
                textShadow: `0px 2px 0px ${buyProduct?.shadowColor || '#B42647'}`,
              }}
            >
              {buyProduct?.name}
            </div>
            <img src={buyProduct?.logo} alt="" className="w-[70px] object-contain object-center shrink-0" />
          </div>
          <div className="mt-[6px] flex flex-col items-center gap-[2px] leading-[1] text-[16px] text-[#F7F9EA] text-stroke-2 font-cherryBomb">
            <div className="text-[10px] text-stroke-1 line-through decoration-red-500">
              {numberFormatter(buyProduct?.original_price, 2, true, { prefix: '$' })}
            </div>
            <div className="">
              {numberFormatter(buyProduct?.discount_price, 2, true, { prefix: '$' })}
            </div>
          </div>
          <div className="flex flex-col mt-[20px] w-full">
            <div className="shrink-0 font-cherryBomb text-left text-[20px] bg-[linear-gradient(180deg,_#FFDF77_0%,_#F6AD0F_100%)] bg-clip-text [text-shadow:0px_2px_0px_#4B371F] [-webkit-text-fill-color:transparent]">
              Coupon
            </div>
            <div className="flex-1 max-h-[180px] overflow-y-auto mt-[15px] flex flex-col items-stretch gap-[15px]">
              {
                couponLoading ? (
                  <>
                    <Skeleton width="271px" height="70px" borderRadius="10px" />
                    <Skeleton width="271px" height="70px" borderRadius="10px" />
                  </>
                ) : (
                  !!couponList?.length ? couponList?.map((item, index) => (
                    <Coupon
                      item={item}
                      key={index}
                      selected={item.id === coupon?.id}
                      onSelect={() => {
                        if (item.id === coupon?.id) {
                          setCoupon(void 0);
                          return;
                        }
                        setCoupon(item);
                      }}
                    />
                  )) : (
                    <Empty desc="No coupon available" />
                  )
                )
              }
            </div>
          </div>
          <LightingButton
            disabled={buying}
            outerClassName="!w-full shrink-0 mt-[30px] !h-[57px] shaodow-[-1px_4px_0px_0px_#4B371F]"
            className="!text-[18px]"
            onClick={() => {
              handleProductPay(buyProduct, coupon);
            }}
          >
            {
              buying && (
                <Loading size={14} />
              )
            }
            {numberFormatter(payPrice, 2, true, { prefix: '$' })}
          </LightingButton>
        </div>
      </div>
    </Modal>
  );
};

export default Buy;
