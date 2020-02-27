import Agent from './Agent.js'
import Client from './Client.js'

class User {
  constructor() {
    this.name = 'Guest'

  }

  adminLogIn() {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
      .then(response => response.json())
      .then(data => this.showCustomers(data))
      .catch(error => console.log(error.message))
    return new Agent()
  }

  userLogIn(id) {
    fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/${id}`)
      .then(response => response.json())
      .then(data => this.showClient(data))
      .catch(error => console.log(error.message))
  }

  showClient(data) {
    return new Client(data)
  }
}

module.exports = User;
