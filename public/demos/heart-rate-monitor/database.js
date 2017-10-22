export default class Database {
  constructor() {
    this.realTimeHeartRateRef = firebase.database().ref('realtime-heart-rate/');
    this.averageBPP = 70;
    this.numberOfBeats = 0;
    this.startTime = Date.now();
    this.endTime = Date.now();
    this.rrIntervals = [];
  }

  clear() {
    this.realTimeHeartRateRef.set({});
  }

  beforeHook(result) {

  }
}
