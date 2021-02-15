const router = require('express').Router();
const {
  models: { Plant, Order, User },
} = require('../db');
const { isLoggedIn, isAdmin } = require('../middleware');

/** these routes are mounted at /admin **/

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

//  /admin/plants/:plantId

//the route for an admin to update a plant in the database
router.put('/plants/:id', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.id);
    res.status(201).send(await plant.update(req.body));
  } catch (err) {
    next(err);
  }
});

//the route for an admin to delete a plant from the database
router.delete('/plants/:id', async (req, res, next) => {
  try {
    const plant = Plant.findByPk(req.params.id);
    await plant.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// the route for an admin to update a user in the database
router.put('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(201).send(await user.update(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
