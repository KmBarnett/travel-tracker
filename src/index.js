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
const main = $('main');
const userBtns = $('.user-buttons');
let destinationsCardSection = $('#destinations-cards')
let destinations;
let trips;
let user;
let submitLogin;
let logInUsername;
let logInPassword;
let logOutButton;



const createDestinationCards = () => {
  console.log(destinations);
  destinations.forEach(destination => {
    let card = `
    <section id='${destination.id}' class="destinations-card">
      <h3 class="dest-name">${destination.destination}</h3>
      <img src="${destination.image}" alt="">
      <div class="trip-info">
      <p class="dest-lodging-cost">Lodging: $<span class="money">${destination.estimatedLodgingCostPerDay}</span> per Person</p>
      <p class="dest-flight-cost">Flight: $<span class="money">${destination.estimatedFlightCostPerPerson}</span> per Person</p>
      </div>
    </section>`
    destinationsCardSection.append(card)
  });
}

const logOut = () => {
  userBtns.html(userElements.logInBtn)
  logInBtn = $('#login-btn');
  logInBtn.on('click', showLoginModule)
}

const assignListeners = () => {
  logOutButton.on('click', logOut)
}

const assignButton = () => {
  logOutButton = $('#log-out-btn')
  assignListeners()
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


fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
  .then(response => response.json())
  .then(data => destinations = data.destinations)
  .then(createDestinationCards)
  .catch(err => console.log(err.message))

logInBtn.on('click', showLoginModule)
