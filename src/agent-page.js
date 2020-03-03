const agentElements = {
  navButtons: `
  <button type="button" id="my-customers" name="pending trips">
    <img src="./images/customers.svg" alt="">
    my-customers
  </button>
  <button type="button" id="pending-trips" name="pending trips">
    <img src="./images/Pending.svg" alt="">
    Pending Trips
  </button>
  <button id="destinations" type="button" name="Destinations">
    <img src="./images/003-world.svg" alt="">
    Destinations
  </button>
  <button id="log-out-btn" type="button" name="Log Out">
    <img src="./images/login.svg" alt="">
    Log Out
  </button>`,
  totalEarned: (earned) => {
    return `<p>Total Earned: $${earned}</p>`
  },

  tripsTable: () => {
    return `
    <section class="table-container">
      <table class="agent-table">
        <tbody id="table">
          <tr>
           <th>Trip Id</th>
           <th>Customer</th>
           <th>Date of Travel</th>
           <th>Status</th>
           <th>Destination</th>
          </tr>
        </tbody>
      <table>
      <button class="show-all">Show All</button>
    </section>
    `
  },

  userListItem: (trip, user, destination) => {
    let selected = (trip.status === 'pending') ? 'selected' : '';
    return `
    <tr>
			<td>${trip.id}</td>
			<td>${user.name}</td>
			<td>${trip.date}</td>
			<td>
      <select id='${trip.id}' class='agent-request-selector'>
        <option value="approved">Approved</option>
        <option value="denied">Denied</option>
        <option ${selected} value="pending">Pending</option>
      <select>
      </td>
			<td>${destination.destination}</td>
		</tr>
    `
  },

  userListItems: (trips, users, destinations) => {
    let cells = []
    trips.forEach(trip => {
      let user = users.find(user => user.id === trip.userID)
      let destination = destinations.find(destination => trip.destinationID === parseInt(destination.id))
      cells.push(agentElements.userListItem(trip, user, destination))
    })
    return cells
  },
  onTrips: (num) => {
    return `<p>Traveling Today: ${num}</p>`
  },

  renderMyCustomersPage: () => {
    return `
    <section>
      <input role="search" type="search" name="search" placeholder="Customer Name">
      <section id="results">
      ${agentElements.renderResultsUser()}

      </section>
    </section>
    `
  }
}

module.exports = agentElements;
