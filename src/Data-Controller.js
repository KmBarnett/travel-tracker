


const dataController = {

  async grabUserTrips(id) {
    let response = await
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips');
    let tripsInfo = await response.json();
    let myTrips = await tripsInfo.trips.filter(trip => trip.userID === this.id);
    return myTrips
  },






}

export default dataController;
