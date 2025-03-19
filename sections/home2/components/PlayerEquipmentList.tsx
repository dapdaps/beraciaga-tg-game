import { getLookList } from '@/apis/look';
import Empty from '@/components/Empty';
import { useGlobalUser } from '@/context/UserContext';
import React, { useEffect, useState } from 'react';
import Clothes from '@/components/BearDressup/Clothes';
import Hat from '@/components/BearDressup/Hat';
import Vehicle from '@/components/BearDressup/Transportation';
import clsx from 'clsx';

interface IResponseItem {
  look_id: string;
  category: string;
  level: number;
}

export interface EquipmentItem {
  look_id: string;
  level: number;
  owned: boolean;
  equipped: boolean;
  category: string;
  image: string;
}

const PlayerEquipmentList = ({
  category,
  onEquipmentChange,
}: {
  category: string;
  onEquipmentChange?: (lookId: string, equipped: boolean) => void;
}) => {
  const [equipmentItems, setEquipmentItems] = useState<EquipmentItem[]>([]);
  const [allEquipmentItems, setAllEquipmentItems] = useState<IResponseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { userLooksItem, userLooksFlattened } = useGlobalUser();

  useEffect(() => {
    fetchAllEquipmentItems()
  }, [category]);

  useEffect(() => {
    if (allEquipmentItems.length > 0) {

      const processedItems = allEquipmentItems.map((item) => {
        const userItem = userLooksItem.find((userItem: any) => userItem.look_id === item.look_id);

        return {
          look_id: item.look_id,
          level: item.level,
          owned: !!userItem, 
          equipped: userItem?.use || false, 
          category: item.category,
          image: `/api/placeholder/86/86`,
        };
      });
      setEquipmentItems(processedItems);
    }
  }, [allEquipmentItems, userLooksItem]);

  const toggleEquipped = (look_id: string) => {
    setEquipmentItems(prevItems => {
      const clickedItem = prevItems.find(item => item.look_id === look_id);
      if (!clickedItem?.owned) return prevItems;

      return prevItems.map(item => {
        if (item.category === clickedItem.category) {
          const shouldEquip = item.look_id === look_id && !item.equipped;
          if (item.look_id === look_id) {
            onEquipmentChange?.(look_id, shouldEquip);
          }
          return { ...item, equipped: shouldEquip };
        }
        return item;
      });
    });
  };

  const fetchAllEquipmentItems = async () => {
    if (!category) return;
    try {
      setLoading(true)
      const data = await getLookList()
      if (data.code === 200) {
        setAllEquipmentItems(data.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const filteredItems = equipmentItems.filter(item => item.category === category.toLowerCase());

  if (filteredItems.length === 0) {
    return (
      <Empty desc="No more items" mt={80} />
    );
  }

  return (
      <div className="grid grid-cols-3 gap-[15px]">
        {filteredItems.map((item) => (
          <div 
            key={item.look_id} 
            className="rounded-xl border-2 border-[#DCC9B1] bg-white p-[5px] flex flex-col items-center"
          >
            {/* Item Image Container */}
            <div className="relative">
              {item.owned ? (
                // Owned item container
                <div className="relative w-[86px] h-[86px] rounded-xl border-2 border-[#DCB988] bg-[#FFF1DC] flex items-center justify-center">
                    {
                      item.category === 'background' ? (<div className='bg-[#f99] w-full h-full'></div>)
                       : (
                        item.category === 'clothes' ?  (
                        <div className='w-full h-full scale-[0.45] -translate-x-[50%] -translate-y-[100%]'>
                          <Clothes clothesItem={item} vehicleItem={userLooksFlattened?.vehicle}  />
                        </div>
                       ) : (<img 
                        src={item.image} 
                        className="w-full h-full object-contain"
                      />))
                    }
                </div>
              ) : (
                // Unowned item container (grayed out)
                <div className="overflow-hidden w-[86px] h-[86px] rounded-xl border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center">
                  {
                    item.category === 'background' ? (<div className='bg-[#f99] w-full h-full opacity-10'></div>)
                    : (
                     item.category === 'clothes' ?  (
                     <div className='w-full h-full scale-[0.45] -translate-x-[50%] -translate-y-[100%] opacity-10'>
                       <Clothes clothesItem={item} vehicleItem={userLooksFlattened?.vehicle}  />
                     </div>
                    ) : (<img 
                     src={item.image} 
                     className="w-full h-full object-contain opacity-10"
                   />))
                 }
                </div>
              )}
              {/* Checkbox for owned items */}
              {item.owned && (
                <button 
                  className="absolute -top-2 -right-2"
                  onClick={() => toggleEquipped(item.look_id)}
                >
                  {item.equipped ? (
                    // Equipped state
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <circle cx="14" cy="14" r="13" fill="#B6DF5D" stroke="#4B371F" strokeWidth="2"/>
                      <path d="M8.40002 14L12 17.6L19.6 10" stroke="#4B371F" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    // Unequipped state
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <circle cx="14" cy="14" r="13" fill="#E8E8E8" stroke="#7F5F3A" strokeWidth="2"/>
                    </svg>
                  )}
                </button>
              )}
              {/* Level indicator */}
              <div className={clsx('absolute bottom-[5px] left-1/2 transform -translate-x-1/2 -translate-y-0 text-[#FFF1DC] font-cherryBomb text-stroke-2-DCB988 leading-4 text-[16px]', !item.owned && 'text-stroke-2-C3C3C3 text-[#E6E6E6]')}>
                Lv.{item.level}
              </div>
            </div>
            
            {/* Item Title */}
            {/* <div className="mt-2 font-montserrat text-center text-xs leading-3 font-[600] text-[#2C3108] truncate w-full">
              {item.title}
            </div> */}
          </div>
        ))}
      </div>
  );
};

export default PlayerEquipmentList;