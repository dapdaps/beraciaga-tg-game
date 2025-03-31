import React, { useState, useEffect } from 'react';
import { EquipmentItem } from '@/sections/home2/components/PlayerEquipmentList';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { BACKGROUNDS_MAPPING } from '@/components/BearDressup/mappings';

const DressupManager = dynamic(
  () => import('@/components/BearDressup/DressupManager'),
  { ssr: false, loading: () => <div className="w-full h-full flex justify-center items-center">加载中...</div> }
);

interface ItemImageProps {
  item: EquipmentItem;
  vehicleItem?: any;
}

const ItemWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={clsx('w-full h-full scale-[0.45] -translate-x-[50%]', className)}>
    {children}
  </div>
);

const Background: React.FC<{ item: EquipmentItem }> = ({ item }) => {
  const bgId = BACKGROUNDS_MAPPING[item.look_id as keyof typeof BACKGROUNDS_MAPPING];
  console.log('Background ID:', bgId);
  if (!bgId) return null;
  const bg = `bg-[${bgId}]`;
  return (
    <div className={clsx('w-full h-full', bg)} />
  );
};

const DefaultImage = ({ item }: { item: EquipmentItem }) => (
  <img src={item.image} className="w-full h-full object-contain" />
);

const categoryConfigs = {
  background: {
    component: Background,
    type: 'background',
    className: '',
  },
  clothes: {
    type: 'clothes',
    className: '-translate-y-[100%]',
  },
  hat: {
    type: 'hat',
    className: '-translate-y-[10%]',
  },
  vehicle: {
    type: 'vehicle',
    className: '!scale-[0.2] !-translate-y-[60%] !-translate-x-[32%]',
  },
  face: {
    type: 'face',
    className: '!-translate-x-[20%]',
  },
  glasses: {
    type: 'glasses',
    className: '!-translate-y-[40%] !-translate-x-[60%]',
  },
  necklace: {
    type: 'necklace',
    className: '!-translate-y-[80%] !-translate-x-[60%]',
  },
};

const ItemImage: React.FC<ItemImageProps> = ({ item, vehicleItem }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [elementRef, setElementRef] = useState<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!elementRef) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(elementRef);
    
    return () => {
      if (elementRef) {
        observer.unobserve(elementRef);
      }
    };
  }, [elementRef]);
  
  const containerClasses = item.owned
    ? "relative w-[86px] h-[86px] rounded-xl border-2 border-[#DCB988] bg-[#FFF1DC] flex items-center justify-center"
    : "overflow-hidden w-[86px] h-[86px] rounded-xl border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center";

  const renderContent = () => {
    const category = item.category as string;
    const config = categoryConfigs[category as keyof typeof categoryConfigs];
    
    if (!config) {
      return <DefaultImage item={item} />;
    }
    
    if ('component' in config) {
      const Component = config.component;
      return <Component item={item} />;
    }
    
    return (
      <ItemWrapper className={config.className}>
        <DressupManager 
          type={config.type as any}
          props={category === 'clothes' ? { clothesItem: item, vehicleItem } : { item }}
          isVisible={isVisible}
          priority={false} // 可以基于某些条件设置为true
        />
      </ItemWrapper>
    );
  };

  return (
    <div 
      className={containerClasses} 
      ref={setElementRef}
    >
      <div className={clsx('w-full h-full', item.owned ? '' : 'opacity-10')}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ItemImage;
