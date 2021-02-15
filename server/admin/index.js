const router = require('express').Router();
const {
  models: { Plant, Order, User },
} = require('../db');
const { isLoggedIn, isAdmin } = require('../middleware');

//these routes are mounted at /admin
//  /admin/plants/:plantId
router.put('/plants/:id', async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.id);
    res.status(201).send(await plant.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.put('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    console.log(user, 'user from /admin/users/id call');
    res.status(201).send(await user.update(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
