import Database from './database.js';

export default class ReaderDatabase extends Database {
  onDataReceived(cb) {
    this.realTimeHeartRateRef.on('child_added', (data) => {
      let result = data.val().result;
      let rate = result.heartRate;
      let time = data.val().time;

      if (time) {
        if (this.beforeHook) {
          this.beforeHook(data.val());
        }

        cb(result);
      }
    });
  }
}
