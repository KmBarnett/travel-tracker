import chai from 'chai';
import User from '../src/User.js'
const spies = require('chai-spies');
chai.use(spies);
const should = chai.should()

// import Agent from '../Agent.js'
// import Client from '../Client.js'

const expect = chai.expect;

describe('User', function() {
  let user;
  global.window = {}

  chai.spy.on(window, 'fetch', () => {
    return new Promise()
  });




  beforeEach(function() {
    user = new User()
  });


  it('Should be a function', function() {
    expect(User).to.be.a('function');
  });
  describe('Log in', function(){

    it('Should be able log i n a client', function() {
      expect(user.userLogIn(1)).to.equal();
    });

  });



});
