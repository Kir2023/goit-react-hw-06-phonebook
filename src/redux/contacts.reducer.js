const localStContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const initialState = {
  contacts: JSON.parse(localStorage.getItem('contacts')) ?? localStContacts,
  filter: '',
};

export const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'contacts/addContact': {
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    }
    case 'contacts/deleteContact': {
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        ),
      };
    }
    case 'contacts/filteredContact': {
      return {
        ...state,
        contacts: state.contacts.filter(contact =>
          contact.name.toLowerCase().includes(state.toLowerCase())
        ),
      };
    }
    default:
      return state;
  }
};

// import { createSlice } from '@reduxjs/toolkit';

// export const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     value: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   },

//   reducers: {
//     addContact: (state, { payload }) => {
//       state.value.push(payload);
//     },

//     deleteContact: (state, { payload }) => {
//       state.value = state.value.filter(({ id }) => id !== payload);
//     },

//     filterContacts: (state, { payload }) => {
//       return { ...state, filter: payload };
//     },
//      },
// });

// export const { addContact, deleteContact, filterContacts } =
//   contactsSlice.actions;

// export default contactsSlice.reducer;
