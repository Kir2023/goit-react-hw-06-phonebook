import React, { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { nanoid } from 'nanoid';

import { addContact } from 'redux/contacts.reducer';

import css from './ContactForm.module.css';

export const ContactForm = () => {
  const initialValue = { name: '', number: '' };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'name':
        return { ...state, name: action.payload };
      case 'number':
        return { ...state, number: action.payload };
      case 'reset':
        return initialValue;
      default:
        return state;
    }
  };

  const contacts = useSelector(state => state.contactsBook.contacts);
  const dispatch = useDispatch();

  const [{ name, number }, dispatchReducer] = useReducer(reducer, initialValue);

  const handleInputChange = e => {
    const { name, value } = e.target;
    dispatchReducer({ type: name, payload: value });
  };

  const isNameInContacts = contactData => {
    const hasDuplicates = contacts.some(
      contact => contact.name.toLowerCase() === contactData.toLowerCase()
    );

    if (hasDuplicates) {
      alert(`${contactData} is already in contacts.`);
      return true;
    }
    return false;
  };

  const handleDataSubmit = e => {
    e.preventDefault();

    if (!isNameInContacts(name)) {
      dispatch(addContact({ id: nanoid(), name, number }));
      dispatchReducer({ type: 'reset', payload: initialValue });
    }
  };

  return (
    <form className={css.form} onSubmit={handleDataSubmit}>
      <label className={css.formLabel}>Name </label>
      <input
        className={css.formName}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        placeholder="Enter name"
        value={name}
        onChange={handleInputChange}
      />
      <label className={css.formLabel}>Number </label>
      <input
        className={css.formNumber}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        placeholder="Enter phone number"
        value={number}
        onChange={handleInputChange}
      />
      <button className={css.formBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};
