
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
      let myDestination = destinations.find(destination => destination.id === trip.destinationID)
      totalSpent += this.calulateTripCost(myDestination, trip)
    });

    return totalSpent
  }


  logOut() {
    location.reload();
  }

}

export default Client;
