export default class HeartRateSensor {
  constructor() {
    this.MAX = 77;
    this.MIN = 55;
  }

  connect() {
    //TODO: Connect to the bluetooth device
  }

  getHeartRate() {
    return this._generateFakeHeartRate(this.MIN, this.MAX);
  }

  _generateFakeHeartRate(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
