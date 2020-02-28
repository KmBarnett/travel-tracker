import Agent from './Agent.js'
import Client from './Client.js'

class User {
  constructor() {
    this.name = 'Guest'
  }

  showAgent(data) {
    return new Agent(data)
  }

  showClient(data, trips) {
    return new Client(data, trips)
  }
}

export default  User;
