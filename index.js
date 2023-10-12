const contacts = require("./contacts");
const { program } = require("commander");
const colors = require("colors/safe");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(colors.green(allContacts));
      return;

    case "get":
      const contact = await contacts.getContactById(id);
      console.log(colors.green(contact));
      return;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(colors.yellow(newContact));
      return;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.log(colors.red(removeContact));
      return;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action,  <type>")
  .option("-i, --id,  <type>")
  .option("-n, --name,  <type>")
  .option("-e, --email,  <type>")
  .option("-p, --phone,  <type>");
program.parse();

const option = program.opts();

invokeAction(option);
