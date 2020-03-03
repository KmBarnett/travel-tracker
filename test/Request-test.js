import chai from 'chai'
import Request from '../src/Request.js'
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const should = chai.should()


describe('Request', function() {
  let userInput =  {
    destinationId: 1,
    travelers: 2,
    date: '2020/03/20',
    duration: 3,
  }
  let user = 3;
  let id = 5;
  let request = new Request(id, user, userInput)

  it('Should take in Data', function(){
    expect(request).to.deep.equal( {
          date: "2020/03/20",
          destinationID: 1,
          duration: 3,
          id: 5,
          status: "pending",
          suggestedActivities: [],
          travelers: 2,
          userID: 3,
        })
  });



});
