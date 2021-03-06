import chai from 'chai';
import Client from '../src/Client.js'
import Agent from '../src/Agent.js'
import User from '../src/User.js'
const spies = require('chai-spies');
chai.use(spies);
const should = chai.should()

// import Agent from '../Agent.js'
// import Client from '../Client.js'

const expect = chai.expect;

describe('Client', function() {
  let user;
  let destinationsData;
  let tripsData;
  global.location = {}



  beforeEach(function() {
    destinationsData =
    [{
      id: 1,
      destination: "Lima, Peru",
      estimatedLodgingCostPerDay: 70,
      estimatedFlightCostPerPerson: 400,
      image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      alt: "overview of city buildings with a clear sky"
    },
    {
      id: 2,
      destination: "Stockholm, Sweden",
      estimatedLodgingCostPerDay: 100,
      estimatedFlightCostPerPerson: 780,
      image: "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      alt: "city with boats on the water during the day time"
    },
    {
      id: 3,
      destination: "Sydney, Austrailia",
      estimatedLodgingCostPerDay: 130,
      estimatedFlightCostPerPerson: 950,
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      alt: "opera house and city buildings on the water with boats"
    }]

    tripsData =
    [{
      id: 1,
      userID: 1,
      destinationID: 1,
      travelers: 1,
      date: "2019/09/16",
      duration: 8,
      status: "approved",
      suggestedActivities: [ ]
    },
    {
      id: 2,
      userID: 1,
      destinationID: 2,
      travelers: 5,
      date: "2020/10/04",
      duration: 18,
      status: "approved",
      suggestedActivities: [ ]
    },
    {
      id: 3,
      userID: 1,
      destinationID: 3,
      travelers: 4,
      date: "2020/05/22",
      duration: 17,
      status: "pending",
      suggestedActivities: [ ]
    }, ];

    user = new Client({
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer"
    }, tripsData)
  });


  it('Should be a function', function() {
    expect(Client).to.be.a('function');
  });

  it('should be able to calculate the cost of a trip', function() {
    expect(user.calulateTripCost(destinationsData[0], tripsData[0])).to.equal(1056);
  });

  it('should be able to calculate the total spent ', function() {
    expect(user.showTotalSpent(destinationsData)).to.equal(15246);
  });

  it('should be able to calculate the total if approved', function() {
    expect(user.showTotalSpentHelper(destinationsData[0], tripsData[0])).to.equal(1056);
  });

  it('should be able to return 0 if pending ', function() {
    expect(user.showTotalSpentHelper(destinationsData[2], tripsData[2])).to.equal(0);
  });

  it('should be add a new trip', function() {
    user.updateTrips( tripsData[2])
    expect(user.trips.length).to.equal(4);
  });

  it('should be able to log out', function() {
    chai.spy.on(location, ['reload'], () => {
      return 'you have been logged out'
  })
    expect(user.logOut()).to.equal('you have been logged out');
  });





});
