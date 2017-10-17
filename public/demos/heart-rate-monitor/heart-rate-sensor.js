export default class HeartRateSensor {
  constructor(device) {
    this.device = device;
    this.MAX = 77;
    this.MIN = 55;
  }

  connect() {
    //TODO: Connect to the bluetooth device
  }

  onHeartBeat(cb) {
    setInterval(() => {
      const rate = this._generateFakeHeartRate(this.MIN, this.MAX);

      cb(rate);
    }, 900);
  }

  _generateFakeHeartRate(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
