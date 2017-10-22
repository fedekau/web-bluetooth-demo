export default class Database {
  constructor() {
    this.realTimeHeartRateRef = firebase.database().ref('realtime-heart-rate/');
    this.averageBPP = 70;
    this.numberOfBeats = 0;
    this.startTime = null;
    this.endTime = Date.now();
    this.rrIntervalsAverage = 700;
  }

  clear() {
    this.realTimeHeartRateRef.set({});
  }

  beforeHook(result) {
    if (!this.startTime) {
      this.startTime = Date.now();
    }

    this.endTime = Date.now();
    this.numberOfBeats += 1;

    if (result) {
      this.averageBPP = Math.round((this.averageBPP + result.heartRate) / 2.0);
      this.rrIntervalsAverage = Math.round((this.rrIntervalsAverage + result.rrIntervals[0]) / 2.0);
    }

    console.log(this.startTime, this.endTime, this.averageBPP, this.numberOfBeats, this.rrIntervalsAverage);
  }
}
