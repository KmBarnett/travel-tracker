class Request {
  constructor(id, userID, userInput) {
    this.id = id;
    this.userID = userID;
    this.destinationID = userInput.destinationId;
    this.travelers = userInput.travelers;
    this.date = userInput.date;
    this.duration = userInput.duration;
    this.status = "pending";
    this.suggestedActivities = []
  }
}

export default Request
