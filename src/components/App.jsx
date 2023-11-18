import { useDispatch, useSelector } from 'react-redux';

import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import {
  addContact,
  deleteContact,
  filterContacts,
} from 'redux/contacts.reducer';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contactsBook.contacts);
  const filter = useSelector(state => state.contactsBook.filter);

  const handleChange = searchData => {
    const value = searchData.target.value;
    dispatch(filterContacts(value.toLowerCase().trim()));
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
    dispatch(addContact(finalContactsList));
  };

  const handleDelete = id => {
    dispatch(deleteContact(id));
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
