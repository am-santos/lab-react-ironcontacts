import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import contactList from './contacts.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [...contactList],
      renderContacts: [...contactList].slice(0, 5),
      counter: 0
    };
  }

  addRandom = () => {
    const usedContacts = this.state.renderContacts;
    const nonUsedContacts = this.state.contacts.filter(contact => {
      return !usedContacts.includes(contact);
    });
    const newContact =
      nonUsedContacts[Math.floor(Math.random() * (nonUsedContacts.length + 1))];

    usedContacts.push(newContact);
    this.setState({
      renderContacts: usedContacts
    });
  };

  sortName = () => {
    const usedContacts = this.state.renderContacts;
    const sortedList = usedContacts.sort((contact1, contact2) => {
      if (contact1.name < contact2.name) {
        return -1;
      } else if (contact1.name > contact2.name) {
        return 1;
      } else {
        return 0;
      }
    });
    this.setState({
      renderContacts: sortedList
    });
  };

  sortPopularity = () => {
    const usedContacts = this.state.renderContacts;
    const sortedList = usedContacts.sort((contact1, contact2) => {
      return contact2.popularity - contact1.popularity;
    });
    console.log('hello');
    this.setState({
      renderContacts: sortedList
    });
  };

  delete = id => {
    const newContactList = this.state.renderContacts.filter(contact => {
      return !(String(contact.id) === String(id));
    });
    this.setState({
      renderContacts: newContactList
    });
  };

  render() {
    const contactsToRender = this.state.renderContacts;
    return (
      <div className="App">
        <h1>IronContacts</h1>
        <div className="header-buttons">
          <button onClick={this.addRandom}>Add Random</button>
          <button onClick={this.sortName}>Sort by Name</button>
          <button onClick={this.sortPopularity}>Sort by Popularity</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Add component with entries in here */}
            {contactsToRender.map((contact, index, originalArray) => {
              return (
                <tr key={contact.id}>
                  <td>
                    {' '}
                    <img src={contact.pictureUrl} alt={contact.name} />{' '}
                  </td>
                  <td>{contact.name}</td>
                  <td>{contact.popularity}</td>
                  <td>
                    {' '}
                    <button
                      className="delete-button"
                      onClick={() => this.delete(contact.id)}
                    >
                      Delete
                    </button>{' '}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
