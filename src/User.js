import Client  from './Client.js'
import Agent from './Agent.js'

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
