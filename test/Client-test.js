import chai from 'chai';
import Client from '../src/Client.js'
import User from '../src/User.js'
const spies = require('chai-spies');
chai.use(spies);
const should = chai.should()

// import Agent from '../Agent.js'
// import Client from '../Client.js'

const expect = chai.expect;

describe.only('Client', function() {
  let user;
  global.window = {}

  // chai.spy.on(window, 'fetch', () => {
  //   return new Promise()
  // });




  beforeEach(function() {
    user = new Client()
  });


  it('Should be a function', function() {
    expect(Client).to.be.a('function');
  });

  describe('Log out', function(){
    it('Should return an guest user on logOut', function(){
      expect(user.logOut()).to.deep.equal(new User);
    });


  });



});
