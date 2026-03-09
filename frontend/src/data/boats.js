export const boats = [
  {
    id: 1,
    slug: 'maverick',
    name: 'Катер Мэверик',
    pricePerHour: 19000,
    capacity: 10,
    length: 12,
    year: 2025,
    description: 'Современный и комфортабельный катер идеально подходит для прогулок по рекам и каналам Санкт-Петербурга. Оснащен всем необходимым для комфортного отдыха.',
    cardImage: [
      require('@/assets/cater-maverik-1.webp'),
      require('@/assets/cater-maverik-2.webp'),
    ],
    images: [
      require('@/assets/meverik-1.jpg.webp'),
      require('@/assets/meverik-2.jpg.webp'),
      require('@/assets/meverik-3.jpg.webp'),
      require('@/assets/meverik-4.jpg.webp'),
      require('@/assets/meverik-5.jpg.webp'),
      require('@/assets/meverik-6.jpg.webp'),
      require('@/assets/meverik-7.jpg.webp'),
      require('@/assets/meverik-8.jpg.webp'),
    ],
    features: [
      'Музыкальная система',
      'Холодильник',
      'Мягкие сиденья',
      'Навес от солнца',
      'Спасательные жилеты',
      'Капитан в стоимость'
    ],
    specifications: {
      engine: 'Yamaha 150 л.с.',
      maxSpeed: '45 км/ч',
      fuelType: 'Бензин',
      cabins: 'Открытая палуба'
    }
  },
  {
    id: 2,
    slug: 'yalta',
    name: 'Ялта',
    pricePerHour: 19000,
    capacity: 10,
    length: 5.5,
    year: 2021,
    description: 'Классический катер с элегантным дизайном. Отлично подходит для романтических прогулок и семейного отдыха на воде.',
    cardImage: [
      require('@/assets/our-boats-2.png'),
    ],
    images: [
      require('@/assets/our-boats-2.png'),
    ],
    features: [
      'Аудиосистема',
      'Мини-бар',
      'Комфортные сиденья',
      'Тент',
      'Спасательное оборудование',
      'Опытный капитан'
    ],
    specifications: {
      engine: 'Mercury 140 л.с.',
      maxSpeed: '42 км/ч',
      fuelType: 'Бензин',
      cabins: 'Полуоткрытая палуба'
    }
  },
  {
    id: 3,
    slug: 'golandets',
    name: 'Голандец',
    pricePerHour: 19000,
    capacity: 10,
    length: 5.5,
    year: 2023,
    description: 'Новейший катер премиум-класса с роскошной отделкой. Идеален для деловых встреч и VIP-прогулок.',
    cardImage: [
      require('@/assets/our-boats-3.png'),
    ],
    images: [
      require('@/assets/our-boats-3.png'),
    ],
    features: [
      'Премиум аудио',
      'Винный холодильник',
      'Кожаные сиденья',
      'Климат-контроль',
      'Полный комплект безопасности',
      'Профессиональный капитан'
    ],
    specifications: {
      engine: 'Volvo Penta 180 л.с.',
      maxSpeed: '50 км/ч',
      fuelType: 'Дизель',
      cabins: 'Закрытая каюта'
    }
  },
  {
    id: 4,
    slug: 'boat-4',
    name: 'Катер Премиум',
    pricePerHour: 25000,
    capacity: 12,
    length: 7.2,
    year: 2023,
    description: 'Просторный катер премиум-класса для больших компаний. Максимальный комфорт и безопасность на воде.',
    cardImage: [
      require('@/assets/our-boats-4.png'),
    ],
    images: [
      require('@/assets/our-boats-4.png'),
    ],
    features: [
      'Hi-Fi система',
      'Большой холодильник',
      'Панорамные окна',
      'Отопление',
      'Расширенная безопасность',
      'Два капитана'
    ],
    specifications: {
      engine: 'Twin Yamaha 200 л.с.',
      maxSpeed: '55 км/ч',
      fuelType: 'Бензин',
      cabins: '2 каюты'
    }
  }
  ,
  {
    id: 5,
    slug: 'francesco',
    name: 'Francesco',
    pricePerHour: 18000,
    capacity: 10,
    length: 6.0,
    year: 2022,
    description: 'Комфортный катер для семейных и дружеских прогулок, с продуманной планировкой и мягкой меблировкой.',
    cardImage: [
      require('@/assets/yachts-5.png'),
    ],
    images: [
      require('@/assets/yachts-5.png'),
    ],
    features: [
      'Аудиосистема',
      'Мини-холодильник',
      'Навес от солнца',
      'Спасательные жилеты',
      'Опытный капитан'
    ],
    specifications: {
      engine: 'Yamaha 150 л.с.',
      maxSpeed: '44 км/ч',
      fuelType: 'Бензин',
      cabins: 'Открытая палуба'
    }
  },
  {
    id: 6,
    slug: 'cherry',
    name: 'Cherry',
    pricePerHour: 20000,
    capacity: 10,
    length: 6.2,
    year: 2023,
    description: 'Стильный и быстрый катер с увеличенной палубой — отличное решение для активного отдыха на воде.',
    cardImage: [
      require('@/assets/yachts-6.png'),
    ],
    images: [
      require('@/assets/yachts-6.png'),
    ],
    features: [
      'Премиум аудио',
      'Кожаные сиденья',
      'Барная стойка',
      'Спасательное оборудование'
    ],
    specifications: {
      engine: 'Mercury 160 л.с.',
      maxSpeed: '48 км/ч',
      fuelType: 'Бензин',
      cabins: 'Полуоткрытая палуба'
    }
  },
  {
    id: 7,
    slug: 'beluga',
    name: 'Beluga',
    pricePerHour: 17000,
    capacity: 10,
    length: 7.0,
    year: 2021,
    description: 'Парусная яхта для спокойных прогулок и обучения парусному делу, легко управляется и стабильна в море.',
    cardImage: [
      require('@/assets/sailing-1.png'),
    ],
    images: [
      require('@/assets/sailing-1.png'),
    ],
    features: [
      'Паруса',
      'Навигационное оборудование',
      'Места для отдыха',
      'Спасательное оборудование'
    ],
    specifications: {
      engine: 'Auxiliary 40 л.с.',
      maxSpeed: '15 узлов',
      fuelType: 'Дизель',
      cabins: '1 каюта'
    }
  },
  {
    id: 8,
    slug: 'geleon',
    name: 'Geleon',
    pricePerHour: 17500,
    capacity: 10,
    length: 7.5,
    year: 2022,
    description: 'Современная парусная яхта с удобной кормовой зоной и хорошей управляемостью.',
    cardImage: [
      require('@/assets/sailing-2.png'),
    ],
    images: [
      require('@/assets/sailing-2.png'),
    ],
    features: [
      'Паруса',
      'Комфортная палуба',
      'Навигация',
      'Спасательные средства'
    ],
    specifications: {
      engine: 'Auxiliary 50 л.с.',
      maxSpeed: '16 узлов',
      fuelType: 'Дизель',
      cabins: '1 каюта'
    }
  },
  {
    id: 9,
    slug: 'amsterdam',
    name: 'Amsterdam',
    pricePerHour: 19000,
    capacity: 12,
    length: 8.0,
    year: 2023,
    description: 'Просторная парусная яхта для больших компаний и длительных прогулок.',
    cardImage: [
      require('@/assets/sailing-3.png'),
    ],
    images: [
      require('@/assets/sailing-3.png'),
    ],
    features: [
      'Большая палуба',
      'Каюта для отдыха',
      'Навигационные приборы',
      'Капитан в стоимость'
    ],
    specifications: {
      engine: 'Auxiliary 60 л.с.',
      maxSpeed: '17 узлов',
      fuelType: 'Дизель',
      cabins: '2 каюты'
    }
  }
];

export function getBoatBySlug(slug) {
  return boats.find(boat => boat.slug === slug);
}

export function getBoatById(id) {
  return boats.find(boat => boat.id === parseInt(id));
}
