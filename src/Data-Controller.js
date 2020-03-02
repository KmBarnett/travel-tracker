import moment from 'moment'


const dataController = {
  trips: null,
  destinations: null,


  grabTrips() {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
      .then(response => response.json())
      .then(data => dataController.trips = data.trips)
      .then(dataController.formatDate)
      .catch(err => console.log(err.message))
  },

  formatDate() {
    dataController.trips.forEach(trip => {
      let date = trip.date.split('-')
      if (date.length > 1) {
        trip.date = `${date[0]}/${date[1]}/${date[2]}`
      }
    });


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

  findDestination(destinationID) {
    return dataController.destinations
      .find(destination => destinationID === destination.id)
  },






}

export default dataController;
