// Corresponds to the category field in the backend
export enum ProductType {
  Spins = 'Spin',
  TreasureBox = 'Box',
  Points = 'BeraCoin',
  Outfit = 'Outfit',
}

export interface IProductTypes {
  label: string;
  value: ProductType;
  icon: string;
  iconX: number;
  iconY: number;
  color: string;
  shadowColor: string;
}

export const ProductTypes: Record<ProductType, IProductTypes> = {
  [ProductType.Spins]: {
    label: 'SPINS',
    value: ProductType.Spins,
    icon: '/images/shop/card-icon-spins.svg',
    iconX: -46,
    iconY: -20,
    color: '#FF7EC1',
    shadowColor: '#B42647',
  },
  [ProductType.TreasureBox]: {
    label: 'TREASURE BOX',
    value: ProductType.TreasureBox,
    icon: '/images/shop/card-icon-treasure-box.svg',
    iconX: -30,
    iconY: -15,
    color: '#FFD026',
    shadowColor: '#844800',
  },
  [ProductType.Points]: {
    label: 'POINTS',
    value: ProductType.Points,
    icon: '/images/shop/card-icon-points.svg',
    iconX: -30,
    iconY: -15,
    color: '#EDFE72',
    shadowColor: '#68721F',
  },
  [ProductType.Outfit]: {
    label: 'OUTFIT',
    value: ProductType.Outfit,
    icon: '/images/shop/card-icon-outfit.svg',
    iconX: -15,
    iconY: -15,
    color: '#BB7AFF',
    shadowColor: '#7940B4',
  },
};

export enum CouponStatus {
  Active = 0,
}

export interface CouponItem {
  id: number;
  tg_user_id: string;
  discount_value: string;
  status: CouponStatus;
}
