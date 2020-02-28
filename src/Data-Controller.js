


const dataController = {
  trips: null,

  async grabAll() {
    dataController.trips = await dataController.grabTrips()
  },

  async grabTrips() {
    let response = await
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips');
    let tripsInfo = await response.json();
    return tripsInfo.trips
  },

  grabUserTrips(id) {
    let trips = dataController.trips.filter(trip => trip.userID === id * 1)
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

  }






}

export default dataController;
