import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import Section from './Section';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import initialContacts from './contacts.json';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => initialContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() =>
    localStorage.setItem('contacts', JSON.stringify(contacts)),
    [contacts]
  );

  const addContact = ({ name, number }) => {
    const id = nanoid();
    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already in contacts`)
      :
      setContacts(contacts => [{id, name, number}, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(contacts => contacts.filter(contact => contact.id !== contactId));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
  );

  return ( 
    <>
      <Section title={'Phonebook'}>
        <ContactForm
          onSubmit={addContact}
        />
      </Section>  
    
      <Section title="Contacts">
      <Filter onChange={changeFilter} value={filter} />
        <ContactList 
          contacts={filteredContacts}
          onDeleteContact={deleteContact} 
        />
      </Section>
    </>
  );
}  
