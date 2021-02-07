//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Plant = require("./models/Plant");
const Order = require("./models/Order");
const Ledger = require("./models/Ledger");

//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Plant, { through: Ledger, foreignKey: "orderId" });
Plant.belongsToMany(Order, { through: Ledger, foreignKey: "plantId" });

Plant.belongsTo(User);
User.hasMany(Plant);

const syncAndSeed = async () => {
	await db.sync({ force: true });

	const users = await Promise.all([
		User.create({ email: "cody@email.com", password: "123" }),
		User.create({ email: "murphy@email.com", password: "4321" }),
		User.create({ email: "kate@gmail.com", password: "ballislyf" }),
		User.create({ email: "nes@gmail.com", password: "nesisthebest" }),
		User.create({ email: "kokko@gmail.com", password: "kokkooo" }),
		User.create({ email: "rommel@gmail.com", password: "password" }),
	]);

	const [cody, murphy, kate, nes, kokko, rommel] = users;

	const plants = await Promise.all([
		Plant.create({
			name: "Mini Money Tree",
			description:
				"A lively, pet-friendly plant topped with palmate leaves upon a stout trunk. A mini-version of the beloved braided Money Tree.",
			size: 'Small — 9"-15" tall (including Ecopot)',
			light: "Low to Partial — Low to bright indirect light",
			difficulty: "No-fuss — Carefree",
			petFriendly: "Yes — non-toxic to cats and dogs",
			airCleaner:
				"Yes — Purifies air polluted with synthetic chemicals from cleaning products",
			img: "/images/minimoneytree.jpeg",
			price: 35,
		}),
		Plant.create({
			name: "Philodendron Brasil",
			description: "Lively and trailing, with variegated, heart-shaped leaves.",
			size:
				'Medium — 10"-14" tall (including recycled plastic Ecopot), allow to trail',
			light: "Low to Partial — Low to bright indirect light",
			difficulty: "No-fuss — Carefree",
			petFriendly: "No — can cause mouth irritation and digestive reaction",
			airCleaner: "Yes — removes formaldehyde from air",
			img: "/images/PhilodendronBrasil.jpeg",
			price: 65,
		}),
		Plant.create({
			name: "Sansevieria Moonshine",
			description:
				"A rare and stunning statement plant, showing off blue silver leaves.",
			size: 'Medium — 11"-14" tall (including recycled plastic Ecopot)',
			light: "Low to Partial — Low to bright indirect light",
			difficulty: "No-fuss — Carefree",
			petFriendly: "No — can cause mouth irritation and digestive reaction",
			airCleaner: "Yes — removes formaldehyde from air",
			img: "/images/moonshine.jpeg",
			price: 65,
		}),
		Plant.create({
			name: "Dracaena Dorado",
			description:
				"Whimsical and low-maintenance, with long, dark green and yellow striped leaves atop sturdy canes. Also known as the Mass Cane Plant",
			size: 'Extra Large — 44"-54" tall (including recycled plastic Ecopot)',
			light: "Low to Partial — Low to bright indirect light",
			difficulty: "No-fuss — Carefree",
			petFriendly: "No — Can cause mouth irritation and digestive reaction",
			airCleaner:
				"Yes — Removes benzene, formaldehyde, xylene, and toluene from the air",
			img: "/images/DracaenaDorado.jpeg",
			price: 195,
		}),
		Plant.create({
			name: "Monstera",
			description:
				"Lively and wild with large, tropical leaves. Also known as the Swiss Cheese Plant",
			size:
				'Large — 26"-32" tall, 20"-26" wide (including recycled plastic Ecopot)',
			light: "Partial to Bright — Bright indirect to full sun",
			difficulty: "No-fuss — Carefree",
			petFriendly: "No — can cause mouth irritation and digestive reaction",
			airCleaner: "Yes — removes formaldehyde from air",
			img: "/images/Monstera.jpeg",
			price: 150,
		}),
		Plant.create({
			name: "Bird of Paradise",
			description:
				"Impressive and tropical with large, glossy leaves that naturally split over time.",
			size: 'Large — 34"-42" tall (including recycled plastic Ecopot)',
			light: "Partial to Bright — Bright indirect to full sun",
			difficulty: "Easy — Relatively low maintenance",
			petFriendly: "No — Can cause mouth irritation and digestive reaction",
			airCleaner: "Yes — Removes toxins from air",
			img: "/images/BirdofParadise.jpeg",
			price: 150,
		}),
		Plant.create({
			name: "Aglaonema Spring Snow",
			description:
				"The Aglaonema Spring Snow features distinctive green foliage with white and yellow variegation and is known for its tolerance of many indoor conditions. Also known as the Chinese Evergreen",
			size:
				"Large — 22-26” tall, 20-24” wide (including recycled plastic Ecopot)",
			light: "Low to Partial — Low to bright indirect light",
			difficulty: "No-fuss — Carefree",
			petFriendly: "No — Can cause mouth irritation and digestive reaction",
			airCleaner: "Yes — Removes air toxins",
			img: "/images/aglaonema.jpeg",
			price: 150,
		}),
		Plant.create({
			name: "Silver Pothos",
			description: "Exquisite and trailing with silver-green leaves.",
			size:
				'Small — 7"-12" tall (including recycled plastic Ecopot), will trail',
			light: "Low to Partial — Low to bright indirect light",
			difficulty: "No-fuss — Carefree",
			petFriendly: "No — Can cause mouth irritation and digestive reaction",
			airCleaner:
				"Yes — Removes Formaldehyde, Xylene, and Benzene from the air",
			img: "/images/silverpothos.jpeg",
			price: 35,
		}),
		Plant.create({
			name: "Sansevieria",
			description:
				"Architectural and sturdy. This plant is easy to care for and highly adaptable. Also known as a Snake Plant and Mother-in-Law’s Tongue",
			size: 'Large — 30"-36" tall (including recycled plastic Ecopot)',
			light: "Low to Partial — Low to bright indirect light",
			difficulty: "No-fuss — Carefree",
			petFriendly: "No — can cause mouth irritation and digestive reaction",
			airCleaner: "Yes — removes formaldehyde from air",
			img: "/images/sansevieria.jpeg",
			price: 150,
		}),
		Plant.create({
			name: "Fiddle Leaf Fig",
			description:
				"Tall, sculptural, and dramatic. This plant will flourish in the right conditions.",
			size: 'Extra Large — 44"-58" tall (including recycled plastic Ecopot)',
			light: "Medium — Bright indirect light",
			difficulty: "Moderate — Needs a bit of extra care",
			petFriendly: "No — can cause mouth irritation and digestive reaction",
			airCleaner: "Yes — removes formaldehyde from air",
			img: "/images/fiddlefig.jpeg",
			price: 195,
		}),
		Plant.create({
			name: "Ponytail Palm",
			description:
				"Fun, distinct, and hardy. This plant is low-maintenance and adaptable.",
			size: 'Medium — 15"-22" tall (including recycled plastic Ecopot)',
			light: "Low to Partial — Low to bright indirect light",
			difficulty: "No-fuss — Carefree",
			petFriendly: "Yes — Non-toxic",
			airCleaner: "Yes — Removes air toxins",
			img: "/images/ponytail.jpeg",
			price: 65,
		}),
		Plant.create({
			name: "Bamboo Palm",
			description: "Lush and dramatic, with dark green fronds.",
			size: 'Extra Large — 44"-58" tall (including recycled plastic Ecopot)',
			light: "Low to Partial — Low to bright indirect light",
			difficulty: "No-fuss — Carefree",
			petFriendly: "Yes — Non-toxic and pet-friendly",
			airCleaner: "Yes — Removes formaldehyde from air",
			img: "/images/bamboopalm.jpeg",
			price: 195,
		}),
		Plant.create({
			name: "ZZ Plant",
			description:
				"Hardy and graceful with unique, layered leaves. This plant is tough, beautiful, and nearly indestructible.",
			size:
				'Large — 24"-33" tall (including recycled plastic Ecopot), 20"-24" wide',
			light: "Low to Partial — Low to bright indirect light",
			difficulty: "No-fuss — Carefree",
			petFriendly: "No — can cause mouth irritation and digestive reaction",
			airCleaner: "Yes — removes formaldehyde from air",
			img: "/images/zzplant.jpeg",
			price: 150,
		}),
		Plant.create({
			name: "Red Prayer Plant",
			description: "Colorful and bold with hints of red on two-toned leaves",
			size: 'Small — 7"-12" tall (including recycled plastic Ecopot)',
			light: "Low to Partial — Low to bright indirect light",
			difficulty: "Easy — Relatively low maintenance",
			petFriendly: "Yes — non-toxic to cats and dogs",
			airCleaner: "Yes — removes toxins from air",
			img: "/images/redprayerplant.jpeg",
			price: 35,
		}),
		Plant.create({
			name: "Prickly Pear Cactus",
			description:
				"An intriguing cactus with bright green paddle-like pads that actually grow on top of each other.",
			size: 'Medium — 13"-20" tall (including recycled plastic Ecopot)',
			light: "Partial to Bright — Bright indirect to full sun",
			difficulty: "No-fuss — Carefree",
			petFriendly: "Yes — non-toxic, but beware of the sharp spines",
			airCleaner: "Yes — removes toxins from the air",
			img: "/images/pricklypearcactus.jpeg",
			price: 80,
		}),
		Plant.create({
			name: "Hedgehog Aloe",
			description:
				"Hedgehog Aloe is a very forgiving succulent, making it a perfect plant for hectic households or for first-time owners.",
			size: "Small — 10”-16” tall (including recycled plastic Ecopot)",
			light: "Partial to Bright — Bright indirect to full sun",
			difficulty: "No-fuss — Carefree",
			petFriendly: "No — can cause mouth irritation and digestive reaction",
			airCleaner: "Yes — removes toxins from the air",
			img: "/images/HedgehogAloe.jpeg",
			price: 35,
		}),
		Plant.create({
			name: "Dracaena Marginata Open Weave",
			description:
				"Fun and delicate, with woven stems and spiky, upright leaves. Also known as the Madagascar Dragon Tree",
			size: 'Extra Large — 46"-58" tall (including recycled plastic Ecopot)',
			light: "Low to Partial — Low to bright indirect light",
			difficulty: "No-fuss — Carefree",
			petFriendly: "No — can cause mouth irritation and digestive reaction",
			airCleaner:
				"Yes — removes formaldehyde, xylene, and toluene from the air",
			img: "/images/openWeave.jpeg",
			price: 195,
		}),
		Plant.create({
			name: "Kimberly Queen Fern",
			description:
				"This plant grows upright, making it perfect for hanging baskets, and its long, vertical, sword-shaped fronds never leave a mess.",
			size: 'Medium — 14"-20" tall (including recycled plastic Ecopot)',
			light: "Low to Partial — Low to bright indirect light",
			difficulty: "Easy — Relatively low maintenance",
			petFriendly: "Yes — Non-toxic and pet-friendly",
			airCleaner: "Yes — removes toxins from the air",
			img: "/images/kimberlyFern.jpeg",
			price: 65,
		}),
		Plant.create({
			name: "Parlor Palm",
			description: "Easy and graceful, with lush, dark green fronds.",
			size: 'Medium — 15"-22" tall (including recycled plastic Ecopot)',
			light: "Low to Partial — Low to bright indirect light",
			difficulty: "No-fuss — Carefree",
			petFriendly: "Yes — non-toxic for cats and dogs",
			airCleaner: "Yes — removes formaldehyde from air",
			img: "/images/ParlorPalm.jpeg",
			price: 65,
		}),
		Plant.create({
			name: "Bromeliad Pineapple",
			description:
				"Bromeliad Pineapple is a unique, beautiful plant that will grow an edible pineapple fruit.",
			size: 'Medium — 12"-16" tall (including recycled plastic Ecopot)',
			light: "Medium — Bright indirect light",
			difficulty: "No-fuss — Carefree",
			petFriendly:
				"Yes — Bromeliads are not known to be toxic, but can cause contact dermatitis.",
			airCleaner: "Yes — Removes harmful pollutants from the air",
			img: "/images/pineapple.jpeg",
			price: 65,
		}),
		Plant.create({
			name: "Ficus Lyrata Bonsai",
			description:
				"Sculptural and dramatic, a bonsai version of the beloved Fiddle Leaf Fig. Also known as the Small Leaf Fiddle Leaf Fig",
			size: 'Medium — 12"–14" tall (including recycled plastic Ecopot)',
			light: "Medium — Bright indirect light",
			difficulty: "Moderate — Needs a bit of extra care",
			petFriendly: "No — Can cause mouth irritation and digestive reaction",
			airCleaner: "Yes — Removes Formaldehyde from the air",
			img: "/images/bonsai.jpeg",
			price: 65,
		}),
		Plant.create({
			name: "Peperomia Ginny",
			description:
				"Easy to care for and almost succulent-like, Peperomia Ginny has light green leaves edged with hues of yellow and pink.",
			size: 'Small — 9"-14" tall (including recycled plastic Ecopot)',
			light: "Low to Partial — Low to bright indirect light",
			difficulty: "No-fuss — Carefree",
			petFriendly: "Yes — Non toxic and pet friendly",
			airCleaner: "Yes — Removes harmful pollutants from the air",
			img: "/images/ginny.jpeg",
			price: 35,
		}),
		Plant.create({
			name: "Bromeliad Aechmea Pink",
			description:
				"Bromeliad Aechmea Pink is a unique, beautiful plant that features colorful, long-lasting blooms.",
			size: 'Medium — 15"-20" tall (including recycled plastic Ecopot)',
			light: "Medium — Bright indirect light",
			difficulty: "No-fuss — Carefree",
			petFriendly:
				"Yes — Bromeliads are not known to be toxic, but can cause contact dermatitis.",
			airCleaner: "Yes — Removes harmful pollutants from the air",
			img: "/images/pink.jpeg",
			price: 65,
		}),
		Plant.create({
			name: "Tradescantia Zebrina",
			description:
				"The Tradescantia Zebrina  is an easy and fast-growing plant that is loved for its boldly colored leaves and vining growth.",
			size:
				'Small — 8"-14" tall (including recycled plastic Ecopot), will trail',
			light: "Low to Partial — Low to bright indirect light",
			difficulty: "No-fuss — Carefree",
			petFriendly: "No — can cause mouth irritation and digestive reaction",
			airCleaner: "Yes — removes toxins from air",
			img: "/images/zebrina.jpeg",
			price: 35,
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

	BirdofParadise.userId = cody.id;
	dragonTree.userId = kate.id;
	silver.userId = kate.id;
	bamboopalm.userId = kate.id;
	pink.userId = nes.id;
	zebrina.userId = nes.id;
	draca.userId = nes.id;
	zzplant.userId = nes.id;
	HedgehogAloe.userId = kokko.id;
	monstera.userId = rommel.id;
	pricklypear.userId = rommel.id;

	await Promise.all([
		BirdofParadise.save(),
		dragonTree.save(),
		silver.save(),
		bamboopalm.save(),
		pink.save(),
		zebrina.save(),
		draca.save(),
		zzplant.save(),
		HedgehogAloe.save(),
		monstera.save(),
		pricklypear.save(),
	]);

	// seed orders
	const order1 = await Order.create();
	const order2 = await Order.create();

	await order1.addPlant(BirdofParadise);
	await order2.addPlants([minimoney, philodendron, moonshine]);

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
	};
};

module.exports = {
	db,
	syncAndSeed,
	models: {
		User,
		Plant,
		Order,
		Ledger,
	},
};
