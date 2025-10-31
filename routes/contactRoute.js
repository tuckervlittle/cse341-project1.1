const router = require('express').Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);

module.exports = router;