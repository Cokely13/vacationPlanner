const router = require('express').Router()
const { models: { House}} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const houses = await House.findAll()
    res.json(houses)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const house = await House.findByPk(req.params.id);
    res.json(house);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await House.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const house = await House.findByPk(req.params.id);
    res.send(await house.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const house = await House.findByPk(req.params.id);
    await house.destroy();
    res.send(house);
  } catch (error) {
    next(error);
  }
});

module.exports = router
