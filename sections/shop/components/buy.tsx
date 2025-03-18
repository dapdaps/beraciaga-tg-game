import LightingButton from '@components/Button/lighting-button';
import FlagModal from '@components/flag-modal';
import { numberFormatter } from '@/utils/number-formatter';
import Drawer from '@components/Drawer';
import { useState } from 'react';
import { useRequest } from 'ahooks';
import { get } from '@/utils/http';
import { useTelegram } from '@/hooks/useTelegram';
import type { UserData } from '@/hooks/useLogin';
import { testData } from '@/data/test';
import Skeleton from 'react-loading-skeleton';
import { CouponItem } from '@/sections/shop/config';

const Buy = (props: any) => {
  const {
    visible,
    onClose,
    buyProduct,
    buying,
    handleProductPay,
  } = props;

  const { WebApp } = useTelegram();
  const userData: UserData = WebApp?.initDataUnsafe?.user || testData;

  const [coupon, setCoupon] = useState<CouponItem>();
  const [couponsVisible, setCouponsVisible] = useState(false);

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

  return (
    <FlagModal
      visible={visible}
      onClose={onClose}
      footer={(
        <LightingButton
          className=""
          onClick={() => {}}
        >
          More
        </LightingButton>
      )}
    >
      <div className="flex flex-col items-center h-full w-full">
        <img src="/images/shop/out-of-honey.png" alt="" className="w-[233px] h-[39px] object-contain object-center shrink-0" />
        <div className="flex flex-col items-center flex-1 w-full relative">
          <img src={buyProduct?.logo} alt="" className="w-[200px] object-contain object-center shrink-0" />
          <div
            className="absolute bottom-[100px] rotate-[-6deg] text-center text-stroke-2 stroke-2 font-cherryBomb text-[40px] font-normal leading-[24px] uppercase"
            style={{
              color: buyProduct?.color || '#FF7EC1',
              textShadow: `0px 2px 0px ${buyProduct?.shadowColor || '#B42647'}`,
            }}
          >
            {buyProduct?.name}
          </div>
          <div
            className="flex items-center gap-[5px] text-[#F7F9EA] text-stroke-2 text-[16px] font-[400] font-cherryBomb mt-[10px]"
            onClick={() => {
              setCouponsVisible(true);
              getCouponList();
            }}
          >
            <div className="shrink-0">Coupon: </div>
            <div className="flex items-center gap-[5px] flex-1">
              <div className="flex-1">
                {coupon ? numberFormatter(coupon.discount_value, 2, true, { prefix: '-$' }) : "Unselect"}
              </div>
              <img src="/images/icon-arrow-down.svg" alt="" className="shrink-0 w-[12px] h-[7px] translate-y-0.5" />
            </div>
          </div>
        </div>
        <LightingButton
          disabled={buying}
          outerClassName="!w-full shrink-0"
          onClick={() => {
            handleProductPay(buyProduct);
          }}
        >
          {numberFormatter(buyProduct?.discount_price, 2, true, { prefix: '$' })}
        </LightingButton>
      </div>
      <Drawer
        visible={couponsVisible}
        onClose={() => {
          setCouponsVisible(false);
        }}
        size="50dvh"
        overlayClassName="z-[101]"
        className="p-[4px] border-[2px] border-[#7F6C41] !rounded-t-[10px] bg-[linear-gradient(180deg,_#D4A20C_0%,_#FFCC34_100%)]"
      >
        <div className="w-full h-full flex flex-col gap-[10px] border-[2px] border-[#E5C375] bg-[#FFF1C7] p-[15px_20px] rounded-[8px]">
          <div
            className="text-center text-[26px] font-cherryBomb text-stroke-2 text-[#FFDF77]"
            style={{
              textShadow: "0px 4px 0px #4B371F"
            }}
          >
            Coupons
          </div>
          <div className="mt-[15px] text-[#4B371F] font-cherryBomb text-[20px] h-[calc(100%_-_55px)] overflow-y-auto flex flex-col gap-[10px]">
            {
              couponLoading ? (
                <>
                  <Skeleton width="100%" height="54px" borderRadius="10px" />
                  <Skeleton width="100%" height="54px" borderRadius="10px" />
                </>
              ) : (
                <>
                  <div
                    className="flex justify-between items-center border-[2px] border-[#D7C69D] rounded-[16px] py-[10px] px-[15px]"
                    onClick={() => {
                      setCoupon(void 0);
                      setCouponsVisible(false);
                    }}
                  >
                    Do not use
                  </div>
                  {
                    couponList?.map?.((item) => (
                      <div
                        className="flex justify-between items-center border-[2px] border-[#D7C69D] rounded-[16px] py-[10px] px-[15px]"
                        key={item.id}
                        onClick={() => {
                          setCoupon(item);
                          setCouponsVisible(false);
                        }}
                      >
                        <div className="">
                          {numberFormatter(item.discount_value, 2, true, { prefix: '-$' })}
                        </div>
                        <div className="">
                          Valid
                        </div>
                      </div>
                    ))
                  }
                </>
              )
            }
          </div>
        </div>
      </Drawer>
    </FlagModal>
  );
};

export default Buy;
