
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
      return Math.trunc(((lodgingCost + flightsCost) * 1.1))
  }

  findDestinationByTrip(destinations, trip) {
    return destinations.find(destination => destination.id === trip.destinationID)
  }

  showTotalSpentHelper(destination, trip) {
    if (trip.status === 'approved') {
      return this.calulateTripCost(destination, trip)
    } else {
      return 0
    }
  }

  showTotalSpent(destinations) {
    let totalSpent = 0
    this.trips.forEach(trip => {
      let myDestination = this.findDestinationByTrip(destinations, trip)
      totalSpent += this. showTotalSpentHelper(myDestination, trip)
    });

    return totalSpent
  }

    updateTrips(trip) {
      this.trips.push(trip)
    }

  logOut() {
    location.reload();
  }

}

export default Client;
