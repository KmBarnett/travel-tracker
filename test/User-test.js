import chai from 'chai';
import User from '../src/User.js'
import Agent from '../Agent.js'
import Client from '../Client.js'

const expect = chai.expect;

describe('User', function() {
  let user;


  beforeEach(function() {
    user = new User()
  });


  it('Should be a function', function() {
    expect(User).to.be.a('function');
  });




});
