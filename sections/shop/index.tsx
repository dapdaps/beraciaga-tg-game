'use client';

import AppHeader from '@components/header';
import Product from '@/sections/shop/components/product';
import ProductCard from '@/components/paperclip-card';
import { ProductType, ProductTypes } from '@/sections/shop/config';

const ShopView = () => {

  return (
    <div className="relative rounded-t-[10px] h-full bg-[url('/images/shop/bg.svg')] bg-repeat-y bg-center bg-contain">
      <AppHeader className="absolute z-20 w-full left-0 top-0" />
      <div className="p-[96px_10px_94px] w-full h-full overflow-y-auto">
        <ProductCard
          title={ProductTypes.spins.label}
          icon={ProductTypes.spins.icon}
          iconX={ProductTypes.spins.iconX}
          iconY={ProductTypes.spins.iconY}
          innerClassName="pr-[50px] pl-[20px]"
        >
          {
            productList1.map((product: any, index: number) => (
              <Product key={index} product={product} />
            ))
          }
        </ProductCard>
        <ProductCard
          title={ProductTypes.treasureBox.label}
          icon={ProductTypes.treasureBox.icon}
          iconX={ProductTypes.treasureBox.iconX}
          iconY={ProductTypes.treasureBox.iconY}
          className="mt-[35px]"
          innerClassName="pr-[10px] whitespace-nowrap"
        >
          {
            productList1.map((product: any, index: number) => (
              <Product key={index} product={product} />
            ))
          }
        </ProductCard>
        <ProductCard
          title={ProductTypes.points.label}
          icon={ProductTypes.points.icon}
          iconX={ProductTypes.points.iconX}
          iconY={ProductTypes.points.iconY}
          className="mt-[35px]"
          innerClassName="pr-[50px] pl-[20px]"
        >
          {
            productList1.map((product: any, index: number) => (
              <Product key={index} product={product} />
            ))
          }
        </ProductCard>
        <ProductCard
          title={ProductTypes.outfit.label}
          icon={ProductTypes.outfit.icon}
          iconX={ProductTypes.outfit.iconX}
          iconY={ProductTypes.outfit.iconY}
          className="mt-[35px]"
          innerClassName="pr-[50px] pl-[20px]"
        >
          {
            productList1
              .map((product: any, index: number) => ({
                ...product,
                isHot: false,
                rare: 10,
                type: ProductType.Outfit,
                name: 'Outfit' + index,
                image: '/images/shop/example-product-5.svg',
              }))
              .map((product: any, index: number) => (
                <Product key={index} product={product} />
              ))
          }
        </ProductCard>
      </div>
    </div>
  );
};

export default ShopView;

const productList1: any = [
  {
    value: 110000,
    image: '/images/shop/example-product.svg',
    color: '#FF7EC1',
    shadowColor: '#B42647',
    addPercent: '',
    regularPrice: '10.99',
    salePrice: '0.99',
    isHot: true,
  },
  {
    value: 220000,
    image: '/images/shop/example-product.svg',
    color: '#FF7EC1',
    shadowColor: '#B42647',
    addPercent: '10',
    regularPrice: '10.99',
    salePrice: '0.99',
    isHot: false,
    isSoldOut: true,
  },
  {
    value: 330000,
    image: '/images/shop/example-product.svg',
    color: '#FF7EC1',
    shadowColor: '#B42647',
    addPercent: '20',
    regularPrice: '10.99',
    salePrice: '0.99',
    isHot: false,
  },
  {
    value: 110000,
    image: '/images/shop/example-product-2.svg',
    color: '#BB7AFF',
    shadowColor: '#7940B4',
    addPercent: '',
    regularPrice: '10.99',
    salePrice: '0.99',
    isHot: true,
  },
  {
    value: 220000,
    image: '/images/shop/example-product-3.svg',
    color: '#FFD026',
    shadowColor: '#844800',
    addPercent: '10',
    regularPrice: '10.99',
    salePrice: '0.99',
    isHot: false,
  },
  {
    value: 330000,
    image: '/images/shop/example-product-4.svg',
    color: '#EDFE72',
    shadowColor: '#68721F',
    addPercent: '20',
    regularPrice: '10.99',
    salePrice: '0.99',
    isHot: false,
  },
];
