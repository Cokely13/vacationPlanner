const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/houses', require('./houses'))
router.use('/travels', require('./travels'))
router.use('/trips', require('./trips'))
router.use('/budgets', require('./budgets'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
