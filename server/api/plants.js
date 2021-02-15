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

//ive messes with this and also tried /:id
//need to secure this route for onlyl an admin to be able to access
router.put('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.id);
    res.status(201).send(await plant.update(req.body));
  } catch (er) {
    next(er);
  }
});

//router.delete route goes here for admin to delete a plant from the datbase -- needs to be secured as well
