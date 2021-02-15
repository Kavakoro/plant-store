//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Plant = require('./models/Plant');
const Order = require('./models/Order');
const LineItem = require('./models/LineItem');
const ordersSeed = require('./orderSeed');
const usersSeed = require('./userSeed');
const plantsSeed = require('./plantSeed');
//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Plant, { through: LineItem, foreignKey: 'orderId' });
Plant.belongsToMany(Order, { through: LineItem, foreignKey: 'plantId' });

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
      size: 1,
      light: 1,
      difficulty: 1,
      petFriendly: 'Yes — non-toxic to cats and dogs',
      airCleaner:
        'Yes — Purifies air polluted with synthetic chemicals from cleaning products',
      img: '/images/minimoneytree.jpeg',
      price: 35,
      inventory: 0,
    }),
    Plant.create({
      name: 'Philodendron Brasil',
      description: 'Lively and trailing, with variegated, heart-shaped leaves.',
      size: 2,
      light: 1,
      difficulty: 1,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
      airCleaner: 'Yes — removes formaldehyde from air',
      img: '/images/PhilodendronBrasil.jpeg',
      price: 65,
      inventory: 2,
    }),
    Plant.create({
      name: 'Sansevieria Moonshine',
      description:
        'A rare and stunning statement plant, showing off blue silver leaves.',
      size: 2,
      light: 1,
      difficulty: 1,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
      airCleaner: 'Yes — removes formaldehyde from air',
      img: '/images/moonshine.jpeg',
      price: 65,
      inventory: 0,
    }),
    Plant.create({
      name: 'Dracaena Dorado',
      description:
        'Whimsical and low-maintenance, with long, dark green and yellow striped leaves atop sturdy canes. Also known as the Mass Cane Plant',
      size: 4,
      light: 1,
      difficulty: 1,
      petFriendly: 'No — Can cause mouth irritation and digestive reaction',
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
      size: 3,
      light: 3,
      difficulty: 1,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
      airCleaner: 'Yes — removes formaldehyde from air',
      img: '/images/Monstera.jpeg',
      price: 150,
      inventory: 8,
    }),
    Plant.create({
      name: 'Bird of Paradise',
      description:
        'Impressive and tropical with large, glossy leaves that naturally split over time.',
      size: 3,
      light: 3,
      difficulty: 2,
      petFriendly: 'No — Can cause mouth irritation and digestive reaction',
      airCleaner: 'Yes — Removes toxins from air',
      img: '/images/BirdofParadise.jpeg',
      price: 150,
      inventory: 15,
    }),
    Plant.create({
      name: 'Aglaonema Spring Snow',
      description:
        'The Aglaonema Spring Snow features distinctive green foliage with white and yellow variegation and is known for its tolerance of many indoor conditions. Also known as the Chinese Evergreen',
      size: 3,
      light: 1,
      difficulty: 1,
      petFriendly: 'No — Can cause mouth irritation and digestive reaction',
      airCleaner: 'Yes — Removes air toxins',
      img: '/images/aglaonema.jpeg',
      price: 150,
      inventory: 20,
    }),
    Plant.create({
      name: 'Silver Pothos',
      description: 'Exquisite and trailing with silver-green leaves.',
      size: 1,
      light: 1,
      difficulty: 1,
      petFriendly: 'No — Can cause mouth irritation and digestive reaction',
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
      size: 3,
      light: 1,
      difficulty: 1,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
      airCleaner: 'Yes — removes formaldehyde from air',
      img: '/images/sansevieria.jpeg',
      price: 150,
      inventory: 23,
    }),
    Plant.create({
      name: 'Fiddle Leaf Fig',
      description:
        'Tall, sculptural, and dramatic. This plant will flourish in the right conditions.',
      size: 4,
      light: 2,
      difficulty: 3,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
      airCleaner: 'Yes — removes formaldehyde from air',
      img: '/images/fiddlefig.jpeg',
      price: 195,
      inventory: 7,
    }),
    Plant.create({
      name: 'Ponytail Palm',
      description:
        'Fun, distinct, and hardy. This plant is low-maintenance and adaptable.',
      size: 2,
      light: 1,
      difficulty: 1,
      petFriendly: 'Yes — Non-toxic',
      airCleaner: 'Yes — Removes air toxins',
      img: '/images/ponytail.jpeg',
      price: 65,
      inventory: 14,
    }),
    Plant.create({
      name: 'Bamboo Palm',
      description: 'Lush and dramatic, with dark green fronds.',
      size: 4,
      light: 1,
      difficulty: 1,
      petFriendly: 'Yes — Non-toxic and pet-friendly',
      airCleaner: 'Yes — Removes formaldehyde from air',
      img: '/images/bamboopalm.jpeg',
      price: 195,
      inventory: 19,
    }),
    Plant.create({
      name: 'ZZ Plant',
      description:
        'Hardy and graceful with unique, layered leaves. This plant is tough, beautiful, and nearly indestructible.',
      size: 3,
      light: 1,
      difficulty: 1,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
      airCleaner: 'Yes — removes formaldehyde from air',
      img: '/images/zzplant.jpeg',
      price: 150,
      inventory: 22,
    }),
    Plant.create({
      name: 'Red Prayer Plant',
      description: 'Colorful and bold with hints of red on two-toned leaves',
      size: 1,
      light: 1,
      difficulty: 2,
      petFriendly: 'Yes — non-toxic to cats and dogs',
      airCleaner: 'Yes — removes toxins from air',
      img: '/images/redprayerplant.jpeg',
      price: 35,
      inventory: 27,
    }),
    Plant.create({
      name: 'Prickly Pear Cactus',
      description:
        'An intriguing cactus with bright green paddle-like pads that actually grow on top of each other.',
      size: 2,
      light: 3,
      difficulty: 1,
      petFriendly: 'Yes — non-toxic, but beware of the sharp spines',
      airCleaner: 'Yes — removes toxins from the air',
      img: '/images/pricklypearcactus.jpeg',
      price: 80,
      inventory: 26,
    }),
    Plant.create({
      name: 'Hedgehog Aloe',
      description:
        'Hedgehog Aloe is a very forgiving succulent, making it a perfect plant for hectic households or for first-time owners.',
      size: 1,
      light: 3,
      difficulty: 1,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
      airCleaner: 'Yes — removes toxins from the air',
      img: '/images/HedgehogAloe.jpeg',
      price: 35,
      inventory: 21,
    }),
    Plant.create({
      name: 'Dracaena Marginata Open Weave',
      description:
        'Fun and delicate, with woven stems and spiky, upright leaves. Also known as the Madagascar Dragon Tree',
      size: 4,
      light: 1,
      difficulty: 1,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
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
      size: 2,
      light: 1,
      difficulty: 2,
      petFriendly: 'Yes — Non-toxic and pet-friendly',
      airCleaner: 'Yes — removes toxins from the air',
      img: '/images/kimberlyFern.jpeg',
      price: 65,
      inventory: 33,
    }),
    Plant.create({
      name: 'Parlor Palm',
      description: 'Easy and graceful, with lush, dark green fronds.',
      size: 2,
      light: 1,
      difficulty: 1,
      petFriendly: 'Yes — non-toxic for cats and dogs',
      airCleaner: 'Yes — removes formaldehyde from air',
      img: '/images/ParlorPalm.jpeg',
      price: 65,
      inventory: 34,
    }),
    Plant.create({
      name: 'Bromeliad Pineapple',
      description:
        'Bromeliad Pineapple is a unique, beautiful plant that will grow an edible pineapple fruit.',
      size: 2,
      light: 2,
      difficulty: 1,
      petFriendly:
        'Yes — Bromeliads are not known to be toxic, but can cause contact dermatitis.',
      airCleaner: 'Yes — Removes harmful pollutants from the air',
      img: '/images/pineapple.jpeg',
      price: 65,
      inventory: 25,
    }),
    Plant.create({
      name: 'Ficus Lyrata Bonsai',
      description:
        'Sculptural and dramatic, a bonsai version of the beloved Fiddle Leaf Fig. Also known as the Small Leaf Fiddle Leaf Fig',
      size: 2,
      light: 2,
      difficulty: 3,
      petFriendly: 'No — Can cause mouth irritation and digestive reaction',
      airCleaner: 'Yes — Removes Formaldehyde from the air',
      img: '/images/bonsai.jpeg',
      price: 65,
      inventory: 20,
    }),
    Plant.create({
      name: 'Peperomia Ginny',
      description:
        'Easy to care for and almost succulent-like, Peperomia Ginny has light green leaves edged with hues of yellow and pink.',
      size: 1,
      light: 1,
      difficulty: 1,
      petFriendly: 'Yes — Non toxic and pet friendly',
      airCleaner: 'Yes — Removes harmful pollutants from the air',
      img: '/images/ginny.jpeg',
      price: 35,
      inventory: 39,
    }),
    Plant.create({
      name: 'Bromeliad Aechmea Pink',
      description:
        'Bromeliad Aechmea Pink is a unique, beautiful plant that features colorful, long-lasting blooms.',
      size: 2,
      light: 2,
      difficulty: 1,
      petFriendly:
        'Yes — Bromeliads are not known to be toxic, but can cause contact dermatitis.',
      airCleaner: 'Yes — Removes harmful pollutants from the air',
      img: '/images/pink.jpeg',
      price: 65,
      inventory: 31,
    }),
    Plant.create({
      name: 'Tradescantia Zebrina',
      description:
        'The Tradescantia Zebrina  is an easy and fast-growing plant that is loved for its boldly colored leaves and vining growth.',
      size: 1,
      light: 1,
      difficulty: 1,
      petFriendly: 'No — can cause mouth irritation and digestive reaction',
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
  const order1 = await Order.create({
    streetAddress: '85127 Manley Avenue',
    city: 'Newark',
    state: 'DE',
    zipCode: 61889,
    fullfilled: false,
    total: 0,
  });
  const order2 = await Order.create({
    streetAddress: '67 Chive Parkway',
    city: 'West Palm Beach',
    state: 'FL',
    zipCode: 64446,
    fullfilled: false,
    total: 0,
  });
  const order3 = await Order.create({
    streetAddress: '2708 Hoard Parkway',
    city: 'North Hollywood',
    state: 'CA',
    zipCode: 33902,
    fullfilled: false,
    total: 0,
  });
  const order4 = await Order.create({
    streetAddress: '87 Waywood Plaza',
    city: 'Las Vegas',
    state: 'NV',
    zipCode: 74258,
    fullfilled: false,
    total: 0,
  });
  const order5 = await Order.create({
    streetAddress: '7602 Annamark Parkway',
    city: 'Pasadena',
    state: 'CA',
    zipCode: 89125,
    fullfilled: false,
    total: 0,
  });
  const order6 = await Order.create({
    streetAddress: '089 Oak Valley Court',
    city: 'El Paso',
    state: 'TX',
    zipCode: 46799,
    fullfilled: false,
    total: 0,
  });

  await order1.addPlant(BirdofParadise);
  await order2.addPlants([minimoney, philodendron, moonshine]);
  await order3.addPlants([dragonTree, silver, bamboopalm, pricklypear]);
  await order4.addPlants([pricklypear, minimoney, BirdofParadise, moonshine]);
  await order5.addPlants([
    ponytail,
    bamboopalm,
    zzplant,
    redprayerplant,
    pricklypear,
    HedgehogAloe,
    dragonTree,
  ]);

  await order6.addPlants([pineapple, bonsai, ginny, pink, zebrina]);

  await nes.addOrder([order1]);
  await kokko.addOrders([order2, order3]);
  await rommel.addOrder([order4]);
  await kate.addOrders([order5, order6]);

  const lineItem1 = await LineItem.findOne({
    where: {
      orderId: order1.id,
      plantId: BirdofParadise.id,
    },
  });
  lineItem1.amount = 2;
  await lineItem1.save();

  const lineItem2 = await LineItem.findOne({
    where: {
      orderId: order2.id,
      plantId: minimoney.id,
    },
  });
  lineItem2.amount = 4;
  await lineItem2.save();

  const lineItem3 = await LineItem.findOne({
    where: {
      orderId: order2.id,
      plantId: philodendron.id,
    },
  });
  lineItem3.amount = 6;
  await lineItem3.save();

  const lineItem4 = await LineItem.findOne({
    where: {
      orderId: order2.id,
      plantId: moonshine.id,
    },
  });
  lineItem4.amount = 5;
  await lineItem4.save();

  const lineItem5 = await LineItem.findOne({
    where: {
      orderId: order3.id,
      plantId: pricklypear.id,
    },
  });
  lineItem5.amount = 3;
  await lineItem5.save();

  const lineItem6 = await LineItem.findOne({
    where: {
      orderId: order3.id,
      plantId: bamboopalm.id,
    },
  });
  lineItem6.amount = 3;
  await lineItem6.save();

  const lineItem7 = await LineItem.findOne({
    where: {
      orderId: order4.id,
      plantId: moonshine.id,
    },
  });
  lineItem7.amount = 7;
  await lineItem7.save();

  const lineItem8 = await LineItem.findOne({
    where: {
      orderId: order5.id,
      plantId: ponytail.id,
    },
  });
  lineItem8.amount = 7;
  await lineItem8.save();

  const lineItem9 = await LineItem.findOne({
    where: {
      orderId: order6.id,
      plantId: pineapple.id,
    },
  });
  lineItem9.amount = 6;
  await lineItem9.save();

  const lineItem10 = await LineItem.findOne({
    where: {
      orderId: order6.id,
      plantId: bonsai.id,
    },
  });
  lineItem10.amount = 9;
  await lineItem10.save();

  //comment out below if you want to remove large USERS dummy data
  const newUsers = await Promise.all(
    usersSeed.map((user) => {
      return User.create(user);
    })
  );

  //comment out if you want to remove large PLANTS dummy data
  const newPlants = await Promise.all(
    plantsSeed.map((plant) => {
      return Plant.create(plant);
    })
  );

  //here is some dummy data for ORDERS but i dont think we should do large order data since it cant be tied to a userId this way
  // const newOrders = await Promise.all(
  //   ordersSeed.map((order) => {
  //     return Order.create(order);
  //   })
  // );

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
