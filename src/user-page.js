

const userElements = {
  navButtons: `<button id="my-trips" type="button" name="My Trips">
      <img src="./images/001-ticket.svg" alt="">
      My Trips
    </button>
    <button id="plan-trip" type="button" name="Plan a Trip">
      <img src="./images/005-flyer.svg" alt="">
      Plan a Trip
    </button>
    <button id="destinations" type="button" name="Destinations">
      <img src="./images/003-world.svg" alt="">
      Destinations
    </button>
    <button id="log-out-btn" class="login" type="button" name="Log Out">
      <img src="./images/login.svg" alt="">
      Log Out
    </button>`,
  logIn: `<section id="login-modle" class="login-module">
    <button class="close" type="button" name="close">
      X
    </button>
    <form class="login-form">
      <div>
        <label for="username">Username:</label>
        <input id="username" type="text" name="Username" placeholder="Username">
      </div>
      <div>
        <label for="username">Password:</label>
        <input id="password" type="password" name="Password" placeholder="Password">
      </div>
      <button id="log-in-submit" type="button" name="Log In">Log In</button>
    </form>
  </section>`,
  logInBtn: `<button id="login-btn" class="login" type="button" name="Plan a Trip">
    <img src="./images/login.svg" alt="">
    <p>Log In</p>
  </button>`,
  tripsImage: (done) => {
    return `<svg class="trip-background" version="1.0" xmlns="http://www.w3.org/2000/svg"
     width="1818.000000pt" height="780.000000pt" viewBox="0 0 1818.000000 780.000000"
     preserveAspectRatio="xMidYMid meet">
    <g transform="translate(0.000000,780.000000) scale(0.100000,-0.100000)"
    fill="#FCFCFC" stroke="none">
    <path fill='${done}' d="M1756 7584 c-98 -19 -160 -41 -251 -87 -218 -113 -374 -304 -452
    -554 l-28 -88 -3 -1016 -3 -1016 43 -19 c111 -50 237 -149 321 -252 279 -341
    289 -818 26 -1173 -82 -111 -208 -216 -327 -274 l-61 -30 2 -1000 2 -1000 23
    -80 c87 -312 313 -544 629 -642 l88 -28 958 -3 957 -3 0 3641 0 3640 -927 -1
    c-741 -1 -942 -4 -997 -15z"/>
    <path d="M4340 3960 l0 -3640 6393 2 6392 3 80 22 c313 88 543 314 642 630
    l28 88 0 2885 0 2885 -22 85 c-82 312 -312 548 -630 647 l-88 28 -6397 3
    -6398 2 0 -3640z"/>
    </g>
    </svg>`
  },

  totalCost: (amount) => {
    return `<p>Total Spent: $${amount}</p>`
  },

  tripsDestination: (name) => {
    return `
      <div>
        <h2 class="ticket-name">${name.destination}</h2>
      </div>`
  },

  tripsDestinationImg: (destination) => {
    return `<img class="ticket-img" src="${destination.image}" alt="${destination.destination}">`
  },

  tripsCost: (cost) => {
    return `<h2 class="ticket-cost">Total: $${cost}</h2>`
  },

  tripsStatus: (trip) => {
    let statusIcon = (trip.status === 'approved') ? '✔︎' : '...';
    let statusColor = (trip.status === 'approved') && 'green'
    return `<h2 class="${statusColor} ticket-status">Status: ${statusIcon} ${trip.status}</h2>`
  },

  tripsDuration: (trip) => {
    return `<h2 class="ticket-duration">Days: ${trip.duration}</h2>`
  },

  tripsDate: (trip) => {
    return `<h2 class="ticket-date">Depart On: ${trip.date}</h2>`
  },

  tripsTravelers: (trip) => {
    return `<h2 class="ticket-travelers">Travelers: ${trip.travelers}</h2>`
  },

    createTripsCard: (destination, cost, trip, status) => {
    let done = (status) ? '#228B22' : '#FCFCFC';
    let info = `
    <section id='${trip.id}' class="trip-card ${done}">
      ${userElements.tripsImage(done)}
      <section class="trip-info">
        <section class="trip-header">
          ${userElements.tripsDestination(destination)}
        </section>
        <section class="trip-details">
          <section class="trip-top">
            ${userElements.tripsDuration(trip)}
            ${userElements.tripsDate(trip)}
          </section>
          <section class="trip-middle">
            ${userElements.tripsDestinationImg(destination)}
            ${userElements.tripsTravelers(trip)}
          </section>
          <section class="trip-bottom">
            ${userElements.tripsCost(cost)}
            ${userElements.tripsStatus(trip)}
          </section>
        </section>
      </section>
    </section>
    `
    return info
  },

  createDestinationCards: (destination) => {
    return `
    <section id='${destination.id}' class="destinations-card">
      <h3 class="dest-name">${destination.destination}</h3>
      <button class='dest-image' value='${destination.destination}'>
      <img src="${destination.image}" alt="${destination.destination}">
      </button>
      <div class="trip-info">
      <p class="dest-lodging-cost">Lodging: $<span class="money">${destination.estimatedLodgingCostPerDay}</span> per Day</p>
      <p class="dest-flight-cost">Flight: $<span class="money">${destination.estimatedFlightCostPerPerson}</span> per Person</p>
      <p class="dest-flight-cost">${destination.alt}</p>
      </div>
    </section>`
  },

  tripRequestModle: (minDate) => {
    return `
    <section id="request-form-frame" class="request-form-frame">
      <button class="close" type="button" name="close">
        X
      </button>
      <form class="request-form">
        <h1>Trip Request</h1>
        <label for='list-input'>
          Destination:
          <input placeholder="Destination" id='list-input' list="destination-select">
          <datalist id="destination-select">
          </datalist>
        </label>
        <label for='travelers-form'>
          Number of Travelers:
          <input min=0 id="travelers-form" type="number" name="travelers" placeholder="Number of Travelers">
        </label>
        <label for='date-travel'>
          Date of Travel:
          <input min="${minDate}" value='yyyy-MM-dd' id="date-travel" type="date" name="date" placeholder="Date">
        </label>
        <label for='date-return'>
          Date of Retrun:
          <input disabled value='yyyy-MM-dd' id="date-return" type="date" name="date" placeholder="Date">
        </label>
        <h3 id='request-total' class='request-total'>Total: $0.00</h3>
        <button type='button' disabled id="request-submit">Request Trip</button>
      </form>
    </section>
    `
  },

  destinationOption: (destination) => {
    return `<option value="${destination.destination}">`
  },


}

module.exports = userElements;
