import React from 'react';
import Clothes from '@/components/BearDressup/Clothes';
import Hat from '@/components/BearDressup/Hat';
import Vehicle from '@/components/BearDressup/Transportation';
import { EquipmentItem } from '@/sections/home2/components/PlayerEquipmentList';
import clsx from 'clsx';
import Face from '@/components/BearDressup/Face';
import Glasses from '@/components/BearDressup/Glasses';
import Necklace from '@/components/BearDressup/Necklace';

interface ItemImageProps {
  item: EquipmentItem;
  vehicleItem?: any;
}

const ItemWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={clsx('w-full h-full scale-[0.45] -translate-x-[50%]', className)}>
    {children}
  </div>
);

const categoryComponents = {
  background: () => (
    <div className="bg-[#f99] w-full h-full" />
  ),
  clothes: ({ item, vehicleItem }: ItemImageProps) => (
    <ItemWrapper className='-translate-y-[100%]'>
        <Clothes clothesItem={item} vehicleItem={vehicleItem} />
    </ItemWrapper>
  ),
  hat: ({ item }: ItemImageProps) => (
    <ItemWrapper className='-translate-y-[10%]'>
      <Hat item={item} />
    </ItemWrapper>
  ),
  vehicle: ({ item }: ItemImageProps) => (
    <ItemWrapper>
      <Vehicle item={item} />
    </ItemWrapper>
  ),
  face: ({ item }: ItemImageProps) => (
    <ItemWrapper className='!-translate-x-[20%]'>
      <Face item={item} />
    </ItemWrapper>
  ),
  glasses: ({ item }: ItemImageProps) => (
    <ItemWrapper className='!-translate-y-[40%] !-translate-x-[60%]'>
      <Glasses item={item} />
    </ItemWrapper>
  ),
  necklace: ({ item }: ItemImageProps) => (
    <ItemWrapper className='!-translate-y-[80%] !-translate-x-[60%]'>
      <Necklace item={item} />
    </ItemWrapper>
  ),
  default: ({ item }: ItemImageProps) => (
    <img src={item.image} className="w-full h-full object-contain" />
  ),
};

const ItemImage: React.FC<ItemImageProps> = ({ item, vehicleItem }) => {
  const RenderComponent = categoryComponents[item.category as keyof typeof categoryComponents] || categoryComponents.default;
  
  const containerClasses = item.owned
    ? "relative w-[86px] h-[86px] rounded-xl border-2 border-[#DCB988] bg-[#FFF1DC] flex items-center justify-center"
    : "overflow-hidden w-[86px] h-[86px] rounded-xl border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center";

  return (
    <div className={containerClasses}>
      <div className={clsx('w-full h-full', item.owned ? '' : 'opacity-10')}>
        <RenderComponent item={item} vehicleItem={vehicleItem} />
      </div>
    </div>
  );
};

export default ItemImage;
