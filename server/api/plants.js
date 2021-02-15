const router = require('express').Router();
const {
  models: { Plant },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.findAll();
    res.status(200).send(plants);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const plant = await Plant.findByPk(id);
    res.status(200).send(plant);
  } catch (err) {
    next(err);
  }
});

//router.delete route goes here for admin to delete a plant from the datbase -- needs to be secured as well
