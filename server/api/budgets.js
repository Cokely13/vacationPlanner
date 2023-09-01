const router = require('express').Router()
const { models: { Budget}} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const budgets = await Budget.findAll()
    res.json(budgets)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const budget = await Budget.findByPk(req.params.id);
    res.json(budget);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Budget.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const budget = await Budget.findByPk(req.params.id);
    res.send(await budget.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const budget = await Budget.findByPk(req.params.id);
    await budget.destroy();
    res.send(budget);
  } catch (error) {
    next(error);
  }
});
