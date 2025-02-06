'use client';

import { useRouter } from 'next/navigation';
import { TabItem, TABS, useLayoutStore } from '@/stores/useLayoutStore';

const TabBar: React.FC<any> = (props) => {
  const router = useRouter();
  const { activeTab, setActiveTab } = useLayoutStore();

  const handleTabClick = (tab: TabItem) => {
    if (tab.isLock) return;
    setActiveTab(tab.id);
    props?.onTabClick?.(tab);
  };

  return (
    <div className="fixed left-0 bottom-0 w-full h-[4.25rem] bg-[#F3E3AA] rounded-t-[20px] grid grid-cols-5">
      {
        TABS.map((tab) => (
          <div
            key={tab.id}
            className={`flex pb-[1.625rem] flex-col items-center justify-center cursor-pointer relative transition-all duration-150 ease-linear ${activeTab === tab.id ? 'bg-[linear-gradient(180deg,_rgba(255,_174,_0,_0.00)_0%,_#FFAE00_100%)]' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            <div
              className={`w-full h-[3rem] bg-contain bg-center bg-no-repeat relative flex justify-center items-end transition-all duration-150 ease-linear`}
              style={{
                backgroundImage: `url("${tab.icon}")`,
                backgroundSize: `${activeTab === tab.id ? tab.iconWidth * 1.4 : tab.iconWidth}px auto`,
                backgroundPosition: `bottom ${tab.iconOffsetY ? tab.iconOffsetY + 'px' : ''} center`,
              }}
            >
              <img
                src={tab.label}
                alt={tab.name}
                className="mb-[-0.4rem]"
                style={{
                  transform: `${tab.labelOffsetY ? 'translateY(' + tab.labelOffsetY + 'px)' : ''}`,
                }}
              />
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default TabBar;