import { useDispatch, useSelector } from 'react-redux';

import { filterContacts } from 'redux/contacts.reducer';

import css from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contactsBook.filter);

  const handleChange = searchData => {
    const value = searchData.target.value;
    dispatch(filterContacts(value.toLowerCase().trim()));
  };

  return (
    <div>
      <label className={css.filterLabel}>Find contacts by Name </label>
      <input
        className={css.filterName}
        type="text"
        name="filter"
        placeholder="Enter filter"
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
};
