


const dataController = {
  trips: null,
  destinations: null,


  grabTrips() {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
      .then(response => response.json())
      .then(data => dataController.trips = data.trips)
      .catch(err => console.log(err.message))
  },

  dateToNum(date) {
    let splitDate = date.split('/')
    if (splitDate[1].length === 1) {
      splitDate[1] = `0${splitDate[1]}`
    }
    return parseInt(splitDate.join(''))
  },

  grabUserTrips(id) {
    let trips = dataController.trips.filter(trip => trip.userID === id * 1)
    trips.sort((a, b) => {
      return (dataController.dateToNum(a.date) - dataController.dateToNum(b.date))
    })
    console.log(trips);
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
