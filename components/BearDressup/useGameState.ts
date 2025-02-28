import { useState, useEffect } from 'react';


export type ItemCategory = 'cars' | 'hats' | 'jackets' | 'necklaces' | 'faces';

export interface GameItem {
  id: number;
  name: string;
  category: ItemCategory;
  level: number;
  gameId: number;
  isBuyStatus: boolean;
}

export interface BearState {
    position: 'standing' | 'sitting';
    colors: {
      primary?: string;
      secondary?: string;
      tertiary?: string;
    };
    currentFace: number;
  }

export const useGameState = (initialLevel: number = 0) => {
  const [userItems, setUserItems] = useState<GameItem[]>([]);
  const [bearState, setBearState] = useState<BearState>({
    position: 'standing',
    colors: {
      primary: '#E49F63',
      secondary: '#FED2AB',
      tertiary: '#E49F63',
    },
    currentFace: 1,
  });


  const generateRandomColors = () => {
    const colors = [
      '#E49F63', '#FFE683', '#C163E4', '#50C878',
      '#777777', '#ADD5D2', '#788AFD', '#944546'
    ];
    return {
      primary: colors[Math.floor(Math.random() * colors.length)],
      secondary: colors[Math.floor(Math.random() * colors.length)],
      tertiary: colors[Math.floor(Math.random() * colors.length)],
    };
  };

  const randomizeBearAppearance = () => {
    setBearState(prev => ({
      ...prev,
      colors: generateRandomColors(),
      currentFace: Math.floor(Math.random() * 16) + 1,
    }));
    setUserItems((prevItems) => {
        return prevItems.map((item) => {
            return {
                ...item,
                level: Math.floor(Math.random() * 5) + 1,
                isBuyStatus: Math.random() > 0.5
            };
        });
    })
  };

  const fetchUserItems = async () => {
    const mockItems: GameItem[] = [
      {
        id: 1,
        name: "Bicycle",
        category: "cars",
        level: Math.floor(Math.random() * 5) + 1,
        gameId: 2,
        isBuyStatus: Math.random() > 0.5
      },
    ];
    setUserItems(mockItems);
  };

  useEffect(() => {
    fetchUserItems();
  }, []);

  return {
    userItems,
    bearState,
    randomizeBearAppearance,
  };
};