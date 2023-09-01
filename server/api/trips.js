const router = require('express').Router()
const { models: { Trip}} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const trips = await Trip.findAll()
    res.json(trips)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    res.json(trip);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Trip.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    res.send(await trip.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    await trip.destroy();
    res.send(trip);
  } catch (error) {
    next(error);
  }
});







module.exports = router
