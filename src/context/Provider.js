import React, {createContext, useReducer} from 'react';
import authInitialState from './initialStates/authState';
import ContactsInitialState from './initialStates/contactsState';
import auth from './reducers/auth';
import contacts from './reducers/contacts';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState);
  const [contactsState, ContactsDispatch] = useReducer(
    contacts,
    ContactsInitialState,
  );
  return (
    <GlobalContext.Provider
      value={{authState, contactsState, authDispatch, ContactsDispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
