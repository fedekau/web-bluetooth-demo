import Database from './database.js';

export default class ReaderDatabase extends Database {
  onDataReceived(cb) {
    this.realTimeHeartRateRef.on('child_added', (data) => {
      let rate = data.val().rate;
      let time = data.val().time;

      if (time) {
        cb(rate);
      }
    });
  }
}