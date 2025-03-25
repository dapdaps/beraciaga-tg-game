import { createContext, useContext, useState, ReactNode } from 'react';
import { useCoins } from '@/sections/home2/hooks/use-coins';
import { useUser } from '@/hooks/useUser';
import { UserLookItem } from '@/apis/look';
import { Category } from '@/components/BearDressup/mappings';

const DEBUG_MODE = process.env.NODE_ENV === 'development';

const UserContext = createContext<any>({});

export function UserProvider({ children }: { children: ReactNode }) {
  const { coins, currentCoins, handleCollected, addSpeed } = useCoins({ debug: DEBUG_MODE });
  const [updater, setUpdater] = useState(0);

  
  const user = useUser();
  const {
    levels,
    userLooksItem = [],
    setUserLooksItem,
    userInfo,
    tgUserId,
    WebApp,
    visibleStartBera, 
    setVisibleStartBera,
    startJourney, 
    setStartJourney
  } = user;

  const userLooksFlattened = userLooksItem?.reduce((acc: Record<Category, UserLookItem>, item: UserLookItem) => {
    if (item.use) {
        acc[item.category] = item;
    }
    return acc;
  }, {} as Record<Category, UserLookItem>);

  return (
    <UserContext.Provider value={{
      coins,
      addSpeed,
      currentCoins,
      handleCollected,
      levels,
      user,
      updater,
      setUpdater,
      visibleStartBera,
      setVisibleStartBera,
      startJourney,
      setStartJourney,
      userLooksItem,
      setUserLooksItem,
      userInfo,
      userLooksFlattened,
      tgUserId,
      WebApp,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useGlobalUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useGlobalUser must be used within a UserProvider');
  }
  return context;
};
