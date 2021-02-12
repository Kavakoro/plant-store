const Order = require('./models/Order');

const ordersSeed = [
  {
    shippingAddress: '439 Stone Corner Lane',
    fullfilled: false,
  },
  {
    shippingAddress: '63332 Transport Pass',
    fullfilled: true,
  },
  {
    shippingAddress: '4 Glendale Circle',
    fullfilled: false,
  },
  {
    shippingAddress: '00930 Dwight Terrace',
    fullfilled: false,
  },
  {
    shippingAddress: '53952 Oak Crossing',
    fullfilled: true,
  },
  {
    shippingAddress: '253 Summer Ridge Pass',
    fullfilled: true,
  },
  {
    shippingAddress: '53896 Manley Drive',
    fullfilled: true,
  },
  {
    shippingAddress: '4 Kim Court',
    fullfilled: true,
  },
  {
    shippingAddress: '99 Waxwing Park',
    fullfilled: true,
  },
  {
    shippingAddress: '6 Saint Paul Place',
    fullfilled: false,
  },
  {
    shippingAddress: '643 Sherman Circle',
    fullfilled: true,
  },
  {
    shippingAddress: '73506 Red Cloud Alley',
    fullfilled: false,
  },
  {
    shippingAddress: '33904 5th Terrace',
    fullfilled: false,
  },
  {
    shippingAddress: '55 Grayhawk Plaza',
    fullfilled: false,
  },
  {
    shippingAddress: '78062 Pankratz Plaza',
    fullfilled: false,
  },
  {
    shippingAddress: '48261 Loftsgordon Alley',
    fullfilled: false,
  },
  {
    shippingAddress: '650 Hoffman Pass',
    fullfilled: false,
  },
  {
    shippingAddress: '6 Mcguire Pass',
    fullfilled: true,
  },
  {
    shippingAddress: '7 Anhalt Court',
    fullfilled: false,
  },
  {
    shippingAddress: '64915 Village Green Center',
    fullfilled: false,
  },
  {
    shippingAddress: '9931 Loftsgordon Plaza',
    fullfilled: true,
  },
  {
    shippingAddress: '4 Bowman Pass',
    fullfilled: false,
  },
  {
    shippingAddress: '7997 Sloan Trail',
    fullfilled: false,
  },
  {
    shippingAddress: '369 Reindahl Alley',
    fullfilled: false,
  },
  {
    shippingAddress: '7562 Bunting Center',
    fullfilled: false,
  },
  {
    shippingAddress: '05 Orin Parkway',
    fullfilled: false,
  },
  {
    shippingAddress: '135 Melrose Center',
    fullfilled: false,
  },
  {
    shippingAddress: '09 Waywood Street',
    fullfilled: false,
  },
  {
    shippingAddress: '2479 Center Pass',
    fullfilled: false,
  },
  {
    shippingAddress: '47346 Heffernan Junction',
    fullfilled: false,
  },
  {
    shippingAddress: '01 Oneill Court',
    fullfilled: false,
  },
  {
    shippingAddress: '7 Park Meadow Alley',
    fullfilled: true,
  },
  {
    shippingAddress: '346 Union Court',
    fullfilled: true,
  },
  {
    shippingAddress: '4943 Dawn Pass',
    fullfilled: true,
  },
  {
    shippingAddress: '08095 Caliangt Way',
    fullfilled: false,
  },
  {
    shippingAddress: '284 Corry Drive',
    fullfilled: false,
  },
  {
    shippingAddress: '0744 Melby Way',
    fullfilled: true,
  },
  {
    shippingAddress: '63333 Mayfield Alley',
    fullfilled: true,
  },
  {
    shippingAddress: '0 Claremont Drive',
    fullfilled: true,
  },
  {
    shippingAddress: '5792 Toban Point',
    fullfilled: true,
  },
  {
    shippingAddress: '08 Burning Wood Circle',
    fullfilled: false,
  },
  {
    shippingAddress: '5 Bunker Hill Crossing',
    fullfilled: false,
  },
  {
    shippingAddress: '341 Waywood Way',
    fullfilled: false,
  },
  {
    shippingAddress: '2192 Grasskamp Street',
    fullfilled: true,
  },
  {
    shippingAddress: '78866 Drewry Crossing',
    fullfilled: true,
  },
  {
    shippingAddress: '8475 Sunnyside Court',
    fullfilled: true,
  },
  {
    shippingAddress: '3874 Comanche Circle',
    fullfilled: true,
  },
  {
    shippingAddress: '7113 Carpenter Point',
    fullfilled: false,
  },
  {
    shippingAddress: '343 International Parkway',
    fullfilled: false,
  },
  {
    shippingAddress: '007 Melvin Center',
    fullfilled: true,
  },
  {
    shippingAddress: '52829 Graedel Hill',
    fullfilled: true,
  },
  {
    shippingAddress: '24 Amoth Trail',
    fullfilled: false,
  },
  {
    shippingAddress: '517 Ohio Junction',
    fullfilled: false,
  },
  {
    shippingAddress: '40337 Service Road',
    fullfilled: true,
  },
  {
    shippingAddress: '3 Armistice Park',
    fullfilled: false,
  },
  {
    shippingAddress: '538 Cody Lane',
    fullfilled: true,
  },
  {
    shippingAddress: '4 Alpine Park',
    fullfilled: true,
  },
  {
    shippingAddress: '44559 Lawn Lane',
    fullfilled: true,
  },
  {
    shippingAddress: '08208 Meadow Vale Place',
    fullfilled: false,
  },
  {
    shippingAddress: '4 Farwell Lane',
    fullfilled: true,
  },
  {
    shippingAddress: '710 Mockingbird Avenue',
    fullfilled: true,
  },
  {
    shippingAddress: '61157 Calypso Park',
    fullfilled: true,
  },
  {
    shippingAddress: '54563 Esch Street',
    fullfilled: false,
  },
  {
    shippingAddress: '6 Starling Circle',
    fullfilled: false,
  },
  {
    shippingAddress: '12 Glacier Hill Point',
    fullfilled: false,
  },
  {
    shippingAddress: '080 Charing Cross Way',
    fullfilled: true,
  },
  {
    shippingAddress: '1289 Lighthouse Bay Pass',
    fullfilled: true,
  },
  {
    shippingAddress: '6555 Washington Alley',
    fullfilled: false,
  },
  {
    shippingAddress: '8 Sachs Parkway',
    fullfilled: true,
  },
  {
    shippingAddress: '04 Independence Road',
    fullfilled: true,
  },
  {
    shippingAddress: '2 High Crossing Pass',
    fullfilled: true,
  },
  {
    shippingAddress: '76 Reindahl Alley',
    fullfilled: false,
  },
  {
    shippingAddress: '1087 Dwight Park',
    fullfilled: true,
  },
  {
    shippingAddress: '526 Del Sol Street',
    fullfilled: true,
  },
  {
    shippingAddress: '71869 Independence Lane',
    fullfilled: true,
  },
  {
    shippingAddress: '10687 Esch Avenue',
    fullfilled: false,
  },
  {
    shippingAddress: '61110 Shasta Road',
    fullfilled: false,
  },
  {
    shippingAddress: '3216 Cardinal Crossing',
    fullfilled: true,
  },
  {
    shippingAddress: '2317 Weeping Birch Pass',
    fullfilled: true,
  },
  {
    shippingAddress: '70817 Chive Plaza',
    fullfilled: true,
  },
  {
    shippingAddress: '89 Calypso Hill',
    fullfilled: true,
  },
  {
    shippingAddress: '56703 Melby Plaza',
    fullfilled: false,
  },
  {
    shippingAddress: '2034 Bonner Center',
    fullfilled: true,
  },
  {
    shippingAddress: '1 Holmberg Pass',
    fullfilled: true,
  },
  {
    shippingAddress: '611 Southridge Alley',
    fullfilled: true,
  },
  {
    shippingAddress: '85069 8th Lane',
    fullfilled: true,
  },
  {
    shippingAddress: '1 Anthes Point',
    fullfilled: false,
  },
  {
    shippingAddress: '3 Logan Park',
    fullfilled: true,
  },
  {
    shippingAddress: '48 3rd Crossing',
    fullfilled: true,
  },
  {
    shippingAddress: '419 Melrose Parkway',
    fullfilled: false,
  },
  {
    shippingAddress: '81 Comanche Road',
    fullfilled: false,
  },
  {
    shippingAddress: '70 Mcbride Way',
    fullfilled: true,
  },
  {
    shippingAddress: '5 Di Loreto Lane',
    fullfilled: true,
  },
  {
    shippingAddress: '4 Browning Pass',
    fullfilled: true,
  },
  {
    shippingAddress: '8 Stone Corner Place',
    fullfilled: true,
  },
  {
    shippingAddress: '33 Bellgrove Park',
    fullfilled: false,
  },
  {
    shippingAddress: '69997 Canary Center',
    fullfilled: false,
  },
  {
    shippingAddress: '38 Delladonna Place',
    fullfilled: false,
  },
];

module.exports = ordersSeed;
