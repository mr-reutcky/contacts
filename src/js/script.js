'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function listen(event, selector, callback) {
  selector.addEventListener(event, callback);
}

const nameInput = select('.name');
const cityInput = select('.city');
const emailInput = select('.email');
const addButton = select('input[type="button"]');
const contactList = select('.contact-list');
const contactCountDisplay = select('.contact-count');
const errorDisplay = select('.error-message');
const emailRegex = /^[a-zA-Z0-9]{2,}@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/;

class Contact {
  #name = '';
  #city = '';
  #email = '';

  constructor(name, city, email) {
    this.name = name;
    this.city = city;
    this.email = email;
  }

  set name(value) {
    const isOnlyLetters = /^[A-Za-z\s]+$/.test(value);
    if (value.length >= 2 && isOnlyLetters) {
      this.#name = value;
    } else {
      throw new Error('Name must be at least 2 characters.');
    }
  }

  set city(value) {
    const isOnlyLetters = /^[A-Za-z\s]+$/.test(value);
    if (value.length >= 2 && isOnlyLetters) {
      this.#city = value;
    } else {
      throw new Error('City must be at least 2 characters.');
    }
  }

  set email(value) {
    if (emailRegex.test(value)) {
      this.#email = value;
    } else {
      throw new Error('Email must be in the format of XXX@XXX.XXX');
    }
  }

  get name() {
    return this.#name;
  }

  get city() {
    return this.#city;
  }

  get email() {
    return this.#email;
  }
}

const contacts = [];

function clearErrors() {
  nameInput.value = '';
  cityInput.value = '';
  emailInput.value = '';
  nameInput.style.borderColor = '';
  cityInput.style.borderColor = '';
  emailInput.style.borderColor = '';
  errorDisplay.innerText = '';
}

function listContacts() {
  contactList.innerHTML = '';
  contacts.forEach((contact, index) => {
    const contactDiv = document.createElement('div');
    contactDiv.classList.add('contact');
    contactDiv.innerHTML = `
      <p>Name: ${contact.name}</p>
      <p>City: ${contact.city}</p>
      <p>Email: ${contact.email}</p>
    `;

    contactDiv.onclick = () => {
      contacts.splice(index, 1);
      listContacts();
    };

    contactList.appendChild(contactDiv);
  });

  contactCountDisplay.textContent = `Total Contacts: ${contacts.length}`;
}

function validateInput() {
  try {
    const contact = new Contact(
      nameInput.value,
      cityInput.value,
      emailInput.value
    );
    contacts.unshift(contact);
    listContacts();
    clearErrors();
  } catch (error) {
    if (error.message.includes('Name')) {
      cityInput.style.borderColor = '';
      emailInput.style.borderColor = '';
      nameInput.style.borderColor = '#ed4b3d';
      errorDisplay.innerText = error.message;
      nameInput.focus();
    } else if (error.message.includes('City')) {
      nameInput.style.borderColor = '';
      emailInput.style.borderColor = '';
      cityInput.style.borderColor = '#ed4b3d';
      errorDisplay.innerText = error.message;
      cityInput.focus();
    } else if (error.message.includes('Email')) {
      nameInput.style.borderColor = '';
      cityInput.style.borderColor = '';
      emailInput.style.borderColor = '#ed4b3d';
      errorDisplay.innerText = error.message;
      emailInput.focus();
    }
  }
}

listen('click', addButton, validateInput);
