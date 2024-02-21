import { readFile, writeFile } from "fs/promises";
import * as path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
  const data = await readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const listOfContacts = await listContacts();
  const needContact = listOfContacts.find(
    (contact) => contact.id === contactId
  );
  return needContact || null;
};

export const addContact = async (name, email, phone) => {
  const listOfContacts = await listContacts();
  const addedContact = { id: nanoid(), name, email, phone };
  listOfContacts.push(addedContact);
  await writeFile(contactsPath, JSON.stringify(listOfContacts));
  return addedContact;
};

export const removeContact = async (contactId) => {
  const listOfContacts = await listContacts();
  const deletedContact = listOfContacts.find(
    (contact) => contact.id === contactId
  );
  if (deletedContact) {
    const newContactList = listOfContacts.filter(
      (contact) => contact.id !== contactId
    );
    await writeFile(contactsPath, JSON.stringify(newContactList));
  }

  return deletedContact || null;
};
