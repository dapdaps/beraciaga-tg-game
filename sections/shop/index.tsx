'use client';

import AppHeader from '@components/header';
import Product from '@/sections/shop/components/product';
import ProductCard from '@/components/paperclip-card';
import { ProductType, ProductTypes } from '@/sections/shop/config';
import { useShop } from '@/sections/shop/hooks';
import Skeleton from 'react-loading-skeleton';
import clsx from 'clsx';
import FlagModal from '@components/flag-modal';
import LightingButton from '@components/Button/lighting-button';

const ShopView = () => {
  const { buyModalVisible, buyProduct, handleProduct, buying, handleProductPay, listByCategory, loading } = useShop();

  return (
    <div className="relative rounded-t-[10px] h-full bg-[url('/images/shop/bg.svg')] bg-repeat-y bg-center bg-contain">
      <AppHeader className="absolute z-20 w-full left-0 top-0" />
      <div className="p-[96px_10px_94px] w-full h-full overflow-y-auto">
        {
          loading ? (
            <>
              <Skeleton width="100%" height="232px" borderRadius="10px" />
              <Skeleton width="100%" height="232px" borderRadius="10px" className="mt-[35px]" />
            </>
          ) : Object.values(listByCategory).map((item, index) => {
            const categories = Object.keys(listByCategory) as ProductType[];
            return (
              <ProductCard
                key={index}
                title={ProductTypes[categories[index]].label}
                icon={ProductTypes[categories[index]].icon}
                iconX={ProductTypes[categories[index]].iconX}
                iconY={ProductTypes[categories[index]].iconY}
                className={clsx(index !== 0 ? "mt-[35px]" : "")}
                innerClassName="pr-[50px] pl-[20px]"
              >
                {
                  item?.map?.((product, index) => (
                    <Product
                      key={index}
                      product={product}
                      buying={buying}
                      onBuy={handleProduct}
                    />
                  ))
                }
              </ProductCard>
            );
          })
        }
      </div>
      <FlagModal
        visible={buyModalVisible}
        onClose={() => {
          handleProduct();
        }}
        footer={(
          <LightingButton
            className=""
            onClick={() => {}}
          >
            More
          </LightingButton>
        )}
      >
        123
      </FlagModal>
    </div>
  );
};

export default ShopView;
