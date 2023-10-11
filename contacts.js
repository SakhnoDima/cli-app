const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const rez = contacts.filter(({ id }) => id === contactId);
  if (rez.length === 0) {
    return null;
  } else {
    return rez;
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deletedContact = contacts.find(({ id }) => id === contactId);
  if (deletedContact === undefined) {
    return null;
  } else {
    const rez = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(rez, null, 2));
    return deletedContact;
  }
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: `${nanoid()}`,
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
