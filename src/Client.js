import User from './User.js'


class Client {
  constructor(user, trips) {
    this.id = user.id;
    this.name = user.name;
    this.travelerType = user.travelerType;
    this.trips = []
  }



  logOut() {
    return new User()
  }

}

export default Client;
