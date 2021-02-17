const router = require('express').Router();
const {
  models: { Plant, Order, LineItem, User },
} = require('../db');
module.exports = router;

router.use(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next();
  }
  const user = await User.findByToken(req.headers.authorization);
  if (!user) {
    const error = Error('Unauthorized user');
    error.status = 401;
    throw error;
  }
});

// router.get('/:orderId', async (req, res, next) => {
//   try {
//     const orderId = req.params.orderId;
//     const order = await Order.findByPk(orderId);
//     const plants = await order.getPlants();

//     const cart = {
//       id: order.id,
//       plants,
//     };
//     res.status(200).send(cart);
//   } catch (err) {
//     next(err);
//   }
// });

const assembleCart = async (orderId) => {
  const order = await Order.findByPk(orderId);
  const plants = await order.getPlants();
  const cart = {
    id: order.id,
    plants,
  };
  return cart;
};

router.post('/', async (req, res, next) => {
  try {
    let cart;
    const orderId = req.body.orderId;
    const userId = req.body.userId;
    if (orderId) {
      cart = await assembleCart(orderId);
    }
    if (!orderId) {
      if (userId) {
        //if a user is logged in, look in Order DB for an unfulfulled order
        const order = await Order.findOne({
          where: { userId: userId, fullfilled: false },
        });
        //if there is an unfulfilled order, put together a cart using that orderId
        if (order) {
          cart = await assembleCart(order.id);
        } else {
          // if no unfulfilled order for that user, create a new order with that userId
          const order = await Order.create({ userId: userId });
          cart = await assembleCart(order.id);
        }
      } else {
        //if there is no orderId and no userId, create a new order with no user associated with it and assemble cart
        const order = await Order.create();
        cart = await assembleCart(order.id);
      }
    }
    console.log(cart, 'cart');
    res.status(200).send(cart);
  } catch (err) {
    next(err);
  }
});

//add to cart
router.post('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const plantId = req.body.plantId;

    const order = await Order.findByPk(orderId);
    const plant = await Plant.findByPk(plantId);

    const lineItem = await LineItem.findOne({
      where: {
        orderId,
        plantId,
      },
    });
    if (lineItem) {
      lineItem.amount++;
      await lineItem.save();
    } else {
      await order.addPlant(plant);
    }
    const plants = await order.getPlants();
    res.status(201).send(plants);
  } catch (err) {
    next(err);
  }
});

router.delete('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const plantId = req.body.plantId;

    const order = await Order.findByPk(orderId);
    const plant = await Plant.findByPk(plantId);

    await order.removePlant(plant);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.put('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const plantId = req.body.plantId;
    const amount = req.body.amount < 1 ? 0 : req.body.amount;

    const order = await Order.findByPk(orderId);
    if (amount === 0) {
      const plant = await Plant.findByPk(plantId);
      await order.removePlant(plant);
    } else {
      const lineItem = await LineItem.findOne({
        where: {
          orderId: orderId,
          plantId: plantId,
        },
      });

      lineItem.amount = amount;
      await lineItem.save();
    }
    const plants = await order.getPlants();
    const cart = {
      id: order.id,
      plants,
    };
    res.status(201).send(cart);
  } catch (err) {
    next(err);
  }
});

router.get('/:orderId/total', async (req, res, next) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findByPk(orderId);
    const lineItems = await order.getPlants();

    const orderTotal = lineItems.reduce((acc, curr) => {
      const plantPrice = curr.price;
      const plantAmount = curr.lineitem.amount;
      const subTotal = plantPrice * plantAmount;

      return subTotal + acc;
    }, 0);

    res.status(200).send({ totalPrice: orderTotal });
  } catch (er) {
    next(er);
  }
});

router.put('/:orderId/checkout', async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const address = req.body.address;

    const order = await Order.findByPk(orderId);

    const lineItems = await order.getPlants();

    const orderTotal = lineItems.reduce((acc, curr) => {
      const plantPrice = curr.price;
      const plantAmount = curr.lineitem.amount;
      const subTotal = plantPrice * plantAmount;

      return subTotal + acc;
    }, 0);

    order.fullfilled = true;
    order.shippingAddress = address;
    order.total = orderTotal;

    await order.save();

    res.status(201).send(order);
  } catch (er) {
    next(er);
  }
});

/*
router.put("/:orderId/:plantId/add", async (req, res, next) => {
	try {
		const orderId = req.params.orderId;
		const plantId = req.params.plantId;

		const order = await Order.findByPk(orderId);
		const plant = await Plant.findByPk(plantId);

		const lineItem = await LineItem.findOne({
			where: {
				orderId: orderId,
				plantId: plantId,
			},
		});

		if (lineItem) {
			lineItem.amount += 1;
			await lineItem.save();
		} else {
			await order.addPlant(plant);
		}

		const updatedCart = await order.getPlants();
		res.status(201).send(updatedCart);
	} catch (err) {
		next(err);
	}
});

router.put("/:orderId/:plantId/subtract", async (req, res, next) => {
	try {
		const orderId = req.params.orderId;
		const plantId = req.params.plantId;

		const order = await Order.findByPk(orderId);
		const plant = await Plant.findByPk(plantId);

		const lineItem = await LineItem.findOne({
			where: {
				orderId: orderId,
				plantId: plantId,
			},
		});

		if (lineItem.amount > 1) {
			lineItem.amount -= 1;
			await lineItem.save();
		} else {
			await order.removePlant(plant);
		}

		const updatedCart = await order.getPlants();
		res.status(201).send(updatedCart);
	} catch (err) {
		next(err);
	}
});

router.put("/:orderId/:plantId/remove", async (req, res, next) => {
	try {
		const orderId = req.params.orderId;
		const plantId = req.params.plantId;

		const order = await Order.findByPk(orderId);
		const plant = await Plant.findByPk(plantId);

		await order.removePlant(plant);

		const updatedCart = await order.getPlants();
		res.status(201).send(updatedCart);
	} catch (err) {
		next(err);
	}
});
*/
