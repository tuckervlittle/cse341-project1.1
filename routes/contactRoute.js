const router = require('express').Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);

router.post('/', contactController.createContact);
router.put('/:id', contactController.updateContactById);
router.delete('/:id', contactController.deleteContactById);

module.exports = router;