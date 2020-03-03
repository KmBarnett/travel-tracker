import Client from './Client.js';

class Agent extends Client {
  constructor(userData, tripsData) {
    super({name: 'Mr. Jackson'}, tripsData)
    this.users = userData.travelers;
  }

  compareDates(dates) {
    let numDates = dates.map(date => {
      let splitDate = date.split('/')
      if (splitDate[1].length === 1) {
        splitDate[1] = `0${splitDate[1]}`
      }
      return parseInt(splitDate.join(''))
    })
    return numDates[0] >= numDates[1]
  }

  listPendingTrips(date) {
    return this.trips.filter(trip =>  {
      let pending = trip.status === 'pending'
      let future = this.compareDates([trip.date, date])
      return (pending && future)
    })
  }

  listTripsPendingFirst() {
    let shallowTrips = [...this.trips]
     shallowTrips.sort(a =>  {
      return (a.status === 'pending') ? -1 : 1;
    })
    return shallowTrips
  }

  showTravelCount(date) {
    let totalTrips = this.trips.filter(trip => trip.date === date)
    return totalTrips.length
  }

  searchUser(usersName, destinations) {
    let currentUser = this.users.find(currentUser => currentUser.name === usersName)
    let tripsData = this.listUserTripsById(currentUser.id)
    // tripsData.sort((a, b) => (this.compareDates([a.date, b.date])) ? -1 : 1)
    console.log(tripsData);
    return {
      user: currentUser,
      trips: tripsData,
      total: this.showTotalSpentById(destinations, currentUser.id)
    }
  }

  listUserTripsById(id) {
    return this.trips.filter(trip => trip.userID === id)
  }

  showTotalSpentById(destinations, id) {
    let totalSpent = 0
    let trips = this.listUserTripsById(id)
    trips.forEach(trip => {
      let myDestination = this.findDestinationByTrip(destinations, trip)
      totalSpent += this.showTotalSpentHelper(myDestination, trip)
    });
    return totalSpent
  }
}

export default Agent;
