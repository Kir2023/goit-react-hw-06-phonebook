import { useDispatch, useSelector } from 'react-redux';

import { deleteContact } from 'redux/contacts.reducer';

import ContactListItem from 'components/ContactListItem/ContactListItem';

import css from './ContactList.module.css';

const getFilteredContacts = (contacts, filter) => {
  const filterContactsList = contacts.filter(contact => {
    return contact.name.toLowerCase().trim().includes(filter.toLowerCase());
  });
  return filterContactsList;
};

export const ContactList = () => {
  const contacts = useSelector(state => state.contactsBook.contacts);
  const filter = useSelector(state => state.contactsBook.filter);
  const dispatch = useDispatch();
  const filteredContacts = getFilteredContacts(contacts, filter);

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <ul className={css.contactList}>
        {filteredContacts.map(({ id, name, number }) => (
          <ContactListItem
            key={id}
            id={id}
            name={name}
            number={number}
            handleDelete={() => handleDelete(id)}
          />
        ))}
      </ul>
    </div>
  );
};
