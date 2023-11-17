import { combineReducers, createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';

import { contactsReducer } from './contacts.reducer';

const rootReducer = combineReducers({
  contactsBook: contactsReducer,
});

const enhancer = devToolsEnhancer();
export const store = createStore(rootReducer, enhancer);
