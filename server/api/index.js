const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/plants', require('./plants'));
router.use('/cart', require('./cart'));
router.use('/orders', require('./orders'));

// for testing purposes only - delete before deploying to production
router.use('/test', require('./test'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
