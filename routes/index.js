const router = require('express').Router();

router.get('/', (req, res) => { res.send('Hello World'); });
router.use('/contacts', require('./contactRoute'));

module.exports = router;