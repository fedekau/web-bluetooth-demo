import Database from './database.js';

export default class WriterDatabase extends Database {
  constructor() {
    super();

    this.heartBeatCounter = 0;
    this.realTimeHeartBeats = [];
  }

  push(rate) {
    this._pushRealtimeHeartBeatRate(rate);

    this.heartBeatCounter += 1;

    if(this.heartBeatCounter > 30) {
      this._removeOldestHeartBeat();
    }
  }

  _pushRealtimeHeartBeatRate(rate) {
    this.realTimeHeartRateRef.push({
      rate: rate,
      time: Date.now()
    }).then((ref) => this.realTimeHeartBeats.push(ref));
  }

  _removeOldestHeartBeat() {
    this.realTimeHeartBeats.shift().remove();
  }
}
