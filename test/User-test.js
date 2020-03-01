import chai from 'chai';
import User from '../src/User.js'
const spies = require('chai-spies');
chai.use(spies);
const should = chai.should()

import Agent from '../src/Agent.js'
import Client from '../src/Client.js'

const expect = chai.expect;

describe('User', function() {
  let user;
  let userData;
  let tripsData
  global.window = {}

  chai.spy.on(window, 'fetch', () => {
    return new Promise()
  });




  beforeEach(function() {
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
      status: "pending",
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

    userData = {
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer"
    }

    user = new User()
  });


  it('Should be a function', function() {
    expect(User).to.be.a('function');
  });
  describe('Log in', function() {

    it('Should be able log in a client', function() {
      expect(user.showClient(userData, tripsData)).to.be.instanceof(Client);
    });

    it('Should be able log in a agent', function() {
      expect(user.showAgent(tripsData)).to.be.instanceof(Agent);
    });

  });



});
