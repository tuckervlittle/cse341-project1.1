const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const contactController = {};

contactController.getAllContacts = async function (req, res, next) {
  try {
    const contacts = await mongodb
      .getDb()
      .collection('contacts')
      .find();
    const contactList = await contacts.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200)
      .json(contactList);
  } catch (err) {
    res.status(500)
      .json({ message: err.message });
  }
};

contactController.getContactById = async function (req, res) {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400)
        .json({ message: 'Invalid contact ID' });
    }
    const contactId = new ObjectId(req.params.id);
    const contact = await mongodb
      .getDb()
      .collection('contacts')
      .findOne({ _id: contactId });
    if (contact) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200)
        .json(contact);
    } else {
      res.status(404)
        .json({ message: 'Contact not found' });
    }
  } catch (err) {
    res.status(500)
      .json({ message: err.message });
  }
};

contactController.createContact = async function (req, res) {
  try {
    const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    }
    const result = await mongodb
      .getDb()
      .collection('contacts')
      .insertOne(newContact);
    res.status(201)
      .json(result);
  } catch (err) {
    res.status(500)
      .json({ message: err.message });
  }
};

contactController.updateContactById = async function (req, res) {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400)
        .json({ message: 'Invalid contact ID' });
    }
    const contactId = new ObjectId(req.params.id);
    const updateSingle = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    }
    const result = await mongodb
      .getDb()
      .collection('contacts')
      .updateOne({ _id: contactId }, { $set: updateSingle });
    if (result.matchedCount > 0) {
      res.status(200)
        .json(result);
    } else {
      res.status(404)
        .json({ message: 'Contact not found' });
    }
  } catch (err) {
    res.status(500)
      .json({ message: err.message });
  }
};

contactController.deleteContactById = async function (req, res) {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400)
        .json({ message: 'Invalid contact ID' });
    }
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .collection('contacts')
      .deleteOne({ _id: contactId });
    if (result.deletedCount > 0) {
      res.status(200)
        .json(result)
    } else {
      res.status(404)
        .json({ message: 'Contact not found' });
    }
  } catch (err) {
    res.status(500)
      .json({ message: err.message });
  }
}

module.exports = contactController;