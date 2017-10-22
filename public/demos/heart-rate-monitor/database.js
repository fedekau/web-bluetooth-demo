export default class Database {
  constructor() {
    this.realTimeHeartRateRef = firebase.database().ref('realtime-heart-rate/');
    this.averageBPP = 70;
    this.minBPP = 206;
    this.maxBPP = 0;
    this.numberOfBeats = 0;
    this.startTime = null;
    this.endTime = Date.now();
    this.rrIntervalsAverage = 700;
    this.rrIntervalsMin = 60000;
    this.rrIntervalsMax = 0;
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
      this.minBPP = Math.min(this.minBPP, result.heartRate);
      this.maxBPP = Math.max(this.maxBPP, result.heartRate);

      this.rrIntervalsAverage = Math.round((this.rrIntervalsAverage + result.rrIntervals[0]) / 2.0);
      this.rrIntervalsMin = Math.min(this.rrIntervalsMin, result.rrIntervals[0]);
      this.rrIntervalsMax = Math.max(this.rrIntervalsMax, result.rrIntervals[0]);
    }

    console.log(
      this.startTime,
      this.endTime,
      this.averageBPP,
      this.minBPP,
      this.maxBPP,
      this.numberOfBeats,
      this.rrIntervalsAverage,
      this.rrIntervalsMin,
      this.rrIntervalsMax
    );
  }
}
