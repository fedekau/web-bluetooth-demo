import Database from './database.js';

export default class WriterDatabase extends Database {
  constructor() {
    super();

    this.heartBeatCounter = 0;
    this.realTimeHeartBeats = [];
  }

  push(result) {
    this.beforeHook(result);

    this._pushRealtimeHeartBeatRate(result);

    this.heartBeatCounter += 1;

    if (this.heartBeatCounter > 30) {
      this._removeOldestHeartBeat();
    }
  }

  _pushRealtimeHeartBeatRate(result) {
    this.realTimeHeartRateRef.push({
      result: result,
      time: Date.now()
    }).then((ref) => this.realTimeHeartBeats.push(ref));
  }

  _removeOldestHeartBeat() {
    this.realTimeHeartBeats.shift().remove();
  }
}
