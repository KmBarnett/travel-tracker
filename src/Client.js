import User from './User.js'


class Client {
  constructor(user, trips) {
    this.id = user.id;
    this.name = user.name;
    this.travelerType = user.travelerType;
    this.trips = trips
  }

  calulateTripCost(place, trip) {
    let lodgingCost = (trip.duration * trip.travelers) * place.estimatedLodgingCostPerDay;
    let flightsCost = trip.travelers * place.estimatedFlightCostPerPerson;
      return lodgingCost + flightsCost
  }

  showTotalSpent(destinations) {
    let totalSpent = 0
    this.trips.forEach(trip => {
      let myDestinations = destinations.find(destination => destination.id === trip.destinationID)
      totalSpent += this.calulateTripCost(myDestinations, trip)
    });

    return totalSpent
  }


  logOut() {
    return new User()
  }

}

export default Client;
