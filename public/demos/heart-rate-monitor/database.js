export default class Database {
  constructor() {
    this.realTimeHeartRateRef = firebase.database().ref('realtime-heart-rate/');
    this.averageBPM = 70;
    this.minBPM = 206;
    this.maxBPM = 0;
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
      this.averageBPM = Math.round((this.averageBPM + result.heartRate) / 2.0);
      this.minBPM = Math.min(this.minBPM, result.heartRate);
      this.maxBPM = Math.max(this.maxBPM, result.heartRate);

      this.rrIntervalsAverage = Math.round((this.rrIntervalsAverage + result.rrIntervals[0]) / 2.0);
      this.rrIntervalsMin = Math.min(this.rrIntervalsMin, result.rrIntervals[0]);
      this.rrIntervalsMax = Math.max(this.rrIntervalsMax, result.rrIntervals[0]);
    }

    console.table({
      startTime: this.startTime,
      endTime: this.endTime,
      averageBPM: this.averageBPM,
      minBPM: this.minBPM,
      maxBPM: this.maxBPM,
      numberOfBeats: this.numberOfBeats,
      rrIntervalsAverage: this.rrIntervalsAverage,
      rrIntervalsMin: this.rrIntervalsMin,
      rrIntervalsMax: this.rrIntervalsMax
    });
  }
}
