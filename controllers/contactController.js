const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all Contacts
// @route GET /api/contacts
// @access Private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc Create new Contact
// @route POST /api/contacts
// @access Private

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @desc Update the contact
// @route PUT /api/contacts/:id
// @access Private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found!");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You do not have permission to update other users' info");
  }
  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedContact);
});

// @desc Get Contact
// @route GET /api/contacts/:id
// @access Private

const getContact = asyncHandler(async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error("Contact Not Found!");
    }
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("You do not have permission to access other users' info");
    }

    res.status(200).json(contact);
  } catch (error) {
    // Pass the error to the next middleware (error-handling middleware)
    next(error);
  }
});

// @desc Delete Contact
// @route DELETE /api/contacts/:id
// @access Private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found!");
  }
  await contact.remove();
  res.status(200).json(contact);
});

module.exports = { getContact, createContact, getContacts, updateContact, deleteContact };
