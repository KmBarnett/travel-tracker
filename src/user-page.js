const userElements = {
  navButtons: `<button type="button" name="My Trips">
      <img src="./images/001-ticket.svg" alt="">
      My Trips
    </button>
    <button type="button" name="Plan a Trip">
      <img src="./images/005-flyer.svg" alt="">
      Plan a Trip
    </button>
    <button type="button" name="Destinations">
      <img src="./images/003-world.svg" alt="">
      Destinations
    </button>`,
  logIn:`<section id="login-modle" class="login-module">
    <form class="login-form">
      <div>
        <label for="username">Username:</label>
        <input id="username" type="text" name="Username" placeholder="Username">
      </div>
      <div>
        <label for="username">Password:</label>
        <input id="password" type="text" name="Password" placeholder="Password">
      </div>
      <button id="log-in-submit" type="button" name="Log In">Log In</button>
    </form>
  </section>`
}

module.exports = userElements;
