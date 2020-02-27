// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import userElements from './user-page.js';
import agentElements from './agent-page.js';
import './css/base.scss';
import './images/sam-icon.svg';
import './images/005-flyer.svg';
import './images/003-world.svg';
import './images/001-ticket.svg';
import './images/customers.svg';
import './images/login.svg';

const logInBtn = $('#login-btn');
const main = $('main');
const userBtns = $('.user-buttons');
let submitLogin;
let logInUsername;
let logInPassword;
let logOutButton;

const assignButton = () => {
  logOutButton = $('#log-out-btn')
}

const showLoginModule = () => {
  main.append(userElements.logIn);
  submitLogin = $('#log-in-submit');
  logInUsername = $('#username');
  logInPassword = $('#password');
  submitLogin.on('click', logIn)
};

const logInAgent = () => {
  userBtns.html(agentElements.navButtons)
}

const logInClient = () => {
  userBtns.html(userElements.navButtons)
}

const logInValidater = () => {
  let clientUsername = logInUsername.val().toLowerCase().includes('traveler');
  let agentUsername = logInUsername.val().toLowerCase().includes('agency');
  let correctPassword = logInPassword.val().toLowerCase() === 'travel2020'
  if (clientUsername && correctPassword) {
    logInClient()
  } else if (agentUsername && correctPassword) {
    logInAgent()
  } else {
    return true
  }
  assignButton()
}

const logIn = () => {

  if (logInValidater()) {
    alert('Invalid Information')
  } else {
    let modle = $('#login-modle')
    modle.remove()
  }
};


logInBtn.on('click', showLoginModule)
