export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  image: string;
}

export interface FloralProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  images?: string[];
  stems: string[];
  dimensions: string;
  includesVase: boolean;
  vaseType?: string;
  badge?: string;
  occasions?: string[];
  isNewArrival?: boolean;
  stemOptions?: number[];
  colorOptions?: ColorOption[];
}

export interface AccessoryItem {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
}

export interface CartItem {
  product: FloralProduct;
  quantity: number;
  giftNote?: string;
  selectedSize?: string;
  selectedStems?: number;
  selectedPrice?: number;
  selectedColor?: ColorOption;
  selectedAccessories?: AccessoryItem[];
}

export type CategoryFilter = 'All' | 'Signature Arrangements' | 'Bespoke Bouquets' | 'Vase Curations';

export type OccasionFilter = 
  | 'NEW ARRIVALS'
  | 'ALL'
  | 'FOR HER'
  | 'BIRTHDAYS'
  | 'WEDDINGS'
  | 'HAPPY MOTHERS DAY'
  | 'ROMANCE';

