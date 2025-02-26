import React, { useState } from 'react';

interface EquipmentItem {
  id: string;
  title: string;
  level: number;
  owned: boolean;
  equipped: boolean;
  category: string;
  image: string;
}

const MockItems = [
  // Clothes
  { id: 'baseball-jacket', title: 'Baseball Jacket', level: 2, owned: true, equipped: false, category: 'Clothes', image: '/api/placeholder/86/86' },
  { id: 'black-hoodie', title: 'Black Hoodie', level: 2, owned: true, equipped: false, category: 'Clothes', image: '/api/placeholder/86/86' },
  { id: 'orange-sweater', title: 'Orange Sweater', level: 2, owned: true, equipped: true, category: 'Clothes', image: '/api/placeholder/86/86' },
  { id: 'orange-jacket', title: 'Orange Jacket', level: 3, owned: false, equipped: false, category: 'Clothes', image: '/api/placeholder/86/86' },
  { id: 'casual-suit', title: 'Casual Suit', level: 3, owned: false, equipped: false, category: 'Clothes', image: '/api/placeholder/86/86' },
  { id: 'cowboy', title: 'Cowboy', level: 3, owned: false, equipped: false, category: 'Clothes', image: '/api/placeholder/86/86' },
  { id: 'racing-driver', title: 'Racing Driver', level: 4, owned: false, equipped: false, category: 'Clothes', image: '/api/placeholder/86/86' },
  { id: 'orange-jacket-2', title: 'Orange Jacket', level: 4, owned: false, equipped: false, category: 'Clothes', image: '/api/placeholder/86/86' },
  { id: 'orange-jacket-3', title: 'Orange Jacket', level: 4, owned: false, equipped: false, category: 'Clothes', image: '/api/placeholder/86/86' },
  
  // Hat
  { id: 'baseball-cap', title: 'Baseball Cap', level: 1, owned: true, equipped: true, category: 'Hat', image: '/api/placeholder/86/86' },
  { id: 'cowboy-hat', title: 'Cowboy Hat', level: 2, owned: true, equipped: false, category: 'Hat', image: '/api/placeholder/86/86' },
  { id: 'winter-hat', title: 'Winter Hat', level: 3, owned: false, equipped: false, category: 'Hat', image: '/api/placeholder/86/86' },
  
  // Decoration
  { id: 'sunglasses', title: 'Sunglasses', level: 1, owned: true, equipped: false, category: 'Decoration', image: '/api/placeholder/86/86' },
  { id: 'gold-chain', title: 'Gold Chain', level: 2, owned: false, equipped: false, category: 'Decoration', image: '/api/placeholder/86/86' },
  
  // Vehicle
  { id: 'bicycle', title: 'Bicycle', level: 1, owned: true, equipped: true, category: 'Vehicle', image: '/api/placeholder/86/86' },
  { id: 'scooter', title: 'Scooter', level: 2, owned: false, equipped: false, category: 'Vehicle', image: '/api/placeholder/86/86' },
  
  // Background
  { id: 'city', title: 'City', level: 1, owned: true, equipped: false, category: 'Background', image: '/api/placeholder/86/86' },
  { id: 'beach', title: 'Beach', level: 2, owned: false, equipped: false, category: 'Background', image: '/api/placeholder/86/86' }
]

const PlayerEquipmentList = ({
  category,
}: {
  category: string;
}) => {
  // Sample equipment data
  const [equipmentItems, setEquipmentItems] = useState<EquipmentItem[]>(MockItems);

  // Function to toggle equipment status
  const toggleEquipped = (id: string) => {
    setEquipmentItems(prevItems => 
      prevItems.map(item => {
        // If it's the clicked item and it's owned, toggle equipped status
        if (item.id === id && item.owned) {
          return { ...item, equipped: !item.equipped };
        }
        return item;
      })
    );
  };

  // Filter items based on active tab
  const filteredItems = equipmentItems.filter(item => item.category === category);

  return (
      <div className="grid grid-cols-3 gap-[15px]">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="rounded-xl border-2 border-[#DCC9B1] bg-white p-[5px] flex flex-col items-center"
          >
            {/* Item Image Container */}
            <div className="relative">
              {item.owned ? (
                // Owned item container
                <div className="w-[86px] h-[86px] rounded-xl border-2 border-[#DCB988] bg-[#FFF1DC] flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                // Unowned item container (grayed out)
                <div className="w-[86px] h-[86px] rounded-xl border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-contain opacity-50"
                  />
                </div>
              )}

              {/* Checkbox for owned items */}
              {item.owned && (
                <button 
                  className="absolute -top-2 -right-2"
                  onClick={() => toggleEquipped(item.id)}
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
              <div className="absolute bottom-[5px] left-1/2 transform -translate-x-1/2 -translate-y-0 text-[#FFF1DC] font-cherryBomb text-stroke-2-DCB988 leading-4 text-[16px]">
                Lv.{item.level}
              </div>
            </div>
            
            {/* Item Title */}
            <div className="mt-2 font-montserrat text-center text-xs leading-3 font-[600] text-[#2C3108] truncate w-full">
              {item.title}
            </div>
          </div>
        ))}
      </div>
  );
};

export default PlayerEquipmentList;