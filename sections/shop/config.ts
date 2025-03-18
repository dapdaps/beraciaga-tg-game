// Corresponds to the category field in the backend
export enum ProductType {
  Spins = 'spins',
  TreasureBox = 'treasureBox',
  Points = 'BeraCoin',
  Outfit = 'Outfit',
}

export interface IProductTypes {
  label: string;
  icon: string;
  iconX: number;
  iconY: number;
  color: string;
  shadowColor: string;
}

export const ProductTypes: Record<ProductType, IProductTypes> = {
  [ProductType.Spins]: {
    label: 'SPINS',
    icon: '/images/shop/card-icon-spins.svg',
    iconX: -46,
    iconY: -20,
    color: '#FF7EC1',
    shadowColor: '#B42647',
  },
  [ProductType.TreasureBox]: {
    label: 'TREASURE BOX',
    icon: '/images/shop/card-icon-treasure-box.svg',
    iconX: -30,
    iconY: -15,
    color: '#FFD026',
    shadowColor: '#844800',
  },
  [ProductType.Points]: {
    label: 'POINTS',
    icon: '/images/shop/card-icon-points.svg',
    iconX: -30,
    iconY: -15,
    color: '#EDFE72',
    shadowColor: '#68721F',
  },
  [ProductType.Outfit]: {
    label: 'OUTFIT',
    icon: '/images/shop/card-icon-outfit.svg',
    iconX: -15,
    iconY: -15,
    color: '#BB7AFF',
    shadowColor: '#7940B4',
  },
};
