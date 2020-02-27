import User from './User.js'


class Client {
  constructor(user) {
    this.name = user.name;
  }

  logOut() {
    return new User()
  }

}

export default Client;
