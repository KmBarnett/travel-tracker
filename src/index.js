// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file

// packages
import $ from 'jquery';
import moment from 'moment'

// classes
import Request from './Request.js'
import User from './User.js'

// Data Storage objects
import userElements from './user-page.js';
import agentElements from './agent-page.js';
import dataController from './Data-Controller.js'

// images
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
let request = null;

// Non constant DOM elements
let customersBtn;
let requestBtn;
let tripsBtn;
let submitLogin;
let logInUsername;
let logInPassword;
let logOutButton;
let destinationsBtn;
let tripModleDataSelect;
let requestLeaveDatePicker;
let requestReturnDatePicker;
let requestDestination;
let requestTravlers;
let requestSubmit;
let requestForm;
let requestTotal;

// style alteration

const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// style alteration

// Request Submission

const submitRequestHelper = () => {
  let customerInput = requestDestination.val();
  let destination = dataController.findDestination(customerInput, 'destination');
  let date = requestLeaveDatePicker.val();
  let formatedDate = dataController.formatDate(date)
  let userInput = {
    destinationId: destination.id,
    travelers: parseInt(requestTravlers.val()),
    date: `${formatedDate}`,
    duration: calculateDuration(),
  }

  return new Request(dataController.generateId(), user.id, userInput)
}

const submitRequest = () => {
  let request = submitRequestHelper();
  dataController.postTrip(request)
  requestForm.remove()
  body.removeClass('request')
  user.updateTrips(request)
  showUserTrips()
}

const reviewRequests = (valid) => {
  if (valid) {
    let request = submitRequestHelper();
    let destination = dataController.findDestination(request.destinationID, 'id')
    requestTotal.text(`Total: $${user.calulateTripCost(destination, request)}`)
  }
}

// Request Submission

// Request form validation


const calculateDuration = () => {
  let leaveDate = moment(requestLeaveDatePicker.val());
  let returnDate = moment(requestReturnDatePicker.val());
  return returnDate.diff(leaveDate, 'days')
}

const validateRequestInputs = () => {
  let customerInput = requestDestination.val();
  let destinationPicked = dataController.findDestination(customerInput, 'destination');
  let travelersDeclared = requestTravlers.val().length > 0;
  return destinationPicked && travelersDeclared
}

const enableSubmit = () => {
  let duration = calculateDuration()
  let inputsFilled = validateRequestInputs()
  let valid = (duration > 0) && inputsFilled
  requestSubmit.prop('disabled', !valid)
  reviewRequests(valid)
}

const enableSecondDateSelect = () => {
  let startDate = requestLeaveDatePicker.val();
  requestReturnDatePicker.prop('min', moment(startDate).add(1, 'days').format('YYYY-MM-DD'))
  requestReturnDatePicker.prop('disabled', false)
}

const assignRequestListeners = () => {
  requestLeaveDatePicker.on('change', enableSecondDateSelect);
  requestForm.on('change', enableSubmit)
  requestSubmit.on('click', submitRequest)
}

const assignRequestElements = () => {
  requestReturnDatePicker = $('#date-return');
  requestLeaveDatePicker = $('#date-travel');
  requestDestination = $('#list-input');
  requestTravlers = $('#travelers-form');
  requestSubmit = $('#request-submit');
  requestForm = $('#request-form-frame');
  requestTotal = $('#request-total')
  assignRequestListeners()
}

const showRequestModle = () => {
  if (!body.hasClass('request')) {
    let minDate = moment().add(1, 'days').format('YYYY-MM-DD')
    body.append(userElements.tripRequestModle(minDate));
    tripModleDataSelect = $('#destination-select')
    dataController.destinations.forEach(destination => {
      tripModleDataSelect.append(userElements.destinationOption(destination))
    });
    assignRequestElements()
    body.addClass('request')
  }
}
// Request from validation

// Agent table population

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

// Agent table population

// User ticket population

const showUserTrips = () => {
  contentSection.empty()
  pageBanner.text('My Trips');
  user.trips.forEach(trip => {
    let date = dataController.compareDates(trip.date);
    let destination = dataController.findDestination(parseInt(trip.destinationID), 'id');
    let cost = user.calulateTripCost(destination, trip);
    let costWithCommas = numberWithCommas(cost)
    let ticket = userElements.createTripsCard(destination, costWithCommas, trip, date);

    contentSection.prepend(ticket)
  });

}

// User ticket population

// Destination card Creation

const createDestinationCards = () => {
  pageBanner.text('Destinations')
  customizePage()
  contentSection.empty()
  dataController.destinations.forEach(destination => {
    let card = userElements.createDestinationCards(destination)
    contentSection.append(card)
  });
}


// Destination card Creation

// page customization

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

// page customization


// Logging in

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

const assignButtonListeners = () => {
  logOutButton.on('click', logOut)
  destinationsBtn.on('click', createDestinationCards)
  if (body.hasClass('client-js')) {
    tripsBtn.on('click', showUserTrips)
    requestBtn.on('click', showRequestModle)
  } else if (body.hasClass('agent-js')) {
    customersBtn.on('click', showUserDataForAgentHelper)
  }
}

const assignDashButtons = () => {
  logOutButton = $('#log-out-btn')
  tripsBtn = $('#my-trips')
  destinationsBtn = $('#destinations')
  customersBtn = $('#my-customers');
  requestBtn = $('#plan-trip')
  assignButtonListeners()
}

const showLoginModule = () => {
  if (!logInUsername) {
    body.append(userElements.logIn);
    submitLogin = $('#log-in-submit');
    logInUsername = $('#username');
    logInPassword = $('#password');
    submitLogin.on('click', logIn)
  }
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
  let clientUsername =  logInUsername.val().toLowerCase().includes('traveler');
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
  assignDashButtons()
}

const logIn = () => {

  if (logInValidater()) {
    alert('Invalid Information')
  } else {
    let modle = $('#login-modle')
    modle.remove()
  }
};

// Logging in

dateSection.text(`${today}`)
dataController.getDestenations()
  .then(createDestinationCards)
dataController.grabTrips()
welcomeBanner.text(`Welcome, ${user.name}`)
main.on('click', checkLoggedIn)
logInBtn.on('click', showLoginModule)
