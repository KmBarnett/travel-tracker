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

let logInBtn = $('#login-btn');
let submitLogin;
let main = $('main');



const showLoginModule = () => {
  main.append(userElements.logIn);
  submitLogin = $('#log-in-submit');
  submitLogin.on('click', logIn)
};

const logIn = () => {
  let modle = $('#login-modle')
  modle.remove()
};


logInBtn.on('click', showLoginModule)
