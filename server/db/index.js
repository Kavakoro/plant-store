//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Plant = require('./models/Plant');
const Order = require('./models/Order');
const LineItem = require('./models/LineItem');

//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Plant, { through: LineItem, foreignKey: 'orderId' });
Plant.belongsToMany(Order, { through: LineItem, foreignKey: 'plantId' });

// Plant.belongsTo(User);
// User.hasMany(Plant);

const syncAndSeed = async () => {
  await db.sync({ force: true });

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '4321' }),
    User.create({ email: 'kate@gmail.com', password: 'ballislyf' }),
    User.create({ email: 'nes@gmail.com', password: 'nesisthebest' }),
    User.create({ email: 'kokko@gmail.com', password: 'kokkooo' }),
    User.create({ email: 'rommel@gmail.com', password: 'password' }),
  ]);

  const [cody, murphy, kate, nes, kokko, rommel] = users;

  const plants = await Promise.all([
    Plant.create({
      name: 'Mini Money Tree',
      description:
        'A lively, pet-friendly plant topped with palmate leaves upon a stout trunk. A mini-version of the beloved braided Money Tree.',
      size: 'Small — 9"-15" tall (including Ecopot)',
      sizeFilter: 1,
      light: 'Low to Partial — Low to bright indirect light',
      lightFilter: 1,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly: 'Yes — non-toxic to cats and dogs',
      petFilter: true,
      airCleaner:
        'Yes — Purifies air polluted with synthetic chemicals from cleaning products',
      img: '/images/minimoneytree.jpeg',
      price: 35,
      inventory: 0,
    }),
    Plant.create({
      name: 'Philodendron Brasil',
      description: 'Lively and trailing, with variegated, heart-shaped leaves.',
      size:
        'Medium — 10"-14" tall (including recycled plastic Ecopot), allow to trail',
      sizeFilter: 2,
      light: 'Low to Partial — Low to bright indirect light',
      lightFilter: 1,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
      petFilter: false,
      airCleaner: 'Yes — removes formaldehyde from air',
      img: '/images/PhilodendronBrasil.jpeg',
      price: 65,
      inventory: 2,
    }),
    Plant.create({
      name: 'Sansevieria Moonshine',
      description:
        'A rare and stunning statement plant, showing off blue silver leaves.',
      size: 'Medium — 11"-14" tall (including recycled plastic Ecopot)',
      sizeFilter: 2,
      light: 'Low to Partial — Low to bright indirect light',
      lightFilter: 1,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
      petFilter: false,
      airCleaner: 'Yes — removes formaldehyde from air',
      img: '/images/moonshine.jpeg',
      price: 65,
      inventory: 0,
    }),
    Plant.create({
      name: 'Dracaena Dorado',
      description:
        'Whimsical and low-maintenance, with long, dark green and yellow striped leaves atop sturdy canes. Also known as the Mass Cane Plant',
      size: 'Extra Large — 44"-54" tall (including recycled plastic Ecopot)',
      sizeFilter: 4,
      light: 'Low to Partial — Low to bright indirect light',
      lightFilter: 1,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly: 'No — Can cause mouth irritation and digestive reaction',
      petFilter: false,
      airCleaner:
        'Yes — Removes benzene, formaldehyde, xylene, and toluene from the air',
      img: '/images/DracaenaDorado.jpeg',
      price: 195,
      inventory: 15,
    }),
    Plant.create({
      name: 'Monstera',
      description:
        'Lively and wild with large, tropical leaves. Also known as the Swiss Cheese Plant',
      size:
        'Large — 26"-32" tall, 20"-26" wide (including recycled plastic Ecopot)',
      sizeFilter: 3,
      light: 'Partial to Bright — Bright indirect to full sun',
      lightFilter: 3,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
      petFilter: false,
      airCleaner: 'Yes — removes formaldehyde from air',
      img: '/images/Monstera.jpeg',
      price: 150,
      inventory: 8,
    }),
    Plant.create({
      name: 'Bird of Paradise',
      description:
        'Impressive and tropical with large, glossy leaves that naturally split over time.',
      size: 'Large — 34"-42" tall (including recycled plastic Ecopot)',
      sizeFilter: 3,
      light: 'Partial to Bright — Bright indirect to full sun',
      lightFilter: 3,
      difficulty: 'Easy — Relatively low maintenance',
      difficultyFilter: 2,
      petFriendly: 'No — Can cause mouth irritation and digestive reaction',
      petFilter: false,
      airCleaner: 'Yes — Removes toxins from air',
      img: '/images/BirdofParadise.jpeg',
      price: 150,
      inventory: 15,
    }),
    Plant.create({
      name: 'Aglaonema Spring Snow',
      description:
        'The Aglaonema Spring Snow features distinctive green foliage with white and yellow variegation and is known for its tolerance of many indoor conditions. Also known as the Chinese Evergreen',
      size:
        'Large — 22-26” tall, 20-24” wide (including recycled plastic Ecopot)',
      sizeFilter: 3,
      light: 'Low to Partial — Low to bright indirect light',
      lightFilter: 1,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly: 'No — Can cause mouth irritation and digestive reaction',
      petFilter: false,
      airCleaner: 'Yes — Removes air toxins',
      img: '/images/aglaonema.jpeg',
      price: 150,
      inventory: 20,
    }),
    Plant.create({
      name: 'Silver Pothos',
      description: 'Exquisite and trailing with silver-green leaves.',
      size:
        'Small — 7"-12" tall (including recycled plastic Ecopot), will trail',
      sizeFilter: 1,
      light: 'Low to Partial — Low to bright indirect light',
      lightFilter: 1,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly: 'No — Can cause mouth irritation and digestive reaction',
      petFilter: false,
      airCleaner:
        'Yes — Removes Formaldehyde, Xylene, and Benzene from the air',
      img: '/images/silverpothos.jpeg',
      price: 35,
      inventory: 5,
    }),
    Plant.create({
      name: 'Sansevieria',
      description:
        'Architectural and sturdy. This plant is easy to care for and highly adaptable. Also known as a Snake Plant and Mother-in-Law’s Tongue',
      size: 'Large — 30"-36" tall (including recycled plastic Ecopot)',
      sizeFilter: 3,
      light: 'Low to Partial — Low to bright indirect light',
      lightFilter: 1,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
      petFilter: false,
      airCleaner: 'Yes — removes formaldehyde from air',
      img: '/images/sansevieria.jpeg',
      price: 150,
      inventory: 23,
    }),
    Plant.create({
      name: 'Fiddle Leaf Fig',
      description:
        'Tall, sculptural, and dramatic. This plant will flourish in the right conditions.',
      size: 'Extra Large — 44"-58" tall (including recycled plastic Ecopot)',
      sizeFilter: 4,
      light: 'Medium — Bright indirect light',
      lightFilter: 2,
      difficulty: 'Moderate — Needs a bit of extra care',
      difficultyFilter: 3,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
      petFilter: false,
      airCleaner: 'Yes — removes formaldehyde from air',
      img: '/images/fiddlefig.jpeg',
      price: 195,
      inventory: 7,
    }),
    Plant.create({
      name: 'Ponytail Palm',
      description:
        'Fun, distinct, and hardy. This plant is low-maintenance and adaptable.',
      size: 'Medium — 15"-22" tall (including recycled plastic Ecopot)',
      sizeFilter: 2,
      light: 'Low to Partial — Low to bright indirect light',
      lightFilter: 1,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly: 'Yes — Non-toxic',
      petFilter: true,
      airCleaner: 'Yes — Removes air toxins',
      img: '/images/ponytail.jpeg',
      price: 65,
      inventory: 14,
    }),
    Plant.create({
      name: 'Bamboo Palm',
      description: 'Lush and dramatic, with dark green fronds.',
      size: 'Extra Large — 44"-58" tall (including recycled plastic Ecopot)',
      sizeFilter: 4,
      light: 'Low to Partial — Low to bright indirect light',
      lightFilter: 1,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly: 'Yes — Non-toxic and pet-friendly',
      petFilter: true,
      airCleaner: 'Yes — Removes formaldehyde from air',
      img: '/images/bamboopalm.jpeg',
      price: 195,
      inventory: 19,
    }),
    Plant.create({
      name: 'ZZ Plant',
      description:
        'Hardy and graceful with unique, layered leaves. This plant is tough, beautiful, and nearly indestructible.',
      size:
        'Large — 24"-33" tall (including recycled plastic Ecopot), 20"-24" wide',
      sizeFilter: 3,
      light: 'Low to Partial — Low to bright indirect light',
      lightFilter: 1,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
      petFilter: false,
      airCleaner: 'Yes — removes formaldehyde from air',
      img: '/images/zzplant.jpeg',
      price: 150,
      inventory: 22,
    }),
    Plant.create({
      name: 'Red Prayer Plant',
      description: 'Colorful and bold with hints of red on two-toned leaves',
      size: 'Small — 7"-12" tall (including recycled plastic Ecopot)',
      sizeFilter: 1,
      light: 'Low to Partial — Low to bright indirect light',
      lightFilter: 1,
      difficulty: 'Easy — Relatively low maintenance',
      difficultyFilter: 2,
      petFriendly: 'Yes — non-toxic to cats and dogs',
      petFilter: true,
      airCleaner: 'Yes — removes toxins from air',
      img: '/images/redprayerplant.jpeg',
      price: 35,
      inventory: 27,
    }),
    Plant.create({
      name: 'Prickly Pear Cactus',
      description:
        'An intriguing cactus with bright green paddle-like pads that actually grow on top of each other.',
      size: 'Medium — 13"-20" tall (including recycled plastic Ecopot)',
      sizeFilter: 2,
      light: 'Partial to Bright — Bright indirect to full sun',
      lightFilter: 3,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly: 'Yes — non-toxic, but beware of the sharp spines',
      petFilter: true,
      airCleaner: 'Yes — removes toxins from the air',
      img: '/images/pricklypearcactus.jpeg',
      price: 80,
      inventory: 26,
    }),
    Plant.create({
      name: 'Hedgehog Aloe',
      description:
        'Hedgehog Aloe is a very forgiving succulent, making it a perfect plant for hectic households or for first-time owners.',
      size: 'Small — 10”-16” tall (including recycled plastic Ecopot)',
      sizeFilter: 1,
      light: 'Partial to Bright — Bright indirect to full sun',
      lightFilter: 3,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
      petFilter: false,
      airCleaner: 'Yes — removes toxins from the air',
      img: '/images/HedgehogAloe.jpeg',
      price: 35,
      inventory: 21,
    }),
    Plant.create({
      name: 'Dracaena Marginata Open Weave',
      description:
        'Fun and delicate, with woven stems and spiky, upright leaves. Also known as the Madagascar Dragon Tree',
      size: 'Extra Large — 46"-58" tall (including recycled plastic Ecopot)',
      sizeFilter: 4,
      light: 'Low to Partial — Low to bright indirect light',
      lightFilter: 1,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
      petFilter: false,
      airCleaner:
        'Yes — removes formaldehyde, xylene, and toluene from the air',
      img: '/images/openWeave.jpeg',
      price: 195,
      inventory: 9,
    }),
    Plant.create({
      name: 'Kimberly Queen Fern',
      description:
        'This plant grows upright, making it perfect for hanging baskets, and its long, vertical, sword-shaped fronds never leave a mess.',
      size: 'Medium — 14"-20" tall (including recycled plastic Ecopot)',
      sizeFilter: 2,
      light: 'Low to Partial — Low to bright indirect light',
      lightFilter: 1,
      difficulty: 'Easy — Relatively low maintenance',
      difficultyFilter: 2,
      petFriendly: 'Yes — Non-toxic and pet-friendly',
      petFilter: true,
      airCleaner: 'Yes — removes toxins from the air',
      img: '/images/kimberlyFern.jpeg',
      price: 65,
      inventory: 33,
    }),
    Plant.create({
      name: 'Parlor Palm',
      description: 'Easy and graceful, with lush, dark green fronds.',
      size: 'Medium — 15"-22" tall (including recycled plastic Ecopot)',
      sizeFilter: 2,
      light: 'Low to Partial — Low to bright indirect light',
      lightFilter: 1,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly: 'Yes — non-toxic for cats and dogs',
      petFilter: true,
      airCleaner: 'Yes — removes formaldehyde from air',
      img: '/images/ParlorPalm.jpeg',
      price: 65,
      inventory: 34,
    }),
    Plant.create({
      name: 'Bromeliad Pineapple',
      description:
        'Bromeliad Pineapple is a unique, beautiful plant that will grow an edible pineapple fruit.',
      size: 'Medium — 12"-16" tall (including recycled plastic Ecopot)',
      sizeFilter: 2,
      light: 'Medium — Bright indirect light',
      lightFilter: 2,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly:
        'Yes — Bromeliads are not known to be toxic, but can cause contact dermatitis.',
      petFilter: true,
      airCleaner: 'Yes — Removes harmful pollutants from the air',
      img: '/images/pineapple.jpeg',
      price: 65,
      inventory: 25,
    }),
    Plant.create({
      name: 'Ficus Lyrata Bonsai',
      description:
        'Sculptural and dramatic, a bonsai version of the beloved Fiddle Leaf Fig. Also known as the Small Leaf Fiddle Leaf Fig',
      size: 'Medium — 12"–14" tall (including recycled plastic Ecopot)',
      sizeFilter: 2,
      light: 'Medium — Bright indirect light',
      lightFilter: 2,
      difficulty: 'Moderate — Needs a bit of extra care',
      difficultyFilter: 3,
      petFriendly: 'No — Can cause mouth irritation and digestive reaction',
      petFilter: false,
      airCleaner: 'Yes — Removes Formaldehyde from the air',
      img: '/images/bonsai.jpeg',
      price: 65,
      inventory: 20,
    }),
    Plant.create({
      name: 'Peperomia Ginny',
      description:
        'Easy to care for and almost succulent-like, Peperomia Ginny has light green leaves edged with hues of yellow and pink.',
      size: 'Small — 9"-14" tall (including recycled plastic Ecopot)',
      sizeFilter: 1,
      light: 'Low to Partial — Low to bright indirect light',
      lightFilter: 1,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly: 'Yes — Non toxic and pet friendly',
      petFilter: true,
      airCleaner: 'Yes — Removes harmful pollutants from the air',
      img: '/images/ginny.jpeg',
      price: 35,
      inventory: 39,
    }),
    Plant.create({
      name: 'Bromeliad Aechmea Pink',
      description:
        'Bromeliad Aechmea Pink is a unique, beautiful plant that features colorful, long-lasting blooms.',
      size: 'Medium — 15"-20" tall (including recycled plastic Ecopot)',
      sizeFilter: 2,
      light: 'Medium — Bright indirect light',
      lightFilter: 2,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly:
        'Yes — Bromeliads are not known to be toxic, but can cause contact dermatitis.',
      petFilter: true,
      airCleaner: 'Yes — Removes harmful pollutants from the air',
      img: '/images/pink.jpeg',
      price: 65,
      inventory: 31,
    }),
    Plant.create({
      name: 'Tradescantia Zebrina',
      description:
        'The Tradescantia Zebrina  is an easy and fast-growing plant that is loved for its boldly colored leaves and vining growth.',
      size:
        'Small — 8"-14" tall (including recycled plastic Ecopot), will trail',
      sizeFilter: 1,
      light: 'Low to Partial — Low to bright indirect light',
      lightFilter: 1,
      difficulty: 'No-fuss — Carefree',
      difficultyFilter: 1,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
      petFilter: false,
      airCleaner: 'Yes — removes toxins from air',
      img: '/images/zebrina.jpeg',
      price: 35,
      inventory: 0,
    }),
  ]);

  const [
    minimoney,
    philodendron,
    moonshine,
    draca,
    monstera,
    BirdofParadise,
    aglaonema,
    silver,
    sansevieria,
    fiddlefig,
    ponytail,
    bamboopalm,
    zzplant,
    redprayerplant,
    pricklypear,
    HedgehogAloe,
    dragonTree,
    kimberlyFern,
    ParlorPalm,
    pineapple,
    bonsai,
    ginny,
    pink,
    zebrina,
  ] = plants;

  //seed orders
  const order1 = await Order.create({ shippingAddress: '123 Bloomscape St' });
  const order2 = await Order.create({ shippingAddress: '211 nw 21 terrace' });
  const order3 = await Order.create({
    shippingAddress: '543 Fullstack Academy Rd',
    fullfilled: true,
  });
  const order4 = await Order.create({ shippingAddress: '777 Lucky Street' });

  await order1.addPlant(BirdofParadise);
  await order2.addPlants([minimoney, philodendron, moonshine]);
  //trying to add two types of a plant will cause an error because of lineItem. I think we need somesort of constraint here?
  //how can i incrememnt the 'Amount' in a lineItem below???
  //  original: error: duplicate key value violates unique constraint "lineitems_pkey"
  //    detail: 'Key ("orderId", "plantId")=(f2802c6a-6357-413d-a787-3d902b1303b8, 12) already exists.',
  //im not sure how to go around this...
  await order3.addPlants([
    dragonTree,
    silver,
    bamboopalm,
    //bamboopalm,
    pricklypear,
  ]);

  await order4.addPlants([
    pricklypear,
    minimoney,
    BirdofParadise,
    moonshine,
    //moonshine,
  ]);

  await nes.addOrder([order1]);
  await kokko.addOrders([order2, order3]);
  await rommel.addOrder([order4]);

  return {
    users: {
      cody,
      murphy,
      kate,
      nes,
      kokko,
      rommel,
    },
    plants: {
      minimoney,
      philodendron,
      moonshine,
      draca,
      monstera,
      BirdofParadise,
      aglaonema,
      silver,
      sansevieria,
      fiddlefig,
      ponytail,
      bamboopalm,
      zzplant,
      redprayerplant,
      pricklypear,
      HedgehogAloe,
      dragonTree,
      kimberlyFern,
      ParlorPalm,
      pineapple,
      bonsai,
      ginny,
      pink,
      zebrina,
    },
    orders: {
      order1,
      order2,
      order3,
      order4,
    },
  };
};

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Plant,
    Order,
    LineItem,
  },
};
