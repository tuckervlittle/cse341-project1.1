const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const contactController = {};

contactController.getAllContacts = async function (req, res, next) {
  try {
    const contacts = await mongodb.getDb().collection('contacts').find();
    const contactList = await contacts.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contactList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

contactController.getContactById = async function (req, res) {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }
    const contactId = new ObjectId(req.params.id);
    const contact = await mongodb
      .getDb()
      .collection('contacts')
      .findOne({ _id: contactId });
    if (contact) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = contactController;