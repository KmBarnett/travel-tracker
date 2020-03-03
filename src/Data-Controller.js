import moment from 'moment'


const dataController = {
  trips: null,
  destinations: null,


  grabTrips() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
      .then(response => response.json())
      .then(data => dataController.trips = data.trips)
      .then(dataController.formatTripsDate)
      .catch(err => console.log(err.message))
  },

  formatTripsDate() {
    dataController.trips.forEach(trip => {
      trip.date = dataController.formatDate(trip.date)
    })
  },

  formatDate(date) {
    let currentDate = date.split('-')
    if (currentDate.length > 1) {
      return `${currentDate[0]}/${currentDate[1]}/${currentDate[2]}`
    } else {
      return date
    }
  },

  generateId() {
    let part1 = Math.trunc(Math.random() * 1000000);
    let part2 = Date.now();
    return parseInt((part1 * part2).toString().slice(2, 12))
  },

  dateToNum(date) {

    let splitDate = date.split('/')
    if (splitDate[1].length === 1) {
      splitDate[1] = `0${splitDate[1]}`
    }
    return parseInt(splitDate.join(''))
  },

  compareDates(tripsDate) {
    let today = moment().format('YYYY/MM/DD')
    return dataController.dateToNum(today) > dataController.dateToNum(tripsDate)
  },

  grabUserTrips(id) {
    let trips = dataController.trips.filter(trip => trip.userID === id * 1)
    trips.sort((a, b) => {
      return dataController.dateToNum(a.date) - dataController.dateToNum(b.date)
    })
    return trips
  },

  grabAdminTrips() {
    let trips = [...dataController.trips]
    trips.sort((a, b) => {
      return dataController.dateToNum(a.date) - dataController.dateToNum(b.date)
    })
    return trips
  },

  userLogIn(id) {
    return window.fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/${id}`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error.message))
  },

  adminLogIn() {
    return window.fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error.message))

  },

  getDestenations() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
      .then(response => response.json())
      .then(data => dataController.destinations = data.destinations)
      .catch(err => console.log(err.message))
  },

  findDestination(destinationProperty, propertyToMatch) {
    return dataController.destinations
      .find(destination => destinationProperty === destination[propertyToMatch])
  },

  postTripHelper(data) {


    return {
      method: 'POST',
      headers: {
              'Content-Type': 'application/json'
             },
      body: JSON.stringify(data)
    }

  },


  postTrip(data) {
    let options = dataController.postTripHelper(data)
    return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', options)
      .then(response => response.json())
      .catch(err => console.log(err.message))
  },





}

export default dataController;
