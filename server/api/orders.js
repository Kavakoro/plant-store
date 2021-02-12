const router = require('express').Router();

const {
  models: { Order },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
