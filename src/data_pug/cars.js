const data = {
  pageTitle: 'Каталог автомобилей',
  subtitle: 'Большой список автомобилей с характеристиками, историей и оценкой состояния',

  userBudget: 22000,

  garage: {
    name: 'Auto Expert Garage',
    city: 'Thessaloniki',
    isOpen: true,
    rating: 4.9,
  },

  filters: [
    {
      label: 'Тип кузова',
      value: 'Кроссовер',
    },
    {
      label: 'Бюджет',
      value: 'до $22000',
    },
    {
      label: 'Коробка',
      value: 'Автомат / DSG',
    },
  ],

  cars: [
    {
      id: 1,
      brand: 'Skoda',
      model: 'Yeti',
      year: 2014,
      status: 'used',
      price: 12500,
      mileage: 142000,
      color: 'Белый',
      transmission: 'DSG7 DQ200',
      drive: 'Передний',
      isRecommended: true,
      hasWarranty: false,

      engine: {
        volume: 1.2,
        type: 'TSI бензин турбо',
        powerHp: 105,
        torqueNm: 175,
      },

      fuelConsumption: {
        city: 8.2,
        highway: 5.8,
        mixed: 6.7,
      },

      condition: {
        grade: 'good',
        issues: [
          'Есть небольшие сколы на капоте',
          'Потёртость водительского сиденья',
        ],
      },

      features: [
        {
          category: 'Комфорт',
          items: [
            'Климат-контроль',
            'Подогрев передних сидений',
            'Круиз-контроль',
          ],
        },
        {
          category: 'Безопасность',
          items: [
            'ABS',
            'ESP',
            'Фронтальные подушки безопасности',
            'Боковые подушки безопасности',
          ],
        },
        {
          category: 'Мультимедиа',
          items: [
            'Bluetooth',
            'AUX',
            'USB',
          ],
        },
      ],

      serviceHistory: [
        {
          date: '2022-04-10',
          mileage: 110000,
          description: 'Замена сцепления DSG',
          cost: 900,
        },
        {
          date: '2024-08-15',
          mileage: 131000,
          description: 'Замена масла и фильтров',
          cost: 180,
        },
        {
          date: '2026-05-20',
          mileage: 142000,
          description: 'Ремонт мехатроника DSG',
          cost: 1300,
        },
      ],

      owners: [
        {
          name: 'Первый владелец',
          from: 2014,
          to: 2020,
          comment: 'Обслуживание у официального дилера',
        },
        {
          name: 'Второй владелец',
          from: 2020,
          to: 2026,
          comment: 'Автомобиль использовался в городе',
        },
      ],

      availability: [
        {
          branchName: 'Thessaloniki Center',
          count: 1,
        },
        {
          branchName: 'Athens North',
          count: 0,
        },
      ],
    },

    {
      id: 2,
      brand: 'Audi',
      model: 'Q3',
      year: 2018,
      status: 'used',
      price: 23500,
      mileage: 78000,
      color: 'Серый',
      transmission: 'S tronic',
      drive: 'Полный quattro',
      isRecommended: false,
      hasWarranty: true,

      engine: {
        volume: 2.0,
        type: 'TFSI бензин турбо',
        powerHp: 180,
        torqueNm: 320,
      },

      fuelConsumption: {
        city: 9.5,
        highway: 6.2,
        mixed: 7.4,
      },

      condition: {
        grade: 'excellent',
        issues: [],
      },

      features: [
        {
          category: 'Комфорт',
          items: [
            'Кожаный салон',
            'Электропривод сидений',
            'Двухзонный климат-контроль',
            'Парктроники',
          ],
        },
        {
          category: 'Безопасность',
          items: [
            'ABS',
            'ESP',
            'Ассистент удержания полосы',
            'Камера заднего вида',
          ],
        },
        {
          category: 'Мультимедиа',
          items: [
            'MMI',
            'Bluetooth',
            'Навигация',
            'CarPlay',
          ],
        },
      ],

      serviceHistory: [
        {
          date: '2021-03-12',
          mileage: 42000,
          description: 'Плановое ТО',
          cost: 350,
        },
        {
          date: '2023-09-22',
          mileage: 65000,
          description: 'Замена тормозных дисков и колодок',
          cost: 600,
        },
      ],

      owners: [
        {
          name: 'Первый владелец',
          from: 2018,
          to: 2026,
          comment: 'Один владелец, гаражное хранение',
        },
      ],

      availability: [
        {
          branchName: 'Thessaloniki Center',
          count: 0,
        },
        {
          branchName: 'Athens North',
          count: 1,
        },
      ],
    },

    {
      id: 3,
      brand: 'Toyota',
      model: 'Corolla',
      year: 2023,
      status: 'new',
      price: 21500,
      mileage: 0,
      color: 'Синий',
      transmission: 'CVT',
      drive: 'Передний',
      isRecommended: true,
      hasWarranty: true,

      engine: {
        volume: 1.8,
        type: 'Hybrid',
        powerHp: 140,
        torqueNm: 185,
      },

      fuelConsumption: {
        city: 4.2,
        highway: 4.8,
        mixed: 4.5,
      },

      condition: {
        grade: 'excellent',
        issues: [],
      },

      features: [
        {
          category: 'Комфорт',
          items: [
            'Климат-контроль',
            'Подогрев сидений',
            'Бесключевой доступ',
          ],
        },
        {
          category: 'Безопасность',
          items: [
            'Toyota Safety Sense',
            'Адаптивный круиз-контроль',
            'Автоторможение',
            'Контроль полосы',
          ],
        },
        {
          category: 'Мультимедиа',
          items: [
            'Android Auto',
            'Apple CarPlay',
            'Bluetooth',
            'Камера заднего вида',
          ],
        },
      ],

      serviceHistory: [],

      owners: [],

      availability: [
        {
          branchName: 'Thessaloniki Center',
          count: 3,
        },
        {
          branchName: 'Athens North',
          count: 2,
        },
      ],
    },
  ],
}

export default data