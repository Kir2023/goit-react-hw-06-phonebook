import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contactsBook.contacts);
  const filter = useSelector(state => state.contactsBook.filter);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = e => {
    const value = e.target.value;
    const filteredContactsAction = {
      type: 'contacts/filteredContacts',
      payload: value,
    };
    dispatch(filteredContactsAction);
  };

  const handleAddContact = contactData => {
    const hasDuplicates = contacts.some(
      contact => contact.name === contactData.name
    );

    if (hasDuplicates) {
      alert(`${contactData.name} is already in contacts.`);
      return;
    }
    const finalContactsList = {
      ...contactData,
      id: nanoid(),
    };
    const addContactAction = {
      type: 'contacts/addContact',
      payload: finalContactsList,
    };
    dispatch(addContactAction);
  };

  const handleDelete = id => {
    const deleteContactAction = {
      type: 'contacts/deleteContact',
      payload: id,
    };
    dispatch(deleteContactAction);
  };
  const getFilteredContacts = () => {
    const filterContactsList = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return filterContactsList;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleAddContact} />
      <h2> Contacts</h2>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactList
        contacts={getFilteredContacts()}
        handleDelete={handleDelete}
      />
    </div>
  );
};
