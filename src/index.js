// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import moment from 'moment'
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
const dateSection = $('#date')
const userBtns = $('.user-buttons');
const body = $('body');
const contentSection = $('#destinations-cards');
const welcomeBanner = $('.welcome')
const pageBanner = $('.banner')
let today = moment().format("YYYY/MM/DD");
let logInBtn = $('#login-btn');
let user = new User();
let customersBtn;
let tripsBtn;
let submitLogin;
let logInUsername;
let logInPassword;
let logOutButton;
let destinationsBtn;


const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const showAll = () => {
  showUserDataForAgent(user.listTripsPendingFirst())
  $('.show-all').text('Show Pending').on('click', showUserDataForAgentHelper)
}

const showUserDataForAgentHelper = () => {
  showUserDataForAgent(user.listPendingTrips(today))
}

const showUserDataForAgent = (trips) => {
  contentSection.empty()
  pageBanner.text('Pending Trips')
  customizePage()
  let table = agentElements.tripsTable();
  contentSection.prepend(table)
  let tableSection = $('#table')
  let cells = agentElements.userListItems(trips, user.users, dataController.destinations)
  cells.forEach(cell => {
    tableSection.append(cell)
  });
  $('.show-all').on('click', showAll)
}

const showUserTrips = () => {
  contentSection.empty()
  pageBanner.text('My Trips');
  user.trips.forEach(trip => {
    let date = dataController.compareDates(trip.date);
    let destination = dataController.findDestination(parseInt(trip.destinationID));
    let cost = user.calulateTripCost(destination, trip);
    let costWithCommas = numberWithCommas(cost)
    let ticket = userElements.createTripsCard(destination, costWithCommas, trip, date);

    contentSection.prepend(ticket)
  });

}

const createDestinationCards = () => {
  pageBanner.text('Destinations')
  customizePage()
  contentSection.empty()
  dataController.destinations.forEach(destination => {
    let card = userElements.createDestinationCards(destination)
    contentSection.append(card)
  });
}

const customizePage = () => {
  welcomeBanner.text(`Welcome, ${user.name}`)
  if (body.hasClass('client-js')) {
    let cost = user.showTotalSpent(dataController.destinations)
    let costWithCommas = numberWithCommas(cost)
    welcomeBanner.append(userElements.totalCost(costWithCommas))
  } else if (body.hasClass('agent-js')) {
    let earned = user.showTotalSpent(dataController.destinations)
    let earnedWithCommas = numberWithCommas(earned)
    pageBanner.append(agentElements.onTrips(user.showTravelCount(today)))
    welcomeBanner.append(agentElements.totalEarned(earnedWithCommas))
  }
}

const checkLoggedIn = () => {
  if (body.hasClass('guest-js')) {
    showLoginModule()
  }
}

const logOut = () => {
  body.addClass('guest-js')
  body.removeClass('client-js')
  body.removeClass('agent-js')
  userBtns.html(userElements.logInBtn)
  logInBtn = $('#login-btn');
  logInBtn.on('click', showLoginModule)
  user = user.logOut()
  createDestinationCards()
  customizePage()
}

const assignListeners = () => {
  logOutButton.on('click', logOut)
  destinationsBtn.on('click', createDestinationCards)
  if (body.hasClass('client-js')) {
    tripsBtn.on('click', showUserTrips)
  } else if (body.hasClass('agent-js')) {
    customersBtn.on('click', showUserDataForAgentHelper)
  }
}

const assignButton = () => {
  logOutButton = $('#log-out-btn')
  tripsBtn = $('#my-trips')
  destinationsBtn = $('#destinations')
  customersBtn = $('#my-customers');
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
  body.addClass('agent-js')
  userBtns.html(agentElements.navButtons)
  dataController.adminLogIn()
    .then(data => {
      user = user.showAgent(data, dataController.grabAdminTrips())
    })
    .then(customizePage)
    .catch(error => console.log(error.message))
}

const logInClient = (username) => {
  body.addClass('client-js')
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


dateSection.text(`${today}`)
dataController.getDestenations()
  .then(createDestinationCards)
dataController.grabTrips()
welcomeBanner.text(`Welcome, ${user.name}`)
main.on('click', checkLoggedIn)
logInBtn.on('click', showLoginModule)
