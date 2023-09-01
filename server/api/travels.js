const router = require('express').Router()
const { models: { Travel}} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const travels = await Travel.findAll()
    res.json(travels)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const travel = await Travel.findByPk(req.params.id);
    res.json(travel);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Travel.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const travel = await Travel.findByPk(req.params.id);
    res.send(await travel.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const travel = await Travel.findByPk(req.params.id);
    await travel.destroy();
    res.send(travel);
  } catch (error) {
    next(error);
  }
});
