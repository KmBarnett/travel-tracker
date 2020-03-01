import chai from 'chai';
import moment from 'moment'
import Agent from '../src/Agent.js'
const spies = require('chai-spies');
chai.use(spies);
const should = chai.should()

// import Agent from '../Agent.js'
// import Client from '../Client.js'

const expect = chai.expect;

describe('Agent', function() {
  let user;
  let destinationsData;
  let tripsData;
  let userData
  let mockDate = '2020/03/01';
  let today = `${moment().format("YYYY/MM/DD")}`;



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
      userID: 2,
      destinationID: 2,
      travelers: 5,
      date: mockDate,
      duration: 18,
      status: "pending",
      suggestedActivities: [ ]
    },
    {
      id: 3,
      userID: 3,
      destinationID: 3,
      travelers: 4,
      date: "2020/05/22",
      duration: 17,
      status: "approved",
      suggestedActivities: [ ]
    }, ];

    userData = [{
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer"
    },
    {
      id: 2,
      name: "Rachael Vaughten",
      travelerType: "thrill-seeker"
    },
    {
      id: 3,
      name: "Sibby Dawidowitsch",
      travelerType: "shopper"
    }, ]

    user = new Agent(userData, tripsData)
  });


  it('Should be a function', function() {
    expect(Agent).to.be.a('function');
  });

  it('Should be able to hold user Data', function() {
    expect(user.users).to.deep.equal(userData);
  });

  it('Should have a name of MR. Jackson', function() {
    expect(user.name).to.equal('Mr. Jackson');
  });

  it('Should be able to list pending trips', function() {
    expect(user.listPendingTrips()).to.deep.equal([tripsData[1]]);
  });

  it('Should be show Total earned', function() {
    expect(user.showTotalSpent(destinationsData)).to.equal(14960);
  });

  it('Should be show Total for a trip', function() {
    expect(user.calulateTripCost(destinationsData[1], user.trips[0])).to.equal(1738);
  });

  it('SHould be able to see how many people are traveling today', function() {
    // Needs to change mock date to todays date to pass yyyy/mm/dd format
    if (mockDate !== today) {
      throw new Error('Need to change mock date to todays date to pass');
    }
    expect(user.showTravelCount(today)).to.equal(1)
  });


});
