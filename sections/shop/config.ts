export enum ProductType {
  Spins = 'spins',
  TreasureBox = 'treasureBox',
  Points = 'points',
  Outfit = 'outfit',
}

export interface IProductTypes {
  label: string;
  icon: string;
  iconX: number;
  iconY: number;
}

export const ProductTypes: Record<ProductType, IProductTypes> = {
  [ProductType.Spins]: {
    label: 'SPINS',
    icon: '/images/shop/card-icon-spins.svg',
    iconX: -46,
    iconY: -20,
  },
  [ProductType.TreasureBox]: {
    label: 'TREASURE BOX',
    icon: '/images/shop/card-icon-treasure-box.svg',
    iconX: -30,
    iconY: -15,
  },
  [ProductType.Points]: {
    label: 'POINTS',
    icon: '/images/shop/card-icon-points.svg',
    iconX: -30,
    iconY: -15,
  },
  [ProductType.Outfit]: {
    label: 'OUTFIT',
    icon: '/images/shop/card-icon-outfit.svg',
    iconX: -15,
    iconY: -15,
  },
};
