import React, { lazy, Suspense, useState, useEffect, useCallback } from 'react';

const LazyClothes = lazy(() => import('./Clothes').then(module => ({ 
  default: module.default 
})));
const LazyHat = lazy(() => import('./Hat').then(module => ({ 
  default: module.default 
})));
const LazyVehicle = lazy(() => import('./Transportation').then(module => ({ 
  default: module.default 
})));
const LazyFace = lazy(() => import('./Face').then(module => ({ 
  default: module.default 
})));
const LazyGlasses = lazy(() => import('./Glasses').then(module => ({ 
  default: module.default 
})));
const LazyNecklace = lazy(() => import('./Necklace').then(module => ({ 
  default: module.default 
})));

const componentMap = {
  'clothes': LazyClothes,
  'hat': LazyHat,
  'vehicle': LazyVehicle,
  'face': LazyFace,
  'glasses': LazyGlasses,
  'necklace': LazyNecklace,
};

type LoadingState = {
  [key: string]: boolean;
};

const LoadingPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-gray-300 border-t-[#DCB988] animate-spin"></div>
  </div>
);

interface DressupManagerProps {
  type: keyof typeof componentMap;
  props: any;
  isVisible: boolean;
  priority?: boolean;
}

const loadedComponents = new Set<string>();
const preloadQueue: string[] = [];
let isPreloading = false;

const preloadNextComponent = async () => {
  if (isPreloading || preloadQueue.length === 0) return;
  
  isPreloading = true;
  const nextType = preloadQueue.shift();
  
  if (nextType && !loadedComponents.has(nextType) && componentMap[nextType as keyof typeof componentMap]) {
    try {
      await import(`@/components/BearDressup/${nextType.charAt(0).toUpperCase() + nextType.slice(1)}`);
      loadedComponents.add(nextType);
    } catch (error) {
      console.error(`Failed to preload ${nextType}:`, error);
    } finally {
      isPreloading = false;
      // 继续处理队列
      preloadNextComponent();
    }
  } else {
    isPreloading = false;
    preloadNextComponent();
  }
};

// 组件管理器
const DressupManager: React.FC<DressupManagerProps> = ({ type, props, isVisible, priority = false }) => {
  console.log(type, 'type')
  const [hasLoaded, setHasLoaded] = useState(loadedComponents.has(type));
  
  useEffect(() => {
    if ((isVisible || priority) && !loadedComponents.has(type)) {

      const index = preloadQueue.indexOf(type);
      if (index !== -1) {
        preloadQueue.splice(index, 1);
      }
      preloadQueue.unshift(type);
      preloadNextComponent();
    } 

    else if (!loadedComponents.has(type) && !preloadQueue.includes(type)) {
      preloadQueue.push(type);

      if (!isPreloading && typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => preloadNextComponent());
      } else {
        setTimeout(() => preloadNextComponent(), 5000); // 延迟预加载
      }
    }
  }, [type, isVisible, priority]);
  

  useEffect(() => {
    if (loadedComponents.has(type) && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [type, hasLoaded]);
  
  if (!isVisible && !hasLoaded) {
    return null; 
  }
  
  const Component = componentMap[type];
  
  if (!Component) {
    return null;
  }
  
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <Component {...props} />
    </Suspense>
  );
};

export default DressupManager;
