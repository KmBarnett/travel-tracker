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

// images and style
import './css/base.scss';
import './images/sam-icon.svg';
import './images/005-flyer.svg';
import './images/003-world.svg';
import './images/001-ticket.svg';
import './images/customers.svg';
import './images/login.svg';
import './images/android-chrome-512x512.png'
import './images/Pending.svg'

const dateSection = $('#date')
const userBtns = $('.user-buttons');
const body = $('body');
const contentSection = $('#destinations-cards');
const welcomeBanner = $('.welcome')
const pageBanner = $('.banner')
let today = moment().format("YYYY/MM/DD");
let user = new User();

// Non constant DOM elements
let logInUsername;
let logInPassword;
let tripModleDataSelect;
let requestLeaveDatePicker;
let requestReturnDatePicker;
let requestDestination;
let requestTravlers;
let requestSubmit;
let requestTotal;

const closeModle = () => {
  event.target.closest('section').remove()
  body.removeClass('request login')
}

// style alteration

const showNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// style alteration


//Agent seach functionality
const renderSearchAgent = () => {
  contentSection.empty()
  contentSection.append(agentElements.renderMyCustomersPage)
  user.users.forEach(user => {
    $('#users-names-list').append(userElements.selectorOption(user.name))
  });

}

const renderResultsHelper = (result, parentNode, destinations) => {
  result.trips.forEach(trip => {
    let destination = dataController.findDestination(trip.destinationID, 'id')
    let cost = user.calulateTripCost(destination, trip)
    parentNode.append(agentElements.userListItem(trip, result.user, destination, showNumberWithCommas(cost)))
  });
}

const searchCustomers = (usersName, destinations) => {
  let resultsSection = $('#results')
  let userExists = user.users.find(user => user.name.toLowerCase() === usersName.toLowerCase())
  resultsSection.empty()
  if (userExists) {
  let result = user.searchUser(usersName, destinations)
    resultsSection.append(agentElements.renderUserSpent(showNumberWithCommas(result.total)))
    resultsSection.append(agentElements.tripsTable())
    renderResultsHelper(result, $('.agent-table'), destinations)
  } else {
    resultsSection.append(agentElements.renderError)
  }
}

//Agent seach functionality
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
  dataController.postTrip(request, 'request')
  user.updateTrips(request)
  showUserTrips()
  closeModle()
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


const assignRequestElements = () => {
  requestReturnDatePicker = $('#date-return');
  requestLeaveDatePicker = $('#date-travel');
  requestDestination = $('#list-input');
  requestTravlers = $('#travelers-form');
  requestSubmit = $('#request-submit');
  requestTotal = $('#request-total')
}

const showRequestModle = (destination) => {
  if (!body.hasClass('request') && body.hasClass('client')) {
    let minDate = moment().add(1, 'days').format('YYYY-MM-DD')
    body.append(userElements.tripRequestModle(minDate));
    tripModleDataSelect = $('#destination-select')
    dataController.destinations.forEach(destination => {
      tripModleDataSelect.append(userElements.selectorOption(destination.destination))
    });
    assignRequestElements()
    if (destination) {
      console.log();
      requestDestination.val(destination)
    }
    body.addClass('request')
  }
}

const openFormWithDest = () => {
  showRequestModle(event.target.value)
}
// Request from validation

// Agent status update

const updateTrips = (packageInfo) => {
  if (packageInfo.status === 'denied') {
    dataController.postTrip({id: packageInfo.id}, 'delete')
  } else if (packageInfo.status === 'approved') {
    dataController.postTrip(packageInfo, 'update')
  }
}

const updateTripStatusHelper = () => {
  let status = event.target
  let packageInfo = {
    id: parseInt(status.id),
    status: `${status.value}`,
  }
  updateTrips(packageInfo)
}

// Agent status update

// Agent table population

