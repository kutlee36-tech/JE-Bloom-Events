import { FloralProduct, OccasionFilter } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_flower_arrangement_1791286563747.jpg';

export const OCCASIONS: OccasionFilter[] = [
  'ALL',
  'NEW ARRIVALS',
  'FOR HER',
  'BIRTHDAYS',
  'WEDDINGS',
  'HAPPY MOTHERS DAY',
  'ROMANCE'
];

export const STEM_PRICING_TIERS: Record<number, number> = {
  18: 260,
  20: 350,
  25: 380,
  30: 420,
  35: 460,
  40: 480,
  45: 540,
  50: 600,
  60: 720,
  70: 840,
  100: 1200,
};

export const STEM_COUNT_OPTIONS = [18, 20, 25, 30, 35, 40, 45, 50, 60, 70, 100];

export const PRODUCTS: FloralProduct[] = [
  {
    id: 'pink-bouquet',
    name: 'PINK BOUQUET',
    price: 260.00,
    category: 'Bespoke Bouquets',
    description: 'Fresh blush and soft pink heritage roses arranged with delicate textures in artisanal botanical paper.',
    image: '/src/assets/images/product_blush_peony_1791286573905.jpg',
    images: [
      '/src/assets/images/product_blush_peony_1791286573905.jpg',
      '/src/assets/images/hero_flower_arrangement_1791286563747.jpg',
      '/src/assets/images/product_plumeria_bouquet_1791456914092.jpg'
    ],
    stems: ['Blush Heritage Roses', 'Pale Lisianthus', 'Astilbe Sprigs', 'Silver Eucalyptus'],
    dimensions: '18 to 100 Roses Selection',
    includesVase: false,
    vaseType: 'Hand-tied with Silk Ribbon',
    badge: 'Atelier Favorite',
    isNewArrival: true,
    stemOptions: STEM_COUNT_OPTIONS,
    occasions: ['NEW ARRIVALS', 'ALL', 'FOR HER', 'BIRTHDAYS', 'WEDDINGS', 'HAPPY MOTHERS DAY', 'ROMANCE']
  },
  {
    id: 'red-bouquet',
    name: 'RED BOUQUET',
    price: 260.00,
    category: 'Signature Arrangements',
    description: 'Velvety deep crimson and classic heritage red roses, hand-bound with eucalyptus and bespoke botanical wrapping.',
    image: '/RED fl0wer 1.jpg',
    images: [
      '/RED fl0wer 1.jpg',
      '/RED fl0wer 3.jpg',
      '/RED fl0wer 2.jpg'
    ],
    stems: ['Classic Crimson Roses', 'Red Garden Spray Roses', 'Seeded Eucalyptus', 'Baby’s Breath'],
    dimensions: '18 to 100 Roses Selection',
    includesVase: false,
    vaseType: 'Hand-tied with Deep Red Dupioni Silk',
    badge: 'Romantic Classic',
    isNewArrival: true,
    stemOptions: STEM_COUNT_OPTIONS,
    occasions: ['NEW ARRIVALS', 'ALL', 'ROMANCE', 'FOR HER', 'BIRTHDAYS', 'WEDDINGS', 'HAPPY MOTHERS DAY']
  },
  {
    id: 'burgundy-bouquet',
    name: 'BURGUNDY BOUQUET',
    price: 260.00,
    category: 'Signature Arrangements',
    description: 'Moody, rich dark wine garden roses and maroon ranunculus intertwined with preserved textural autumn botanicals.',
    image: '/Bugendy 1 b.jpg',
    images: [
      '/Bugendy 1 b.jpg',
      '/Bugendy 1d.jpg',
      '/Bugendy 1c.jpg'
    ],
    stems: ['Deep Wine Garden Roses', 'Maroon Ranunculus', 'Chocolate Cosmos', 'Preserved Foliage'],
    dimensions: '18 to 100 Roses Selection',
    includesVase: false,
    vaseType: 'Handcrafted Raw Linen Wrap',
    badge: 'Dramatic Statement',
    isNewArrival: true,
    stemOptions: STEM_COUNT_OPTIONS,
    occasions: ['NEW ARRIVALS', 'ALL', 'ROMANCE', 'FOR HER', 'WEDDINGS']
  },
  {
    id: 'white-bouquet',
    name: 'WHITE BOUQUET',
    price: 260.00,
    category: 'Vase Curations',
    description: 'Luminous pure white garden roses, cloud hydrangeas, and silver dollar eucalyptus in a refined sculptural silhouette.',
    image: '/White fl0wer 3.jpg',
    images: [
      '/White fl0wer 3.jpg',
      '/White fl0wer 2.jpg',
      '/White fl0wer 1.jpg'
    ],
    stems: ['White O’Hara Garden Roses', 'Hydrangea Paniculata', 'Silver Dollar Eucalyptus', 'White Sweet Peas'],
    dimensions: '18 to 100 Roses Selection',
    includesVase: false,
    vaseType: 'Artisanal White Linen Wrap',
    badge: 'Timeless Elegance',
    isNewArrival: false,
    stemOptions: STEM_COUNT_OPTIONS,
    occasions: ['ALL', 'WEDDINGS', 'FOR HER', 'HAPPY MOTHERS DAY', 'BIRTHDAYS']
  },
  {
    id: 'plumeria-bouquet',
    name: 'PLUMERIA BOUQUET',
    price: 260.00,
    category: 'Bespoke Bouquets',
    description: 'Fragrant frangipani plumeria blossoms with golden-yellow centers paired with delicate sweet peas and tropical greenery.',
    image: '/src/assets/images/product_plumeria_bouquet_1791456914092.jpg',
    images: [
      '/src/assets/images/product_plumeria_bouquet_1791456914092.jpg',
      '/src/assets/images/product_white_serenade_1791286584177.jpg',
      '/src/assets/images/product_golden_meadow_1791286594251.jpg'
    ],
    stems: ['Velvety White & Gold Plumeria', 'Fragrant Sweet Peas', 'Tropical Greens', 'Scented Foliage'],
    dimensions: '18 to 100 Roses Selection',
    includesVase: false,
    vaseType: 'Hand-tied with Gold Silk Ribbon',
    badge: 'Exotic Bloom',
    isNewArrival: true,
    stemOptions: STEM_COUNT_OPTIONS,
    occasions: ['NEW ARRIVALS', 'ALL', 'FOR HER', 'BIRTHDAYS', 'HAPPY MOTHERS DAY', 'WEDDINGS']
  },
  {
    id: 'purse-bouquet',
    name: 'PURSE BOUQUET',
    price: 260.00,
    category: 'Signature Arrangements',
    description: 'Chic designer handbag floral box arrangement, overflowing with fresh garden blooms, fragrant roses, and an elegant chain handle.',
    image: '/SaveClip.App_750311924_17891990553577130_7792279543617129883_n.jpg',
    images: [
      '/SaveClip.App_750311924_17891990553577130_7792279543617129883_n.jpg',
      '/SaveClip.App_728627392_17887828545577130_2514251413721250237_n.jpg',
      '/SaveClip.App_730515885_17887881945577130_6392080131767771523_n.jpg'
    ],
    colorOptions: [
      {
        id: 'purple',
        name: 'Purple',
        hex: '#3a0245',
        image: '/SaveClip.App_750311924_17891990553577130_7792279543617129883_n.jpg'
      },
      {
        id: 'red',
        name: 'Red',
        hex: '#cd1a29',
        image: '/SaveClip.App_728627392_17887828545577130_2514251413721250237_n.jpg'
      },
      {
        id: 'pink',
        name: 'Pink',
        hex: '#e27e8a',
        image: '/SaveClip.App_730515885_17887881945577130_6392080131767771523_n.jpg'
      }
    ],
    stems: ['Pastel Garden Roses', 'Lisianthus Florets', 'Dusty Miller', 'Spray Carnations'],
    dimensions: 'Designer Handbag Box: 28cm H × 24cm W',
    includesVase: true,
    vaseType: 'Signature Structured Floral Purse Box with Handle',
    badge: 'Atelier Signature Box',
    isNewArrival: true,
    occasions: ['NEW ARRIVALS', 'ALL', 'FOR HER', 'BIRTHDAYS', 'ROMANCE', 'HAPPY MOTHERS DAY']
  },
  {
    id: 'pitch-bouquet',
    name: 'PITCH BOUQUET',
    price: 260.00,
    category: 'Bespoke Bouquets',
    description: 'Sublime soft peach and apricot heritage garden roses, complemented by delicate lisianthus and fresh eucalyptus in botanical wrapping.',
    image: '/src/assets/images/pitch_bouquet_1791463119157.jpg',
    images: [
      '/src/assets/images/pitch_bouquet_1791463119157.jpg',
      '/Pitch fl0wer 2.jpg',
      '/src/assets/images/product_golden_meadow_1791286594251.jpg'
    ],
    stems: ['Soft Peach Garden Roses', 'Apricot Lisianthus', 'Peach Ranunculus', 'Silver Eucalyptus'],
    dimensions: '18 to 100 Roses Selection',
    includesVase: false,
    vaseType: 'Hand-tied with Apricot Silk Ribbon',
    badge: 'New Arrival',
    isNewArrival: true,
    stemOptions: STEM_COUNT_OPTIONS,
    occasions: ['NEW ARRIVALS', 'ALL', 'FOR HER', 'BIRTHDAYS', 'WEDDINGS', 'HAPPY MOTHERS DAY', 'ROMANCE']
  },
  {
    id: 'black-bouquet',
    name: 'BLACK BOUQUET',
    price: 260.00,
    category: 'Signature Arrangements',
    description: 'Striking midnight Black Baccara roses and deep onyx blooms, hand-tied in minimalist dark silk and luxury matte botanical wrapping.',
    image: '/src/assets/images/black_bouquet_1791463130046.jpg',
    images: [
      '/src/assets/images/black_bouquet_1791463130046.jpg',
      '/src/assets/images/product_burgundy_bouquet_1791456902739.jpg',
      '/src/assets/images/product_red_bouquet_1791456884870.jpg'
    ],
    stems: ['Midnight Black Baccara Roses', 'Deep Onyx Dahlias', 'Smoky Preserved Foliage', 'Dark Botanical Accents'],
    dimensions: '18 to 100 Roses Selection',
    includesVase: false,
    vaseType: 'Hand-tied with Matte Black Satin Ribbon',
    badge: 'Couture Noir',
    isNewArrival: true,
    stemOptions: STEM_COUNT_OPTIONS,
    occasions: ['NEW ARRIVALS', 'ALL', 'ROMANCE', 'FOR HER']
  }
];
