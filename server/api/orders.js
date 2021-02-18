const router = require('express').Router();

const {
  models: { Order },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    // attributes: ["id", "shippingAddress"],
    // res.json(orders);
    console.log(orders, 'orders');
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findByPk(id);

    res.status(200).send(order);
  } catch (er) {
    next(er);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    console.log(order, 'order');
    res.status(201).send(await order.update(req.body));
  } catch (er) {
    next(er);
  }
});

//need a post route to create order
// router.post(":userId", async (req, res, next) => {
//   try {
//     const order = await Order.create({
//       shippingAddress: "",
//       fullfilled: false,
//       total: 0,
//     });
//   } catch (er) {
//     next(er);
//   }
// });

module.exports = router;
