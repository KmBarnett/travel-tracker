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
const userBtns = $('.user-buttons');
const body = $('body');
const contentSection = $('#destinations-cards');
const welcomeBanner = $('.welcome')
const pageBanner = $('.banner')
let logInBtn = $('#login-btn');
let user = new User();

let tripsBtn;
let submitLogin;
let logInUsername;
let logInPassword;
let logOutButton;
let destinationsBtn;


const showTrips = () => {
  contentSection.empty()
  pageBanner.text('My Trips')
  user.trips.forEach(trip => {
    let destination = dataController.findDestination(trip.destinationID);
    let cost = user.calulateTripCost(destination, trip);
    let ticket = `
    <section id='${trip.id}' class="trip-card">
      ${userElements.createTripsCard(destination, cost, trip)}
    </section>
    `
    contentSection.append(ticket)
  });

}

const createDestinationCards = () => {
  pageBanner.text('Destinations')
  contentSection.empty()
  dataController.destinations.forEach(destination => {
    let card = `
    <section id='${destination.id}' class="destinations-card">
      <h3 class="dest-name">${destination.destination}</h3>
      <button>
      <img src="${destination.image}" alt="${destination.destination}">
      </button>
      <div class="trip-info">
      <p class="dest-lodging-cost">Lodging: $<span class="money">${destination.estimatedLodgingCostPerDay}</span> per Day</p>
      <p class="dest-flight-cost">Flight: $<span class="money">${destination.estimatedFlightCostPerPerson}</span> per Person</p>
      </div>
    </section>`
    contentSection.append(card)
  });
}

const customizePage = () => {
  welcomeBanner.text(`Welcome, ${user.name}`)
  if (checkLoggedIn()) {
    welcomeBanner.append(`<p>Total Spent: $${user.showTotalSpent(dataController.destinations)}</p>`)
  }
}

const checkLoggedIn = () => {
  if (body.hasClass('guest-js')) {
    showLoginModule()
  } else {
    return true
  }
}

const logOut = () => {
  body.addClass('guest-js')
  userBtns.html(userElements.logInBtn)
  logInBtn = $('#login-btn');
  logInBtn.on('click', showLoginModule)
  user = user.logOut()
  createDestinationCards()
  customizePage()
}

const assignListeners = () => {
  logOutButton.on('click', logOut)
  tripsBtn.on('click', showTrips)
  destinationsBtn.on('click', createDestinationCards)
}

const assignButton = () => {
  logOutButton = $('#log-out-btn')
  tripsBtn = $('#my-trips')
  destinationsBtn = $('#destinations')
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
  dataController.adminLogIn()
    .then(data => user = user.showAgent(data))
    .then(customizePage)
    .catch(error => console.log(error.message))
}

const logInClient = (username) => {
  let id = username.split('traveler');
  userBtns.html(userElements.navButtons);
  dataController.userLogIn(id[1])
    .then(data => user = user.showClient(data, dataController.grabUserTrips(id[1])))
    .then(customizePage)
    .catch(error => console.log(error.message))

}

const logInValidater = () => {
  let clientUsername = logInUsername.val().toLowerCase().includes('traveler');
  let agentUsername = logInUsername.val().toLowerCase().includes('agency');
  let correctPassword = logInPassword.val().toLowerCase() === 'travel2020'
  if (clientUsername && correctPassword) {
    body.removeClass('guest-js')
    body.addClass('client-js')
    logInClient(logInUsername.val())
  } else if (agentUsername && correctPassword) {
    body.removeClass('guest-js')
    body.addClass('agent-js')
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



dataController.getDestenations()
  .then(createDestinationCards)
dataController.grabTrips()
welcomeBanner.text(`Welcome, ${user.name}`)
main.on('click', checkLoggedIn)
logInBtn.on('click', showLoginModule)
