const router = require('express').Router();
const {
  models: { User, Order },
} = require('../db');

const { isLoggedIn } = require('../middleware');
module.exports = router;

router.use(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next();
  }
  try {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'firstName',
        'lastName',
        'phoneNumber',
        'birthdate',
        'email',
        'isAdmin',
      ],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    res.status(200).send(user);
  } catch (er) {
    next(er);
  }
});

// route for a USER to update his/her own info in account section
router.put('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(201).send(await user.update(req.body));
  } catch (er) {
    next(er);
  }
});

// route for a USER to get his/her past fulfilled orders
router.get('/:id/orders', isLoggedIn, async (req, res, next) => {
  // find all orders for our user where the status is fulfilled

  try {
    console.log(req.params.id, 'req.params.id');
    const orders = await Order.findAll({
      where: {
        userId: req.params.id,
        fullfilled: true,
      },
    });
    console.log(orders, 'users past fulfilled orders');
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
});
