const router = require("express").Router();

const {
  models: { Order },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  console.log("this is the order route");
  try {
    const id = req.params.id;
    const order = await Order.findByPk(id);

    res.status(200).send(order);
  } catch (er) {
    next(er);
  }
});

//need a post route to create order
router.post(":userId", async (req, res, next) => {
  try {
    const order = await Order.create({
      shippingAddress: "",
      fullfilled: false,
      total: 0,
    });
  } catch (er) {
    next(er);
  }
});

module.exports = router;
