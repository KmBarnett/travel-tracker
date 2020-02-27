// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import User from './User.js'
import userElements from './user-page.js';
import agentElements from './agent-page.js';
import dataController from './Data-Controller.js'
import './css/base.scss';
import './images/sam-icon.svg';
import './images/005-flyer.svg';
import './images/003-world.svg';
import './images/001-ticket.svg';
import './images/customers.svg';
import './images/login.svg';
import './images/android-chrome-512x512.png'

const main = $('main');
const nav = $('nav');
const page = $('html')
const userBtns = $('.user-buttons');
const body = $('body');
const contentSection = $('#destinations-cards');
const welcomeBanner = $('.welcome')
let logInBtn = $('#login-btn');
let destinations;
let user = new User();
let submitLogin;
let logInUsername;
let logInPassword;
let logOutButton;
let lastScroll;



const createDestinationCards = () => {
  destinations.forEach(destination => {
    let card = `
    <section id='${destination.id}' class="destinations-card">
      <h3 class="dest-name">${destination.destination}</h3>
      <button>
      <img src="${destination.image}" alt="">
      </button>
      <div class="trip-info">
      <p class="dest-lodging-cost">Lodging: $<span class="money">${destination.estimatedLodgingCostPerDay}</span> per Person</p>
      <p class="dest-flight-cost">Flight: $<span class="money">${destination.estimatedFlightCostPerPerson}</span> per Person</p>
      </div>
    </section>`
    contentSection.append(card)
  });
}

const customizePage = () => {
  welcomeBanner.text(`Welcome, ${user.name}`)
}

const checkLoggedIn = () => {
  if (body.hasClass('guest-js')) {
    showLoginModule()
  }
}

const logOut = () => {
  body.addClass('guest-js')
  userBtns.html(userElements.logInBtn)
  logInBtn = $('#login-btn');
  logInBtn.on('click', showLoginModule)
  user = user.logOut()
  customizePage()
}

const assignListeners = () => {
  logOutButton.on('click', logOut)
}

const assignButton = () => {
  logOutButton = $('#log-out-btn')
  assignListeners()
}

const showLoginModule = () => {
  body.append(userElements.logIn);
  submitLogin = $('#log-in-submit');
  logInUsername = $('#username');
  logInPassword = $('#password');
  submitLogin.on('click', logIn)
};

const logInAgent = () => {
  userBtns.html(agentElements.navButtons)
  user.adminLogIn()
    .then(data => user = user.showAgent(data))
    .then(customizePage)
    .catch(error => console.log(error.message))
}

const logInClient = (username) => {
  let id = username.split('traveler');
  userBtns.html(userElements.navButtons);
  user.userLogIn(id[1])
    .then(data => user = user.showClient(data))
    .then(customizePage)
    .catch(error => console.log(error.message))

}

const logInValidater = () => {
  let clientUsername = logInUsername.val().toLowerCase().includes('traveler');
  let agentUsername = logInUsername.val().toLowerCase().includes('agency');
  let correctPassword = logInPassword.val().toLowerCase() === 'travel2020'
  if (clientUsername && correctPassword) {
    body.removeClass('guest-js')
    logInClient(logInUsername.val())
  } else if (agentUsername && correctPassword) {
    body.removeClass('guest-js')
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

const hideBanner = () => {
  setTimeout(function() {
    lastScroll = page.scrollTop();
  }, 5)

  if (page.scrollTop() < lastScroll) {
    nav.css('opacity', '1')
  } else if (page.scrollTop() > 110) {
    nav.css('opacity', '0')
  }
}


fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
  .then(response => response.json())
  .then(data => destinations = data.destinations)
  .then(createDestinationCards)
  .catch(err => console.log(err.message))

welcomeBanner.text(`Welcome, ${user.name}`)
main.on('click', checkLoggedIn)
logInBtn.on('click', showLoginModule)
window.addEventListener('scroll', hideBanner)
