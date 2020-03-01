import Client from './Client.js';

class Agent extends Client {
  constructor(userData, tripsData) {
    super({name: 'Mr. Jackson'}, tripsData)
    this.users = userData;
  }

  listPendingTrips() {
    return this.trips.filter(trip => trip.status === 'pending')
  }

  showTravelCount(date) {
    console.log(date);
    let totalTrips = this.trips.filter(trip => trip.date === date)
    return totalTrips.length
  }

}

export default Agent;
