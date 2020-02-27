import Agent from './Agent.js'
import Client from './Client.js'

class User {
  constructor() {
    this.name = 'Guest'

  }

  adminLogIn() {
    return window.fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error.message))

  }

  showAgent(data) {
    return new Agent(data)
  }


  userLogIn(id) {

    return window.fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/${id}`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error.message))


  }

  showClient(data) {
    return new Client(data)
  }
}

export default  User;
