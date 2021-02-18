const router = require("express").Router();
const {
  models: { Plant },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const plants = await Plant.findAll();
    res.status(200).send(plants);
  } catch (err) {
    next(err);
  }
});

// router.get("/", async (req, res, next) => {
//   try {
//     const idx = req.query.idx ? req.query.idx * 1 : 0;
//     const [plants, count] = await Promise.all([
//       Plant.findAll({
//         limit: 10,
//         offset: idx * 10,
//         order: ["name"],
//       }),
//       Plant.count(),
//     ]);
//     res.send({ count, plants });
//   } catch (err) {
//     next(err);
//   }
// });

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const plant = await Plant.findByPk(id);
    res.status(200).send(plant);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.id);
    res.status(201).send(await plant.update(req.body));
  } catch (er) {
    next(er);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Plant.create(req.body));
  } catch (er) {
    next(er);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.id);
    await plant.destroy();
    res.sendStatus(204);
  } catch (er) {
    next(er);
  }
});
