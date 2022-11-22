import React from 'react';
import Title from './common/Title';
import ContactForm from './ContactForm';
import SubTitle from './common/SubTitle';
import Filter from './Filter';
import ContactList from './ContactList';

class App extends React.Component {
  state = {
    contacts: [],
    searchQuery: '',
  };

  componentDidMount() {
    this.setState(prevState => ({
      ...prevState,
      contacts: JSON.parse(localStorage.getItem('contacts')) ?? [],
    }));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = contact => {
    const { contacts } = this.state;
    const duplicate = contacts.find(el => el.name === contact.name);
    if (duplicate) {
      alert(`${duplicate.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      ...prevState,
      contacts: [...prevState.contacts, contact],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      ...prevState,
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  setSearchQuery = value => {
    this.setState(prevState => ({
      ...prevState,
      searchQuery: value,
    }));
  };

  render() {
    const { searchQuery, contacts } = this.state;

    return (
      <div className="app">
        <Title title="Phonebook" />
        <ContactForm addContact={this.addContact} />

        <SubTitle title="Contacts" />
        <Filter setSearchQuery={this.setSearchQuery} value={searchQuery} />
        <ContactList
          contacts={contacts}
          searchQuery={searchQuery}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