const showAll = () => {
  showUserDataForAgent(user.listTripsPendingFirst())
  $('.show-all').text('Show Pending')
  $('.show-all').addClass('show-pending')
}

const showUserDataForAgentAll = () => {
  showUserDataForAgent(user.listPendingTrips(today))
  $('.show-all').removeClass('show-pending')
}

const showUserDataForAgent = (trips) => {
  contentSection.empty()
  pageBanner.text('Pending Trips')
  customizePage()
  let table = agentElements.tripsTable();
  contentSection.prepend(table)
  let tableSection = $('#table')
  let cells = agentElements.userListItems(trips, user.users, dataController.destinations, user, showNumberWithCommas)
  cells.forEach(cell => {
    tableSection.append(cell)
  });
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
    let costWithCommas = showNumberWithCommas(cost)
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
    let costWithCommas = showNumberWithCommas(cost)
    welcomeBanner.append(userElements.totalCost(costWithCommas))
  } else if (body.hasClass('agent-js')) {
    let earned = user.showTotalSpent(dataController.destinations)
    let earnedWithCommas = showNumberWithCommas(earned)
    pageBanner.append(agentElements.onTrips(user.showTravelCount(today)))
    welcomeBanner.append(agentElements.totalEarned(earnedWithCommas))
  }
}

// page customization


// Logging in

const checkLoggedIn = () => {
  if (body.hasClass('guest-js')) {
    showLoginModule()
  } else {
    openFormWithDest()
  }
}

const logOut = () => {
  body.addClass('guest-js')
  body.removeClass('client-js')
  body.removeClass('agent-js')
  userBtns.html(userElements.logInBtn)
  user = user.logOut()
  createDestinationCards()
  customizePage()
}

const showLoginModule = () => {
  if (!body.hasClass('login')) {
    body.append(userElements.logIn);
    logInUsername = $('#username');
    logInPassword = $('#password');
    body.addClass('login')
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
  let id = username.toLowerCase().split('traveler');
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
}

const logIn = () => {

  if (logInValidater()) {
    alert('Invalid Information')
  } else {
    closeModle()
  }
};

// Logging in

// event handling

const inputHandler = () => {
  if (event.target.id === 'customer-search' && event.keyCode === 13) {
    searchCustomers($('#customer-search').val(), dataController.destinations)
  }
}


const changeHandler = (e) => {

  if (e.target.id === 'date-travel') {
    enableSecondDateSelect()
  }

  if (e.target.classList.contains('agent-request-selector')) {
    updateTripStatusHelper()
  }

  if (e.target.closest('section').id === 'request-form-frame') {
    enableSubmit()
  }
}

const clickHandler = (e) => {
  if (e.target.closest('section').classList.contains('destinations-card')) {
    checkLoggedIn()
  } else if (e.target.id === 'login-btn') {
    showLoginModule()
  } else if (e.target.id === 'request-submit') {
    submitRequest()
  } else if (e.target.id === 'log-out-btn') {
    logOut()
  } else if (e.target.classList.contains('show-pending')) {
    showUserDataForAgentAll()
  } else if (e.target.classList.contains('show-all')) {
    showAll()
  } else if (e.target.classList.contains('close')) {
    closeModle()
  } else if (e.target.id === 'my-trips') {
    showUserTrips()
  } else if (e.target.id === 'destinations') {
    createDestinationCards()
  } else if (e.target.id === 'pending-trips') {
    showUserDataForAgentAll()
  } else if (e.target.id === 'plan-trip') {
    showRequestModle()
  } else if (e.target.id === 'log-in-submit') {
    logIn()
  } else if (e.target.id === 'my-customers') {
    renderSearchAgent()
  }
}

// event handling

dateSection.text(`${today}`)
dataController.getDestenations()
  .then(createDestinationCards)
dataController.grabTrips()
welcomeBanner.text(`Welcome, ${user.name}`)
body.on('click', clickHandler)
body.on('change', changeHandler)
body.on('keyup', inputHandler)
